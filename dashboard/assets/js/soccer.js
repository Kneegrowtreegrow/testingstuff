/**
 *  Logistics Dashboard
 */

'use strict';

(function() {
    let cardColor, headingColor, labelColor, shadeColor, grayColor;
    if (isDarkStyle) {
        cardColor = config.colors_dark.cardColor;
        labelColor = config.colors_dark.textMuted;
        headingColor = config.colors_dark.headingColor;
        shadeColor = 'dark';
        grayColor = '#5E6692'; // gray color is for stacked bar chart
    } else {
        cardColor = config.colors.cardColor;
        labelColor = config.colors.textMuted;
        headingColor = config.colors.headingColor;
        shadeColor = '';
        grayColor = '#817D8D';
    }

    // Chart Colors
    const chartColors = {
        donut: {
            series1: config.colors.success,
            series2: '#28c76fb3',
            series3: '#28c76f80',
            series4: config.colors_label.success
        },
        line: {
            series1: config.colors.warning,
            series2: config.colors.primary,
            series3: 'var(--primary)29'
        }
    };

    // Shipment statistics Chart
    // --------------------------------------------------------------------
    const shipmentEl = document.querySelector('#shipmentStatisticsChart'),
        shipmentConfig = {
            series: [{
                    name: 'Shipment',
                    type: 'column',
                    data: [38, 45, 33, 38, 32, 50, 48, 40, 42, 37]
                },
                {
                    name: 'Delivery',
                    type: 'line',
                    data: [23, 28, 23, 32, 28, 44, 32, 38, 26, 34]
                }
            ],
            chart: {
                height: 270,
                type: 'line',
                stacked: false,
                parentHeightOffset: 0,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            markers: {
                size: 4,
                colors: [config.colors.white],
                strokeColors: chartColors.line.series2,
                hover: {
                    size: 6
                },
                borderRadius: 4
            },
            stroke: {
                curve: 'smooth',
                width: [0, 3],
                lineCap: 'round'
            },
            legend: {
                show: true,
                position: 'bottom',
                markers: {
                    width: 8,
                    height: 8,
                    offsetX: -3
                },
                height: 40,
                offsetY: 10,
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                },
                fontSize: '15px',
                fontFamily: 'Public Sans',
                fontWeight: 400,
                labels: {
                    colors: headingColor,
                    useSeriesColors: false
                },
                offsetY: 10
            },
            grid: {
                strokeDashArray: 8
            },
            colors: [chartColors.line.series1, chartColors.line.series2],
            fill: {
                opacity: [1, 1]
            },
            plotOptions: {
                bar: {
                    columnWidth: '30%',
                    startingShape: 'rounded',
                    endingShape: 'rounded',
                    borderRadius: 4
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                tickAmount: 10,
                categories: ['1 Jan', '2 Jan', '3 Jan', '4 Jan', '5 Jan', '6 Jan', '7 Jan', '8 Jan', '9 Jan', '10 Jan'],
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '13px',
                        fontFamily: 'Public Sans',
                        fontWeight: 400
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                tickAmount: 4,
                min: 10,
                max: 50,
                labels: {
                    style: {
                        colors: labelColor,
                        fontSize: '13px',
                        fontFamily: 'Public Sans',
                        fontWeight: 400
                    },
                    formatter: function(val) {
                        return val + '%';
                    }
                }
            },
            responsive: [{
                    breakpoint: 1400,
                    options: {
                        chart: {
                            height: 270
                        },
                        xaxis: {
                            labels: {
                                style: {
                                    fontSize: '10px'
                                }
                            }
                        },
                        legend: {
                            itemMargin: {
                                vertical: 0,
                                horizontal: 10
                            },
                            fontSize: '13px',
                            offsetY: 12
                        }
                    }
                },
                {
                    breakpoint: 1399,
                    options: {
                        chart: {
                            height: 415
                        },
                        plotOptions: {
                            bar: {
                                columnWidth: '50%'
                            }
                        }
                    }
                },
                {
                    breakpoint: 982,
                    options: {
                        plotOptions: {
                            bar: {
                                columnWidth: '30%'
                            }
                        }
                    }
                },
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            height: 250
                        },
                        legend: {
                            offsetY: 7
                        }
                    }
                }
            ]
        };
    if (typeof shipmentEl !== undefined && shipmentEl !== null) {
        const shipment = new ApexCharts(shipmentEl, shipmentConfig);
        shipment.render();
    }

    // Reasons for delivery exceptions Chart
    // --------------------------------------------------------------------
    const deliveryExceptionsChartE1 = document.querySelector('#deliveryExceptionsChart'),
        deliveryExceptionsChartConfig = {
            chart: {
                height: 420,
                parentHeightOffset: 0,
                type: 'donut'
            },
            labels: ['Incorrect address', 'Weather conditions', 'Federal Holidays', 'Damage during transit'],
            series: [13, 25, 22, 40],
            colors: [
                chartColors.donut.series1,
                chartColors.donut.series2,
                chartColors.donut.series3,
                chartColors.donut.series4
            ],
            stroke: {
                width: 0
            },
            dataLabels: {
                enabled: false,
                formatter: function(val, opt) {
                    return parseInt(val) + '%';
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                offsetY: 10,
                markers: {
                    width: 8,
                    height: 8,
                    offsetX: -3
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 5
                },
                fontSize: '13px',
                fontFamily: 'Public Sans',
                fontWeight: 400,
                labels: {
                    colors: headingColor,
                    useSeriesColors: false
                }
            },
            tooltip: {
                theme: false
            },
            grid: {
                padding: {
                    top: 15
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '77%',
                        labels: {
                            show: true,
                            value: {
                                fontSize: '26px',
                                fontFamily: 'Public Sans',
                                color: headingColor,
                                fontWeight: 500,
                                offsetY: -30,
                                formatter: function(val) {
                                    return parseInt(val) + '%';
                                }
                            },
                            name: {
                                offsetY: 20,
                                fontFamily: 'Public Sans'
                            },
                            total: {
                                show: true,
                                fontSize: '.75rem',
                                label: 'AVG. Exceptions',
                                color: labelColor,
                                formatter: function(w) {
                                    return '30%';
                                }
                            }
                        }
                    }
                }
            },
            responsive: [{
                breakpoint: 420,
                options: {
                    chart: {
                        height: 360
                    }
                }
            }]
        };
    if (typeof deliveryExceptionsChartE1 !== undefined && deliveryExceptionsChartE1 !== null) {
        const deliveryExceptionsChart = new ApexCharts(deliveryExceptionsChartE1, deliveryExceptionsChartConfig);
        deliveryExceptionsChart.render();
    }
})();

