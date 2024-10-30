const predictionApiUrl = 'https://football-prediction-api.p.rapidapi.com/api/v2/predictions';
const predictionApiKey = '0df5571241msh4947c659e860c83p1510d5jsn9dcba6925c46';
const sofascoreApiUrl = 'https://www.sofascore.com/api/v1/sport/football/scheduled-events/';

let matchedPredictions = [];

document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('datePicker');
    const fetchButton = document.getElementById('fetchButton');
    const tableFilter = document.getElementById('tableFilter');

    // Set the default date to today
    const today = new Date().toISOString().split('T')[0];
    datePicker.value = today;

    fetchButton.addEventListener('click', () => {
        fetchData(datePicker.value);
    });

    tableFilter.addEventListener('input', filterTable);

    // Initial data fetch
    fetchData(today);
});

async function fetchData(date) {
    console.log(`Fetching new data for ${date}...`);
    try {
        document.getElementById('loading').style.display = 'block';
        document.getElementById('error').style.display = 'none';

        // Fetch predictions
        const predictionResponse = await fetch(`${predictionApiUrl}?market=classic&iso_date=${date}&federation=UEFA`, {
            headers: {
                'X-RapidAPI-Key': predictionApiKey,
                'X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
            }
        });
        const predictionData = await predictionResponse.json();
        let predictions = [];
        if (predictionData && Array.isArray(predictionData.data)) {
            predictions = predictionData.data;
            console.log("Predictions:", predictions);
        } else {
            console.error("Unexpected prediction data format:", predictionData);
        }

        // Fetch results
        const resultResponse = await fetch(`${sofascoreApiUrl}${date}`);
        const resultData = await resultResponse.json();
        let results = [];
        if (resultData && Array.isArray(resultData.events)) {
            results = resultData.events;
            console.log("Results:", results);
        } else {
            console.error("Unexpected result data format:", resultData);
        }

        // Match predictions with results
        matchedPredictions = matchPredictionsWithResults(predictions, results);

        displayPredictionsAndResults();
        updateAccuracyAndStats();

        document.getElementById('loading').style.display = 'none';
    } catch (err) {
        console.error("Fetch error:", err);
        document.getElementById('error').textContent = 'Failed to fetch data: ' + err.message;
        document.getElementById('error').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
        matchedPredictions = [];
    }
}

function matchPredictionsWithResults(predictions, results) {
    return predictions.map(prediction => {
        const result = findMatchingResult(prediction.home_team, prediction.away_team, results);
        if (result) {
            return { ...prediction, result };
        }
        return null;
    }).filter(Boolean); // Remove null entries
}

function normalizeTeamName(name) {
    return name.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace(/enisey/g, 'yenisey')
        .replace(/krasnoyarsk/g, '')
        .replace(/yekaterinburg/g, '')
        .replace(/sverdlovskaya/g, '')
        .replace(/oblast/g, '')
        .replace(/fc/g, '')
        .replace(/fk/g, '')
        .replace(/nk/g, '')
        .replace(/kalcer/g, '')
        .replace(/^\d+/, '');
}

function findMatchingResult(homeTeam, awayTeam, results) {
    const normalizedHomeTeam = normalizeTeamName(homeTeam);
    const normalizedAwayTeam = normalizeTeamName(awayTeam);
    
    return results.find(r => {
        const resultHomeTeam = normalizeTeamName(r.homeTeam.name);
        const resultAwayTeam = normalizeTeamName(r.awayTeam.name);
        
        return (resultHomeTeam.includes(normalizedHomeTeam) || normalizedHomeTeam.includes(resultHomeTeam)) &&
               (resultAwayTeam.includes(normalizedAwayTeam) || normalizedAwayTeam.includes(resultAwayTeam));
    });
}

function displayPredictionsAndResults() {
    const tbody = document.getElementById('predictionsResultsBody');
    tbody.innerHTML = '';
    if (matchedPredictions.length === 0) {
        const row = tbody.insertRow();
        row.innerHTML = '<td colspan="5" class="px-4 py-2 text-center text-gray-400">No matched predictions available</td>';
        return;
    }
    matchedPredictions.forEach(({ home_team, away_team, prediction, result }) => {
        const resultText = getResultText(result);
        const predictionHit = getPredictionHit(prediction, result);
        
        const row = tbody.insertRow();
        row.innerHTML = `
            <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-300">${home_team || 'N/A'}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-400">${away_team || 'N/A'}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-400">${getPredictionText(prediction)}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-400">${resultText}</td>
            <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-400">${predictionHit}</td>
        `;
    });
}

function getResultText(result) {
    if (result.status.type === 'finished' || result.status.code === 100) {
        return `${result.homeScore.current} - ${result.awayScore.current}`;
    }
    return result.status.description || 'Pending';
}

function updateAccuracyAndStats() {
    let correct = 0;
    const total = matchedPredictions.length;

    matchedPredictions.forEach(({ prediction, result }) => {
        if (isPredictionCorrect(prediction, result)) {
            correct++;
        }
    });

    const accuracy = total > 0 ? (correct / total * 100).toFixed(2) : 'N/A';
    document.getElementById('accuracyValue').textContent = `${accuracy}%`;
    document.getElementById('totalPredictions').textContent = total;
    document.getElementById('correctPredictions').textContent = correct;
}

function getPredictionText(prediction) {
    switch(prediction) {
        case '1': return 'Home Win';
        case 'X': return 'Draw';
        case '2': return 'Away Win';
        case '12': return 'Home or Away Win';
        case '1X': return 'Home Win or Draw';
        case 'X2': return 'Away Win or Draw';
        default: return prediction;
    }
}

function getPredictionHit(prediction, result) {
    if (result.status.type !== 'finished' && result.status.code !== 100) {
        return 'Pending';
    }
    return isPredictionCorrect(prediction, result) ? '✅' : '❌';
}

function isPredictionCorrect(prediction, result) {
    const homeScore = result.homeScore.current;
    const awayScore = result.awayScore.current;
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

function filterTable() {
    const filter = document.getElementById('tableFilter').value.toLowerCase();
    const tbody = document.getElementById('predictionsResultsBody');
    const rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const homeTeam = rows[i].getElementsByTagName('td')[0];
        const awayTeam = rows[i].getElementsByTagName('td')[1];
        if (homeTeam && awayTeam) {
            const homeTeamText = homeTeam.textContent || homeTeam.innerText;
            const awayTeamText = awayTeam.textContent || awayTeam.innerText;
            if (homeTeamText.toLowerCase().indexOf(filter) > -1 || awayTeamText.toLowerCase().indexOf(filter) > -1) {
                rows[i].style.display = "";
            } else {
                rows[i].style.display = "none";
            }
        }
    }
}

function setupDataRefresh() {
    console.log("Setting up data refresh...");
    setInterval(() => {
        console.log("Refreshing data...");
        const datePicker = document.getElementById('datePicker');
        fetchData(datePicker.value);
    }, 60000); // Refresh every 1 minute for testing
}

// Set up periodic data refresh
setupDataRefresh();