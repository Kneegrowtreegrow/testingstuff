async function fetchPredictions(date) {
    try {
        const response = await fetch(`https://cdn.overdogbets.com/pussy/predictions/tennis/${date}.json`);
        const predictions = await response.json();

        console.log("Predictions fetched:", JSON.stringify(predictions, null, 2));

        const results = await fetchResultsFromSofaScore(date);

        const transformedPredictions = predictions.map(prediction => {
            try {
                return {
                    away_team_name: `${prediction.Player2.split(' ').pop()} ${prediction.Player2.charAt(0)}.`,
                    home_team_name: `${prediction.Player1.split(' ').pop()} ${prediction.Player1.charAt(0)}.`,
                    player1_probability: prediction.player1_probability,
                    player2_probability: prediction.player2_probability,
                    match_date: prediction.date.day,
                    match_timestamp: prediction.date.timestamp
                };
            } catch (error) {
                console.error("Error transforming prediction:", error, prediction);
                return null;
            }
        }).filter(Boolean);

        displayPredictions(transformedPredictions, results);
    } catch (error) {
        console.error("Error fetching predictions:", error);
        const tableBody = document.getElementById('predictions-table');
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="border-b border-[rgba(0,255,255,0.1)] px-6 py-4 text-center">
                    Error loading predictions. Please try again later.
                </td>
            </tr>`;
        updateSummary(0, 0, 0, 0);
    }
}

async function fetchResultsFromSofaScore(date) {
    try {
        const url = `https://www.sofascore.com/api/v1/sport/tennis/scheduled-events/${date}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw SofaScore API response:", JSON.stringify(data, null, 2));

        const matches = data.events || [];
        console.log(`Number of matches found: ${matches.length}`);

        return matches.map(match => ({
            home_team_name: `${match.homeTeam.name}`,
            away_team_name: `${match.awayTeam.name}`,
            home_score: match.homeScore,
            away_score: match.awayScore,
            match_timestamp: match.startTimestamp,
            status: match.status.type,
            winnerCode: match.winnerCode
        }));
    } catch (error) {
        console.error("Error fetching results from SofaScore:", error);
        return [];
    }
}

function getFormattedResult(result) {
    if (!result || result.status === 'canceled') {
        return 'Canceled';
    }

    if (result.status !== 'finished') {
        return 'Not finished';
    }

    let homeSets = 0;
    let awaySets = 0;
    
    for (let i = 1; i <= 5; i++) {
        const homePeriodScore = result.home_score[`period${i}`];
        const awayPeriodScore = result.away_score[`period${i}`];
        if (homePeriodScore !== undefined && awayPeriodScore !== undefined) {
            if (parseInt(homePeriodScore) > parseInt(awayPeriodScore)) {
                homeSets++;
            } else {
                awaySets++;
            }
        } else {
            break;
        }
    }

    return `${homeSets}:${awaySets}`;
}

function findResultForMatch(prediction, results) {
    const normalizeTeamName = (name) => {
        if (typeof name !== 'string') {
            console.warn(`Invalid team name: ${name}`);
            return '';
        }
        return name.normalize('NFD')
                   .replace(/[\u0300-\u036f]/g, '')
                   .toLowerCase()
                   .replace(/[^a-z]/g, '');
    };

    const simplifyName = (name) => {
        return name.split(' ').map(part => part.charAt(0)).join('');
    };

    const homeTeamName = normalizeTeamName(prediction.home_team_name);
    const awayTeamName = normalizeTeamName(prediction.away_team_name);
    const homeTeamInitials = simplifyName(homeTeamName);
    const awayTeamInitials = simplifyName(awayTeamName);

    console.log(`Searching for match: ${homeTeamName} (${homeTeamInitials}) vs ${awayTeamName} (${awayTeamInitials})`);

    const matchedResult = results.find(result => {
        const resultHomeName = normalizeTeamName(result.home_team_name);
        const resultAwayName = normalizeTeamName(result.away_team_name);
        const resultHomeInitials = simplifyName(resultHomeName);
        const resultAwayInitials = simplifyName(resultAwayName);

        const homeMatch = 
            homeTeamName === resultHomeName ||
            homeTeamName.includes(resultHomeName) ||
            resultHomeName.includes(homeTeamName) ||
            homeTeamInitials === resultHomeInitials;

        const awayMatch = 
            awayTeamName === resultAwayName ||
            awayTeamName.includes(resultAwayName) ||
            resultAwayName.includes(awayTeamName) ||
            awayTeamInitials === resultAwayInitials;

        const specialCaseHome = (homeTeamName.includes('aguilar') && resultHomeName.includes('merida')) ||
                               (homeTeamName.includes('merida') && resultHomeName.includes('aguilar'));
        const specialCaseAway = (awayTeamName.includes('aguilar') && resultAwayName.includes('merida')) ||
                               (awayTeamName.includes('merida') && resultAwayName.includes('aguilar'));

        const mixedMatch = (homeMatch && specialCaseAway) || (awayMatch && specialCaseHome);

        return (homeMatch && awayMatch) || mixedMatch;
    });

    if (!matchedResult) {
        console.log(`No matching result found for: ${prediction.home_team_name} vs ${prediction.away_team_name}`);
    }

    return matchedResult;
}