// DataTable (jquery)
// --------------------------------------------------------------------
$(function() {
    // Variable declaration for table
    var dt_dashboard_table = $('.dt-route-vehicles');

    // On route vehicles DataTable
    if (dt_dashboard_table.length) {
        var dt_dashboard = dt_dashboard_table.DataTable({
            ajax: assetsPath + 'json/logistics-dashboard.json',
            columns: [
                { data: 'id' },
                { data: 'id' },
                { data: 'location' },
                { data: 'start_city' },
                { data: 'end_city' },
                { data: 'warnings' },
                { data: 'progress' }
            ],
            columnDefs: [{
                    // For Responsive
                    className: 'control',
                    orderable: false,
                    searchable: false,
                    responsivePriority: 2,
                    targets: 0,
                    render: function(data, type, full, meta) {
                        return '';
                    }
                },
                {
                    // For Checkboxes
                    targets: 1,
                    orderable: false,
                    searchable: false,
                    checkboxes: true,
                    responsivePriority: 3,
                    render: function() {
                        return '<input type="checkbox" class="dt-checkboxes form-check-input">';
                    },
                    checkboxes: {
                        selectAllRender: '<input type="checkbox" class="form-check-input">'
                    }
                },
                {
                    // Icon and location
                    targets: 2,
                    responsivePriority: 1,
                    render: function(data, type, full, meta) {
                        var $location = full['location'];
                        // Creates full output for row
                        var $row_output =
                            '<div class="d-flex justify-content-start align-items-center user-name">' +
                            '<div class="avatar-wrapper">' +
                            '<div class="avatar me-2">' +
                            '<span class="avatar-initial rounded-circle bg-label-secondary text-body"><i class="ti ti-truck"></i></span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="d-flex flex-column">' +
                            '<a class="text-body fw-medium" href="app-logistics-fleet.html">VOL-' +
                            $location +
                            '</a>' +
                            '</div>' +
                            '</div>';
                        return $row_output;
                    }
                },
                {
                    // starting route
                    targets: 3,
                    render: function(data, type, full, meta) {
                        var $start_city = full['start_city'],
                            $start_country = full['start_country'];
                        var $row_output = '<div class="text-body">' + $start_city + ', ' + $start_country + '</div >';
                        return $row_output;
                    }
                },
                {
                    // ending route
                    targets: 4,
                    render: function(data, type, full, meta) {
                        var $end_city = full['end_city'],
                            $end_country = full['end_country'];
                        var $row_output = '<div class="text-body">' + $end_city + ', ' + $end_country + '</div >';
                        return $row_output;
                    }
                },
                {
                    // warnings
                    targets: -2,
                    render: function(data, type, full, meta) {
                        var $status_number = full['warnings'];
                        var $status = {
                            1: { title: 'No Warnings', class: 'bg-label-success' },
                            2: {
                                title: 'Temperature Not Optimal',
                                class: 'bg-label-warning'
                            },
                            3: { title: 'Ecu Not Responding', class: 'bg-label-danger' },
                            4: { title: 'Oil Leakage', class: 'bg-label-info' },
                            5: { title: 'fuel problems', class: 'bg-label-primary' }
                        };
                        if (typeof $status[$status_number] === 'undefined') {
                            return data;
                        }
                        return (
                            '<span class="badge rounded ' +
                            $status[$status_number].class +
                            '">' +
                            $status[$status_number].title +
                            '</span>'
                        );
                    }
                },
                {
                    // progress
                    targets: -1,
                    render: function(data, type, full, meta) {
                        var $progress = full['progress'];
                        var $progress_output =
                            '<div class="d-flex align-items-center">' +
                            '<div div class="progress w-100" style="height: 8px;">' +
                            '<div class="progress-bar" role="progressbar" style="width:' +
                            $progress +
                            '%;" aria-valuenow="' +
                            $progress +
                            '" aria-valuemin="0" aria-valuemax="100"></div>' +
                            '</div>' +
                            '<div class="text-body ms-3">' +
                            $progress +
                            '%</div>' +
                            '</div>';
                        return $progress_output;
                    }
                }
            ],
            order: [2, 'asc'],
            dom: '<"table-responsive"t><"row d-flex align-items-center"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
            displayLength: 5,
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function(row) {
                            var data = row.data();
                            return 'Details of ' + data['location'];
                        }
                    }),
                    type: 'column',
                    renderer: function(api, rowIdx, columns) {
                        var data = $.map(columns, function(col, i) {
                            return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                                ?
                                '<tr data-dt-row="' +
                                col.rowIndex +
                                '" data-dt-column="' +
                                col.columnIndex +
                                '">' +
                                '<td>' +
                                col.title +
                                ':' +
                                '</td> ' +
                                '<td>' +
                                col.data +
                                '</td>' +
                                '</tr>' :
                                '';
                        }).join('');

                        return data ? $('<table class="table"/><tbody />').append(data) : false;
                    }
                }
            }
        });
        $('.dataTables_info').addClass('pt-0');
    }
});
var predictions

