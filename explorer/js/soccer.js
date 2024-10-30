// DOM Elements
const datePicker = document.getElementById('datePicker');
const matchesTableBody = document.getElementById('matchesTableBody');
const loading = document.getElementById('loading');

// Initialize date picker with today's date
const today = new Date();
datePicker.value = today.toISOString().split('T')[0];

// Format date for API calls
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

// Debug logging function
const debugLog = (message, data) => {
    console.log(`[DEBUG] ${message}:`, data);
};

// Format time from timestamp
const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Show/hide loading spinner
const toggleLoading = (show) => {
    if (loading) {
        loading.style.display = show ? 'block' : 'none';
    }
};

// Calculate confidence class based on percentage
const getConfidenceClass = (confidence) => {
    if (confidence >= 75) return 'high';
    if (confidence >= 60) return 'medium';
    return 'low';
};

// Team name matching function with soccer-specific normalization
const teamsMatch = (team1, team2) => {
    if (!team1 || !team2) return false;
    const normalize = (name) => name.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/fc$|fk$|nk$/, '')
        .replace(/united$/, '')
        .trim();
    return normalize(team1) === normalize(team2);
};

// Calculate confidence from odds
const calculateConfidence = (odds, prediction) => {
    switch(prediction) {
        case '1': return (1 / odds['1'] * 100).toFixed(1);
        case '2': return (1 / odds['2'] * 100).toFixed(1);
        case 'X': return (1 / odds['X'] * 100).toFixed(1);
        case '1X': return (1 / odds['1X'] * 100).toFixed(1);
        case 'X2': return (1 / odds['X2'] * 100).toFixed(1);
        case '12': return (1 / odds['12'] * 100).toFixed(1);
        default: return 50;
    }
};

// Get prediction text
function getPredictionText(prediction) {
    switch(prediction) {
        case '1': return 'Home Win';
        case 'X': return 'Draw';
        case '2': return 'Away Win';
        case '12': return 'No Draw';
        case '1X': return 'Home Win/Draw';
        case 'X2': return 'Away Win/Draw';
        default: return prediction;
    }
}

// Check if prediction is correct
function isPredictionCorrect(prediction, match) {
    const homeScore = match.homeScore.current;
    const awayScore = match.awayScore.current;
    const homeWin = homeScore > awayScore;
    const awayWin = awayScore > homeScore;
    const draw = homeScore === awayScore;
    
    switch(prediction) {
        case '1': return homeWin;
        case '2': return awayWin;
        case 'X': return draw;
        case '12': return !draw;
        case '1X': return homeWin || draw;
        case 'X2': return awayWin || draw;
        default: return false;
    }
}

// Calculate summary statistics
function calculateSummary(matches, predictions) {
    let winnerCorrect = 0;
    let finishedMatches = 0;
    let totalConfidence = 0;

    matches.forEach(match => {
        const prediction = predictions.find(p => 
            teamsMatch(p.home_team, match.homeTeam.name) && 
            teamsMatch(p.away_team, match.awayTeam.name)
        );

        if (prediction && match.status.type === 'finished') {
            finishedMatches++;
            const confidence = parseFloat(calculateConfidence(prediction.odds, prediction.prediction));
            totalConfidence += confidence;

            if (isPredictionCorrect(prediction.prediction, match)) {
                winnerCorrect++;
            }
        }
    });

    return {
        winnerAccuracy: finishedMatches ? (winnerCorrect / finishedMatches * 100) : 0,
        totalPredictions: predictions.length,
        averageConfidence: predictions.length ? (totalConfidence / predictions.length) : 0,
        finishedMatches,
        winnerCorrect
    };
}

