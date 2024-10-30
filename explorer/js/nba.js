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

// Team name matching function - moved to top level
const teamsMatch = (team1, team2) => {
    if (!team1 || !team2) return false;
    return team1.toLowerCase().trim() === team2.toLowerCase().trim();
};


// Calfunction
function calculateSummary(matches, predictions) {
    let winnerCorrect = 0;
    let totalCorrect = 0;
    let totalWinnerConfidence = 0;
    let totalOverUnderConfidence = 0;
    let finishedMatches = 0;

    matches.forEach(match => {
        const prediction = predictions.find(p => 
            teamsMatch(p.home_team, match.homeTeam.name) && 
            teamsMatch(p.away_team, match.awayTeam.name)
        );

        if (prediction && match.status.type === 'finished') {
            finishedMatches++;
            totalWinnerConfidence += prediction.winner_confidence;
            totalOverUnderConfidence += prediction.un_confidence;

            const homeScore = match.homeScore.current;
            const awayScore = match.awayScore.current;
            const totalScore = homeScore + awayScore;

            // Determine predicted winner based on colors
            const homeIsRED = prediction.expected_value_colors.home_color === 'RED';
            const awayIsRED = prediction.expected_value_colors.away_color === 'RED';
            
            // Check if prediction was correct
            if ((homeIsRED && homeScore > awayScore) || 
                (awayIsRED && awayScore > homeScore)) {
                winnerCorrect++;
            }

            // Check total prediction
            if ((prediction.under_over === 'OVER' && totalScore > prediction.total) || 
                (prediction.under_over === 'UNDER' && totalScore < prediction.total)) {
                totalCorrect++;
            }
        }
    });

    return {
        winnerAccuracy: finishedMatches ? (winnerCorrect / finishedMatches * 100) : 0,
        totalAccuracy: finishedMatches ? (totalCorrect / finishedMatches * 100) : 0,
        totalPredictions: predictions.length,
        averageConfidence: predictions.length ? 
            ((totalWinnerConfidence + totalOverUnderConfidence) / (predictions.length * 2)) : 0,
        finishedMatches,
        winnerCorrect,
        totalCorrect
    };
}