function getsoccerScores() {
    fetch("https://script.google.com/macros/s/AKfycbzPm0Ltc_f819-tpFjfOLEAonEdeEKgppt0XtLNmT1YZkPDKNe0F-rgRH9LyX6c6JWbqQ/exec")
        .then(response => response.text())
        .then(result => displayScores(JSON.parse(result)))
        .catch(error => console.log('error', error));


}

function displayScores(data) {
    const scoresContainer = document.getElementById('scores-container');
    scoresContainer.innerHTML = '';
    for (var i in data.events) {
        const game = data.events[i];
        var winText = '';
        var loseText = '';
        
        // Only process games that are in predictions
        if(predictions.includes(game.homeTeam.name)) {
            console.log("Game needed", game.homeTeam.name);
            
            var color = game.status.description === "Ended" ? 'success' : 'danger';
            
            const cardTemplate = `
                <div class="scoreboard-item card h-100">
                    <div class="card-body" style="padding-top:5px">
                        <!-- Row 1 -->
                        <div class="row mt-4 align-items-center">
                            <div class="col-6 d-flex justify-content-start">
                                <span style="width:40px;height: 40px;"><img src="../../assets/img/soccer-logos/${game.awayTeam.slug}.png" width="40px" height="40px"></span>
                                <span class="team-name">${game.awayTeam.name}</span>
                                <span class="score">${game.awayScore.current}</span>
                                ${winText ? `<span class="prediction-text">${winText}</span>` : ''}
                            </div>
                            <div class="col-6 justify-content-end text-align-right" style="position:absolute;right:-10%;top:25%">
                                <span class="quarter badge bg-${color}">${game.status.description}</span><br>
                                <small class="total">Total: </small><br>
                                <span class="total-score">${game.awayScore.current + game.homeScore.current}</span>
                            </div>
                        </div>
                        <div style="position: absolute;width:70%;left:0px;height:60%; border-right:2px solid #474E72;top:20%">
                        </div>
                        <!-- Row 2 -->
                        <div class="row mt-2 align-items-center">
                            <div class="col-6 d-flex justify-content-start">
                                <span style="width:40px;height: 40px;"><img src="../../assets/img/soccer-logos/${game.homeTeam.slug}.png" width="40px" height="40px"></span>
                                <span class="team-name">${game.homeTeam.name}</span>
                                <span class="score">${game.homeScore.current}</span>
                                ${loseText ? `<span class="prediction-text">${loseText}</span>` : ''}
                            </div>
                        </div>
                    </div>
                </div>`;
            scoresContainer.innerHTML += cardTemplate;  // This is now inside the if block
        } else {
            console.log("game not needed");
        }
    }
}