function displayPredictions(predictions, results) {
    const tableBody = document.getElementById('predictions-table');
    tableBody.innerHTML = '';

    if (predictions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="border-b border-[rgba(0,255,255,0.1)] px-6 py-4 text-center">
                    No predictions available for the selected date.
                </td>
            </tr>`;
        updateSummary(0, 0, 0, 0);
        return;
    }

    let correctPredictions = 0;
    let totalFinishedMatches = 0;
    let totalPredictions = 0;

    predictions.forEach(prediction => {
        const result = findResultForMatch(prediction, results);
        
        let resultText = 'Result not available';
        let rowClass = '';
        let confidenceStyle = '';

        const player1Confidence = parseFloat(prediction.player1_probability);
        const player2Confidence = parseFloat(prediction.player2_probability);
        const totalConfidence = player1Confidence + player2Confidence;
        const player1ConfidencePercent = (player1Confidence / totalConfidence * 100).toFixed(2);
        const player2ConfidencePercent = (player2Confidence / totalConfidence * 100).toFixed(2);

        const isUnsure = Math.abs(player1Confidence - player2Confidence) < 0.001;
        const player1Higher = player1Confidence > player2Confidence;

        if (isUnsure) {
            resultText = 'AI UNSURE';
            rowClass = 'background: rgba(95, 102, 37, 1);';
            confidenceStyle = 'color: #00FFFF; opacity: 0.7;';
        } else if (result) {
            resultText = getFormattedResult(result);
            
            if (result.status === 'finished') {
                totalFinishedMatches++;
                totalPredictions++;
                const predictionCorrect = (player1Higher && result.winnerCode === 1) || (!player1Higher && result.winnerCode === 2);
                if (predictionCorrect) {
                    correctPredictions++;
                    rowClass = 'background: rgba(52, 247, 163, 0.3);';
                } else {
                    rowClass = 'background: rgba(255, 0, 0, 0.05);';
                }
            } else if (result.status === 'canceled') {
                rowClass = 'background: rgba(255, 255, 255, 0.05);';
            }
        }

        const matchTimeCET = convertToCET(prediction.match_timestamp);

        const row = `
            <tr style="${rowClass} transition: all 0.3s ease;">
                <td class="border-b border-[rgba(0,255,255,0.1)] px-6 py-4">
                    ${prediction.home_team_name} 
                    <span style="${isUnsure ? confidenceStyle : (player1Higher ? 'color: #00FFFF; text-shadow: 0 0 10px rgba(0,255,255,0.3);' : 'color: rgba(255,255,255,0.6);')}; font-weight: 500;">
                        (${player1ConfidencePercent}%)
                    </span>
                </td>
                <td class="border-b border-[rgba(0,255,255,0.1)] px-6 py-4">
                    ${prediction.away_team_name} 
                    <span style="${isUnsure ? confidenceStyle : (!player1Higher ? 'color: #00FFFF; text-shadow: 0 0 10px rgba(0,255,255,0.3);' : 'color: rgba(255,255,255,0.6);')}; font-weight: 500;">
                        (${player2ConfidencePercent}%)
                    </span>
                </td>
                <td class="border-b border-[rgba(0,255,255,0.1)] px-6 py-4">${prediction.match_date} ${matchTimeCET}</td>
                <td class="border-b border-[rgba(0,255,255,0.1)] px-6 py-4">${resultText}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    const accuracy = totalPredictions > 0 ? (correctPredictions / totalPredictions * 100).toFixed(2) : 0;
    updateSummary(predictions.length, totalFinishedMatches, correctPredictions, accuracy);
}

function updateSummary(total, finished, correct, accuracy) {
    document.getElementById('total-predictions').textContent = total;
    document.getElementById('finished-matches').textContent = finished;
    document.getElementById('correct-predictions').textContent = correct;
    document.getElementById('prediction-accuracy').textContent = `${accuracy}%`;
}

function formatDate(dateInput) {
    const date = new Date(dateInput);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function convertToCET(timestamp) {
    const date = new Date(timestamp * 1000);
    const cetTime = date.toLocaleString('pl-PL', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    return cetTime;
}

function handleSearch() {
    const dateInput = document.getElementById('match-date').value;
    if (!dateInput) {
        alert('Please select a date.');
        return;
    }
    const formattedDate = formatDate(dateInput);
    fetchPredictions(formattedDate);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', handleSearch);
    
    const today = new Date();
    const dateInput = document.getElementById('match-date');
    dateInput.value = formatDate(today);
    handleSearch();
});