// Fetch predictions from API
async function fetchPredictions(date) {
    try {
        const response = await fetch(`https://cdn.overdogbets.com/pussy/predictions/${date}_predictions.json`);
        if (!response.ok) {
            if (response.status === 404) {
                return []; // Return empty array for no predictions
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Predictions data:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return [];
    }
}

// Fetch results from API
async function fetchResults(date) {
    try {
        const response = await fetch(`https://www.sofascore.com/api/v1/sport/basketball/scheduled-events/${date}`);
        if (!response.ok) {
            if (response.status === 404) {
                return { events: [] }; // Return empty events array for no results
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Results data:', data); // Debug log
        return data;
    } catch (error) {
        console.error('Error fetching results:', error);
        return { events: [] };
    }
}

// Format time
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
    loading.style.display = show ? 'flex' : 'none';
};

// Calculate confidence class
const getConfidenceClass = (confidence) => {
    if (confidence >= 75) return 'high';
    if (confidence >= 60) return 'medium';
    return 'low';
};

// Calculate prediction trends
const calculateTrends = (currentData, previousData) => {
    if (!previousData) {
        return {
            winnerAccuracy: { value: 0, direction: 'up' },
            totalAccuracy: { value: 0, direction: 'up' },
            averageConfidence: { value: 0, direction: 'up' }
        };
    }

    return {
        winnerAccuracy: {
            value: (currentData.winnerAccuracy - previousData.winnerAccuracy).toFixed(1),
            direction: currentData.winnerAccuracy >= previousData.winnerAccuracy ? 'up' : 'down'
        },
        totalAccuracy: {
            value: (currentData.totalAccuracy - previousData.totalAccuracy).toFixed(1),
            direction: currentData.totalAccuracy >= previousData.totalAccuracy ? 'up' : 'down'
        },
        averageConfidence: {
            value: (currentData.averageConfidence - previousData.averageConfidence).toFixed(1),
            direction: currentData.averageConfidence >= previousData.averageConfidence ? 'up' : 'down'
        }
    };
};

// Create match row
function createMatchRow(match, prediction) {
    const homeScore = match.homeScore?.current || '-';
    const awayScore = match.awayScore?.current || '-';
    const totalScore = homeScore !== '-' ? homeScore + awayScore : '-';
    
    const row = document.createElement('tr');
    row.className = match.status.type === 'finished' ? 'finished-match' : '';

    // Determine predicted winner based on colors
    const homeIsRED = prediction.expected_value_colors.home_color === 'RED';
    const awayIsRED = prediction.expected_value_colors.away_color === 'RED';
    
    // Check if prediction was correct
    const isWinnerCorrect = match.status.type === 'finished' && 
        ((homeIsRED && homeScore > awayScore) || 
         (awayIsRED && awayScore > homeScore));

    const isTotalCorrect = match.status.type === 'finished' && 
        ((prediction.under_over === 'OVER' && totalScore > prediction.total) || 
         (prediction.under_over === 'UNDER' && totalScore < prediction.total));

    // Determine predicted winner's name
    const predictedWinnerName = homeIsRED ? match.homeTeam.name : 
                               awayIsRED ? match.awayTeam.name : 
                               'No Clear Prediction';

    row.innerHTML = `
        <td>
            <div>${formatTime(match.startTimestamp)}</div>
            <div class="status">${match.status.description}</div>
        </td>
        <td>
            <div class="match-row">
                <div class="team-name">
                    ${match.homeTeam.name}
                    <span class="score ${homeScore > awayScore ? 'winning' : ''}">${homeScore}</span>
                </div>
            </div>
            <div class="match-row">
                <div class="team-name">
                    ${match.awayTeam.name}
                    <span class="score ${awayScore > homeScore ? 'winning' : ''}">${awayScore}</span>
                </div>
            </div>
        </td>
        <td>
            <div class="prediction-tag ${getConfidenceClass(prediction.winner_confidence)}">
                ${predictedWinnerName}
                (${prediction.winner_confidence}%)
            </div>
        </td>
        <td>
            <div class="prediction-tag ${getConfidenceClass(prediction.un_confidence)}">
                ${prediction.under_over} ${prediction.total}
                (${prediction.un_confidence}%)
            </div>
        </td>
        <td>
            <div class="prediction-tag ${match.status.type === 'finished' ? (isWinnerCorrect ? 'high' : 'low') : 'medium'}">
                ${match.status.type === 'finished' ? (isWinnerCorrect ? 'CORRECT' : 'INCORRECT') : 'PENDING'}
            </div>
        </td>
        <td>
            <div class="prediction-tag ${match.status.type === 'finished' ? (isTotalCorrect ? 'high' : 'low') : 'medium'}">
                ${match.status.type === 'finished' ? (isTotalCorrect ? 'CORRECT' : 'INCORRECT') : 'PENDING'}
            </div>
        </td>
    `;

    return row;
}
// Fetch historical data
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

        // Match teams using teamsMatch function
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
            <div class="summary-label">Total Prediction Accuracy</div>
            <div class="summary-value">
                <span class="percentage">${summary.totalAccuracy.toFixed(1)}%</span>
                <span class="hit-ratio">${summary.totalCorrect}/${summary.finishedMatches}</span>
            </div>
            <div class="summary-trend trend-${trends.totalAccuracy.direction}">
                <i class="fas fa-arrow-${trends.totalAccuracy.direction}"></i>
                ${Math.abs(trends.totalAccuracy.value)}% vs previous day
            </div>
        </div>
        <div class="summary-card">
            <div class="summary-label">Total Predictions</div>
            <div class="summary-value">${summary.totalPredictions}</div>
            <div class="summary-trend">
                <i class="fas fa-calendar"></i>
                Today's matches
            </div>
        </div>
        <div class="summary-card">
            <div class="summary-label">Average Confidence</div>
            <div class="summary-value">${summary.averageConfidence.toFixed(1)}%</div>
            <div class="summary-trend trend-${trends.averageConfidence.direction}">
                <i class="fas fa-arrow-${trends.averageConfidence.direction}"></i>
                ${Math.abs(trends.averageConfidence.value)}% vs previous day
            </div>
        </div>
    `;
}

// Update matches display
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

        // Match teams using teamsMatch function
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

// [Rest of the code remains the same]

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

        debugLog('Fetched data', {
            predictions: predictions?.length || 0,
            results: resultsData.events?.length || 0
        });

        if (!predictions || predictions.length === 0) {
            debugLog('No predictions available');
            matchesTableBody.innerHTML = `
                <tr><td colspan="6" class="no-data">No predictions available for this date</td></tr>
            `;
            return;
        }

        // Match teams using teamsMatch function
        const matches = resultsData.events?.filter(match => 
            predictions.some(p => 
                teamsMatch(p.home_team, match.homeTeam.name) && 
                teamsMatch(p.away_team, match.awayTeam.name)
            )
        ) || [];

        debugLog('Matched games found', matches.length);

        const currentSummary = calculateSummary(matches, predictions);
        const trends = calculateTrends(currentSummary, historicalData);
        updateSummaryDashboard(currentSummary, trends);

        matches.sort((a, b) => a.startTimestamp - b.startTimestamp);

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

        debugLog('Finished updating matches display');

    } catch (error) {
        console.error('Error updating matches:', error);
        matchesTableBody.innerHTML = `
            <tr><td colspan="6" class="error">Error loading matches. Please try again later.</td></tr>
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