// Fetch and display scores initially
getsoccerScores();

// Poll the API every minute to get the latest scores
setInterval(getsoccerScores, 20000);

setInterval(function() {
    $(".card-title-od").css("background", "-webkit-linear-gradient(left, #FFE872, #00FFFF)");
    $(".card-title-od").css("-webkit-background-clip", "text");
    $(".card-title-od").css("-webkit-text-fill-color", "transparent");
    $("#scoreboard-spinner").css("display", "inline-block");
}, 20000);

setInterval(function() {
    $(".card-title-od").css("background", "white");
    $(".card-title-od").css("-webkit-background-clip", "text");
    $(".card-title-od").css("-webkit-text-fill-color", "transparent");
    $(".card-title-od").css("color", "white");
    $("#scoreboard-spinner").css("display", "none");
}, 21200);


  const currentDate = new Date();
  const options = { timeZone: 'America/New_York' };
  const [month, day, year] = currentDate
    .toLocaleDateString('en-US', options)
    .split('/')
    .map((part) => part.padStart(2, '0'));
  const formattedDate = `${year}-${month}-${day}`;


document.addEventListener('sbAPILoaded', function() {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sbApiAuthToken.access_token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`https://cdn.overdogbets.com/predictions/soccer/${formattedDate}.json`, requestOptions)
        .then(response => response.text())
        .then(result => {
            predictions = JSON.stringify(result)
            buildPredictions(JSON.parse(result))
            
        })
        .catch(error => console.log('error', error));

})

function getPremium() {
    // Handle the logic for upgrading to premium
    openPaymentModal()
    //console.log('User clicked Get Premium');
}



const buildPredictions = (predictions) => {
  const aiContainer = document.getElementById('picks');
  aiContainer.innerHTML = '';

  // Check if predictions is a valid array
  if (!Array.isArray(predictions.data)) {
    console.error('Invalid predictions data:', predictions);
    return;
  }

  for (const game of predictions.data) {
    if (!game.is_expired) {
      // Determine winning prediction text based on prediction type
      let predictionText;
      switch(game.prediction) {
        case "1":
          predictionText = `${game.home_team} To Win`;
          break;
        case "2":
          predictionText = `${game.away_team} To Win`;
          break;
        case "12":
          predictionText = "Either Team To Win (No Draw)";
          break;
        case "1X":
          predictionText = `${game.home_team} Win or Draw`;
          break;
        case "X2":
          predictionText = `${game.away_team} Win or Draw`;
          break;
        default:
          predictionText = "Prediction Unavailable";
      }

      const cardTemplate = `
        <div class="col-lg-3 col-sm-6 mb-4 ai-pick">
          <div class="card h-100">
            <div class="card-header">
              <center>
                <h4 class="card-title mb-1">${predictionText}</h4>
              </center>
              <br>
              <center class="text-success">
                <small></small>
              </center>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <div class="d-flex align-items-center mb-2">
                    
                    <p class="team-name1 mb-0 team-away">${game.away_team}</p>
                  </div>
                </div>
                <div class="col-4">
                  <div class="divider divider-vertical">
                    <div class="divider-text">VS</div>
                  </div>
                </div>
                <div class="col-4 text-end">
                  <div class="d-flex justify-content-end align-items-center mb-2">
                    <p class="team-name1 mb-0 team-home">${game.home_team}</p>
                  </div>
                </div>
              </div>
              <center><small>Game Time: ${new Date(game.start_date).toLocaleTimeString()}</small></center>
              <center><small>Odds: ${game.odds[game.prediction]}</small></center>
            </div>
          </div>
        </div>
      `;

      aiContainer.innerHTML += cardTemplate;
    }
  }
};







