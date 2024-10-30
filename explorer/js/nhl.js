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
        loading.style.display = show ? 'flex' : 'none';
    }
};

// Calculate confidence class based on percentage
const getConfidenceClass = (confidence) => {
    if (confidence >= 75) return 'high';
    if (confidence >= 60) return 'medium';
    return 'low';
};

// Team name matching function
const teamsMatch = (team1, team2) => {
    if (!team1 || !team2) return false;
    return team1.toLowerCase().trim() === team2.toLowerCase().trim();
};

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
                teamsMatch(p['Home Team'], match.homeTeam.name) && 
                teamsMatch(p['Away Team'], match.awayTeam.name)
            )
        ) || [];

        debugLog('Historical matches found', matches.length);
        return calculateSummary(matches, predictions);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
    }
}
// Calculate summary statistics
function calculateSummary(matches, predictions) {
    let winnerCorrect = 0;
    let finishedMatches = 0;
    let totalPredictionConfidence = 0;

    matches.forEach(match => {
        const prediction = predictions.find(p => 
            teamsMatch(p['Home Team'], match.homeTeam.name) && 
            teamsMatch(p['Away Team'], match.awayTeam.name)
        );

        if (prediction && match.status.type === 'finished') {
            finishedMatches++;
            
            const homeScore = match.homeScore.current;
            const awayScore = match.awayScore.current;
            
            // Parse win probabilities from percentage strings
            const homeProb = parseFloat(prediction['Pre-Game Home Win Probability']) || 0;
            const awayProb = parseFloat(prediction['Pre-Game Away Win Probability']) || 0;
            
            totalPredictionConfidence += Math.max(homeProb, awayProb);

            // Check if prediction was correct
            const predictedHomeWin = homeProb > awayProb;
            const actualHomeWin = homeScore > awayScore;
            
            if (predictedHomeWin === actualHomeWin) {
                winnerCorrect++;
            }
        }
    });

    return {
        winnerAccuracy: finishedMatches ? (winnerCorrect / finishedMatches * 100) : 0,
        totalPredictions: predictions.length,
        averageConfidence: predictions.length ? (totalPredictionConfidence / predictions.length) : 0,
        finishedMatches,
        winnerCorrect
    };
}

// Fetch predictions from API
async function fetchPredictions(date) {
    try {
        const formattedDate = date.replace(/-/g, '-');
        const response = await fetch(`https://cdn.overdogbets.com/pussy/predictions/nhl/${formattedDate}_games.json`);
        if (!response.ok) {
            if (response.status === 404) {
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        debugLog('Predictions data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching predictions:', error);
        return [];
    }
}

// Fetch results from API
async function fetchResults(date) {
    try {
        const response = await fetch(`https://www.sofascore.com/api/v1/sport/ice-hockey/scheduled-events/${date}`);
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

// Create match row
function createMatchRow(match, prediction) {
    const homeScore = match.homeScore?.current || '-';
    const awayScore = match.awayScore?.current || '-';
    
    const row = document.createElement('tr');
    row.className = match.status.type === 'finished' ? 'finished-match' : '';

    // Parse win probabilities
    const homeProb = parseFloat(prediction['Pre-Game Home Win Probability']) || 0;
    const awayProb = parseFloat(prediction['Pre-Game Away Win Probability']) || 0;
    
    // Determine predicted winner
    const predictedHomeWin = homeProb > awayProb;
    const predictedWinnerName = predictedHomeWin ? match.homeTeam.name : match.awayTeam.name;
    const winnerConfidence = Math.max(homeProb, awayProb);
    
    // Check if prediction was correct (for finished matches)
    const isWinnerCorrect = match.status.type === 'finished' && 
        ((predictedHomeWin && homeScore > awayScore) || 
         (!predictedHomeWin && awayScore > homeScore));

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
                <div class="record">${prediction['Home Record']}</div>
            </div>
            <div class="match-row">
                <div class="team-name">
                    ${match.awayTeam.name}
                    <span class="score ${awayScore > homeScore ? 'winning' : ''}">${awayScore}</span>
                </div>
                <div class="record">${prediction['Away Record']}</div>
            </div>
        </td>
        <td>
            <div class="prediction-tag ${getConfidenceClass(winnerConfidence)}">
                ${predictedWinnerName}
                (${winnerConfidence.toFixed(1)}%)
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
                <i class="fas fa-hockey-puck"></i>
                Today's matches
            </div>
        </div>
        <div class="summary-card">
            <div class="summary-label">Average Win Probability</div>
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

        // Match teams using teamsMatch function
        const matches = resultsData.events?.filter(match => 
            predictions.some(p => 
                teamsMatch(p['Home Team'], match.homeTeam.name) && 
                teamsMatch(p['Away Team'], match.awayTeam.name)
            )
        ) || [];

        const currentSummary = calculateSummary(matches, predictions);
        const trends = calculateTrends(currentSummary, historicalData);
        updateSummaryDashboard(currentSummary, trends);

        matches.sort((a, b) => a.startTimestamp - b.startTimestamp);

        matches.forEach(match => {
            const prediction = predictions.find(p => 
                teamsMatch(p['Home Team'], match.homeTeam.name) && 
                teamsMatch(p['Away Team'], match.awayTeam.name)
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