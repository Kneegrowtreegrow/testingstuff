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

// Show/hide loading spinner
const toggleLoading = (show) => {
    if (loading) {
        loading.style.display = show ? 'block' : 'none';
    }
};

// Format time in CET
const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('pl-PL', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};

// Calculate confidence class based on percentage
const getConfidenceClass = (confidence) => {
    if (confidence >= 75) return 'high';
    if (confidence >= 60) return 'medium';
    return 'low';
};

// Enhanced tennis player name matching
const teamsMatch = (name1, name2) => {
    if (!name1 || !name2) return false;

    const normalizePlayerName = (name) => {
        if (typeof name !== 'string') return '';
        return name.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .replace(/[^a-z]/g, '')
            .trim();
    };

    const simplifyName = (name) => {
        return name.split(' ').map(part => part.charAt(0)).join('');
    };

    const norm1 = normalizePlayerName(name1);
    const norm2 = normalizePlayerName(name2);
    const init1 = simplifyName(norm1);
    const init2 = simplifyName(norm2);

    return norm1 === norm2 || 
           norm1.includes(norm2) || 
           norm2.includes(norm1) || 
           init1 === init2;
};

// Format tennis player name
const formatPlayerName = (fullName) => {
    const parts = fullName.split(' ');
    return `${parts.pop()} ${parts[0]?.charAt(0) || ''}.`;
};

// Get formatted match result
function getFormattedResult(match) {
    if (!match || match.status.type === 'canceled') {
        return 'Canceled';
    }

    if (match.status.type !== 'finished') {
        return match.status.description || 'Not finished';
    }

    let homeSets = 0;
    let awaySets = 0;
    
    for (let i = 1; i <= 5; i++) {
        const homePeriodScore = match.homeScore[`period${i}`];
        const awayPeriodScore = match.awayScore[`period${i}`];
        if (homePeriodScore !== undefined && awayPeriodScore !== undefined) {
            if (parseInt(homePeriodScore) > parseInt(awayPeriodScore)) {
                homeSets++;
            } else if (parseInt(awayPeriodScore) > parseInt(homePeriodScore)) {
                awaySets++;
            }
        }
    }

    return `${homeSets}:${awaySets}`;
}

// Calculate summary statistics
function calculateSummary(matches, predictions) {
    let winnerCorrect = 0;
    let finishedMatches = 0;
    let totalConfidence = 0;
    let predictionsCount = 0;

    matches.forEach(match => {
        const prediction = predictions.find(p => 
            teamsMatch(p.Player1, match.homeTeam.name) && 
            teamsMatch(p.Player2, match.awayTeam.name)
        );

        if (prediction && match.status.type === 'finished') {
            const player1Prob = parseFloat(prediction.player1_probability);
            const player2Prob = parseFloat(prediction.player2_probability);
            const isUnsure = Math.abs(player1Prob - player2Prob) < 0.001;

            // Only count non-unsure predictions
            if (!isUnsure) {
                finishedMatches++;
                const totalProb = player1Prob + player2Prob;
                const player1Confidence = (player1Prob / totalProb * 100);
                const player2Confidence = (player2Prob / totalProb * 100);
                
                totalConfidence += Math.max(player1Confidence, player2Confidence);
                predictionsCount++;

                const predictedFirstPlayerWin = player1Prob > player2Prob;
                const actualFirstPlayerWin = match.winnerCode === 1;
                
                if (predictedFirstPlayerWin === actualFirstPlayerWin) {
                    winnerCorrect++;
                }
            }
        }
    });

    return {
        winnerAccuracy: finishedMatches ? (winnerCorrect / finishedMatches * 100) : 0,
        totalPredictions: predictions.filter(p => {
            const player1Prob = parseFloat(p.player1_probability);
            const player2Prob = parseFloat(p.player2_probability);
            return Math.abs(player1Prob - player2Prob) >= 0.001;
        }).length,
        averageConfidence: predictionsCount ? (totalConfidence / predictionsCount) : 0,
        finishedMatches,
        winnerCorrect
    };
}