/*function buildParlays(data) {
    const numGames = data.length;
    const parlays = [];

    // Iterate through games for the first leg
    for (let i = 0; i < numGames - 2; i++) {
        // Iterate through games for the second leg
        for (let j = i + 1; j < numGames - 1; j++) {
            // Iterate through games for the third leg
            for (let k = j + 1; k < numGames; k++) {
                // Build the parlay array and push it to the parlays array
                parlays.push([data[i], data[j], data[k]]);
            }
        }
    }

    //console.log(parlays);
    buildUI(parlays)
}


function buildUI(parlays) {
    //console.log(parlays)
    var cardsHTML = "";
    var winners = []
    var losers = []

    for (parlayIndex in parlays) {
        var parlay = parlays[parlayIndex];
        var isLoser = false;

        for (gameIndex in parlay) {
            var gameData = parlay[gameIndex];
            if (gameData.away_team.includes('Hornets') || gameData.away_team.includes('Bucks') || gameData.away_team.includes('Raptors') || gameData.away_team.includes('Hawks')) {
                isLoser = true;
                break; // If any game includes one of the specified teams, mark the entire parlay as a loser
            }
        }

        if (isLoser) {
            //console.log("found a loser")
            losers.push(parlay);
        } else {
            winners.push(parlay);
        }

        var parlayCard = "";
        //console.log(parlay)
        for (gameIndex in parlay) {
            var gameData = parlay[gameIndex];
            var total1 = gameData.total
            if (gameData.under_over === "UNDER") {
                total1 = total1 += 5
            } else if (gameData.under_over === "OVER") {
                total1 = total1 -= 5
            }
            parlayCard = parlayCard + `
                <div class="card-body">
                    <h3 id="${gameData.home_team}-stats">${gameData.under_over} ${total1}</h3>
                    <p style="display:inline; color:${gameData.expected_value_colors.home_color} !important">${gameData.away_team}</p> <p style="display:inline;">vs</p> <p style="display:inline; color:${gameData.expected_value_colors.away_color} !important">${gameData.home_team}</p>
                    <br>
                </div>
            `;
        }

        cardsHTML = cardsHTML + `
        <div class="swiper-slide">  
            <div class="pd4">
                ${parlayCard}
            </div>
        </div>
            <br>
            <br>
        `;
    }
    // Initialize Swiper
    const swiper = new Swiper('#cards-wrapper', {
        slidesPerView: 'auto',
        freeMode: true,
        spaceBetween: 16,
        touchRatio: 1,
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
    });


    var cards = document.getElementById("cards");
    cards.innerHTML = cards.innerHTML + cardsHTML;
    //console.log("winners", winners)
    //console.log("losers", losers)
}
*/


//props