// Fetch predictions from API
async function fetchPredictions(date) {
    try {
        const response = await fetch(`https://cdn.overdogbets.com/pussy/predictions/soccer/${date}.json`);
        if (!response.ok) {
            if (response.status === 404) {
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        debugLog('Predictions data:', responseData);
        return responseData.data || [];
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return [];
    }
}

// Fetch results from API
async function fetchResults(date) {
    try {
        const response = await fetch(`https://www.sofascore.com/api/v1/sport/football/scheduled-events/${date}`);
        if (!response.ok) {
            if (response.status === 404) {
                return { events: [] };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        debugLog('Results data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching results:', error);
        return { events: [] };
    }
}

// Fetch historical data for trends
async function fetchHistoricalData(date) {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const formattedPrevDate = formatDate(prevDate);

    debugLog('Fetching historical data for', formattedPrevDate);

    try {
        const [predictions, results] = await Promise.all([
            fetchPredictions(formattedPrevDate),
            fetchResults(formattedPrevDate)
        ]);

        const matches = results.events?.filter(match => 
            predictions.some(p => 
                teamsMatch(p.home_team, match.homeTeam.name) && 
                teamsMatch(p.away_team, match.awayTeam.name)
            )
        ) || [];

        debugLog('Historical matches found', matches.length);
        return calculateSummary(matches, predictions);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
    }
}

// Create match row
function createMatchRow(match, prediction) {
    const homeScore = match.homeScore?.current || '-';
    const awayScore = match.awayScore?.current || '-';
    
    const row = document.createElement('tr');
    row.className = match.status.type === 'finished' ? 'finished-match' : '';

    const confidence = calculateConfidence(prediction.odds, prediction.prediction);
    
    const isWinnerCorrect = match.status.type === 'finished' && 
        isPredictionCorrect(prediction.prediction, match);

    row.innerHTML = `
        <td>
            <div>${formatTime(new Date(prediction.start_date).getTime() / 1000)}</div>
            <div class="status">${match.status.description}</div>
        </td>
        <td>
            <div class="match-row">
                <div class="team-name">
                    ${match.homeTeam.name}
                    <span class="score ${homeScore > awayScore ? 'winning' : ''}">${homeScore}</span>
                </div>
                <div class="competition">${prediction.competition_name}</div>
            </div>
            <div class="match-row">
                <div class="team-name">
                    ${match.awayTeam.name}
                    <span class="score ${awayScore > homeScore ? 'winning' : ''}">${awayScore}</span>
                </div>
                <div class="country">${prediction.competition_cluster}</div>
            </div>
        </td>
        <td>
            <div class="prediction-tag ${getConfidenceClass(confidence)}">
                ${getPredictionText(prediction.prediction)}
                (${confidence}%)
            </div>
        </td>
        <td>
            <div class="prediction-tag ${match.status.type === 'finished' ? (isWinnerCorrect ? 'high' : 'low') : 'medium'}">
                ${match.status.type === 'finished' ? (isWinnerCorrect ? 'CORRECT' : 'INCORRECT') : 'PENDING'}
            </div>
        </td>
    `;

    return row;
}

// Calculate prediction trends
const calculateTrends = (currentData, previousData) => {
    if (!previousData) {
        return {
            winnerAccuracy: { value: 0, direction: 'up' },
            averageConfidence: { value: 0, direction: 'up' }
        };
    }

    return {
        winnerAccuracy: {
            value: (currentData.winnerAccuracy - previousData.winnerAccuracy).toFixed(1),
            direction: currentData.winnerAccuracy >= previousData.winnerAccuracy ? 'up' : 'down'
        },
        averageConfidence: {
            value: (currentData.averageConfidence - previousData.averageConfidence).toFixed(1),
            direction: currentData.averageConfidence >= previousData.averageConfidence ? 'up' : 'down'
        }
    };
};

// Update summary dashboard
function updateSummaryDashboard(summary, trends) {
    const summaryDashboard = document.querySelector('.summary-dashboard');
    
    summaryDashboard.innerHTML = `
        <div class="summary-card">
            <div class="summary-label">Winner Prediction Accuracy</div>
            <div class="summary-value">
                <span class="percentage">${summary.winnerAccuracy.toFixed(1)}%</span>
                <span class="hit-ratio">${summary.winnerCorrect}/${summary.finishedMatches}</span>
            </div>
            <div class="summary-trend trend-${trends.winnerAccuracy.direction}">
                <i class="fas fa-arrow-${trends.winnerAccuracy.direction}"></i>
                ${Math.abs(trends.winnerAccuracy.value)}% vs previous day
            </div>
        </div>
        <div class="summary-card">
            <div class="summary-label">Total Predictions</div>
            <div class="summary-value">${summary.totalPredictions}</div>
            <div class="summary-trend">
                <i class="fas fa-futbol"></i>
                Today's matches
            </div>
        </div>
        <div class="summary-card">
            <div class="summary-label">Average Prediction Confidence</div>
            <div class="summary-value">${summary.averageConfidence.toFixed(1)}%</div>
            <div class="summary-trend trend-${trends.averageConfidence.direction}">
                <i class="fas fa-arrow-${trends.averageConfidence.direction}"></i>
                ${Math.abs(trends.averageConfidence.value)}% vs previous day
            </div>
        </div>
    `;
}

// Update matches display
async function updateMatches(date) {
    toggleLoading(true);
    matchesTableBody.innerHTML = '';
    debugLog('Updating matches for date', date);

    try {
        const [predictions, resultsData, historicalData] = await Promise.all([
            fetchPredictions(date),
            fetchResults(date),
            fetchHistoricalData(date)
        ]);

        if (!predictions || predictions.length === 0) {
            matchesTableBody.innerHTML = `
                <tr><td colspan="4" class="no-data">No predictions available for this date</td></tr>
            `;
            return;
        }

        const matches = resultsData.events?.filter(match => 
            predictions.some(p => 
                teamsMatch(p.home_team, match.homeTeam.name) && 
                teamsMatch(p.away_team, match.awayTeam.name)
            )
        ) || [];

        const currentSummary = calculateSummary(matches, predictions);
        const trends = calculateTrends(currentSummary, historicalData);
        updateSummaryDashboard(currentSummary, trends);

        matches.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

        matches.forEach(match => {
            const prediction = predictions.find(p => 
                teamsMatch(p.home_team, match.homeTeam.name) && 
                teamsMatch(p.away_team, match.awayTeam.name)
            );
            
            if (prediction) {
                const row = createMatchRow(match, prediction);
                matchesTableBody.appendChild(row);
            }
        });

    } catch (error) {
        console.error('Error updating matches:', error);
        matchesTableBody.innerHTML = `
            <tr><td colspan="4" class="error">Error loading matches. Please try again later.</td></tr>
        `;
    } finally {
        toggleLoading(false);
    }
}

// Event Listeners
datePicker.addEventListener('change', (e) => {
    updateMatches(e.target.value);
});

// Initialize
updateMatches(formatDate(today));

// Set up auto-refresh
setInterval(() => {
    updateMatches(datePicker.value);
}, 60000); // Refresh every minute