// Fetch predictions from API
async function fetchPredictions(date) {
    try {
        const response = await fetch(`https://cdn.overdogbets.com/pussy/predictions/tennis/${date}.json`);
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
        const response = await fetch(`https://www.sofascore.com/api/v1/sport/tennis/scheduled-events/${date}`);
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
    const row = document.createElement('tr');
    row.className = match.status.type === 'finished' ? 'finished-match' : '';

    const player1Prob = parseFloat(prediction.player1_probability);
    const player2Prob = parseFloat(prediction.player2_probability);
    const totalProb = player1Prob + player2Prob;
    const player1Confidence = (player1Prob / totalProb * 100).toFixed(1);
    const player2Confidence = (player2Prob / totalProb * 100).toFixed(1);

    const predictedFirstPlayerWin = player1Prob > player2Prob;
    const isUnsure = Math.abs(player1Prob - player2Prob) < 0.001;
    
    const resultText = getFormattedResult(match);
    const isWinnerCorrect = match.status.type === 'finished' && 
        ((predictedFirstPlayerWin && match.winnerCode === 1) || 
         (!predictedFirstPlayerWin && match.winnerCode === 2));

    // Get predicted winner's name
    const predictedWinnerName = predictedFirstPlayerWin ? 
        formatPlayerName(prediction.Player1) : 
        formatPlayerName(prediction.Player2);

    row.innerHTML = `
        <td>
            <div>${formatTime(prediction.date.timestamp)}</div>
            <div class="status">${match.status.description}</div>
        </td>
        <td>
            <div class="match-row">
                <div class="team-name ${predictedFirstPlayerWin && !isUnsure ? 'predicted-winner' : ''}">
                    ${formatPlayerName(prediction.Player1)}
                    <span class="confidence">${player1Confidence}%</span>
                </div>
            </div>
            <div class="match-row">
                <div class="team-name ${!predictedFirstPlayerWin && !isUnsure ? 'predicted-winner' : ''}">
                    ${formatPlayerName(prediction.Player2)}
                    <span class="confidence">${player2Confidence}%</span>
                </div>
            </div>
        </td>
        <td>
            <div class="prediction-tag ${isUnsure ? 'low' : getConfidenceClass(Math.max(player1Confidence, player2Confidence))}">
                ${isUnsure ? 'UNSURE' : `${predictedWinnerName} to win`}
            </div>
        </td>
        <td>
            <div class="prediction-tag ${
                match.status.type === 'finished' 
                    ? (isWinnerCorrect ? 'high' : 'low') 
                    : 'medium'
            }">
                ${resultText}
            </div>
        </td>
        <td>
            ${match.status.type === 'finished' ? 
                `<div class="prediction-tag ${isUnsure ? 'medium' : (isWinnerCorrect ? 'high' : 'low')}">
                    ${isUnsure ? '-' : (isWinnerCorrect ? '✓ CORRECT' : '✗ INCORRECT')}
                </div>` : 
                '<div class="prediction-tag medium">PENDING</div>'
            }
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
                <i class="fas fa-table-tennis"></i>
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
                teamsMatch(p.Player1, match.homeTeam.name) && 
                teamsMatch(p.Player2, match.awayTeam.name)
            )
        ) || [];

        debugLog('Historical matches found', matches.length);
        return calculateSummary(matches, predictions);
    } catch (error) {
        console.error('Error fetching historical data:', error);
        return null;
    }
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
                teamsMatch(p.Player1, match.homeTeam.name) && 
                teamsMatch(p.Player2, match.awayTeam.name)
            )
        ) || [];

        const currentSummary = calculateSummary(matches, predictions);
        const trends = calculateTrends(currentSummary, historicalData);
        updateSummaryDashboard(currentSummary, trends);

        matches.sort((a, b) => a.startTimestamp - b.startTimestamp);

        matches.forEach(match => {
            const prediction = predictions.find(p => 
                teamsMatch(p.Player1, match.homeTeam.name) && 
                teamsMatch(p.Player2, match.awayTeam.name)
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