function getsoccerProps() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sbApiAuthToken.access_token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`https://cdn.overdogbets.com/predictions/soccer_props/${formattedDate}.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => processProps(result))
        .catch((error) => console.error(error));
}


function processProps(props) {
    console.log(props)

    const propsContainer = document.getElementById('props-picks');
    propsContainer.innerHTML = '';
    for (var i in props) {
        if (!props[i].predictions) {
            //skip
        } else {
            const cardTemplate = `
        <div class="col-lg-3 col-sm-6 mb-4 ai-pick">
          <div class="card h-100">
              <div class="card-header">
                  <center>
                      <a style="color:white" href="./soccer-player.html?player=${props[i].PLAYER}"><h4 class="card-title mb-1" style="font-family: 'OVERDOG';color:white !important">${props[i].PLAYER}</a></h4>
              </center>
              <br>
              <center class="text-success"><small id="bulls-status">${props[i].POSITION}</small></center>
          </div>
          <div class="card-body">
              <div class="row">
                  <div class="col-4"> 
                  </div>
                  <div class="col-4">
                      <div class="divider divider-vertical">
                          <div class="divider-text" style="border-radius:50%">
                              <img width="40px" height="35px"  src="https://cdn.soccer.com/headshots/soccer/latest/1040x760/${props[i].PLAYER_ID}.png">
                          </div>
                      </div>
                  </div>
              <center><small>Predictions:</small></center><br><br>
                    <center>
                        <div class="d-flex justify-content-center">
                            <div class="table-responsive">
                                <table class="table table-bordered ">
                                    <thead>
                                        <tr>
                                            <th scope="col">PTS</th>
                                            <th scope="col">AST</th>
                                            <th scope="col">REB</th>
                                            <th scope="col">BLK</th>
                                            <th scope="col">STL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td id="PTS">${Math.round(props[i].predictions.PTS)}</td>
                                            <td id="AST">${Math.round(props[i].predictions.AST)}</td>
                                            <td id="REB">${Math.round(props[i].predictions.REB)}</td>
                                            <td id="BLK">${Math.round(props[i].predictions.BLK)}</td>
                                            <td id="STL">${Math.round(props[i].predictions.STL)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                </center>
            </div>
        </div>
    </div>
    `;

            propsContainer.innerHTML += cardTemplate;
        }
    }
}

// Standings

fetch("https://script.google.com/macros/s/AKfycbwqSG72JzR_XQjP6aJxDE5prRaZ0pXCCtjX4Z_BjHSKMWYvVODVxW7z8ZyAm6iytIlN/exec")
    .then(response => response.text())
    .then(text => {
        // Create a DOMParser object
        const parser = new DOMParser();
        // Parse the plain text response as HTML
        const htmlDoc = parser.parseFromString(text, 'text/html');
        // Now you can work with the HTML document as you normally would
        var tables = htmlDoc.getElementsByTagName('table')
        //document.getElementById('eastern-standings').append(tables[0])

        extractEasternData(tables[0], western)
        extractWesternData(tables[1], eastern)
    })
    .catch(error => console.error('Error:', error));

var eastern = []
var western = []

function extractEasternData(table_html, conference) {
    const tableRows = table_html.querySelectorAll('.bsp_row_item');

    const data = [];

    tableRows.forEach((row) => {
        const columns = row.children;
        const team = columns[0].textContent.trim();
        const wL = columns[2].textContent.trim();
        const pct = columns[3].textContent.trim();
        const gb = columns[4].textContent.trim();
        const conf = columns[5].textContent.trim();
        const div = columns[6].textContent.trim();
        const strk = columns[7].textContent.trim();

        data.push({
            Team: team.replace(/^(\d+)(?:([A-Z][a-z]+))$/, '$1. $2'),
            'W-L': wL,
            PCT: pct,
            GB: gb,
            CONF: conf,
            DIV: div,
            STRK: strk,
        });
    });
    conference = data


    buildEasternTable(conference)

}

function buildEasternTable(eastern) {
    var template
    console.log('pussy')
    for (var i in eastern) {
        if (eastern[i].Team.includes('76ers')) {
            eastern[i].Team = eastern[i].Team.replace("76ers", ". 76ers")
        }
        var template = `
                    <td>${eastern[i].Team}</td>
                    <td class="" style="">${eastern[i]['W-L']}</td>
                    <td class="" style="">${eastern[i].PCT}</td>
                    <td style="">${eastern[i].GB}</td>
                    <td style="">${eastern[i].CONF}</td>
                    <td style="">${eastern[i].DIV}</td>
                    <td>${eastern[i].STRK}</td>`
        const row = document.createElement('tr');
        row.innerHTML = template;
        document.getElementById('eastern-standings').append(row);
    }
}

function extractWesternData(table_html, conference) {
    const tableRows = table_html.querySelectorAll('.bsp_row_item');

    const data = [];

    tableRows.forEach((row) => {
        const columns = row.children;
        const team = columns[0].textContent.trim();
        const wL = columns[2].textContent.trim();
        const pct = columns[3].textContent.trim();
        const gb = columns[4].textContent.trim();
        const conf = columns[5].textContent.trim();
        const div = columns[6].textContent.trim();
        const strk = columns[7].textContent.trim();

        data.push({
            Team: team.replace(/^(\d+)(?:([A-Z][a-z]+))$/, '$1. $2'),
            'W-L': wL,
            PCT: pct,
            GB: gb,
            CONF: conf,
            DIV: div,
            STRK: strk,
        });
    });
    conference = data

    buildWesternTable(conference)

}

function buildWesternTable(eastern) {
    var template
    console.log('pussy')
    for (var i in eastern) {
        var template = `
                    <td>${eastern[i].Team}</td>
                    <td class="" style="">${eastern[i]['W-L']}</td>
                    <td class="" style="">${eastern[i].PCT}</td>
                    <td style="">${eastern[i].GB}</td>
                    <td style="">${eastern[i].CONF}</td>
                    <td style="">${eastern[i].DIV}</td>
                    <td>${eastern[i].STRK}</td>`
        const row = document.createElement('tr');
        row.innerHTML = template;
        document.getElementById('western-standings').append(row);
    }
}