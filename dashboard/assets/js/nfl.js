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

var players = {
  "Isaiah Adams": {
    "PlayerID": "5084939",
    "TeamID": "22"
  },
  "Kelvin Beachum": {
    "PlayerID": "15035",
    "TeamID": "22"
  },
  "Trey Benson": {
    "PlayerID": "4429275",
    "TeamID": "22"
  },
  "Evan Brown": {
    "PlayerID": "3128412",
    "TeamID": "22"
  },
  "Trystan Colon": {
    "PlayerID": "4035112",
    "TeamID": "22"
  },
  "James Conner": {
    "PlayerID": "3045147",
    "TeamID": "22"
  },
  "DeeJay Dallas": {
    "PlayerID": "4240631",
    "TeamID": "22"
  },
  "Emari Demercado": {
    "PlayerID": "4362478",
    "TeamID": "22"
  },
  "Greg Dortch": {
    "PlayerID": "4037235",
    "TeamID": "22"
  },
  "Hjalte Froholdt": {
    "PlayerID": "3886633",
    "TeamID": "22"
  },
  "Jon Gaines II": {
    "PlayerID": "4367199",
    "TeamID": "22"
  },
  "Marvin Harrison Jr.": {
    "PlayerID": "4432708",
    "TeamID": "22"
  },
  "Charlie Heck": {
    "PlayerID": "3895840",
    "TeamID": "22"
  },
  "Will Hernandez": {
    "PlayerID": "3042516",
    "TeamID": "22"
  },
  "Elijah Higgins": {
    "PlayerID": "4426844",
    "TeamID": "22"
  },
  "Paris Johnson Jr.": {
    "PlayerID": "4428991",
    "TeamID": "22"
  },
  "Zay Jones": {
    "PlayerID": "3059722",
    "TeamID": "22"
  },
  "Trey McBride": {
    "PlayerID": "4361307",
    "TeamID": "22"
  },
  "Chris Moore": {
    "PlayerID": "2576581",
    "TeamID": "22"
  },
  "Kyler Murray": {
    "PlayerID": "3917315",
    "TeamID": "22"
  },
  "Zach Pascal": {
    "PlayerID": "2978109",
    "TeamID": "22"
  },
  "Tip Reiman": {
    "PlayerID": "4696700",
    "TeamID": "22"
  },
  "Clayton Tune": {
    "PlayerID": "4360175",
    "TeamID": "22"
  },
  "Travis Vokolek": {
    "PlayerID": "4259324",
    "TeamID": "22"
  },
  "Xavier Weaver": {
    "PlayerID": "4428811",
    "TeamID": "22"
  },
  "Michael Wilson": {
    "PlayerID": "4360761",
    "TeamID": "22"
  },
  "Budda Baker": {
    "PlayerID": "3127287",
    "TeamID": "22"
  },
  "Krys Barnes": {
    "PlayerID": "4035817",
    "TeamID": "22"
  },
  "Joey Blount": {
    "PlayerID": "4240824",
    "TeamID": "22"
  },
  "Kei'Trel Clark": {
    "PlayerID": "4426923",
    "TeamID": "22"
  },
  "L.J. Collier": {
    "PlayerID": "3116449",
    "TeamID": "22"
  },
  "Zaven Collins": {
    "PlayerID": "4244606",
    "TeamID": "22"
  },
  "Victor Dimukeje": {
    "PlayerID": "4240464",
    "TeamID": "22"
  },
  "Dennis Gardeck": {
    "PlayerID": "4334300",
    "TeamID": "22"
  },
  "Darren Hall": {
    "PlayerID": "4261606",
    "TeamID": "22"
  },
  "Naquan Jones": {
    "PlayerID": "4046716",
    "TeamID": "22"
  },
  "Roy Lopez": {
    "PlayerID": "4040805",
    "TeamID": "22"
  },
  "Jesse Luketa": {
    "PlayerID": "4361419",
    "TeamID": "22"
  },
  "Max Melton": {
    "PlayerID": "4698113",
    "TeamID": "22"
  },
  "Sean Murphy-Bunting": {
    "PlayerID": "3932886",
    "TeamID": "22"
  },
  "Bilal Nichols": {
    "PlayerID": "3117922",
    "TeamID": "22"
  },
  "Julian Okwara": {
    "PlayerID": "4046690",
    "TeamID": "22"
  },
  "Owen Pappoe": {
    "PlayerID": "4567219",
    "TeamID": "22"
  },
  "Dante Stills": {
    "PlayerID": "4362225",
    "TeamID": "22"
  },
  "Dadrion Taylor-Demerson": {
    "PlayerID": "4428633",
    "TeamID": "22"
  },
  "Xavier Thomas": {
    "PlayerID": "4360304",
    "TeamID": "22"
  },
  "Starling Thomas V": {
    "PlayerID": "4363408",
    "TeamID": "22"
  },
  "Jalen Thompson": {
    "PlayerID": "4043089",
    "TeamID": "22"
  },
  "Khyiris Tonga": {
    "PlayerID": "4256074",
    "TeamID": "22"
  },
  "Kyzir White": {
    "PlayerID": "4039254",
    "TeamID": "22"
  },
  "Garrett Williams": {
    "PlayerID": "4568506",
    "TeamID": "22"
  },
  "Mack Wilson Sr.": {
    "PlayerID": "4040983",
    "TeamID": "22"
  },
  "Aaron Brewer": {
    "PlayerID": "4040537",
    "TeamID": "15"
  },
  "Blake Gillikin": {
    "PlayerID": "4045180",
    "TeamID": "22"
  },
  "Matt Prater": {
    "PlayerID": "11122",
    "TeamID": "22"
  },
  "Chad Ryland": {
    "PlayerID": "4363538",
    "TeamID": "22"
  },
  "Christian Jones": {
    "PlayerID": "4362103",
    "TeamID": "22"
  },
  "Elijah Jones": {
    "PlayerID": "4360203",
    "TeamID": "22"
  },
  "Justin Jones": {
    "PlayerID": "3116746",
    "TeamID": "22"
  },
  "Carter O'Donnell": {
    "PlayerID": "4611135",
    "TeamID": "22"
  },
  "BJ Ojulari": {
    "PlayerID": "4429111",
    "TeamID": "22"
  },
  "Darius Robinson": {
    "PlayerID": "4569480",
    "TeamID": "22"
  },
  "Jonah Williams": {
    "PlayerID": "4032481",
    "TeamID": "14"
  },
  "Andre Baccellia": {
    "PlayerID": "3886809",
    "TeamID": "22"
  },
  "Markus Bailey": {
    "PlayerID": "3917992",
    "TeamID": "22"
  },
  "Jackson Barton": {
    "PlayerID": "3122865",
    "TeamID": "22"
  },
  "Angelo Blackson": {
    "PlayerID": "2574582",
    "TeamID": "22"
  },
  "Michael Carter": {
    "PlayerID": "4240657",
    "TeamID": "22"
  },
  "Dan Chisena": {
    "PlayerID": "3929637",
    "TeamID": "22"
  },
  "Jaden Davis": {
    "PlayerID": "4426435",
    "TeamID": "22"
  },
  "Keith Ismael": {
    "PlayerID": "4036831",
    "TeamID": "22"
  },
  "Jordan Murray": {
    "PlayerID": "4368172",
    "TeamID": "22"
  },
  "PJ Mustipher": {
    "PlayerID": "4361421",
    "TeamID": "22"
  },
  "Tejhaun Palmer": {
    "PlayerID": "4875912",
    "TeamID": "22"
  },
  "Desmond Ridder": {
    "PlayerID": "4239086",
    "TeamID": "22"
  },
  "Bernhard Seikovits": {
    "PlayerID": "4832523",
    "TeamID": "22"
  },
  "Ben Stille": {
    "PlayerID": "4034861",
    "TeamID": "22"
  },
  "Jason Taylor II": {
    "PlayerID": "4361835",
    "TeamID": "22"
  },
  "Luke Tenuta": {
    "PlayerID": "4361979",
    "TeamID": "22"
  },
  "Divaad Wilson": {
    "PlayerID": "4361779",
    "TeamID": "22"
  },
  "Tyler Allgeier": {
    "PlayerID": "4373626",
    "TeamID": "1"
  },
  "Matthew Bergeron": {
    "PlayerID": "4568510",
    "TeamID": "1"
  },
  "Kirk Cousins": {
    "PlayerID": "14880",
    "TeamID": "1"
  },
  "Ross Dwelley": {
    "PlayerID": "3120303",
    "TeamID": "1"
  },
  "Jovaughn Gwyn": {
    "PlayerID": "4362845",
    "TeamID": "1"
  },
  "Kyle Hinton": {
    "PlayerID": "4682831",
    "TeamID": "1"
  },
  "KhaDarel Hodge": {
    "PlayerID": "3047876",
    "TeamID": "1"
  },
  "Chris Lindstrom": {
    "PlayerID": "3672833",
    "TeamID": "1"
  },
  "Drake London": {
    "PlayerID": "4426502",
    "TeamID": "1"
  },
  "Jake Matthews": {
    "PlayerID": "16713",
    "TeamID": "1"
  },
  "Jase McClellan": {
    "PlayerID": "4429001",
    "TeamID": "1"
  },
  "Ray-Ray McCloud III": {
    "PlayerID": "3728262",
    "TeamID": "1"
  },
  "Kaleb McGary": {
    "PlayerID": "3127304",
    "TeamID": "1"
  },
  "Darnell Mooney": {
    "PlayerID": "4040655",
    "TeamID": "1"
  },
  "Ryan Neuzil": {
    "PlayerID": "4036444",
    "TeamID": "1"
  },
  "Storm Norton": {
    "PlayerID": "2973014",
    "TeamID": "1"
  },
  "Brandon Parker": {
    "PlayerID": "3072292",
    "TeamID": "1"
  },
  "Michael Penix Jr.": {
    "PlayerID": "4360423",
    "TeamID": "1"
  },
  "Kyle Pitts": {
    "PlayerID": "4360248",
    "TeamID": "1"
  },
  "Bijan Robinson": {
    "PlayerID": "4430807",
    "TeamID": "1"
  },
  "Casey Washington": {
    "PlayerID": "4428796",
    "TeamID": "1"
  },
  "Elijah Wilkinson": {
    "PlayerID": "3059839",
    "TeamID": "1"
  },
  "Avery Williams": {
    "PlayerID": "4048259",
    "TeamID": "1"
  },
  "Charlie Woerner": {
    "PlayerID": "4035020",
    "TeamID": "1"
  },
  "Micah Abernathy": {
    "PlayerID": "3915373",
    "TeamID": "1"
  },
  "Dee Alford": {
    "PlayerID": "4401823",
    "TeamID": "1"
  },
  "Troy Andersen": {
    "PlayerID": "4247807",
    "TeamID": "1"
  },
  "Jessie Bates III": {
    "PlayerID": "3919512",
    "TeamID": "1"
  },
  "JD Bertrand": {
    "PlayerID": "4428872",
    "TeamID": "1"
  },
  "Lorenzo Carter": {
    "PlayerID": "3128715",
    "TeamID": "1"
  },
  "Brandon Dorlus": {
    "PlayerID": "4427090",
    "TeamID": "1"
  },
  "Arnold Ebiketie": {
    "PlayerID": "4257591",
    "TeamID": "1"
  },
  "Kaden Elliss": {
    "PlayerID": "3124890",
    "TeamID": "1"
  },
  "Eddie Goldman": {
    "PlayerID": "2969924",
    "TeamID": "1"
  },
  "Ta'Quon Graham": {
    "PlayerID": "4262197",
    "TeamID": "1"
  },
  "Richie Grant": {
    "PlayerID": "4042119",
    "TeamID": "1"
  },
  "Antonio Hamilton Sr.": {
    "PlayerID": "3056354",
    "TeamID": "1"
  },
  "Zach Harrison": {
    "PlayerID": "4426412",
    "TeamID": "1"
  },
  "Mike Hughes": {
    "PlayerID": "3895841",
    "TeamID": "1"
  },
  "Grady Jarrett": {
    "PlayerID": "2576492",
    "TeamID": "1"
  },
  "Matthew Judon": {
    "PlayerID": "3961466",
    "TeamID": "1"
  },
  "Kevin King": {
    "PlayerID": "3052170",
    "TeamID": "1"
  },
  "DeAngelo Malone": {
    "PlayerID": "4243457",
    "TeamID": "1"
  },
  "David Onyemata": {
    "PlayerID": "4002046",
    "TeamID": "1"
  },
  "Ruke Orhorhoro": {
    "PlayerID": "4430271",
    "TeamID": "1"
  },
  "Clark Phillips III": {
    "PlayerID": "4429067",
    "TeamID": "1"
  },
  "Justin Simmons": {
    "PlayerID": "2969860",
    "TeamID": "1"
  },
  "James Smith-Williams": {
    "PlayerID": "3686690",
    "TeamID": "1"
  },
  "Kentavius Street": {
    "PlayerID": "3116726",
    "TeamID": "1"
  },
  "A.J. Terrell": {
    "PlayerID": "4239995",
    "TeamID": "1"
  },
  "Younghoe Koo": {
    "PlayerID": "3049899",
    "TeamID": "1"
  },
  "Liam McCullough": {
    "PlayerID": "3915528",
    "TeamID": "1"
  },
  "Bradley Pinion": {
    "PlayerID": "2977680",
    "TeamID": "1"
  },
  "Robert Burns": {
    "PlayerID": "4240636",
    "TeamID": "1"
  },
  "Drew Dalman": {
    "PlayerID": "4242553",
    "TeamID": "1"
  },
  "Milo Eifler": {
    "PlayerID": "4371940",
    "TeamID": "1"
  },
  "Harrison Hand": {
    "PlayerID": "4259170",
    "TeamID": "1"
  },
  "DeMarcco Hellams": {
    "PlayerID": "4567111",
    "TeamID": "1"
  },
  "Nate Landman": {
    "PlayerID": "4243181",
    "TeamID": "1"
  },
  "Rondale Moore": {
    "PlayerID": "4372485",
    "TeamID": "1"
  },
  "Bralen Trice": {
    "PlayerID": "4428713",
    "TeamID": "1"
  },
  "Chris Blair": {
    "PlayerID": "4369886",
    "TeamID": "1"
  },
  "Natrone Brooks": {
    "PlayerID": "4689989",
    "TeamID": "1"
  },
  "Dylan Drummond": {
    "PlayerID": "4363551",
    "TeamID": "1"
  },
  "Rashaan Evans": {
    "PlayerID": "3126349",
    "TeamID": "1"
  },
  "John FitzPatrick": {
    "PlayerID": "4379401",
    "TeamID": "1"
  },
  "Demone Harris": {
    "PlayerID": "3052926",
    "TeamID": "1"
  },
  "Khalid Kareem": {
    "PlayerID": "4039029",
    "TeamID": "1"
  },
  "LaCale London": {
    "PlayerID": "4376288",
    "TeamID": "1"
  },
  "Jesse Matthews": {
    "PlayerID": "4379569",
    "TeamID": "1"
  },
  "Kehinde Oginni Hassan": {
    "PlayerID": "5061223",
    "TeamID": "1"
  },
  "Nathan Peterman": {
    "PlayerID": "2972236",
    "TeamID": "1"
  },
  "Monty Rice": {
    "PlayerID": "4240692",
    "TeamID": "1"
  },
  "Carlos Washington Jr.": {
    "PlayerID": "4248425",
    "TeamID": "1"
  },
  "Josh Woods": {
    "PlayerID": "3128303",
    "TeamID": "1"
  },
  "Nelson Agholor": {
    "PlayerID": "2971618",
    "TeamID": "33"
  },
  "Mark Andrews": {
    "PlayerID": "3116365",
    "TeamID": "33"
  },
  "Malaesala Aumavae-Laulu": {
    "PlayerID": "4569301",
    "TeamID": "33"
  },
  "Rashod Bateman": {
    "PlayerID": "4360939",
    "TeamID": "33"
  },
  "Ben Cleveland": {
    "PlayerID": "4035002",
    "TeamID": "33"
  },
  "Chris Collier": {
    "PlayerID": "4698191",
    "TeamID": "33"
  },
  "Daniel Faalele": {
    "PlayerID": "4360964",
    "TeamID": "33"
  },
  "Zay Flowers": {
    "PlayerID": "4429615",
    "TeamID": "33"
  },
  "Deonte Harty": {
    "PlayerID": "4411193",
    "TeamID": "33"
  },
  "Derrick Henry": {
    "PlayerID": "3043078",
    "TeamID": "33"
  },
  "Justice Hill": {
    "PlayerID": "4038441",
    "TeamID": "33"
  },
  "Lamar Jackson": {
    "PlayerID": "3916387",
    "TeamID": "33"
  },
  "Josh Johnson": {
    "PlayerID": "11394",
    "TeamID": "33"
  },
  "Josh Jones": {
    "PlayerID": "3914630",
    "TeamID": "33"
  },
  "Charlie Kolar": {
    "PlayerID": "4241263",
    "TeamID": "33"
  },
  "Isaiah Likely": {
    "PlayerID": "4361050",
    "TeamID": "33"
  },
  "Tyler Linderbaum": {
    "PlayerID": "4360499",
    "TeamID": "33"
  },
  "Patrick Mekari": {
    "PlayerID": "3863820",
    "TeamID": "33"
  },
  "Patrick Ricard": {
    "PlayerID": "2975417",
    "TeamID": "33"
  },
  "Roger Rosengarten": {
    "PlayerID": "4430876",
    "TeamID": "33"
  },
  "Nick Samac": {
    "PlayerID": "4428421",
    "TeamID": "33"
  },
  "Ronnie Stanley": {
    "PlayerID": "2980153",
    "TeamID": "33"
  },
  "Andrew Vorhees": {
    "PlayerID": "4243220",
    "TeamID": "33"
  },
  "Devontez Walker": {
    "PlayerID": "4696882",
    "TeamID": "33"
  },
  "Tylan Wallace": {
    "PlayerID": "4241424",
    "TeamID": "33"
  },
  "Chris Board": {
    "PlayerID": "3060403",
    "TeamID": "33"
  },
  "Beau Brade": {
    "PlayerID": "4429291",
    "TeamID": "33"
  },
  "Kyle Hamilton": {
    "PlayerID": "4575517",
    "TeamID": "33"
  },
  "Malik Harrison": {
    "PlayerID": "4040615",
    "TeamID": "33"
  },
  "Marlon Humphrey": {
    "PlayerID": "3126356",
    "TeamID": "33"
  },
  "Adisa Isaac": {
    "PlayerID": "4426372",
    "TeamID": "33"
  },
  "Eddie Jackson": {
    "PlayerID": "3054847",
    "TeamID": "33"
  },
  "Travis Jones": {
    "PlayerID": "4362139",
    "TeamID": "33"
  },
  "Sanoussi Kane": {
    "PlayerID": "4430118",
    "TeamID": "33"
  },
  "Nnamdi Madubuike": {
    "PlayerID": "4035245",
    "TeamID": "33"
  },
  "Yannick Ngakoue": {
    "PlayerID": "3053044",
    "TeamID": "33"
  },
  "David Ojabo": {
    "PlayerID": "4426507",
    "TeamID": "33"
  },
  "Odafe Oweh": {
    "PlayerID": "4361422",
    "TeamID": "33"
  },
  "Michael Pierce": {
    "PlayerID": "2972144",
    "TeamID": "33"
  },
  "Tavius Robinson": {
    "PlayerID": "4690179",
    "TeamID": "33"
  },
  "Josh Ross": {
    "PlayerID": "4258198",
    "TeamID": "33"
  },
  "Trenton Simpson": {
    "PlayerID": "4430831",
    "TeamID": "33"
  },
  "Roquan Smith": {
    "PlayerID": "3915189",
    "TeamID": "33"
  },
  "Brandon Stephens": {
    "PlayerID": "4035824",
    "TeamID": "33"
  },
  "T.J. Tampa": {
    "PlayerID": "4575483",
    "TeamID": "33"
  },
  "Brent Urban": {
    "PlayerID": "16831",
    "TeamID": "33"
  },
  "Kyle Van Noy": {
    "PlayerID": "16772",
    "TeamID": "33"
  },
  "Ar'Darius Washington": {
    "PlayerID": "4362492",
    "TeamID": "33"
  },
  "Broderick Washington": {
    "PlayerID": "3915837",
    "TeamID": "33"
  },
  "Nate Wiggins": {
    "PlayerID": "4601278",
    "TeamID": "33"
  },
  "Marcus Williams": {
    "PlayerID": "3122882",
    "TeamID": "33"
  },
  "Nick Moore": {
    "PlayerID": "3915184",
    "TeamID": "33"
  },
  "Jordan Stout": {
    "PlayerID": "4260224",
    "TeamID": "33"
  },
  "Justin Tucker": {
    "PlayerID": "15683",
    "TeamID": "33"
  },
  "Rasheen Ali": {
    "PlayerID": "4690013",
    "TeamID": "33"
  },
  "Jalyn Armour-Davis": {
    "PlayerID": "4372017",
    "TeamID": "33"
  },
  "Malik Hamm": {
    "PlayerID": "4369994",
    "TeamID": "33"
  },
  "Deion Jennings": {
    "PlayerID": "4372461",
    "TeamID": "33"
  },
  "Christian Matthew": {
    "PlayerID": "4911023",
    "TeamID": "33"
  },
  "Arthur Maulet": {
    "PlayerID": "3916144",
    "TeamID": "33"
  },
  "Keaton Mitchell": {
    "PlayerID": "4596334",
    "TeamID": "33"
  },
  "Trayvon Mullen": {
    "PlayerID": "4035458",
    "TeamID": "33"
  },
  "Deadrin Senat": {
    "PlayerID": "3051376",
    "TeamID": "33"
  },
  "Josh Tupou": {
    "PlayerID": "2979632",
    "TeamID": "33"
  },
  "Owen Wright": {
    "PlayerID": "4249616",
    "TeamID": "33"
  },
  "Corey Bullock": {
    "PlayerID": "4576075",
    "TeamID": "33"
  },
  "Bump Cooper Jr.": {
    "PlayerID": "5085881",
    "TeamID": "33"
  },
  "Malik Cunningham": {
    "PlayerID": "4240069",
    "TeamID": "33"
  },
  "Darrian Dalcourt": {
    "PlayerID": "4567132",
    "TeamID": "33"
  },
  "Ka'dar Hollman": {
    "PlayerID": "3916676",
    "TeamID": "33"
  },
  "Qadir Ismail": {
    "PlayerID": "4379769",
    "TeamID": "33"
  },
  "Keith Kirkwood": {
    "PlayerID": "3046401",
    "TeamID": "33"
  },
  "William Kwenkeu": {
    "PlayerID": "4044132",
    "TeamID": "33"
  },
  "Devin Leary": {
    "PlayerID": "4361653",
    "TeamID": "33"
  },
  "Anthony Miller": {
    "PlayerID": "3050487",
    "TeamID": "33"
  },
  "Zaire Mitchell-Paden": {
    "PlayerID": "4876006",
    "TeamID": "33"
  },
  "Adedayo Odeleye": {
    "PlayerID": "5066095",
    "TeamID": "33"
  },
  "C.J. Ravenell": {
    "PlayerID": "4700676",
    "TeamID": "33"
  },
  "Dayton Wade": {
    "PlayerID": "4428763",
    "TeamID": "33"
  },
  "Chris Wormley": {
    "PlayerID": "2977615",
    "TeamID": "33"
  },
  "Josh Allen": {
    "PlayerID": "3918298",
    "TeamID": "2"
  },
  "Alec Anderson": {
    "PlayerID": "4367203",
    "TeamID": "2"
  },
  "Spencer Brown": {
    "PlayerID": "4030899",
    "TeamID": "2"
  },
  "Will Clapp": {
    "PlayerID": "3115387",
    "TeamID": "2"
  },
  "Keon Coleman": {
    "PlayerID": "4635008",
    "TeamID": "2"
  },
  "James Cook": {
    "PlayerID": "4379399",
    "TeamID": "2"
  },
  "Ray Davis": {
    "PlayerID": "4429501",
    "TeamID": "2"
  },
  "Dion Dawkins": {
    "PlayerID": "3051324",
    "TeamID": "2"
  },
  "David Edwards": {
    "PlayerID": "3917660",
    "TeamID": "2"
  },
  "Reggie Gilliam": {
    "PlayerID": "4039505",
    "TeamID": "2"
  },
  "Mack Hollins": {
    "PlayerID": "2991662",
    "TeamID": "2"
  },
  "Ty Johnson": {
    "PlayerID": "3915411",
    "TeamID": "2"
  },
  "Dalton Kincaid": {
    "PlayerID": "4385690",
    "TeamID": "2"
  },
  "Dawson Knox": {
    "PlayerID": "3930086",
    "TeamID": "2"
  },
  "Connor McGovern": {
    "PlayerID": "2577367",
    "TeamID": "18"
  },
  "Quintin Morris": {
    "PlayerID": "4244049",
    "TeamID": "2"
  },
  "Curtis Samuel": {
    "PlayerID": "3121427",
    "TeamID": "2"
  },
  "Khalil Shakir": {
    "PlayerID": "4373678",
    "TeamID": "2"
  },
  "Tyrell Shavers": {
    "PlayerID": "4241476",
    "TeamID": "2"
  },
  "O'Cyrus Torrence": {
    "PlayerID": "4428696",
    "TeamID": "2"
  },
  "Mitchell Trubisky": {
    "PlayerID": "3039707",
    "TeamID": "2"
  },
  "Marquez Valdes-Scantling": {
    "PlayerID": "3051738",
    "TeamID": "2"
  },
  "Ryan Van Demark": {
    "PlayerID": "4239140",
    "TeamID": "2"
  },
  "Sedrick Van Pran-Granger": {
    "PlayerID": "4430815",
    "TeamID": "2"
  },
  "Joe Andreessen": {
    "PlayerID": "4366349",
    "TeamID": "2"
  },
  "Christian Benford": {
    "PlayerID": "4379778",
    "TeamID": "2"
  },
  "Terrel Bernard": {
    "PlayerID": "4259166",
    "TeamID": "2"
  },
  "Cole Bishop": {
    "PlayerID": "4676004",
    "TeamID": "2"
  },
  "DeWayne Carter": {
    "PlayerID": "4426883",
    "TeamID": "2"
  },
  "Brandon Codrington": {
    "PlayerID": "4576069",
    "TeamID": "2"
  },
  "Branson Deen": {
    "PlayerID": "4372499",
    "TeamID": "2"
  },
  "Rasul Douglas": {
    "PlayerID": "3943270",
    "TeamID": "2"
  },
  "Mike Edwards": {
    "PlayerID": "4362015",
    "TeamID": "2"
  },
  "Kaiir Elam": {
    "PlayerID": "4567399",
    "TeamID": "2"
  },
  "AJ Epenesa": {
    "PlayerID": "4240585",
    "TeamID": "2"
  },
  "Damar Hamlin": {
    "PlayerID": "4036060",
    "TeamID": "2"
  },
  "Ja'Marcus Ingram": {
    "PlayerID": "4240059",
    "TeamID": "2"
  },
  "Austin Johnson": {
    "PlayerID": "2979591",
    "TeamID": "2"
  },
  "Taron Johnson": {
    "PlayerID": "3121003",
    "TeamID": "2"
  },
  "DaQuan Jones": {
    "PlayerID": "16910",
    "TeamID": "2"
  },
  "Cam Lewis": {
    "PlayerID": "3916577",
    "TeamID": "2"
  },
  "Zion Logue": {
    "PlayerID": "4427826",
    "TeamID": "2"
  },
  "Von Miller": {
    "PlayerID": "13976",
    "TeamID": "2"
  },
  "Nicholas Morrow": {
    "PlayerID": "4232830",
    "TeamID": "2"
  },
  "Ed Oliver": {
    "PlayerID": "4039303",
    "TeamID": "2"
  },
  "Taylor Rapp": {
    "PlayerID": "4039007",
    "TeamID": "2"
  },
  "Greg Rousseau": {
    "PlayerID": "4362506",
    "TeamID": "2"
  },
  "Dawuane Smoot": {
    "PlayerID": "3042476",
    "TeamID": "2"
  },
  "Javon Solomon": {
    "PlayerID": "4428548",
    "TeamID": "2"
  },
  "Baylon Spector": {
    "PlayerID": "4239997",
    "TeamID": "2"
  },
  "Casey Toohill": {
    "PlayerID": "3931408",
    "TeamID": "2"
  },
  "Edefuan Ulofoshio": {
    "PlayerID": "4374280",
    "TeamID": "2"
  },
  "Dorian Williams": {
    "PlayerID": "4568624",
    "TeamID": "2"
  },
  "Tyler Bass": {
    "PlayerID": "3917232",
    "TeamID": "2"
  },
  "Reid Ferguson": {
    "PlayerID": "2976549",
    "TeamID": "2"
  },
  "Sam Martin": {
    "PlayerID": "15928",
    "TeamID": "2"
  },
  "Shane Buechele": {
    "PlayerID": "4039034",
    "TeamID": "2"
  },
  "Travis Clayton": {
    "PlayerID": "5209587",
    "TeamID": "2"
  },
  "Tommy Doyle": {
    "PlayerID": "4038986",
    "TeamID": "2"
  },
  "Darrynton Evans": {
    "PlayerID": "4036431",
    "TeamID": "2"
  },
  "Tylan Grable": {
    "PlayerID": "4368828",
    "TeamID": "2"
  },
  "Matt Milano": {
    "PlayerID": "3046287",
    "TeamID": "2"
  },
  "Eli Ankou": {
    "PlayerID": "3008150",
    "TeamID": "2"
  },
  "Ahmarean Brown": {
    "PlayerID": "4426800",
    "TeamID": "2"
  },
  "Lewis Cine": {
    "PlayerID": "4426536",
    "TeamID": "2"
  },
  "Kameron Cline": {
    "PlayerID": "4041572",
    "TeamID": "2"
  },
  "Te'Cory Couch": {
    "PlayerID": "4427348",
    "TeamID": "2"
  },
  "Zach Davidson": {
    "PlayerID": "4746079",
    "TeamID": "2"
  },
  "Frank Gore Jr.": {
    "PlayerID": "4429805",
    "TeamID": "2"
  },
  "Richard Gouraige": {
    "PlayerID": "4360246",
    "TeamID": "2"
  },
  "KJ Hamler": {
    "PlayerID": "4240380",
    "TeamID": "2"
  },
  "Daequan Hardy": {
    "PlayerID": "4429743",
    "TeamID": "2"
  },
  "Kareem Jackson": {
    "PlayerID": "13254",
    "TeamID": "2"
  },
  "Kingsley Jonathan": {
    "PlayerID": "4240405",
    "TeamID": "2"
  },
  "Jalen Virgil": {
    "PlayerID": "4036448",
    "TeamID": "2"
  },
  "Mike White": {
    "PlayerID": "3051381",
    "TeamID": "2"
  },
  "Raheem Blackshear": {
    "PlayerID": "4259308",
    "TeamID": "29"
  },
  "Mike Boone": {
    "PlayerID": "3139033",
    "TeamID": "29"
  },
  "Brady Christensen": {
    "PlayerID": "4256062",
    "TeamID": "29"
  },
  "Jalen Coker": {
    "PlayerID": "4695883",
    "TeamID": "29"
  },
  "Austin Corbett": {
    "PlayerID": "3056608",
    "TeamID": "29"
  },
  "Andy Dalton": {
    "PlayerID": "14012",
    "TeamID": "29"
  },
  "Ikem Ekwonu": {
    "PlayerID": "4427132",
    "TeamID": "29"
  },
  "Feleipe Franks": {
    "PlayerID": "4034948",
    "TeamID": "29"
  },
  "Chuba Hubbard": {
    "PlayerID": "4241416",
    "TeamID": "29"
  },
  "Robert Hunt": {
    "PlayerID": "3917592",
    "TeamID": "29"
  },
  "Diontae Johnson": {
    "PlayerID": "3932905",
    "TeamID": "29"
  },
  "Jarrett Kingston": {
    "PlayerID": "4373474",
    "TeamID": "29"
  },
  "Xavier Legette": {
    "PlayerID": "4430034",
    "TeamID": "29"
  },
  "Damien Lewis": {
    "PlayerID": "4362647",
    "TeamID": "29"
  },
  "Jonathan Mingo": {
    "PlayerID": "4426485",
    "TeamID": "29"
  },
  "David Moore": {
    "PlayerID": "4212909",
    "TeamID": "29"
  },
  "Taylor Moton": {
    "PlayerID": "2973051",
    "TeamID": "29"
  },
  "Yosh Nijman": {
    "PlayerID": "3871880",
    "TeamID": "29"
  },
  "Andrew Raym": {
    "PlayerID": "4429030",
    "TeamID": "29"
  },
  "Ja'Tavion Sanders": {
    "PlayerID": "4431588",
    "TeamID": "29"
  },
  "Miles Sanders": {
    "PlayerID": "4045163",
    "TeamID": "29"
  },
  "Tommy Tremble": {
    "PlayerID": "4372780",
    "TeamID": "29"
  },
  "Bryce Young": {
    "PlayerID": "4685720",
    "TeamID": "29"
  },
  "Chandler Zavala": {
    "PlayerID": "4710661",
    "TeamID": "29"
  },
  "Shemar Bartholomew": {
    "PlayerID": "4371336",
    "TeamID": "29"
  },
  "Claudin Cherelus": {
    "PlayerID": "4256224",
    "TeamID": "29"
  },
  "Jadeveon Clowney": {
    "PlayerID": "16734",
    "TeamID": "29"
  },
  "Charles Harris": {
    "PlayerID": "3051852",
    "TeamID": "29"
  },
  "Troy Hill": {
    "PlayerID": "2525933",
    "TeamID": "29"
  },
  "Jaycee Horn": {
    "PlayerID": "4362847",
    "TeamID": "29"
  },
  "Thomas Incoom": {
    "PlayerID": "4714157",
    "TeamID": "29"
  },
  "Michael Jackson": {
    "PlayerID": "3917853",
    "TeamID": "29"
  },
  "Tarron Jackson": {
    "PlayerID": "4052031",
    "TeamID": "29"
  },
  "Josey Jewell": {
    "PlayerID": "3040150",
    "TeamID": "29"
  },
  "DJ Johnson": {
    "PlayerID": "4240623",
    "TeamID": "29"
  },
  "Lonnie Johnson Jr.": {
    "PlayerID": "4240780",
    "TeamID": "29"
  },
  "Jayden Peevy": {
    "PlayerID": "4240927",
    "TeamID": "29"
  },
  "LaBryan Ray": {
    "PlayerID": "4241473",
    "TeamID": "29"
  },
  "Jon Rhattigan": {
    "PlayerID": "4258485",
    "TeamID": "29"
  },
  "Demani Richardson": {
    "PlayerID": "4426926",
    "TeamID": "29"
  },
  "A'Shawn Robinson": {
    "PlayerID": "3054857",
    "TeamID": "29"
  },
  "Jammie Robinson": {
    "PlayerID": "4430411",
    "TeamID": "29"
  },
  "Nick Scott": {
    "PlayerID": "3116179",
    "TeamID": "29"
  },
  "T.J. Smith": {
    "PlayerID": "3916917",
    "TeamID": "29"
  },
  "Chau Smith-Wade": {
    "PlayerID": "4697636",
    "TeamID": "29"
  },
  "Nick Thurman": {
    "PlayerID": "3040031",
    "TeamID": "29"
  },
  "Shy Tuttle": {
    "PlayerID": "3886601",
    "TeamID": "29"
  },
  "Trevin Wallace": {
    "PlayerID": "4683815",
    "TeamID": "29"
  },
  "Xavier Woods": {
    "PlayerID": "3040572",
    "TeamID": "29"
  },
  "Chandler Wooten": {
    "PlayerID": "4242515",
    "TeamID": "29"
  },
  "Russ Yeast": {
    "PlayerID": "4240071",
    "TeamID": "29"
  },
  "Johnny Hekker": {
    "PlayerID": "15153",
    "TeamID": "29"
  },
  "JJ Jansen": {
    "PlayerID": "11759",
    "TeamID": "29"
  },
  "Eddy Pineiro": {
    "PlayerID": "4034949",
    "TeamID": "29"
  },
  "Junior Aho": {
    "PlayerID": "4689551",
    "TeamID": "29"
  },
  "Popo Aumavae": {
    "PlayerID": "4242498",
    "TeamID": "29"
  },
  "Amare Barno": {
    "PlayerID": "4568439",
    "TeamID": "29"
  },
  "Jonathon Brooks": {
    "PlayerID": "4678008",
    "TeamID": "29"
  },
  "Anthony Brown": {
    "PlayerID": "2977756",
    "TeamID": "29"
  },
  "Derrick Brown": {
    "PlayerID": "4035495",
    "TeamID": "29"
  },
  "Jaden Crumedy": {
    "PlayerID": "4362910",
    "TeamID": "29"
  },
  "Sam Franklin Jr.": {
    "PlayerID": "4044133",
    "TeamID": "29"
  },
  "Jordan Fuller": {
    "PlayerID": "4040613",
    "TeamID": "29"
  },
  "Dane Jackson": {
    "PlayerID": "3895791",
    "TeamID": "29"
  },
  "Adam Thielen": {
    "PlayerID": "16460",
    "TeamID": "29"
  },
  "Ian Thomas": {
    "PlayerID": "4045305",
    "TeamID": "29"
  },
  "Shaq Thompson": {
    "PlayerID": "2978313",
    "TeamID": "29"
  },
  "Raequan Williams": {
    "PlayerID": "3929834",
    "TeamID": "29"
  },
  "D.J. Wonnum": {
    "PlayerID": "4038849",
    "TeamID": "29"
  },
  "Deon Cain": {
    "PlayerID": "3728254",
    "TeamID": "29"
  },
  "Ja'Tyre Carter": {
    "PlayerID": "4369950",
    "TeamID": "29"
  },
  "Alex Cook": {
    "PlayerID": "4243320",
    "TeamID": "29"
  },
  "Kenny Dyson Jr.": {
    "PlayerID": "4574008",
    "TeamID": "29"
  },
  "Marquis Haynes Sr.": {
    "PlayerID": "3115456",
    "TeamID": "29"
  },
  "Dillon Johnson": {
    "PlayerID": "4689338",
    "TeamID": "29"
  },
  "Jordan Matthews": {
    "PlayerID": "16763",
    "TeamID": "29"
  },
  "Jackson Mitchell": {
    "PlayerID": "4569009",
    "TeamID": "29"
  },
  "Praise Olatoke": {
    "PlayerID": "5215426",
    "TeamID": "29"
  },
  "Jack Plummer": {
    "PlayerID": "4361493",
    "TeamID": "29"
  },
  "Stephen Sullivan": {
    "PlayerID": "4035426",
    "TeamID": "29"
  },
  "Deven Thompkins": {
    "PlayerID": "4374187",
    "TeamID": "29"
  },
  "Brandon Walton": {
    "PlayerID": "4040778",
    "TeamID": "29"
  },
  "DeShawn Williams": {
    "PlayerID": "2576508",
    "TeamID": "29"
  },
  "Keenan Allen": {
    "PlayerID": "15818",
    "TeamID": "3"
  },
  "Kiran Amegadjie": {
    "PlayerID": "4883090",
    "TeamID": "3"
  },
  "Tyson Bagent": {
    "PlayerID": "4434153",
    "TeamID": "3"
  },
  "Khari Blasingame": {
    "PlayerID": "3122154",
    "TeamID": "3"
  },
  "DeAndre Carter": {
    "PlayerID": "2580216",
    "TeamID": "3"
  },
  "Nate Davis": {
    "PlayerID": "3120070",
    "TeamID": "3"
  },
  "Gerald Everett": {
    "PlayerID": "3918639",
    "TeamID": "3"
  },
  "Khalil Herbert": {
    "PlayerID": "4035886",
    "TeamID": "3"
  },
  "Teven Jenkins": {
    "PlayerID": "4038457",
    "TeamID": "3"
  },
  "Roschon Johnson": {
    "PlayerID": "4426386",
    "TeamID": "3"
  },
  "Braxton Jones": {
    "PlayerID": "4251007",
    "TeamID": "3"
  },
  "Velus Jones Jr.": {
    "PlayerID": "4035693",
    "TeamID": "3"
  },
  "Cole Kmet": {
    "PlayerID": "4258595",
    "TeamID": "3"
  },
  "Doug Kramer Jr.": {
    "PlayerID": "4047178",
    "TeamID": "3"
  },
  "Marcedes Lewis": {
    "PlayerID": "9614",
    "TeamID": "3"
  },
  "DJ Moore": {
    "PlayerID": "3915416",
    "TeamID": "3"
  },
  "Bill Murray": {
    "PlayerID": "3912189",
    "TeamID": "3"
  },
  "Rome Odunze": {
    "PlayerID": "4431299",
    "TeamID": "3"
  },
  "Matt Pryor": {
    "PlayerID": "3055886",
    "TeamID": "3"
  },
  "Tyler Scott": {
    "PlayerID": "4565908",
    "TeamID": "3"
  },
  "Coleman Shelton": {
    "PlayerID": "3052180",
    "TeamID": "3"
  },
  "D'Andre Swift": {
    "PlayerID": "4259545",
    "TeamID": "3"
  },
  "Caleb Williams": {
    "PlayerID": "4431611",
    "TeamID": "3"
  },
  "Darnell Wright": {
    "PlayerID": "4426358",
    "TeamID": "3"
  },
  "Andrew Billings": {
    "PlayerID": "3051775",
    "TeamID": "3"
  },
  "Josh Blackwell": {
    "PlayerID": "4240459",
    "TeamID": "3"
  },
  "Austin Booker": {
    "PlayerID": "4683553",
    "TeamID": "3"
  },
  "Jaquan Brisker": {
    "PlayerID": "4570044",
    "TeamID": "3"
  },
  "Kevin Byard III": {
    "PlayerID": "2574056",
    "TeamID": "3"
  },
  "Byron Cowart": {
    "PlayerID": "3916922",
    "TeamID": "3"
  },
  "Gervon Dexter Sr.": {
    "PlayerID": "4429014",
    "TeamID": "3"
  },
  "Tremaine Edmunds": {
    "PlayerID": "3929950",
    "TeamID": "3"
  },
  "T.J. Edwards": {
    "PlayerID": "3121544",
    "TeamID": "3"
  },
  "Kyler Gordon": {
    "PlayerID": "4361093",
    "TeamID": "3"
  },
  "Daniel Hardy": {
    "PlayerID": "4365629",
    "TeamID": "3"
  },
  "Elijah Hicks": {
    "PlayerID": "4242402",
    "TeamID": "3"
  },
  "Jaylon Johnson": {
    "PlayerID": "4243253",
    "TeamID": "3"
  },
  "Jaylon Jones": {
    "PlayerID": "4685145",
    "TeamID": "11"
  },
  "Amen Ogbongbemiga": {
    "PlayerID": "4038432",
    "TeamID": "3"
  },
  "Jonathan Owens": {
    "PlayerID": "4331768",
    "TeamID": "3"
  },
  "Zacch Pickens": {
    "PlayerID": "4426332",
    "TeamID": "3"
  },
  "Dominique Robinson": {
    "PlayerID": "4244300",
    "TeamID": "3"
  },
  "Jack Sanborn": {
    "PlayerID": "4372576",
    "TeamID": "3"
  },
  "Noah Sewell": {
    "PlayerID": "4430822",
    "TeamID": "3"
  },
  "Terell Smith": {
    "PlayerID": "4360935",
    "TeamID": "3"
  },
  "Tyrique Stevenson": {
    "PlayerID": "4426374",
    "TeamID": "3"
  },
  "Montez Sweat": {
    "PlayerID": "3134690",
    "TeamID": "3"
  },
  "Darrell Taylor": {
    "PlayerID": "3915396",
    "TeamID": "3"
  },
  "DeMarcus Walker": {
    "PlayerID": "3045377",
    "TeamID": "3"
  },
  "Chris Williams": {
    "PlayerID": "4034530",
    "TeamID": "3"
  },
  "Scott Daly": {
    "PlayerID": "2980138",
    "TeamID": "3"
  },
  "Cairo Santos": {
    "PlayerID": "17427",
    "TeamID": "3"
  },
  "Tory Taylor": {
    "PlayerID": "4686889",
    "TeamID": "3"
  },
  "Ryan Bates": {
    "PlayerID": "3929631",
    "TeamID": "3"
  },
  "Larry Borom": {
    "PlayerID": "4241217",
    "TeamID": "3"
  },
  "Stephen Carlson": {
    "PlayerID": "3948283",
    "TeamID": "3"
  },
  "Douglas Coleman III": {
    "PlayerID": "4043132",
    "TeamID": "3"
  },
  "Travis Homer": {
    "PlayerID": "4037457",
    "TeamID": "3"
  },
  "Jacob Martin": {
    "PlayerID": "3138764",
    "TeamID": "3"
  },
  "Patrick Scales": {
    "PlayerID": "14572",
    "TeamID": "3"
  },
  "Nsimba Webster": {
    "PlayerID": "3119317",
    "TeamID": "3"
  },
  "Ian Wheeler": {
    "PlayerID": "4579554",
    "TeamID": "3"
  },
  "Micah Baskerville": {
    "PlayerID": "4362631",
    "TeamID": "3"
  },
  "Travis Bell": {
    "PlayerID": "4246741",
    "TeamID": "3"
  },
  "Theo Benedet": {
    "PlayerID": "5125873",
    "TeamID": "3"
  },
  "Jake Curhan": {
    "PlayerID": "4035870",
    "TeamID": "3"
  },
  "Chris Glaser": {
    "PlayerID": "4240836",
    "TeamID": "3"
  },
  "John Jackson III": {
    "PlayerID": "4569510",
    "TeamID": "3"
  },
  "Collin Johnson": {
    "PlayerID": "4039043",
    "TeamID": "3"
  },
  "Carl Jones Jr.": {
    "PlayerID": "4569428",
    "TeamID": "3"
  },
  "Dashaun Mallory": {
    "PlayerID": "4382481",
    "TeamID": "3"
  },
  "Teagan Quitoriano": {
    "PlayerID": "4374045",
    "TeamID": "3"
  },
  "Austin Reed": {
    "PlayerID": "4368343",
    "TeamID": "3"
  },
  "Ameer Speed": {
    "PlayerID": "4259546",
    "TeamID": "3"
  },
  "Reddy Steward": {
    "PlayerID": "4428584",
    "TeamID": "3"
  },
  "Samori Toure": {
    "PlayerID": "4027873",
    "TeamID": "3"
  },
  "Erick All Jr.": {
    "PlayerID": "4427834",
    "TeamID": "4"
  },
  "Chase Brown": {
    "PlayerID": "4362238",
    "TeamID": "4"
  },
  "Orlando Brown Jr.": {
    "PlayerID": "3116370",
    "TeamID": "4"
  },
  "Jake Browning": {
    "PlayerID": "3886812",
    "TeamID": "4"
  },
  "Joe Burrow": {
    "PlayerID": "3915511",
    "TeamID": "4"
  },
  "Jermaine Burton": {
    "PlayerID": "4429033",
    "TeamID": "4"
  },
  "Alex Cappa": {
    "PlayerID": "3059021",
    "TeamID": "4"
  },
  "Ja'Marr Chase": {
    "PlayerID": "4362628",
    "TeamID": "4"
  },
  "Cody Ford": {
    "PlayerID": "3707061",
    "TeamID": "4"
  },
  "Mike Gesicki": {
    "PlayerID": "3116164",
    "TeamID": "4"
  },
  "Tee Higgins": {
    "PlayerID": "4239993",
    "TeamID": "4"
  },
  "Tanner Hudson": {
    "PlayerID": "3050481",
    "TeamID": "4"
  },
  "Andrei Iosivas": {
    "PlayerID": "4368003",
    "TeamID": "4"
  },
  "Trenton Irwin": {
    "PlayerID": "3931391",
    "TeamID": "4"
  },
  "Charlie Jones": {
    "PlayerID": "4257188",
    "TeamID": "4"
  },
  "Ted Karras": {
    "PlayerID": "2576188",
    "TeamID": "4"
  },
  "Jaxson Kirkland": {
    "PlayerID": "4243324",
    "TeamID": "4"
  },
  "Matt Lee": {
    "PlayerID": "4568986",
    "TeamID": "4"
  },
  "Tanner McLachlan": {
    "PlayerID": "4384171",
    "TeamID": "4"
  },
  "Amarius Mims": {
    "PlayerID": "4431571",
    "TeamID": "4"
  },
  "Zack Moss": {
    "PlayerID": "4035676",
    "TeamID": "4"
  },
  "Drew Sample": {
    "PlayerID": "3127310",
    "TeamID": "4"
  },
  "Cordell Volson": {
    "PlayerID": "4040950",
    "TeamID": "4"
  },
  "Trayveon Williams": {
    "PlayerID": "4035222",
    "TeamID": "4"
  },
  "Tycen Anderson": {
    "PlayerID": "4257240",
    "TeamID": "4"
  },
  "Daijahn Anthony": {
    "PlayerID": "4874448",
    "TeamID": "4"
  },
  "Joe Bachie": {
    "PlayerID": "4036507",
    "TeamID": "4"
  },
  "Jordan Battle": {
    "PlayerID": "4567098",
    "TeamID": "4"
  },
  "Vonn Bell": {
    "PlayerID": "3051388",
    "TeamID": "4"
  },
  "Jalen Davis": {
    "PlayerID": "3125356",
    "TeamID": "4"
  },
  "Akeem Davis-Gaither": {
    "PlayerID": "3917142",
    "TeamID": "4"
  },
  "Lawrence Guy": {
    "PlayerID": "14185",
    "TeamID": "4"
  },
  "Trey Hendrickson": {
    "PlayerID": "3052743",
    "TeamID": "4"
  },
  "B.J. Hill": {
    "PlayerID": "3116748",
    "TeamID": "4"
  },
  "Dax Hill": {
    "PlayerID": "4426422",
    "TeamID": "4"
  },
  "Mike Hilton": {
    "PlayerID": "2980383",
    "TeamID": "4"
  },
  "Sam Hubbard": {
    "PlayerID": "3121416",
    "TeamID": "4"
  },
  "McKinnley Jackson": {
    "PlayerID": "4692680",
    "TeamID": "4"
  },
  "Kris Jenkins Jr.": {
    "PlayerID": "4432301",
    "TeamID": "4"
  },
  "Cedric Johnson": {
    "PlayerID": "4430065",
    "TeamID": "4"
  },
  "Myles Murphy": {
    "PlayerID": "4428985",
    "TeamID": "4"
  },
  "Josh Newton": {
    "PlayerID": "4365319",
    "TeamID": "4"
  },
  "Maema Njongmeta": {
    "PlayerID": "4428125",
    "TeamID": "4"
  },
  "Joseph Ossai": {
    "PlayerID": "4362094",
    "TeamID": "4"
  },
  "Germaine Pratt": {
    "PlayerID": "3116724",
    "TeamID": "4"
  },
  "Sheldon Rankins": {
    "PlayerID": "2970204",
    "TeamID": "4"
  },
  "Geno Stone": {
    "PlayerID": "4240575",
    "TeamID": "4"
  },
  "Cam Taylor-Britt": {
    "PlayerID": "4361196",
    "TeamID": "4"
  },
  "Jay Tufele": {
    "PlayerID": "4259647",
    "TeamID": "4"
  },
  "DJ Turner II": {
    "PlayerID": "4572036",
    "TeamID": "4"
  },
  "Logan Wilson": {
    "PlayerID": "3918330",
    "TeamID": "4"
  },
  "Cal Adomitis": {
    "PlayerID": "4240719",
    "TeamID": "4"
  },
  "Evan McPherson": {
    "PlayerID": "4360234",
    "TeamID": "4"
  },
  "Ryan Rehkow": {
    "PlayerID": "4608820",
    "TeamID": "4"
  },
  "Trent Brown": {
    "PlayerID": "3043109",
    "TeamID": "4"
  },
  "Chris Evans": {
    "PlayerID": "4046530",
    "TeamID": "4"
  },
  "DJ Ivey": {
    "PlayerID": "4362502",
    "TeamID": "4"
  },
  "Lance Robinson": {
    "PlayerID": "4373087",
    "TeamID": "4"
  },
  "Cam Sample": {
    "PlayerID": "4243923",
    "TeamID": "4"
  },
  "D'Ante Smith": {
    "PlayerID": "4038565",
    "TeamID": "4"
  },
  "Nate Brooks": {
    "PlayerID": "3914477",
    "TeamID": "4"
  },
  "Cole Burgess": {
    "PlayerID": "5192448",
    "TeamID": "4"
  },
  "Devin Cochran": {
    "PlayerID": "4035270",
    "TeamID": "4"
  },
  "Domenique Davis": {
    "PlayerID": "4590720",
    "TeamID": "4"
  },
  "Cam Grandy": {
    "PlayerID": "4700712",
    "TeamID": "4"
  },
  "Shaka Heyward": {
    "PlayerID": "4360413",
    "TeamID": "4"
  },
  "Trey Hill": {
    "PlayerID": "4361787",
    "TeamID": "4"
  },
  "PJ Jules": {
    "PlayerID": "4429946",
    "TeamID": "4"
  },
  "Tashawn Manning": {
    "PlayerID": "4242529",
    "TeamID": "4"
  },
  "Kendall Milton": {
    "PlayerID": "4429012",
    "TeamID": "4"
  },
  "Kendric Pryor": {
    "PlayerID": "4035776",
    "TeamID": "4"
  },
  "Justin Rogers": {
    "PlayerID": "4692185",
    "TeamID": "4"
  },
  "Isaiah Thomas": {
    "PlayerID": "4241404",
    "TeamID": "4"
  },
  "Logan Woodside": {
    "PlayerID": "3042749",
    "TeamID": "4"
  },
  "Jordan Akins": {
    "PlayerID": "3128452",
    "TeamID": "5"
  },
  "Joel Bitonio": {
    "PlayerID": "16740",
    "TeamID": "5"
  },
  "Javion Cohen": {
    "PlayerID": "4692037",
    "TeamID": "5"
  },
  "Jack Conklin": {
    "PlayerID": "2979534",
    "TeamID": "5"
  },
  "Amari Cooper": {
    "PlayerID": "2976499",
    "TeamID": "5"
  },
  "Michael Dunn": {
    "PlayerID": "2976213",
    "TeamID": "5"
  },
  "Jerome Ford": {
    "PlayerID": "4372019",
    "TeamID": "5"
  },
  "D'Onta Foreman": {
    "PlayerID": "3125116",
    "TeamID": "5"
  },
  "Nick Harris": {
    "PlayerID": "4039016",
    "TeamID": "5"
  },
  "James Hudson III": {
    "PlayerID": "4258181",
    "TeamID": "5"
  },
  "Germain Ifedi": {
    "PlayerID": "2972304",
    "TeamID": "5"
  },
  "Jerry Jeudy": {
    "PlayerID": "4241463",
    "TeamID": "5"
  },
  "Dawand Jones": {
    "PlayerID": "4427637",
    "TeamID": "5"
  },
  "Elijah Moore": {
    "PlayerID": "4372414",
    "TeamID": "5"
  },
  "David Njoku": {
    "PlayerID": "3123076",
    "TeamID": "5"
  },
  "Ethan Pocic": {
    "PlayerID": "3042738",
    "TeamID": "5"
  },
  "James Proche II": {
    "PlayerID": "3916204",
    "TeamID": "5"
  },
  "Pierre Strong Jr.": {
    "PlayerID": "4249836",
    "TeamID": "5"
  },
  "Geoff Swaim": {
    "PlayerID": "3046704",
    "TeamID": "5"
  },
  "Dorian Thompson-Robinson": {
    "PlayerID": "4367178",
    "TeamID": "5"
  },
  "Jamari Thrash": {
    "PlayerID": "4428678",
    "TeamID": "5"
  },
  "Cedric Tillman": {
    "PlayerID": "4369863",
    "TeamID": "5"
  },
  "Deshaun Watson": {
    "PlayerID": "3122840",
    "TeamID": "5"
  },
  "Blake Whiteheart": {
    "PlayerID": "4362018",
    "TeamID": "5"
  },
  "Jedrick Wills Jr.": {
    "PlayerID": "4241482",
    "TeamID": "5"
  },
  "Jameis Winston": {
    "PlayerID": "2969939",
    "TeamID": "5"
  },
  "Zak Zinter": {
    "PlayerID": "4433963",
    "TeamID": "5"
  },
  "D'Anthony Bell": {
    "PlayerID": "4608386",
    "TeamID": "5"
  },
  "Tony Brown II": {
    "PlayerID": "3115308",
    "TeamID": "5"
  },
  "Devin Bush": {
    "PlayerID": "4036261",
    "TeamID": "5"
  },
  "Grant Delpit": {
    "PlayerID": "4242208",
    "TeamID": "5"
  },
  "Martin Emerson Jr.": {
    "PlayerID": "4429568",
    "TeamID": "5"
  },
  "Mike Ford Jr.": {
    "PlayerID": "3050916",
    "TeamID": "5"
  },
  "Myles Garrett": {
    "PlayerID": "3122132",
    "TeamID": "5"
  },
  "Kahlef Hailassie": {
    "PlayerID": "4373814",
    "TeamID": "5"
  },
  "Mike Hall Jr.": {
    "PlayerID": "4600415",
    "TeamID": "5"
  },
  "Shelby Harris": {
    "PlayerID": "16837",
    "TeamID": "5"
  },
  "Ronnie Hickman": {
    "PlayerID": "4569620",
    "TeamID": "5"
  },
  "Jordan Hicks": {
    "PlayerID": "2514270",
    "TeamID": "5"
  },
  "Khaleke Hudson": {
    "PlayerID": "4046525",
    "TeamID": "5"
  },
  "Quinton Jefferson": {
    "PlayerID": "2577078",
    "TeamID": "5"
  },
  "Sam Kamara": {
    "PlayerID": "4033855",
    "TeamID": "5"
  },
  "Isaiah McGuire": {
    "PlayerID": "4427963",
    "TeamID": "5"
  },
  "Rodney McLeod Jr.": {
    "PlayerID": "15222",
    "TeamID": "5"
  },
  "Cameron Mitchell": {
    "PlayerID": "4569607",
    "TeamID": "5"
  },
  "Greg Newsome II": {
    "PlayerID": "4361266",
    "TeamID": "5"
  },
  "Ogbo Okoronkwo": {
    "PlayerID": "3052667",
    "TeamID": "5"
  },
  "Jeremiah Owusu-Koramoah": {
    "PlayerID": "4258599",
    "TeamID": "5"
  },
  "Winston Reid": {
    "PlayerID": "4251125",
    "TeamID": "5"
  },
  "Za'Darius Smith": {
    "PlayerID": "3043168",
    "TeamID": "5"
  },
  "Dalvin Tomlinson": {
    "PlayerID": "2979860",
    "TeamID": "5"
  },
  "Denzel Ward": {
    "PlayerID": "3915535",
    "TeamID": "5"
  },
  "Nathaniel Watson": {
    "PlayerID": "4362895",
    "TeamID": "5"
  },
  "Corey Bojorquez": {
    "PlayerID": "4039396",
    "TeamID": "5"
  },
  "Dustin Hopkins": {
    "PlayerID": "15965",
    "TeamID": "5"
  },
  "Charley Hughlett": {
    "PlayerID": "15379",
    "TeamID": "5"
  },
  "Hakeem Adeniji": {
    "PlayerID": "4046557",
    "TeamID": "5"
  },
  "David Bell": {
    "PlayerID": "4570409",
    "TeamID": "5"
  },
  "Brandon Bouyer-Randle": {
    "PlayerID": "4046723",
    "TeamID": "5"
  },
  "Nick Chubb": {
    "PlayerID": "3128720",
    "TeamID": "5"
  },
  "Mohamoud Diabate": {
    "PlayerID": "4567403",
    "TeamID": "5"
  },
  "Tony Fields II": {
    "PlayerID": "4245655",
    "TeamID": "5"
  },
  "Myles Harden": {
    "PlayerID": "4695783",
    "TeamID": "5"
  },
  "Nyheim Hines": {
    "PlayerID": "3916430",
    "TeamID": "5"
  },
  "Maurice Hurst II": {
    "PlayerID": "3045220",
    "TeamID": "5"
  },
  "Wyatt Teller": {
    "PlayerID": "3045474",
    "TeamID": "5"
  },
  "Juan Thornhill": {
    "PlayerID": "3917909",
    "TeamID": "5"
  },
  "Alex Wright": {
    "PlayerID": "4570119",
    "TeamID": "5"
  },
  "Luke Wypler": {
    "PlayerID": "4430806",
    "TeamID": "5"
  },
  "Michael Barrett": {
    "PlayerID": "4372062",
    "TeamID": "5"
  },
  "Jowon Briggs": {
    "PlayerID": "4426676",
    "TeamID": "5"
  },
  "Gary Brightwell": {
    "PlayerID": "4245645",
    "TeamID": "5"
  },
  "Jaelon Darden": {
    "PlayerID": "4243830",
    "TeamID": "5"
  },
  "Chris Edmonds": {
    "PlayerID": "4572922",
    "TeamID": "5"
  },
  "Royce Freeman": {
    "PlayerID": "3122672",
    "TeamID": "5"
  },
  "Sebastian Gutierrez": {
    "PlayerID": "5041985",
    "TeamID": "5"
  },
  "Siaki Ika": {
    "PlayerID": "4426440",
    "TeamID": "5"
  },
  "Cameron Latu": {
    "PlayerID": "4372026",
    "TeamID": "5"
  },
  "Ricky Lee": {
    "PlayerID": "4369308",
    "TeamID": "5"
  },
  "Roy Mbaeteka": {
    "PlayerID": "5024661",
    "TeamID": "5"
  },
  "Elerson G. Smith": {
    "PlayerID": "4030924",
    "TeamID": "5"
  },
  "Lorenzo Thompson": {
    "PlayerID": "4367040",
    "TeamID": "5"
  },
  "Kadarius Toney": {
    "PlayerID": "4240600",
    "TeamID": "5"
  },
  "Michael Woods II": {
    "PlayerID": "4360174",
    "TeamID": "5"
  },
  "T.J. Bass": {
    "PlayerID": "4685120",
    "TeamID": "6"
  },
  "Cooper Beebe": {
    "PlayerID": "4426663",
    "TeamID": "6"
  },
  "Jalen Brooks": {
    "PlayerID": "4692835",
    "TeamID": "6"
  },
  "Rico Dowdle": {
    "PlayerID": "4038815",
    "TeamID": "6"
  },
  "Ezekiel Elliott": {
    "PlayerID": "3051392",
    "TeamID": "6"
  },
  "Jake Ferguson": {
    "PlayerID": "4242355",
    "TeamID": "6"
  },
  "Ryan Flournoy": {
    "PlayerID": "5083754",
    "TeamID": "6"
  },
  "Tyler Guyton": {
    "PlayerID": "4609048",
    "TeamID": "6"
  },
  "Brock Hoffman": {
    "PlayerID": "4241087",
    "TeamID": "6"
  },
  "CeeDee Lamb": {
    "PlayerID": "4241389",
    "TeamID": "6"
  },
  "Trey Lance": {
    "PlayerID": "4383351",
    "TeamID": "6"
  },
  "Hunter Luepke": {
    "PlayerID": "4383396",
    "TeamID": "6"
  },
  "Zack Martin": {
    "PlayerID": "16709",
    "TeamID": "6"
  },
  "Dak Prescott": {
    "PlayerID": "2577417",
    "TeamID": "6"
  },
  "Asim Richards": {
    "PlayerID": "4430379",
    "TeamID": "6"
  },
  "Cooper Rush": {
    "PlayerID": "2972515",
    "TeamID": "6"
  },
  "Luke Schoonmaker": {
    "PlayerID": "4372096",
    "TeamID": "6"
  },
  "Tyler Smith": {
    "PlayerID": "4568652",
    "TeamID": "6"
  },
  "Brevyn Spann-Ford": {
    "PlayerID": "4360967",
    "TeamID": "6"
  },
  "Terence Steele": {
    "PlayerID": "3915834",
    "TeamID": "6"
  },
  "John Stephens Jr.": {
    "PlayerID": "4362489",
    "TeamID": "6"
  },
  "Jalen Tolbert": {
    "PlayerID": "4249417",
    "TeamID": "6"
  },
  "KaVontae Turpin": {
    "PlayerID": "3676833",
    "TeamID": "6"
  },
  "Deuce Vaughn": {
    "PlayerID": "4431453",
    "TeamID": "6"
  },
  "Matt Waletzko": {
    "PlayerID": "4370876",
    "TeamID": "6"
  },
  "Markquese Bell": {
    "PlayerID": "4241921",
    "TeamID": "6"
  },
  "Andrew Booth Jr.": {
    "PlayerID": "4426344",
    "TeamID": "6"
  },
  "Caelen Carson": {
    "PlayerID": "4431006",
    "TeamID": "6"
  },
  "Damone Clark": {
    "PlayerID": "4362636",
    "TeamID": "6"
  },
  "Trevon Diggs": {
    "PlayerID": "4040966",
    "TeamID": "6"
  },
  "Chauncey Golston": {
    "PlayerID": "4036132",
    "TeamID": "6"
  },
  "C.J. Goodwin": {
    "PlayerID": "17474",
    "TeamID": "6"
  },
  "KJ Henry": {
    "PlayerID": "4360308",
    "TeamID": "6"
  },
  "Malik Hooker": {
    "PlayerID": "3121415",
    "TeamID": "6"
  },
  "Buddy Johnson": {
    "PlayerID": "4240900",
    "TeamID": "6"
  },
  "Linval Joseph": {
    "PlayerID": "13281",
    "TeamID": "6"
  },
  "Eric Kendricks": {
    "PlayerID": "2510863",
    "TeamID": "6"
  },
  "Marshawn Kneeland": {
    "PlayerID": "4429996",
    "TeamID": "6"
  },
  "Carl Lawson": {
    "PlayerID": "3051911",
    "TeamID": "6"
  },
  "Jourdan Lewis": {
    "PlayerID": "3045207",
    "TeamID": "6"
  },
  "Marist Liufau": {
    "PlayerID": "4427816",
    "TeamID": "6"
  },
  "Israel Mukuamu": {
    "PlayerID": "4362855",
    "TeamID": "6"
  },
  "Osa Odighizuwa": {
    "PlayerID": "4035840",
    "TeamID": "6"
  },
  "Amani Oruwariye": {
    "PlayerID": "3116175",
    "TeamID": "6"
  },
  "DeMarvion Overshown": {
    "PlayerID": "4362088",
    "TeamID": "6"
  },
  "Micah Parsons": {
    "PlayerID": "4361423",
    "TeamID": "6"
  },
  "Mazi Smith": {
    "PlayerID": "4426347",
    "TeamID": "6"
  },
  "Juanyeh Thomas": {
    "PlayerID": "4360590",
    "TeamID": "6"
  },
  "Nick Vigil": {
    "PlayerID": "2971816",
    "TeamID": "6"
  },
  "Carlos Watkins": {
    "PlayerID": "2977681",
    "TeamID": "6"
  },
  "Tyrus Wheat": {
    "PlayerID": "4689333",
    "TeamID": "6"
  },
  "Donovan Wilson": {
    "PlayerID": "3122135",
    "TeamID": "6"
  },
  "Bryan Anger": {
    "PlayerID": "14950",
    "TeamID": "6"
  },
  "Brandon Aubrey": {
    "PlayerID": "3953687",
    "TeamID": "6"
  },
  "Trent Sieg": {
    "PlayerID": "3052357",
    "TeamID": "6"
  },
  "DaRon Bland": {
    "PlayerID": "4248911",
    "TeamID": "6"
  },
  "Earl Bostick Jr.": {
    "PlayerID": "4241317",
    "TeamID": "6"
  },
  "Brandin Cooks": {
    "PlayerID": "16731",
    "TeamID": "6"
  },
  "Chuma Edoga": {
    "PlayerID": "3701582",
    "TeamID": "6"
  },
  "Durrell Johnson": {
    "PlayerID": "4689607",
    "TeamID": "6"
  },
  "DeMarcus Lawrence": {
    "PlayerID": "16802",
    "TeamID": "6"
  },
  "Jordan Phillips": {
    "PlayerID": "2577466",
    "TeamID": "6"
  },
  "Nathan Thomas": {
    "PlayerID": "4428656",
    "TeamID": "6"
  },
  "Sam Williams": {
    "PlayerID": "4567242",
    "TeamID": "6"
  },
  "Josh Ball": {
    "PlayerID": "4035626",
    "TeamID": "6"
  },
  "Josh Butler": {
    "PlayerID": "3929814",
    "TeamID": "6"
  },
  "Dalvin Cook": {
    "PlayerID": "3116593",
    "TeamID": "6"
  },
  "Malik Davis": {
    "PlayerID": "4240603",
    "TeamID": "6"
  },
  "Denzel Daxon": {
    "PlayerID": "4577735",
    "TeamID": "6"
  },
  "Princeton Fant": {
    "PlayerID": "4242442",
    "TeamID": "6"
  },
  "Kemon Hall": {
    "PlayerID": "4243831",
    "TeamID": "6"
  },
  "Kelvin Harmon": {
    "PlayerID": "4036163",
    "TeamID": "6"
  },
  "Darius Harris": {
    "PlayerID": "3122906",
    "TeamID": "6"
  },
  "Phil Hoskins": {
    "PlayerID": "4259989",
    "TeamID": "6"
  },
  "Emany Johnson": {
    "PlayerID": "4361437",
    "TeamID": "6"
  },
  "Brock Mogensen": {
    "PlayerID": "4382826",
    "TeamID": "6"
  },
  "Jalen Moreno-Cropper": {
    "PlayerID": "4426990",
    "TeamID": "6"
  },
  "Dakoda Shepley": {
    "PlayerID": "4335942",
    "TeamID": "6"
  },
  "Nate Adkins": {
    "PlayerID": "4383440",
    "TeamID": "7"
  },
  "Garett Bolles": {
    "PlayerID": "4035662",
    "TeamID": "7"
  },
  "Michael Burton": {
    "PlayerID": "2515270",
    "TeamID": "7"
  },
  "Frank Crum": {
    "PlayerID": "4361691",
    "TeamID": "7"
  },
  "Greg Dulcich": {
    "PlayerID": "4367209",
    "TeamID": "7"
  },
  "Alex Forsyth": {
    "PlayerID": "4242503",
    "TeamID": "7"
  },
  "Troy Franklin": {
    "PlayerID": "4431280",
    "TeamID": "7"
  },
  "Lil'Jordan Humphrey": {
    "PlayerID": "4039057",
    "TeamID": "7"
  },
  "Lucas Krull": {
    "PlayerID": "4360231",
    "TeamID": "7"
  },
  "Jaleel McLaughlin": {
    "PlayerID": "4722893",
    "TeamID": "7"
  },
  "Quinn Meinerz": {
    "PlayerID": "4608138",
    "TeamID": "7"
  },
  "Marvin Mims Jr.": {
    "PlayerID": "4686472",
    "TeamID": "7"
  },
  "Bo Nix": {
    "PlayerID": "4426338",
    "TeamID": "7"
  },
  "Alex Palczewski": {
    "PlayerID": "4240551",
    "TeamID": "7"
  },
  "Matt Peart": {
    "PlayerID": "3921936",
    "TeamID": "7"
  },
  "Ben Powers": {
    "PlayerID": "4037650",
    "TeamID": "7"
  },
  "Josh Reynolds": {
    "PlayerID": "3115306",
    "TeamID": "7"
  },
  "Jarrett Stidham": {
    "PlayerID": "3892775",
    "TeamID": "7"
  },
  "Courtland Sutton": {
    "PlayerID": "3128429",
    "TeamID": "7"
  },
  "Adam Trautman": {
    "PlayerID": "3911853",
    "TeamID": "7"
  },
  "Devaughn Vele": {
    "PlayerID": "4569559",
    "TeamID": "7"
  },
  "Blake Watson": {
    "PlayerID": "4361604",
    "TeamID": "7"
  },
  "Luke Wattenberg": {
    "PlayerID": "4039018",
    "TeamID": "7"
  },
  "Javonte Williams": {
    "PlayerID": "4361579",
    "TeamID": "7"
  },
  "Zach Wilson": {
    "PlayerID": "4361259",
    "TeamID": "7"
  },
  "Kris Abrams-Draine": {
    "PlayerID": "4429193",
    "TeamID": "7"
  },
  "Zach Allen": {
    "PlayerID": "3915282",
    "TeamID": "7"
  },
  "Levelle Bailey": {
    "PlayerID": "4428241",
    "TeamID": "7"
  },
  "Cody Barton": {
    "PlayerID": "3926229",
    "TeamID": "7"
  },
  "Nik Bonitto": {
    "PlayerID": "4360259",
    "TeamID": "7"
  },
  "Jonathon Cooper": {
    "PlayerID": "4040608",
    "TeamID": "7"
  },
  "Jonah Elliss": {
    "PlayerID": "4687592",
    "TeamID": "7"
  },
  "John Franklin-Myers": {
    "PlayerID": "3120464",
    "TeamID": "7"
  },
  "Jordan Jackson": {
    "PlayerID": "4261090",
    "TeamID": "7"
  },
  "Brandon Jones": {
    "PlayerID": "4039059",
    "TeamID": "7"
  },
  "D.J. Jones": {
    "PlayerID": "3894915",
    "TeamID": "7"
  },
  "Devon Key": {
    "PlayerID": "4037559",
    "TeamID": "7"
  },
  "P.J. Locke": {
    "PlayerID": "3929850",
    "TeamID": "7"
  },
  "Ja'Quan McMillian": {
    "PlayerID": "4567462",
    "TeamID": "7"
  },
  "Riley Moss": {
    "PlayerID": "4382401",
    "TeamID": "7"
  },
  "Malcolm Roach": {
    "PlayerID": "4039064",
    "TeamID": "7"
  },
  "JL Skinner": {
    "PlayerID": "4428503",
    "TeamID": "7"
  },
  "Keidron Smith": {
    "PlayerID": "4372418",
    "TeamID": "7"
  },
  "Tremon Smith": {
    "PlayerID": "3134448",
    "TeamID": "7"
  },
  "Justin Strnad": {
    "PlayerID": "3919548",
    "TeamID": "7"
  },
  "Pat Surtain II": {
    "PlayerID": "4372012",
    "TeamID": "7"
  },
  "Dondrea Tillman": {
    "PlayerID": "5216101",
    "TeamID": "7"
  },
  "Eyioma Uwazurike": {
    "PlayerID": "4066109",
    "TeamID": "7"
  },
  "Levi Wallace": {
    "PlayerID": "3133440",
    "TeamID": "7"
  },
  "Kristian Welch": {
    "PlayerID": "4036153",
    "TeamID": "7"
  },
  "Riley Dixon": {
    "PlayerID": "2577619",
    "TeamID": "7"
  },
  "Mitchell Fraboni": {
    "PlayerID": "3139166",
    "TeamID": "7"
  },
  "Wil Lutz": {
    "PlayerID": "2985659",
    "TeamID": "7"
  },
  "Tyler Badie": {
    "PlayerID": "4362748",
    "TeamID": "7"
  },
  "Quinn Bailey": {
    "PlayerID": "3128773",
    "TeamID": "7"
  },
  "Baron Browning": {
    "PlayerID": "4241987",
    "TeamID": "7"
  },
  "Audric Estime": {
    "PlayerID": "4569682",
    "TeamID": "7"
  },
  "Damarri Mathis": {
    "PlayerID": "4240707",
    "TeamID": "7"
  },
  "Mike McGlinchey": {
    "PlayerID": "3052885",
    "TeamID": "7"
  },
  "Drew Sanders": {
    "PlayerID": "4685721",
    "TeamID": "7"
  },
  "Alex Singleton": {
    "PlayerID": "2612151",
    "TeamID": "7"
  },
  "Delarrin Turner-Yell": {
    "PlayerID": "4360287",
    "TeamID": "7"
  },
  "Salvon Ahmed": {
    "PlayerID": "4243315",
    "TeamID": "7"
  },
  "Kwon Alexander": {
    "PlayerID": "2976541",
    "TeamID": "7"
  },
  "Michael Bandy": {
    "PlayerID": "4034704",
    "TeamID": "7"
  },
  "Zach Cunningham": {
    "PlayerID": "3051750",
    "TeamID": "7"
  },
  "Andrew Farmer": {
    "PlayerID": "4394894",
    "TeamID": "7"
  },
  "Nick Gargiulo": {
    "PlayerID": "4368033",
    "TeamID": "7"
  },
  "Matt Henningsen": {
    "PlayerID": "4242358",
    "TeamID": "7"
  },
  "Tanner McCalister": {
    "PlayerID": "4361824",
    "TeamID": "7"
  },
  "Jordan Miller": {
    "PlayerID": "4362524",
    "TeamID": "7"
  },
  "Quinton Newsome": {
    "PlayerID": "4428113",
    "TeamID": "7"
  },
  "Donald Parham Jr.": {
    "PlayerID": "3912092",
    "TeamID": "7"
  },
  "Will Sherman": {
    "PlayerID": "4243186",
    "TeamID": "7"
  },
  "David Sills V": {
    "PlayerID": "3871102",
    "TeamID": "7"
  },
  "Reese Taylor": {
    "PlayerID": "4371946",
    "TeamID": "7"
  },
  "Calvin Throckmorton": {
    "PlayerID": "3915147",
    "TeamID": "7"
  },
  "Thomas Yassmin": {
    "PlayerID": "4361027",
    "TeamID": "7"
  },
  "Kayode Awosika": {
    "PlayerID": "4040842",
    "TeamID": "8"
  },
  "Taylor Decker": {
    "PlayerID": "2976292",
    "TeamID": "8"
  },
  "Jahmyr Gibbs": {
    "PlayerID": "4429795",
    "TeamID": "8"
  },
  "Graham Glasgow": {
    "PlayerID": "2576245",
    "TeamID": "8"
  },
  "Jared Goff": {
    "PlayerID": "3046779",
    "TeamID": "8"
  },
  "Parker Hesse": {
    "PlayerID": "3144991",
    "TeamID": "8"
  },
  "Hendon Hooker": {
    "PlayerID": "4240858",
    "TeamID": "8"
  },
  "Justin Jackson": {
    "PlayerID": "3116136",
    "TeamID": "8"
  },
  "Sam LaPorta": {
    "PlayerID": "4430027",
    "TeamID": "8"
  },
  "Giovanni Manu": {
    "PlayerID": "5209589",
    "TeamID": "8"
  },
  "David Montgomery": {
    "PlayerID": "4035538",
    "TeamID": "8"
  },
  "Michael Niese": {
    "PlayerID": "4051353",
    "TeamID": "8"
  },
  "Tim Patrick": {
    "PlayerID": "3134353",
    "TeamID": "8"
  },
  "Frank Ragnow": {
    "PlayerID": "3128689",
    "TeamID": "8"
  },
  "Kalif Raymond": {
    "PlayerID": "2973405",
    "TeamID": "8"
  },
  "Craig Reynolds": {
    "PlayerID": "4421446",
    "TeamID": "8"
  },
  "Allen Robinson": {
    "PlayerID": "16799",
    "TeamID": "8"
  },
  "Penei Sewell": {
    "PlayerID": "4373825",
    "TeamID": "8"
  },
  "Dan Skipper": {
    "PlayerID": "3046435",
    "TeamID": "8"
  },
  "Colby Sorsdal": {
    "PlayerID": "4367775",
    "TeamID": "8"
  },
  "Amon-Ra St. Brown": {
    "PlayerID": "4374302",
    "TeamID": "8"
  },
  "Sione Vaki": {
    "PlayerID": "4912274",
    "TeamID": "8"
  },
  "Isaiah Williams": {
    "PlayerID": "4569371",
    "TeamID": "8"
  },
  "Jameson Williams": {
    "PlayerID": "4426388",
    "TeamID": "8"
  },
  "Brock Wright": {
    "PlayerID": "4242392",
    "TeamID": "8"
  },
  "Kevin Zeitler": {
    "PlayerID": "14931",
    "TeamID": "8"
  },
  "Alex Anzalone": {
    "PlayerID": "3043107",
    "TeamID": "8"
  },
  "Terrion Arnold": {
    "PlayerID": "4592837",
    "TeamID": "8"
  },
  "Brian Branch": {
    "PlayerID": "4692025",
    "TeamID": "8"
  },
  "Jack Campbell": {
    "PlayerID": "4569465",
    "TeamID": "8"
  },
  "Carlton Davis III": {
    "PlayerID": "3916923",
    "TeamID": "8"
  },
  "Khalil Dorsey": {
    "PlayerID": "4027919",
    "TeamID": "8"
  },
  "James Houston": {
    "PlayerID": "4240608",
    "TeamID": "8"
  },
  "Aidan Hutchinson": {
    "PlayerID": "4372099",
    "TeamID": "8"
  },
  "Brandon Joseph": {
    "PlayerID": "4569604",
    "TeamID": "8"
  },
  "Kerby Joseph": {
    "PlayerID": "4360383",
    "TeamID": "8"
  },
  "Alim McNeill": {
    "PlayerID": "4361662",
    "TeamID": "8"
  },
  "Ben Niemann": {
    "PlayerID": "3140643",
    "TeamID": "8"
  },
  "Trevor Nowaske": {
    "PlayerID": "5144894",
    "TeamID": "8"
  },
  "Levi Onwuzurike": {
    "PlayerID": "4039020",
    "TeamID": "8"
  },
  "Josh Paschal": {
    "PlayerID": "4259994",
    "TeamID": "8"
  },
  "Kyle Peko": {
    "PlayerID": "3134288",
    "TeamID": "8"
  },
  "Ennis Rakestraw Jr.": {
    "PlayerID": "4566092",
    "TeamID": "8"
  },
  "DJ Reader": {
    "PlayerID": "2977670",
    "TeamID": "8"
  },
  "Jalen Reeves-Maybin": {
    "PlayerID": "3044729",
    "TeamID": "8"
  },
  "Amik Robertson": {
    "PlayerID": "4239694",
    "TeamID": "8"
  },
  "Malcolm Rodriguez": {
    "PlayerID": "4241411",
    "TeamID": "8"
  },
  "Loren Strickland": {
    "PlayerID": "4917439",
    "TeamID": "8"
  },
  "Kindle Vildor": {
    "PlayerID": "4036651",
    "TeamID": "8"
  },
  "Mekhi Wingo": {
    "PlayerID": "4586333",
    "TeamID": "8"
  },
  "Jake Bates": {
    "PlayerID": "4689936",
    "TeamID": "8"
  },
  "Jack Fox": {
    "PlayerID": "3916370",
    "TeamID": "8"
  },
  "Hogan Hatten": {
    "PlayerID": "4571755",
    "TeamID": "8"
  },
  "David Bada": {
    "PlayerID": "4686421",
    "TeamID": "8"
  },
  "Michael Badgley": {
    "PlayerID": "3123052",
    "TeamID": "8"
  },
  "Derrick Barnes": {
    "PlayerID": "4260409",
    "TeamID": "8"
  },
  "John Cominsky": {
    "PlayerID": "4411771",
    "TeamID": "8"
  },
  "Marcus Davenport": {
    "PlayerID": "3124058",
    "TeamID": "8"
  },
  "Connor Galvin": {
    "PlayerID": "4373028",
    "TeamID": "8"
  },
  "Antoine Green": {
    "PlayerID": "4373266",
    "TeamID": "8"
  },
  "Nate Lynn": {
    "PlayerID": "4574142",
    "TeamID": "8"
  },
  "Christian Mahogany": {
    "PlayerID": "4427864",
    "TeamID": "8"
  },
  "Brodric Martin": {
    "PlayerID": "4365457",
    "TeamID": "8"
  },
  "Ifeatu Melifonwu": {
    "PlayerID": "4240401",
    "TeamID": "8"
  },
  "Emmanuel Moseley": {
    "PlayerID": "3115337",
    "TeamID": "8"
  },
  "Netane Muti": {
    "PlayerID": "4040910",
    "TeamID": "8"
  },
  "Tre'Quan Smith": {
    "PlayerID": "3128451",
    "TeamID": "8"
  },
  "Mitchell Agude": {
    "PlayerID": "4591235",
    "TeamID": "8"
  },
  "Abraham Beauplan": {
    "PlayerID": "4686533",
    "TeamID": "8"
  },
  "Kingsley Eguakun": {
    "PlayerID": "4567410",
    "TeamID": "8"
  },
  "Jake Fromm": {
    "PlayerID": "4240689",
    "TeamID": "8"
  },
  "Erick Hallett II": {
    "PlayerID": "4373320",
    "TeamID": "8"
  },
  "Jermar Jefferson": {
    "PlayerID": "4374033",
    "TeamID": "8"
  },
  "Tom Kennedy": {
    "PlayerID": "3126997",
    "TeamID": "8"
  },
  "Matt McCrane": {
    "PlayerID": "3052413",
    "TeamID": "8"
  },
  "James Mitchell": {
    "PlayerID": "4361988",
    "TeamID": "8"
  },
  "Morice Norris": {
    "PlayerID": "4880777",
    "TeamID": "8"
  },
  "Pat O'Connor": {
    "PlayerID": "2980206",
    "TeamID": "8"
  },
  "Donovan Peoples-Jones": {
    "PlayerID": "4258195",
    "TeamID": "8"
  },
  "Chris Smith": {
    "PlayerID": "4367835",
    "TeamID": "8"
  },
  "Isaac Ukwu": {
    "PlayerID": "4249608",
    "TeamID": "8"
  },
  "Shane Zylstra": {
    "PlayerID": "4608362",
    "TeamID": "8"
  },
  "Andrew Beck": {
    "PlayerID": "3125107",
    "TeamID": "9"
  },
  "Chris Brooks": {
    "PlayerID": "3149687",
    "TeamID": "9"
  },
  "Andre Dillard": {
    "PlayerID": "3127264",
    "TeamID": "9"
  },
  "Romeo Doubs": {
    "PlayerID": "4361432",
    "TeamID": "9"
  },
  "Travis Glover": {
    "PlayerID": "4361904",
    "TeamID": "9"
  },
  "Malik Heath": {
    "PlayerID": "4689334",
    "TeamID": "9"
  },
  "Josh Jacobs": {
    "PlayerID": "4047365",
    "TeamID": "9"
  },
  "Elgton Jenkins": {
    "PlayerID": "3115485",
    "TeamID": "9"
  },
  "Tucker Kraft": {
    "PlayerID": "4572680",
    "TeamID": "9"
  },
  "Jordan Love": {
    "PlayerID": "4036378",
    "TeamID": "9"
  },
  "Bo Melton": {
    "PlayerID": "4259305",
    "TeamID": "9"
  },
  "Jacob Monk": {
    "PlayerID": "4428037",
    "TeamID": "9"
  },
  "Jordan Morgan": {
    "PlayerID": "3821571",
    "TeamID": "9"
  },
  "Luke Musgrave": {
    "PlayerID": "4428085",
    "TeamID": "9"
  },
  "Josh Myers": {
    "PlayerID": "4242000",
    "TeamID": "9"
  },
  "Jayden Reed": {
    "PlayerID": "4362249",
    "TeamID": "9"
  },
  "Sean Rhyan": {
    "PlayerID": "4426411",
    "TeamID": "9"
  },
  "Ben Sims": {
    "PlayerID": "4373030",
    "TeamID": "9"
  },
  "Kadeem Telfort": {
    "PlayerID": "4240615",
    "TeamID": "9"
  },
  "Zach Tom": {
    "PlayerID": "4240435",
    "TeamID": "9"
  },
  "Rasheed Walker": {
    "PlayerID": "4361429",
    "TeamID": "9"
  },
  "Christian Watson": {
    "PlayerID": "4248528",
    "TeamID": "9"
  },
  "Dontayvion Wicks": {
    "PlayerID": "4428850",
    "TeamID": "9"
  },
  "Malik Willis": {
    "PlayerID": "4242512",
    "TeamID": "9"
  },
  "Emanuel Wilson": {
    "PlayerID": "4887558",
    "TeamID": "9"
  },
  "Jaire Alexander": {
    "PlayerID": "3895429",
    "TeamID": "9"
  },
  "Zayne Anderson": {
    "PlayerID": "3932335",
    "TeamID": "9"
  },
  "Corey Ballentine": {
    "PlayerID": "4411769",
    "TeamID": "9"
  },
  "Karl Brooks": {
    "PlayerID": "4373423",
    "TeamID": "9"
  },
  "Javon Bullard": {
    "PlayerID": "4688930",
    "TeamID": "9"
  },
  "Kenny Clark": {
    "PlayerID": "3122752",
    "TeamID": "9"
  },
  "Edgerrin Cooper": {
    "PlayerID": "4430438",
    "TeamID": "9"
  },
  "Brenton Cox Jr.": {
    "PlayerID": "4361776",
    "TeamID": "9"
  },
  "Kingsley Enagbare": {
    "PlayerID": "4362840",
    "TeamID": "9"
  },
  "Rashan Gary": {
    "PlayerID": "4046523",
    "TeamID": "9"
  },
  "Ty'Ron Hopper": {
    "PlayerID": "4567406",
    "TeamID": "9"
  },
  "Isaiah McDuffie": {
    "PlayerID": "4239947",
    "TeamID": "9"
  },
  "Xavier McKinney": {
    "PlayerID": "4241470",
    "TeamID": "9"
  },
  "Arron Mosby": {
    "PlayerID": "4242996",
    "TeamID": "9"
  },
  "Keisean Nixon": {
    "PlayerID": "4259493",
    "TeamID": "9"
  },
  "Kitan Oladapo": {
    "PlayerID": "4374037",
    "TeamID": "9"
  },
  "Robert Rochell": {
    "PlayerID": "4032200",
    "TeamID": "9"
  },
  "T.J. Slaton": {
    "PlayerID": "4240612",
    "TeamID": "9"
  },
  "Preston Smith": {
    "PlayerID": "2577446",
    "TeamID": "9"
  },
  "Eric Stokes": {
    "PlayerID": "4259561",
    "TeamID": "9"
  },
  "Carrington Valentine": {
    "PlayerID": "4430965",
    "TeamID": "9"
  },
  "Lukas Van Ness": {
    "PlayerID": "4686906",
    "TeamID": "9"
  },
  "Quay Walker": {
    "PlayerID": "4379416",
    "TeamID": "9"
  },
  "Evan Williams": {
    "PlayerID": "4428863",
    "TeamID": "9"
  },
  "Eric Wilson": {
    "PlayerID": "3056916",
    "TeamID": "9"
  },
  "Colby Wooden": {
    "PlayerID": "4567224",
    "TeamID": "9"
  },
  "Devonte Wyatt": {
    "PlayerID": "4361791",
    "TeamID": "9"
  },
  "Brayden Narveson": {
    "PlayerID": "4361765",
    "TeamID": "9"
  },
  "Matt Orzech": {
    "PlayerID": "4422336",
    "TeamID": "9"
  },
  "Daniel Whelan": {
    "PlayerID": "4248789",
    "TeamID": "9"
  },
  "Tyler Davis": {
    "PlayerID": "4568217",
    "TeamID": "14"
  },
  "AJ Dillon": {
    "PlayerID": "4239934",
    "TeamID": "9"
  },
  "Jonathan Ford": {
    "PlayerID": "4259762",
    "TeamID": "9"
  },
  "Ralen Goforth": {
    "PlayerID": "4427294",
    "TeamID": "9"
  },
  "MarShawn Lloyd": {
    "PlayerID": "4429023",
    "TeamID": "9"
  },
  "Deslin Alexandre": {
    "PlayerID": "4240728",
    "TeamID": "9"
  },
  "Omar Brown": {
    "PlayerID": "4426794",
    "TeamID": "9"
  },
  "Sean Clifford": {
    "PlayerID": "4259592",
    "TeamID": "9"
  },
  "James Ester": {
    "PlayerID": "4429576",
    "TeamID": "9"
  },
  "Kamal Hadden": {
    "PlayerID": "4427356",
    "TeamID": "9"
  },
  "Alex Hale": {
    "PlayerID": "4361831",
    "TeamID": "9"
  },
  "Julian Hicks": {
    "PlayerID": "4244768",
    "TeamID": "9"
  },
  "Donovan Jennings": {
    "PlayerID": "4360887",
    "TeamID": "9"
  },
  "Cornelius Johnson": {
    "PlayerID": "4426479",
    "TeamID": "9"
  },
  "Kalen King": {
    "PlayerID": "4431433",
    "TeamID": "9"
  },
  "T.J. Luther": {
    "PlayerID": "4370162",
    "TeamID": "9"
  },
  "Ellis Merriweather": {
    "PlayerID": "4685016",
    "TeamID": "9"
  },
  "Chris Russell": {
    "PlayerID": "4430436",
    "TeamID": "9"
  },
  "Lecitus Smith": {
    "PlayerID": "4260223",
    "TeamID": "9"
  },
  "Messiah Swinson": {
    "PlayerID": "4362770",
    "TeamID": "9"
  },
  "Cam Akers": {
    "PlayerID": "4240021",
    "TeamID": "34"
  },
  "Nick Broeker": {
    "PlayerID": "4426498",
    "TeamID": "34"
  },
  "British Brooks": {
    "PlayerID": "4373273",
    "TeamID": "34"
  },
  "Nico Collins": {
    "PlayerID": "4258173",
    "TeamID": "34"
  },
  "Tank Dell": {
    "PlayerID": "4366031",
    "TeamID": "34"
  },
  "Stefon Diggs": {
    "PlayerID": "2976212",
    "TeamID": "34"
  },
  "Blake Fisher": {
    "PlayerID": "4432699",
    "TeamID": "34"
  },
  "Kendrick Green": {
    "PlayerID": "4240548",
    "TeamID": "34"
  },
  "Kenyon Green": {
    "PlayerID": "4426327",
    "TeamID": "34"
  },
  "Tytus Howard": {
    "PlayerID": "3131498",
    "TeamID": "34"
  },
  "Xavier Hutchinson": {
    "PlayerID": "4686422",
    "TeamID": "34"
  },
  "Shaq Mason": {
    "PlayerID": "2576917",
    "TeamID": "34"
  },
  "John Metchie III": {
    "PlayerID": "4567096",
    "TeamID": "34"
  },
  "Davis Mills": {
    "PlayerID": "4242546",
    "TeamID": "34"
  },
  "Joe Mixon": {
    "PlayerID": "3116385",
    "TeamID": "34"
  },
  "Dare Ogunbowale": {
    "PlayerID": "2983509",
    "TeamID": "34"
  },
  "Jarrett Patterson": {
    "PlayerID": "4372774",
    "TeamID": "34"
  },
  "Dameon Pierce": {
    "PlayerID": "4360238",
    "TeamID": "34"
  },
  "Dalton Schultz": {
    "PlayerID": "3117256",
    "TeamID": "34"
  },
  "Juice Scruggs": {
    "PlayerID": "4361425",
    "TeamID": "34"
  },
  "Steven Sims": {
    "PlayerID": "3917960",
    "TeamID": "34"
  },
  "Cade Stover": {
    "PlayerID": "4426496",
    "TeamID": "34"
  },
  "C.J. Stroud": {
    "PlayerID": "4432577",
    "TeamID": "34"
  },
  "J.J. Taylor": {
    "PlayerID": "4039607",
    "TeamID": "34"
  },
  "Laremy Tunsil": {
    "PlayerID": "3051890",
    "TeamID": "34"
  },
  "Robert Woods": {
    "PlayerID": "15880",
    "TeamID": "34"
  },
  "Azeez Al-Shaair": {
    "PlayerID": "3919117",
    "TeamID": "34"
  },
  "Will Anderson Jr.": {
    "PlayerID": "4685724",
    "TeamID": "34"
  },
  "Denico Autry": {
    "PlayerID": "17447",
    "TeamID": "34"
  },
  "Derek Barnett": {
    "PlayerID": "3115336",
    "TeamID": "34"
  },
  "Kris Boyd": {
    "PlayerID": "3929845",
    "TeamID": "34"
  },
  "Myles Bryant": {
    "PlayerID": "4039010",
    "TeamID": "34"
  },
  "Calen Bullock": {
    "PlayerID": "4431517",
    "TeamID": "34"
  },
  "Khalil Davis": {
    "PlayerID": "3699530",
    "TeamID": "34"
  },
  "Mario Edwards Jr.": {
    "PlayerID": "2969921",
    "TeamID": "34"
  },
  "Folorunso Fatukasi": {
    "PlayerID": "3045172",
    "TeamID": "34"
  },
  "Jake Hansen": {
    "PlayerID": "4033812",
    "TeamID": "34"
  },
  "Neville Hewitt": {
    "PlayerID": "3059880",
    "TeamID": "34"
  },
  "Jamal Hill": {
    "PlayerID": "4427479",
    "TeamID": "34"
  },
  "Dylan Horton": {
    "PlayerID": "4374066",
    "TeamID": "34"
  },
  "Danielle Hunter": {
    "PlayerID": "2976560",
    "TeamID": "34"
  },
  "Kamari Lassiter": {
    "PlayerID": "4602699",
    "TeamID": "34"
  },
  "Eric Murray": {
    "PlayerID": "2970716",
    "TeamID": "34"
  },
  "Del'Shawn Phillips": {
    "PlayerID": "4240528",
    "TeamID": "34"
  },
  "Jalen Pitre": {
    "PlayerID": "4241223",
    "TeamID": "34"
  },
  "D'Angelo Ross": {
    "PlayerID": "3139389",
    "TeamID": "34"
  },
  "Tim Settle Jr.": {
    "PlayerID": "3929956",
    "TeamID": "34"
  },
  "M.J. Stewart": {
    "PlayerID": "3116679",
    "TeamID": "34"
  },
  "Derek Stingley Jr.": {
    "PlayerID": "4426434",
    "TeamID": "34"
  },
  "Henry To'oTo'o": {
    "PlayerID": "4426350",
    "TeamID": "34"
  },
  "Jimmie Ward": {
    "PlayerID": "16717",
    "TeamID": "34"
  },
  "Rashad Weaver": {
    "PlayerID": "4036076",
    "TeamID": "34"
  },
  "Ka'imi Fairbairn": {
    "PlayerID": "2971573",
    "TeamID": "34"
  },
  "Tommy Townsend": {
    "PlayerID": "3915398",
    "TeamID": "34"
  },
  "Jon Weeks": {
    "PlayerID": "13729",
    "TeamID": "34"
  },
  "Christian Harris": {
    "PlayerID": "4567099",
    "TeamID": "34"
  },
  "LaDarius Henderson": {
    "PlayerID": "4427448",
    "TeamID": "34"
  },
  "Brandon Hill": {
    "PlayerID": "4568662",
    "TeamID": "34"
  },
  "Kurt Hinish": {
    "PlayerID": "4258594",
    "TeamID": "34"
  },
  "Jerry Hughes": {
    "PlayerID": "13245",
    "TeamID": "34"
  },
  "Brevin Jordan": {
    "PlayerID": "4362504",
    "TeamID": "34"
  },
  "Dalton Keene": {
    "PlayerID": "4240861",
    "TeamID": "34"
  },
  "Case Keenum": {
    "PlayerID": "15168",
    "TeamID": "34"
  },
  "Jeff Okudah": {
    "PlayerID": "4241984",
    "TeamID": "34"
  },
  "Jaylon Thomas": {
    "PlayerID": "4360561",
    "TeamID": "34"
  },
  "Shaun Bradley": {
    "PlayerID": "4038902",
    "TeamID": "34"
  },
  "Solomon Byrd": {
    "PlayerID": "4361689",
    "TeamID": "34"
  },
  "Troy Hairston": {
    "PlayerID": "4274040",
    "TeamID": "34"
  },
  "Marcus Harris": {
    "PlayerID": "4573152",
    "TeamID": "34"
  },
  "Xavier Johnson": {
    "PlayerID": "4385430",
    "TeamID": "34"
  },
  "Johnny Johnson III": {
    "PlayerID": "4242504",
    "TeamID": "34"
  },
  "Desmond King II": {
    "PlayerID": "3040145",
    "TeamID": "34"
  },
  "Chris Myarick": {
    "PlayerID": "3138744",
    "TeamID": "34"
  },
  "Troy Pride Jr.": {
    "PlayerID": "4046679",
    "TeamID": "34"
  },
  "Scott Quessenberry": {
    "PlayerID": "3047572",
    "TeamID": "34"
  },
  "David Sharpe": {
    "PlayerID": "3121656",
    "TeamID": "34"
  },
  "Kedon Slovis": {
    "PlayerID": "4428512",
    "TeamID": "34"
  },
  "Irv Smith Jr.": {
    "PlayerID": "4040980",
    "TeamID": "34"
  },
  "Tommy Togiai": {
    "PlayerID": "4361366",
    "TeamID": "34"
  },
  "Kilian Zierer": {
    "PlayerID": "4689088",
    "TeamID": "34"
  },
  "Mo Alie-Cox": {
    "PlayerID": "2998565",
    "TeamID": "11"
  },
  "Tanor Bortolini": {
    "PlayerID": "4430957",
    "TeamID": "11"
  },
  "Josh Downs": {
    "PlayerID": "4688813",
    "TeamID": "11"
  },
  "Ashton Dulin": {
    "PlayerID": "4061956",
    "TeamID": "11"
  },
  "Sam Ehlinger": {
    "PlayerID": "4241820",
    "TeamID": "11"
  },
  "Joe Flacco": {
    "PlayerID": "11252",
    "TeamID": "11"
  },
  "Blake Freeland": {
    "PlayerID": "4429636",
    "TeamID": "11"
  },
  "Will Fries": {
    "PlayerID": "4045176",
    "TeamID": "11"
  },
  "Matt Goncalves": {
    "PlayerID": "4427298",
    "TeamID": "11"
  },
  "Tyler Goodson": {
    "PlayerID": "4429676",
    "TeamID": "11"
  },
  "Anthony Gould": {
    "PlayerID": "4429684",
    "TeamID": "11"
  },
  "Kylen Granson": {
    "PlayerID": "4039160",
    "TeamID": "11"
  },
  "Evan Hull": {
    "PlayerID": "4569609",
    "TeamID": "11"
  },
  "Ryan Kelly": {
    "PlayerID": "2578475",
    "TeamID": "11"
  },
  "Will Mallory": {
    "PlayerID": "4362523",
    "TeamID": "11"
  },
  "Adonai Mitchell": {
    "PlayerID": "4597500",
    "TeamID": "11"
  },
  "Quenton Nelson": {
    "PlayerID": "3129308",
    "TeamID": "11"
  },
  "Drew Ogletree": {
    "PlayerID": "4722908",
    "TeamID": "11"
  },
  "Alec Pierce": {
    "PlayerID": "4360078",
    "TeamID": "11"
  },
  "Danny Pinter": {
    "PlayerID": "3915470",
    "TeamID": "11"
  },
  "Michael Pittman Jr.": {
    "PlayerID": "4035687",
    "TeamID": "11"
  },
  "Bernhard Raimann": {
    "PlayerID": "4362580",
    "TeamID": "11"
  },
  "Anthony Richardson": {
    "PlayerID": "4429084",
    "TeamID": "11"
  },
  "Trey Sermon": {
    "PlayerID": "4241401",
    "TeamID": "11"
  },
  "Braden Smith": {
    "PlayerID": "3121595",
    "TeamID": "11"
  },
  "Jonathan Taylor": {
    "PlayerID": "4242335",
    "TeamID": "11"
  },
  "Dalton Tucker": {
    "PlayerID": "4370363",
    "TeamID": "11"
  },
  "Adetomiwa Adebawore": {
    "PlayerID": "4427635",
    "TeamID": "11"
  },
  "Genard Avery": {
    "PlayerID": "3126204",
    "TeamID": "11"
  },
  "Julian Blackmon": {
    "PlayerID": "4035661",
    "TeamID": "11"
  },
  "Taven Bryan": {
    "PlayerID": "3115249",
    "TeamID": "11"
  },
  "Jaylon Carlies": {
    "PlayerID": "4601021",
    "TeamID": "11"
  },
  "Nick Cross": {
    "PlayerID": "4426403",
    "TeamID": "11"
  },
  "Raekwon Davis": {
    "PlayerID": "4040965",
    "TeamID": "11"
  },
  "Trevor Denbow": {
    "PlayerID": "4360538",
    "TeamID": "11"
  },
  "Dallis Flowers": {
    "PlayerID": "4917592",
    "TeamID": "11"
  },
  "Zaire Franklin": {
    "PlayerID": "3124005",
    "TeamID": "11"
  },
  "Adam Gotsis": {
    "PlayerID": "2971498",
    "TeamID": "11"
  },
  "Chris Lammons": {
    "PlayerID": "3128630",
    "TeamID": "11"
  },
  "Isaiah Land": {
    "PlayerID": "4574551",
    "TeamID": "11"
  },
  "Laiatu Latu": {
    "PlayerID": "4426473",
    "TeamID": "11"
  },
  "David Long Jr.": {
    "PlayerID": "3916074",
    "TeamID": "15"
  },
  "Kenny Moore II": {
    "PlayerID": "4218312",
    "TeamID": "11"
  },
  "Dayo Odeyingbo": {
    "PlayerID": "4242659",
    "TeamID": "11"
  },
  "Segun Olubi": {
    "PlayerID": "4260703",
    "TeamID": "11"
  },
  "Kwity Paye": {
    "PlayerID": "4258194",
    "TeamID": "11"
  },
  "E.J. Speed": {
    "PlayerID": "3071353",
    "TeamID": "11"
  },
  "Grover Stewart": {
    "PlayerID": "4058825",
    "TeamID": "11"
  },
  "Grant Stuard": {
    "PlayerID": "4240255",
    "TeamID": "11"
  },
  "Rodney Thomas II": {
    "PlayerID": "4248455",
    "TeamID": "11"
  },
  "Samuel Womack III": {
    "PlayerID": "4280416",
    "TeamID": "11"
  },
  "Matt Gay": {
    "PlayerID": "4249087",
    "TeamID": "11"
  },
  "Luke Rhodes": {
    "PlayerID": "2566045",
    "TeamID": "11"
  },
  "Rigoberto Sanchez": {
    "PlayerID": "3914922",
    "TeamID": "11"
  },
  "JuJu Brents": {
    "PlayerID": "4360488",
    "TeamID": "11"
  },
  "DeForest Buckner": {
    "PlayerID": "2971282",
    "TeamID": "11"
  },
  "Ryan Coll": {
    "PlayerID": "4573473",
    "TeamID": "11"
  },
  "Samson Ebukam": {
    "PlayerID": "3045527",
    "TeamID": "11"
  },
  "Wesley French": {
    "PlayerID": "3916746",
    "TeamID": "11"
  },
  "Tyquan Lewis": {
    "PlayerID": "3040513",
    "TeamID": "11"
  },
  "Cameron McGrone": {
    "PlayerID": "4372085",
    "TeamID": "11"
  },
  "Daniel Scott": {
    "PlayerID": "4242415",
    "TeamID": "11"
  },
  "Juwann Winfree": {
    "PlayerID": "3128317",
    "TeamID": "11"
  },
  "Jelani Woods": {
    "PlayerID": "4241410",
    "TeamID": "11"
  },
  "Austin Ajiake": {
    "PlayerID": "4374171",
    "TeamID": "11"
  },
  "Liam Anderson": {
    "PlayerID": "4368056",
    "TeamID": "11"
  },
  "Jason Bean": {
    "PlayerID": "4360900",
    "TeamID": "11"
  },
  "Josiah Bronson": {
    "PlayerID": "3923400",
    "TeamID": "11"
  },
  "Marcel Dabo": {
    "PlayerID": "5054377",
    "TeamID": "11"
  },
  "Ronnie Harrison Jr.": {
    "PlayerID": "3859006",
    "TeamID": "11"
  },
  "Alex Johnson": {
    "PlayerID": "4367181",
    "TeamID": "11"
  },
  "Kelvin Joseph": {
    "PlayerID": "4362629",
    "TeamID": "11"
  },
  "Gregory Junior": {
    "PlayerID": "4400960",
    "TeamID": "11"
  },
  "Titus Leo": {
    "PlayerID": "4368468",
    "TeamID": "11"
  },
  "Atonio Mafi": {
    "PlayerID": "4367202",
    "TeamID": "11"
  },
  "Sean McKeon": {
    "PlayerID": "4036275",
    "TeamID": "11"
  },
  "D.J. Montgomery": {
    "PlayerID": "4249030",
    "TeamID": "11"
  },
  "Derek Rivers": {
    "PlayerID": "3049268",
    "TeamID": "11"
  },
  "Jaylin Simpson": {
    "PlayerID": "4567225",
    "TeamID": "11"
  },
  "Laquon Treadwell": {
    "PlayerID": "3051889",
    "TeamID": "11"
  },
  "Tank Bigsby": {
    "PlayerID": "4429013",
    "TeamID": "30"
  },
  "Ezra Cleveland": {
    "PlayerID": "4048231",
    "TeamID": "30"
  },
  "Gabe Davis": {
    "PlayerID": "4243537",
    "TeamID": "30"
  },
  "Josiah Deguara": {
    "PlayerID": "3914151",
    "TeamID": "30"
  },
  "Devin Duvernay": {
    "PlayerID": "4039050",
    "TeamID": "30"
  },
  "Evan Engram": {
    "PlayerID": "3051876",
    "TeamID": "30"
  },
  "Travis Etienne Jr.": {
    "PlayerID": "4239996",
    "TeamID": "30"
  },
  "Luke Farrell": {
    "PlayerID": "4040612",
    "TeamID": "30"
  },
  "Luke Fortner": {
    "PlayerID": "4035048",
    "TeamID": "30"
  },
  "Javon Foster": {
    "PlayerID": "4362769",
    "TeamID": "30"
  },
  "Anton Harrison": {
    "PlayerID": "4692525",
    "TeamID": "30"
  },
  "Cooper Hodges": {
    "PlayerID": "4360786",
    "TeamID": "30"
  },
  "D'Ernest Johnson": {
    "PlayerID": "3139602",
    "TeamID": "30"
  },
  "Mac Jones": {
    "PlayerID": "4241464",
    "TeamID": "30"
  },
  "Tim Jones": {
    "PlayerID": "4245131",
    "TeamID": "30"
  },
  "Christian Kirk": {
    "PlayerID": "3895856",
    "TeamID": "30"
  },
  "Trevor Lawrence": {
    "PlayerID": "4360310",
    "TeamID": "30"
  },
  "Walker Little": {
    "PlayerID": "4242554",
    "TeamID": "30"
  },
  "Mitch Morse": {
    "PlayerID": "2514122",
    "TeamID": "30"
  },
  "Cam Robinson": {
    "PlayerID": "3115313",
    "TeamID": "30"
  },
  "Brandon Scherff": {
    "PlayerID": "2511708",
    "TeamID": "30"
  },
  "Brenton Strange": {
    "PlayerID": "4430539",
    "TeamID": "30"
  },
  "Brian Thomas Jr.": {
    "PlayerID": "4432773",
    "TeamID": "30"
  },
  "Cole Van Lanen": {
    "PlayerID": "4035791",
    "TeamID": "30"
  },
  "Parker Washington": {
    "PlayerID": "4432620",
    "TeamID": "30"
  },
  "Yasir Abdullah": {
    "PlayerID": "4360807",
    "TeamID": "30"
  },
  "Arik Armstead": {
    "PlayerID": "2971275",
    "TeamID": "30"
  },
  "Montaric Brown": {
    "PlayerID": "4242149",
    "TeamID": "30"
  },
  "Andre Cisco": {
    "PlayerID": "4361939",
    "TeamID": "30"
  },
  "Myles Cole": {
    "PlayerID": "4365303",
    "TeamID": "30"
  },
  "Ronald Darby": {
    "PlayerID": "2969920",
    "TeamID": "30"
  },
  "Tre Flowers": {
    "PlayerID": "3046326",
    "TeamID": "30"
  },
  "Tashaun Gipson Sr.": {
    "PlayerID": "15235",
    "TeamID": "30"
  },
  "DaVon Hamilton": {
    "PlayerID": "3915520",
    "TeamID": "30"
  },
  "Josh Hines-Allen": {
    "PlayerID": "3915239",
    "TeamID": "30"
  },
  "Matthew Jackson": {
    "PlayerID": "4250737",
    "TeamID": "30"
  },
  "Jordan Jefferson": {
    "PlayerID": "4569448",
    "TeamID": "30"
  },
  "Antonio Johnson": {
    "PlayerID": "4429168",
    "TeamID": "30"
  },
  "Caleb Johnson": {
    "PlayerID": "4051069",
    "TeamID": "30"
  },
  "Jarrian Jones": {
    "PlayerID": "4426448",
    "TeamID": "30"
  },
  "Tyler Lacy": {
    "PlayerID": "4361861",
    "TeamID": "30"
  },
  "Jeremiah Ledbetter": {
    "PlayerID": "3892689",
    "TeamID": "30"
  },
  "Devin Lloyd": {
    "PlayerID": "4243256",
    "TeamID": "30"
  },
  "Ventrell Miller": {
    "PlayerID": "4240610",
    "TeamID": "30"
  },
  "Chad Muma": {
    "PlayerID": "4361707",
    "TeamID": "30"
  },
  "Tanner Muse": {
    "PlayerID": "3728263",
    "TeamID": "30"
  },
  "Esezi Otomewo": {
    "PlayerID": "4240759",
    "TeamID": "30"
  },
  "De'Antre Prince": {
    "PlayerID": "4428283",
    "TeamID": "30"
  },
  "Roy Robertson-Harris": {
    "PlayerID": "2574891",
    "TeamID": "30"
  },
  "Darnell Savage": {
    "PlayerID": "3915419",
    "TeamID": "30"
  },
  "Maason Smith": {
    "PlayerID": "4431567",
    "TeamID": "30"
  },
  "Daniel Thomas": {
    "PlayerID": "4035505",
    "TeamID": "30"
  },
  "Travon Walker": {
    "PlayerID": "4426349",
    "TeamID": "30"
  },
  "Logan Cooke": {
    "PlayerID": "3115480",
    "TeamID": "30"
  },
  "Cam Little": {
    "PlayerID": "4686361",
    "TeamID": "30"
  },
  "Ross Matiscik": {
    "PlayerID": "3928931",
    "TeamID": "30"
  },
  "Tyson Campbell": {
    "PlayerID": "4379397",
    "TeamID": "30"
  },
  "De'Shaan Dixon": {
    "PlayerID": "4247944",
    "TeamID": "30"
  },
  "Patrick Murtagh": {
    "PlayerID": "5209791",
    "TeamID": "30"
  },
  "Foyesade Oluokun": {
    "PlayerID": "3050073",
    "TeamID": "30"
  },
  "Keilan Robinson": {
    "PlayerID": "4567095",
    "TeamID": "30"
  },
  "David White Jr.": {
    "PlayerID": "5089537",
    "TeamID": "30"
  },
  "Andrew Wingard": {
    "PlayerID": "3918331",
    "TeamID": "30"
  },
  "Shawn Bowman": {
    "PlayerID": "4366910",
    "TeamID": "30"
  },
  "Christian Braswell": {
    "PlayerID": "4257580",
    "TeamID": "30"
  },
  "Joshua Cephus": {
    "PlayerID": "4426893",
    "TeamID": "30"
  },
  "Andre Chachere": {
    "PlayerID": "3125287",
    "TeamID": "30"
  },
  "DJ Coleman": {
    "PlayerID": "4368812",
    "TeamID": "30"
  },
  "Elijah Cooks": {
    "PlayerID": "4241588",
    "TeamID": "30"
  },
  "Jake Funk": {
    "PlayerID": "4036224",
    "TeamID": "30"
  },
  "Joe Gaziano": {
    "PlayerID": "3915990",
    "TeamID": "30"
  },
  "Tyler Hall": {
    "PlayerID": "4048718",
    "TeamID": "30"
  },
  "Blake Hance": {
    "PlayerID": "3116135",
    "TeamID": "30"
  },
  "Steven Jones": {
    "PlayerID": "4373830",
    "TeamID": "30"
  },
  "Zech McPhearson": {
    "PlayerID": "4045161",
    "TeamID": "30"
  },
  "John Rhys Plumlee": {
    "PlayerID": "4426494",
    "TeamID": "30"
  },
  "Louis Rees-Zammit": {
    "PlayerID": "5208436",
    "TeamID": "30"
  },
  "Austin Trammell": {
    "PlayerID": "4244856",
    "TeamID": "30"
  },
  "Mike Caliendo": {
    "PlayerID": "4043039",
    "TeamID": "12"
  },
  "Ethan Driskell": {
    "PlayerID": "4571627",
    "TeamID": "12"
  },
  "Jody Fortson": {
    "PlayerID": "4408854",
    "TeamID": "12"
  },
  "Noah Gray": {
    "PlayerID": "4240472",
    "TeamID": "12"
  },
  "C.J. Hanson": {
    "PlayerID": "4571810",
    "TeamID": "12"
  },
  "Mecole Hardman": {
    "PlayerID": "4035004",
    "TeamID": "12"
  },
  "Creed Humphrey": {
    "PlayerID": "4241385",
    "TeamID": "12"
  },
  "Kareem Hunt": {
    "PlayerID": "3059915",
    "TeamID": "12"
  },
  "Travis Kelce": {
    "PlayerID": "15847",
    "TeamID": "12"
  },
  "Patrick Mahomes": {
    "PlayerID": "3139477",
    "TeamID": "12"
  },
  "Skyy Moore": {
    "PlayerID": "4430191",
    "TeamID": "12"
  },
  "Wanya Morris": {
    "PlayerID": "4570577",
    "TeamID": "12"
  },
  "Hunter Nourzad": {
    "PlayerID": "4367645",
    "TeamID": "12"
  },
  "Samaje Perine": {
    "PlayerID": "3116389",
    "TeamID": "12"
  },
  "Trey Smith": {
    "PlayerID": "4242459",
    "TeamID": "12"
  },
  "JuJu Smith-Schuster": {
    "PlayerID": "3120348",
    "TeamID": "12"
  },
  "Carson Steele": {
    "PlayerID": "4714365",
    "TeamID": "12"
  },
  "Kingsley Suamataia": {
    "PlayerID": "4431595",
    "TeamID": "12"
  },
  "Jawaan Taylor": {
    "PlayerID": "4034961",
    "TeamID": "12"
  },
  "Joe Thuney": {
    "PlayerID": "2577773",
    "TeamID": "12"
  },
  "Justin Watson": {
    "PlayerID": "3118892",
    "TeamID": "12"
  },
  "Carson Wentz": {
    "PlayerID": "2573079",
    "TeamID": "12"
  },
  "Jared Wiley": {
    "PlayerID": "4430723",
    "TeamID": "12"
  },
  "Xavier Worthy": {
    "PlayerID": "4683062",
    "TeamID": "12"
  },
  "Felix Anudike-Uzomah": {
    "PlayerID": "4612387",
    "TeamID": "12"
  },
  "Nick Bolton": {
    "PlayerID": "4362759",
    "TeamID": "12"
  },
  "Leo Chenal": {
    "PlayerID": "4426901",
    "TeamID": "12"
  },
  "Cole Christiansen": {
    "PlayerID": "4036959",
    "TeamID": "12"
  },
  "Jack Cochrane": {
    "PlayerID": "4249766",
    "TeamID": "12"
  },
  "Chamarri Conner": {
    "PlayerID": "4361964",
    "TeamID": "12"
  },
  "Bryan Cook": {
    "PlayerID": "4247726",
    "TeamID": "12"
  },
  "Mike Danna": {
    "PlayerID": "3915487",
    "TeamID": "12"
  },
  "Malik Herring": {
    "PlayerID": "4259547",
    "TeamID": "12"
  },
  "Jaden Hicks": {
    "PlayerID": "4685232",
    "TeamID": "12"
  },
  "Nazeeh Johnson": {
    "PlayerID": "4043625",
    "TeamID": "12"
  },
  "Cam Jones": {
    "PlayerID": "4371959",
    "TeamID": "12"
  },
  "Chris Jones": {
    "PlayerID": "3044859",
    "TeamID": "12"
  },
  "George Karlaftis": {
    "PlayerID": "4426659",
    "TeamID": "12"
  },
  "Trent McDuffie": {
    "PlayerID": "4426405",
    "TeamID": "12"
  },
  "Derrick Nnadi": {
    "PlayerID": "3122930",
    "TeamID": "12"
  },
  "Mike Pennel Jr.": {
    "PlayerID": "17230",
    "TeamID": "12"
  },
  "Justin Reid": {
    "PlayerID": "3931399",
    "TeamID": "12"
  },
  "Christian Roland-Wallace": {
    "PlayerID": "4428383",
    "TeamID": "12"
  },
  "Cameron Thomas": {
    "PlayerID": "4361510",
    "TeamID": "12"
  },
  "Drue Tranquill": {
    "PlayerID": "3129310",
    "TeamID": "12"
  },
  "Marlon Tuipulotu": {
    "PlayerID": "4243218",
    "TeamID": "12"
  },
  "Jaylen Watson": {
    "PlayerID": "4697639",
    "TeamID": "12"
  },
  "Tershawn Wharton": {
    "PlayerID": "4058925",
    "TeamID": "12"
  },
  "Joshua Williams": {
    "PlayerID": "4917635",
    "TeamID": "12"
  },
  "Matt Araiza": {
    "PlayerID": "4361496",
    "TeamID": "12"
  },
  "Harrison Butker": {
    "PlayerID": "3055899",
    "TeamID": "12"
  },
  "James Winchester": {
    "PlayerID": "16665",
    "TeamID": "12"
  },
  "Hollywood Brown": {
    "PlayerID": "4241372",
    "TeamID": "12"
  },
  "Clyde Edwards-Helaire": {
    "PlayerID": "4242214",
    "TeamID": "12"
  },
  "McKade Mettauer": {
    "PlayerID": "4427997",
    "TeamID": "12"
  },
  "Charles Omenihu": {
    "PlayerID": "3929865",
    "TeamID": "12"
  },
  "Isiah Pacheco": {
    "PlayerID": "4361529",
    "TeamID": "12"
  },
  "Rashee Rice": {
    "PlayerID": "4428331",
    "TeamID": "12"
  },
  "BJ Thompson": {
    "PlayerID": "4691084",
    "TeamID": "12"
  },
  "Swayze Bozeman": {
    "PlayerID": "4570546",
    "TeamID": "12"
  },
  "Deon Bush": {
    "PlayerID": "2969944",
    "TeamID": "12"
  },
  "Baylor Cupp": {
    "PlayerID": "4426364",
    "TeamID": "12"
  },
  "Chukwuebuka Godrick": {
    "PlayerID": "5144457",
    "TeamID": "12"
  },
  "Peyton Hendershot": {
    "PlayerID": "4258248",
    "TeamID": "12"
  },
  "Keaontay Ingram": {
    "PlayerID": "4362087",
    "TeamID": "12"
  },
  "Nic Jones": {
    "PlayerID": "4427636",
    "TeamID": "12"
  },
  "Truman Jones": {
    "PlayerID": "4367828",
    "TeamID": "12"
  },
  "Fabien Lovett Sr.": {
    "PlayerID": "4362905",
    "TeamID": "12"
  },
  "Lucas Niang": {
    "PlayerID": "4038552",
    "TeamID": "12"
  },
  "Nikko Remigio": {
    "PlayerID": "4372716",
    "TeamID": "12"
  },
  "Justyn Ross": {
    "PlayerID": "4360306",
    "TeamID": "12"
  },
  "Darius Rush": {
    "PlayerID": "4362858",
    "TeamID": "12"
  },
  "Eric Scott Jr.": {
    "PlayerID": "4248032",
    "TeamID": "12"
  },
  "Keith Taylor Jr.": {
    "PlayerID": "4243332",
    "TeamID": "12"
  },
  "Montrell Washington": {
    "PlayerID": "4248822",
    "TeamID": "12"
  },
  "Bailey Zappe": {
    "PlayerID": "4250360",
    "TeamID": "12"
  },
  "Ameer Abdullah": {
    "PlayerID": "2576336",
    "TeamID": "13"
  },
  "Davante Adams": {
    "PlayerID": "16800",
    "TeamID": "13"
  },
  "Alex Bachman": {
    "PlayerID": "3919510",
    "TeamID": "13"
  },
  "Brock Bowers": {
    "PlayerID": "4432665",
    "TeamID": "13"
  },
  "Harrison Bryant": {
    "PlayerID": "4040774",
    "TeamID": "13"
  },
  "DJ Glaze": {
    "PlayerID": "4606683",
    "TeamID": "13"
  },
  "Andre James": {
    "PlayerID": "3932244",
    "TeamID": "13"
  },
  "Dylan Laube": {
    "PlayerID": "4366963",
    "TeamID": "13"
  },
  "Alexander Mattison": {
    "PlayerID": "4048244",
    "TeamID": "13"
  },
  "Michael Mayer": {
    "PlayerID": "4429086",
    "TeamID": "13"
  },
  "Tyreik McAllister": {
    "PlayerID": "4589248",
    "TeamID": "13"
  },
  "Sincere McCormick": {
    "PlayerID": "4430104",
    "TeamID": "13"
  },
  "Jordan Meredith": {
    "PlayerID": "4076803",
    "TeamID": "13"
  },
  "Jakobi Meyers": {
    "PlayerID": "3916433",
    "TeamID": "13"
  },
  "Kolton Miller": {
    "PlayerID": "3134312",
    "TeamID": "13"
  },
  "Gardner Minshew": {
    "PlayerID": "4038524",
    "TeamID": "13"
  },
  "Thayer Munford Jr.": {
    "PlayerID": "4242001",
    "TeamID": "13"
  },
  "Aidan O'Connell": {
    "PlayerID": "4260394",
    "TeamID": "13"
  },
  "Dylan Parham": {
    "PlayerID": "4243375",
    "TeamID": "13"
  },
  "Andrus Peat": {
    "PlayerID": "2978278",
    "TeamID": "13"
  },
  "Jackson Powers-Johnson": {
    "PlayerID": "4875295",
    "TeamID": "13"
  },
  "John Samuel Shenker": {
    "PlayerID": "4242526",
    "TeamID": "13"
  },
  "Tre Tucker": {
    "PlayerID": "4428718",
    "TeamID": "13"
  },
  "DJ Turner": {
    "PlayerID": "4036211",
    "TeamID": "13"
  },
  "Zamir White": {
    "PlayerID": "4361777",
    "TeamID": "13"
  },
  "Cody Whitehair": {
    "PlayerID": "2577346",
    "TeamID": "13"
  },
  "Jakorian Bennett": {
    "PlayerID": "4686911",
    "TeamID": "13"
  },
  "Amari Burney": {
    "PlayerID": "4360239",
    "TeamID": "13"
  },
  "Adam Butler": {
    "PlayerID": "2972342",
    "TeamID": "13"
  },
  "K'Lavon Chaisson": {
    "PlayerID": "4242205",
    "TeamID": "13"
  },
  "Maxx Crosby": {
    "PlayerID": "3916655",
    "TeamID": "13"
  },
  "Divine Deablo": {
    "PlayerID": "4037626",
    "TeamID": "13"
  },
  "Tommy Eichenberg": {
    "PlayerID": "4429560",
    "TeamID": "13"
  },
  "Amari Gainer": {
    "PlayerID": "4360469",
    "TeamID": "13"
  },
  "Thomas Harper": {
    "PlayerID": "4569323",
    "TeamID": "13"
  },
  "Nate Hobbs": {
    "PlayerID": "4240542",
    "TeamID": "13"
  },
  "Darnay Holmes": {
    "PlayerID": "4242973",
    "TeamID": "13"
  },
  "John Jenkins": {
    "PlayerID": "15846",
    "TeamID": "13"
  },
  "Jack Jones": {
    "PlayerID": "4035686",
    "TeamID": "13"
  },
  "Jonah Laulu": {
    "PlayerID": "4373956",
    "TeamID": "13"
  },
  "Kana'i Mauga": {
    "PlayerID": "4360855",
    "TeamID": "13"
  },
  "Tre'von Moehrig": {
    "PlayerID": "4362487",
    "TeamID": "13"
  },
  "Isaiah Pola-Mao": {
    "PlayerID": "4259632",
    "TeamID": "13"
  },
  "Decamerion Richardson": {
    "PlayerID": "4605498",
    "TeamID": "13"
  },
  "Janarius Robinson": {
    "PlayerID": "4035604",
    "TeamID": "13"
  },
  "Nesta Jade Silvera": {
    "PlayerID": "4362497",
    "TeamID": "13"
  },
  "Chris Smith II": {
    "PlayerID": "4379413",
    "TeamID": "13"
  },
  "Charles Snowden": {
    "PlayerID": "4240849",
    "TeamID": "13"
  },
  "Robert Spillane": {
    "PlayerID": "3129446",
    "TeamID": "13"
  },
  "Sam Webb": {
    "PlayerID": "4700660",
    "TeamID": "13"
  },
  "Christian Wilkins": {
    "PlayerID": "3728266",
    "TeamID": "13"
  },
  "Tyree Wilson": {
    "PlayerID": "4372533",
    "TeamID": "13"
  },
  "Jacob Bobenmoyer": {
    "PlayerID": "3925443",
    "TeamID": "13"
  },
  "Daniel Carlson": {
    "PlayerID": "3051909",
    "TeamID": "13"
  },
  "AJ Cole": {
    "PlayerID": "3686689",
    "TeamID": "13"
  },
  "Marcus Epps": {
    "PlayerID": "3139368",
    "TeamID": "13"
  },
  "Jeff Foreman": {
    "PlayerID": "4427209",
    "TeamID": "13"
  },
  "Tomari Fox": {
    "PlayerID": "4568668",
    "TeamID": "13"
  },
  "Jake Johanning": {
    "PlayerID": "4572827",
    "TeamID": "13"
  },
  "Malcolm Koonce": {
    "PlayerID": "4239719",
    "TeamID": "13"
  },
  "Luke Masterson": {
    "PlayerID": "4037212",
    "TeamID": "13"
  },
  "Trey Taylor": {
    "PlayerID": "4693816",
    "TeamID": "13"
  },
  "David Agoha": {
    "PlayerID": "5144941",
    "TeamID": "13"
  },
  "Gottlieb Ayedze": {
    "PlayerID": "5145719",
    "TeamID": "13"
  },
  "Carter Bradley": {
    "PlayerID": "4362260",
    "TeamID": "13"
  },
  "Ben Brown": {
    "PlayerID": "4362890",
    "TeamID": "13"
  },
  "Matthew Butler": {
    "PlayerID": "4242457",
    "TeamID": "13"
  },
  "M.J. Devonshire": {
    "PlayerID": "4427068",
    "TeamID": "13"
  },
  "Cole Fotheringham": {
    "PlayerID": "4361008",
    "TeamID": "13"
  },
  "Jalen Guyton": {
    "PlayerID": "3932430",
    "TeamID": "13"
  },
  "Kyu Blu Kelly": {
    "PlayerID": "4427695",
    "TeamID": "13"
  },
  "Ramel Keyton": {
    "PlayerID": "4426399",
    "TeamID": "13"
  },
  "Will Putnam": {
    "PlayerID": "4426393",
    "TeamID": "13"
  },
  "Justin Shorter": {
    "PlayerID": "4361426",
    "TeamID": "13"
  },
  "Dalton Wagner": {
    "PlayerID": "4242177",
    "TeamID": "13"
  },
  "Kristian Wilkerson": {
    "PlayerID": "3910176",
    "TeamID": "13"
  },
  "Joe Alt": {
    "PlayerID": "4683487",
    "TeamID": "24"
  },
  "Bradley Bozeman": {
    "PlayerID": "3054842",
    "TeamID": "24"
  },
  "Derius Davis": {
    "PlayerID": "4362477",
    "TeamID": "24"
  },
  "Will Dissly": {
    "PlayerID": "3127292",
    "TeamID": "24"
  },
  "J.K. Dobbins": {
    "PlayerID": "4241985",
    "TeamID": "24"
  },
  "Gus Edwards": {
    "PlayerID": "3051926",
    "TeamID": "24"
  },
  "Simi Fehoko": {
    "PlayerID": "4360739",
    "TeamID": "24"
  },
  "Hassan Haskins": {
    "PlayerID": "4372071",
    "TeamID": "24"
  },
  "Taylor Heinicke": {
    "PlayerID": "2565969",
    "TeamID": "24"
  },
  "Justin Herbert": {
    "PlayerID": "4038941",
    "TeamID": "24"
  },
  "Hayden Hurst": {
    "PlayerID": "3924365",
    "TeamID": "24"
  },
  "Brenden Jaimes": {
    "PlayerID": "4240800",
    "TeamID": "24"
  },
  "Zion Johnson": {
    "PlayerID": "4247347",
    "TeamID": "24"
  },
  "Quentin Johnston": {
    "PlayerID": "4429025",
    "TeamID": "24"
  },
  "Ladd McConkey": {
    "PlayerID": "4612826",
    "TeamID": "24"
  },
  "Jordan McFadden": {
    "PlayerID": "4360319",
    "TeamID": "24"
  },
  "Joshua Palmer": {
    "PlayerID": "4242433",
    "TeamID": "24"
  },
  "Trey Pipkins III": {
    "PlayerID": "4411189",
    "TeamID": "24"
  },
  "Brenden Rice": {
    "PlayerID": "4686781",
    "TeamID": "24"
  },
  "Jamaree Salyer": {
    "PlayerID": "4379412",
    "TeamID": "24"
  },
  "Foster Sarell": {
    "PlayerID": "4242555",
    "TeamID": "24"
  },
  "Rashawn Slater": {
    "PlayerID": "4242283",
    "TeamID": "24"
  },
  "Stone Smartt": {
    "PlayerID": "4250764",
    "TeamID": "24"
  },
  "Easton Stick": {
    "PlayerID": "3120590",
    "TeamID": "24"
  },
  "Eric Tomlinson": {
    "PlayerID": "2511973",
    "TeamID": "24"
  },
  "Kimani Vidal": {
    "PlayerID": "4430968",
    "TeamID": "24"
  },
  "Joey Bosa": {
    "PlayerID": "3051389",
    "TeamID": "24"
  },
  "Junior Colson": {
    "PlayerID": "4431212",
    "TeamID": "24"
  },
  "Bud Dupree": {
    "PlayerID": "2576702",
    "TeamID": "24"
  },
  "Troy Dye": {
    "PlayerID": "4038946",
    "TeamID": "24"
  },
  "Justin Eboigbe": {
    "PlayerID": "4567138",
    "TeamID": "24"
  },
  "AJ Finley": {
    "PlayerID": "4427190",
    "TeamID": "24"
  },
  "Poona Ford": {
    "PlayerID": "3125114",
    "TeamID": "24"
  },
  "Morgan Fox": {
    "PlayerID": "3059620",
    "TeamID": "24"
  },
  "Kristian Fulton": {
    "PlayerID": "4035433",
    "TeamID": "24"
  },
  "Alohi Gilman": {
    "PlayerID": "4039413",
    "TeamID": "24"
  },
  "Cam Hart": {
    "PlayerID": "4427404",
    "TeamID": "24"
  },
  "Daiyan Henley": {
    "PlayerID": "4241597",
    "TeamID": "24"
  },
  "Derwin James Jr.": {
    "PlayerID": "3691739",
    "TeamID": "24"
  },
  "Deane Leonard": {
    "PlayerID": "4690171",
    "TeamID": "24"
  },
  "Khalil Mack": {
    "PlayerID": "16710",
    "TeamID": "24"
  },
  "Scott Matlock": {
    "PlayerID": "4373684",
    "TeamID": "24"
  },
  "Elijah Molden": {
    "PlayerID": "4243328",
    "TeamID": "24"
  },
  "Otito Ogbonnia": {
    "PlayerID": "4367210",
    "TeamID": "24"
  },
  "Denzel Perryman": {
    "PlayerID": "2579621",
    "TeamID": "24"
  },
  "Asante Samuel Jr.": {
    "PlayerID": "4363034",
    "TeamID": "24"
  },
  "Tarheeb Still": {
    "PlayerID": "4432571",
    "TeamID": "24"
  },
  "Teair Tart": {
    "PlayerID": "4374269",
    "TeamID": "24"
  },
  "Ja'Sir Taylor": {
    "PlayerID": "4240434",
    "TeamID": "24"
  },
  "Tuli Tuipulotu": {
    "PlayerID": "4431442",
    "TeamID": "24"
  },
  "Cameron Dicker": {
    "PlayerID": "4362081",
    "TeamID": "24"
  },
  "Josh Harris": {
    "PlayerID": "15151",
    "TeamID": "24"
  },
  "JK Scott": {
    "PlayerID": "3126368",
    "TeamID": "24"
  },
  "DJ Chark Jr.": {
    "PlayerID": "3115394",
    "TeamID": "24"
  },
  "Chris Collins": {
    "PlayerID": "4373268",
    "TeamID": "24"
  },
  "Tyler McLellan": {
    "PlayerID": "4247248",
    "TeamID": "24"
  },
  "Nick Niemann": {
    "PlayerID": "4036141",
    "TeamID": "24"
  },
  "Chris Rumph II": {
    "PlayerID": "4240475",
    "TeamID": "24"
  },
  "Bucky Williams": {
    "PlayerID": "4368630",
    "TeamID": "24"
  },
  "Karsen Barnhart": {
    "PlayerID": "4426638",
    "TeamID": "24"
  },
  "Dicaprio Bootle": {
    "PlayerID": "4034835",
    "TeamID": "24"
  },
  "Dez Fitzpatrick": {
    "PlayerID": "4036026",
    "TeamID": "24"
  },
  "Christopher Hinton": {
    "PlayerID": "4426583",
    "TeamID": "24"
  },
  "Jeremiah Jean-Baptiste": {
    "PlayerID": "4427588",
    "TeamID": "24"
  },
  "Tony Jefferson": {
    "PlayerID": "16195",
    "TeamID": "24"
  },
  "Jaylen Johnson": {
    "PlayerID": "4379405",
    "TeamID": "24"
  },
  "Alex Leatherwood": {
    "PlayerID": "4241466",
    "TeamID": "24"
  },
  "Blake Lynch": {
    "PlayerID": "3892773",
    "TeamID": "24"
  },
  "Tre'Mon Morris-Brash": {
    "PlayerID": "4428058",
    "TeamID": "24"
  },
  "Sam Mustipher": {
    "PlayerID": "3129307",
    "TeamID": "24"
  },
  "CJ Okoye": {
    "PlayerID": "5144942",
    "TeamID": "24"
  },
  "Jaret Patterson": {
    "PlayerID": "4362452",
    "TeamID": "24"
  },
  "Shaq Quarterman": {
    "PlayerID": "4037468",
    "TeamID": "24"
  },
  "Jalen Reagor": {
    "PlayerID": "4241802",
    "TeamID": "24"
  },
  "Shaun Wade": {
    "PlayerID": "4241995",
    "TeamID": "24"
  },
  "Davis Allen": {
    "PlayerID": "4426553",
    "TeamID": "14"
  },
  "Tutu Atwell": {
    "PlayerID": "4360797",
    "TeamID": "14"
  },
  "Stetson Bennett": {
    "PlayerID": "4259553",
    "TeamID": "14"
  },
  "Logan Bruss": {
    "PlayerID": "4242347",
    "TeamID": "14"
  },
  "Geron Christian": {
    "PlayerID": "3916414",
    "TeamID": "14"
  },
  "Blake Corum": {
    "PlayerID": "4429096",
    "TeamID": "14"
  },
  "Justin Dedich": {
    "PlayerID": "4360859",
    "TeamID": "14"
  },
  "Kevin Dotson": {
    "PlayerID": "3917599",
    "TeamID": "14"
  },
  "Jimmy Garoppolo": {
    "PlayerID": "16760",
    "TeamID": "14"
  },
  "Rob Havenstein": {
    "PlayerID": "2515613",
    "TeamID": "14"
  },
  "Alaric Jackson": {
    "PlayerID": "4036135",
    "TeamID": "14"
  },
  "Tyler Johnson": {
    "PlayerID": "2310331",
    "TeamID": "14"
  },
  "Cooper Kupp": {
    "PlayerID": "2977187",
    "TeamID": "14"
  },
  "Beaux Limmer": {
    "PlayerID": "4567175",
    "TeamID": "14"
  },
  "Hunter Long": {
    "PlayerID": "4239944",
    "TeamID": "14"
  },
  "Warren McClendon Jr.": {
    "PlayerID": "4426512",
    "TeamID": "14"
  },
  "Dylan McMahon": {
    "PlayerID": "4430155",
    "TeamID": "14"
  },
  "Colby Parkinson": {
    "PlayerID": "4242557",
    "TeamID": "14"
  },
  "Ronnie Rivers": {
    "PlayerID": "4243003",
    "TeamID": "14"
  },
  "Demarcus Robinson": {
    "PlayerID": "3043116",
    "TeamID": "14"
  },
  "Cody Schrader": {
    "PlayerID": "4391845",
    "TeamID": "14"
  },
  "Xavier Smith": {
    "PlayerID": "4386544",
    "TeamID": "14"
  },
  "Matthew Stafford": {
    "PlayerID": "12483",
    "TeamID": "14"
  },
  "Jordan Whittington": {
    "PlayerID": "4569382",
    "TeamID": "14"
  },
  "Kyren Williams": {
    "PlayerID": "4430737",
    "TeamID": "14"
  },
  "Bobby Brown III": {
    "PlayerID": "4372518",
    "TeamID": "14"
  },
  "Kamren Curl": {
    "PlayerID": "4242154",
    "TeamID": "14"
  },
  "Cobie Durant": {
    "PlayerID": "4384549",
    "TeamID": "14"
  },
  "Braden Fiske": {
    "PlayerID": "4362245",
    "TeamID": "14"
  },
  "Neville Gallimore": {
    "PlayerID": "3892883",
    "TeamID": "14"
  },
  "Nick Hampton": {
    "PlayerID": "4360773",
    "TeamID": "14"
  },
  "Michael Hoecht": {
    "PlayerID": "4033234",
    "TeamID": "14"
  },
  "Jacob Hummel": {
    "PlayerID": "4241250",
    "TeamID": "14"
  },
  "Brennan Jackson": {
    "PlayerID": "4373471",
    "TeamID": "14"
  },
  "Desjuan Johnson": {
    "PlayerID": "4362294",
    "TeamID": "14"
  },
  "Kamren Kinchens": {
    "PlayerID": "4596363",
    "TeamID": "14"
  },
  "Quentin Lake": {
    "PlayerID": "4249128",
    "TeamID": "14"
  },
  "Jaylen McCollough": {
    "PlayerID": "4427120",
    "TeamID": "14"
  },
  "Elias Neal": {
    "PlayerID": "4428098",
    "TeamID": "14"
  },
  "Troy Reeder": {
    "PlayerID": "3116177",
    "TeamID": "14"
  },
  "Christian Rozeboom": {
    "PlayerID": "3909013",
    "TeamID": "14"
  },
  "Omar Speights": {
    "PlayerID": "4428550",
    "TeamID": "14"
  },
  "Kobie Turner": {
    "PlayerID": "4250621",
    "TeamID": "14"
  },
  "Jared Verse": {
    "PlayerID": "4578085",
    "TeamID": "14"
  },
  "Josh Wallace": {
    "PlayerID": "4572371",
    "TeamID": "14"
  },
  "Tre'Davious White": {
    "PlayerID": "3042717",
    "TeamID": "14"
  },
  "Darious Williams": {
    "PlayerID": "4239833",
    "TeamID": "14"
  },
  "Ahkello Witherspoon": {
    "PlayerID": "3122630",
    "TeamID": "14"
  },
  "Charles Woods": {
    "PlayerID": "4368113",
    "TeamID": "14"
  },
  "Byron Young": {
    "PlayerID": "4567123",
    "TeamID": "21"
  },
  "Ethan Evans": {
    "PlayerID": "5125875",
    "TeamID": "14"
  },
  "Joshua Karty": {
    "PlayerID": "4566192",
    "TeamID": "14"
  },
  "Alex Ward": {
    "PlayerID": "4243545",
    "TeamID": "14"
  },
  "Steve Avila": {
    "PlayerID": "4362474",
    "TeamID": "14"
  },
  "Tyler Higbee": {
    "PlayerID": "2573401",
    "TeamID": "14"
  },
  "Jonah Jackson": {
    "PlayerID": "3930040",
    "TeamID": "14"
  },
  "John Johnson III": {
    "PlayerID": "3046292",
    "TeamID": "14"
  },
  "Derion Kendrick": {
    "PlayerID": "4360307",
    "TeamID": "14"
  },
  "KT Leveston": {
    "PlayerID": "4373079",
    "TeamID": "14"
  },
  "Conor McDermott": {
    "PlayerID": "2971584",
    "TeamID": "14"
  },
  "Larrell Murchison": {
    "PlayerID": "4240123",
    "TeamID": "14"
  },
  "Puka Nacua": {
    "PlayerID": "4426515",
    "TeamID": "14"
  },
  "Joe Noteboom": {
    "PlayerID": "3040008",
    "TeamID": "14"
  },
  "Tre Tomlinson": {
    "PlayerID": "4427493",
    "TeamID": "14"
  },
  "AJ Arcuri": {
    "PlayerID": "4046707",
    "TeamID": "14"
  },
  "Quintez Cephus": {
    "PlayerID": "4035793",
    "TeamID": "14"
  },
  "Cory Durden": {
    "PlayerID": "4240042",
    "TeamID": "14"
  },
  "Tanner Ingle": {
    "PlayerID": "4361651",
    "TeamID": "14"
  },
  "Quindell Johnson": {
    "PlayerID": "4371731",
    "TeamID": "14"
  },
  "Shaun Jolly": {
    "PlayerID": "4241008",
    "TeamID": "14"
  },
  "Nikola Kalinic": {
    "PlayerID": "4916349",
    "TeamID": "14"
  },
  "Cam Lampkin": {
    "PlayerID": "4427752",
    "TeamID": "14"
  },
  "Mike McAllister": {
    "PlayerID": "4368423",
    "TeamID": "14"
  },
  "David Olajiga": {
    "PlayerID": "5211114",
    "TeamID": "14"
  },
  "Drake Stoops": {
    "PlayerID": "4360282",
    "TeamID": "14"
  },
  "Keir Thomas": {
    "PlayerID": "4038843",
    "TeamID": "14"
  },
  "Zach VanValkenburg": {
    "PlayerID": "4569479",
    "TeamID": "14"
  },
  "Sam Wiglusz": {
    "PlayerID": "4385438",
    "TeamID": "14"
  },
  "De'Von Achane": {
    "PlayerID": "4429160",
    "TeamID": "15"
  },
  "Terron Armstead": {
    "PlayerID": "15821",
    "TeamID": "15"
  },
  "Odell Beckham Jr.": {
    "PlayerID": "16733",
    "TeamID": "15"
  },
  "Braxton Berrios": {
    "PlayerID": "3123075",
    "TeamID": "15"
  },
  "Tim Boyle": {
    "PlayerID": "3045169",
    "TeamID": "15"
  },
  "Tanner Conner": {
    "PlayerID": "4047422",
    "TeamID": "15"
  },
  "Lester Cotton": {
    "PlayerID": "3925344",
    "TeamID": "15"
  },
  "Liam Eichenberg": {
    "PlayerID": "4046694",
    "TeamID": "15"
  },
  "Julian Hill": {
    "PlayerID": "4365395",
    "TeamID": "15"
  },
  "Tyreek Hill": {
    "PlayerID": "3116406",
    "TeamID": "15"
  },
  "Tyler Huntley": {
    "PlayerID": "4035671",
    "TeamID": "15"
  },
  "Alec Ingold": {
    "PlayerID": "3917668",
    "TeamID": "15"
  },
  "Austin Jackson": {
    "PlayerID": "4271632",
    "TeamID": "15"
  },
  "Robert Jones": {
    "PlayerID": "4570495",
    "TeamID": "15"
  },
  "Kendall Lamm": {
    "PlayerID": "2509370",
    "TeamID": "15"
  },
  "Andrew Meyer": {
    "PlayerID": "4362064",
    "TeamID": "15"
  },
  "Raheem Mostert": {
    "PlayerID": "2576414",
    "TeamID": "15"
  },
  "Patrick Paul": {
    "PlayerID": "4567493",
    "TeamID": "15"
  },
  "Jonnu Smith": {
    "PlayerID": "3054212",
    "TeamID": "15"
  },
  "Durham Smythe": {
    "PlayerID": "3052897",
    "TeamID": "15"
  },
  "Skylar Thompson": {
    "PlayerID": "4036419",
    "TeamID": "15"
  },
  "Jaylen Waddle": {
    "PlayerID": "4372016",
    "TeamID": "15"
  },
  "Malik Washington": {
    "PlayerID": "4569603",
    "TeamID": "15"
  },
  "Jeff Wilson Jr.": {
    "PlayerID": "3122976",
    "TeamID": "15"
  },
  "Jaylen Wright": {
    "PlayerID": "4682745",
    "TeamID": "15"
  },
  "Quinton Bell": {
    "PlayerID": "3933407",
    "TeamID": "15"
  },
  "Ethan Bonner": {
    "PlayerID": "4360746",
    "TeamID": "15"
  },
  "Tyus Bowser": {
    "PlayerID": "3040037",
    "TeamID": "15"
  },
  "Jordyn Brooks": {
    "PlayerID": "4043130",
    "TeamID": "15"
  },
  "Calais Campbell": {
    "PlayerID": "11284",
    "TeamID": "15"
  },
  "Elijah Campbell": {
    "PlayerID": "3932901",
    "TeamID": "15"
  },
  "Storm Duck": {
    "PlayerID": "4427103",
    "TeamID": "15"
  },
  "Kendall Fuller": {
    "PlayerID": "3045465",
    "TeamID": "15"
  },
  "Da'Shawn Hand": {
    "PlayerID": "3126352",
    "TeamID": "15"
  },
  "Jevon Holland": {
    "PlayerID": "4373809",
    "TeamID": "15"
  },
  "Benito Jones": {
    "PlayerID": "4035299",
    "TeamID": "15"
  },
  "Mohamed Kamara": {
    "PlayerID": "4427677",
    "TeamID": "15"
  },
  "Kader Kohou": {
    "PlayerID": "4291489",
    "TeamID": "15"
  },
  "Marcus Maye": {
    "PlayerID": "2980110",
    "TeamID": "15"
  },
  "Siran Neal": {
    "PlayerID": "3057524",
    "TeamID": "15"
  },
  "Nik Needham": {
    "PlayerID": "3124702",
    "TeamID": "15"
  },
  "Emmanuel Ogbah": {
    "PlayerID": "2977740",
    "TeamID": "15"
  },
  "Brandon Pili": {
    "PlayerID": "4259651",
    "TeamID": "15"
  },
  "Jordan Poyer": {
    "PlayerID": "15979",
    "TeamID": "15"
  },
  "Jalen Ramsey": {
    "PlayerID": "3045373",
    "TeamID": "15"
  },
  "Duke Riley": {
    "PlayerID": "3042725",
    "TeamID": "15"
  },
  "Chop Robinson": {
    "PlayerID": "4431586",
    "TeamID": "15"
  },
  "Zach Sieler": {
    "PlayerID": "3057956",
    "TeamID": "15"
  },
  "Channing Tindall": {
    "PlayerID": "4379414",
    "TeamID": "15"
  },
  "Anthony Walker Jr.": {
    "PlayerID": "3045251",
    "TeamID": "15"
  },
  "Jake Bailey": {
    "PlayerID": "3931395",
    "TeamID": "15"
  },
  "Blake Ferguson": {
    "PlayerID": "3843470",
    "TeamID": "15"
  },
  "Jason Sanders": {
    "PlayerID": "3124679",
    "TeamID": "15"
  },
  "Cam Brown": {
    "PlayerID": "4045165",
    "TeamID": "15"
  },
  "Bradley Chubb": {
    "PlayerID": "3116733",
    "TeamID": "15"
  },
  "River Cracraft": {
    "PlayerID": "3052056",
    "TeamID": "15"
  },
  "Grant DuBose": {
    "PlayerID": "4879650",
    "TeamID": "15"
  },
  "Cameron Goode": {
    "PlayerID": "4035857",
    "TeamID": "15"
  },
  "Sean Harlow": {
    "PlayerID": "3045286",
    "TeamID": "15"
  },
  "Patrick McMorris": {
    "PlayerID": "4430158",
    "TeamID": "15"
  },
  "Grayson Murphy": {
    "PlayerID": "4428077",
    "TeamID": "15"
  },
  "Jaelan Phillips": {
    "PlayerID": "4242975",
    "TeamID": "15"
  },
  "Anthony Schwartz": {
    "PlayerID": "4371986",
    "TeamID": "15"
  },
  "Cam Smith": {
    "PlayerID": "4570672",
    "TeamID": "15"
  },
  "Kion Smith": {
    "PlayerID": "4058521",
    "TeamID": "15"
  },
  "Tua Tagovailoa": {
    "PlayerID": "4241479",
    "TeamID": "15"
  },
  "Tahj Washington": {
    "PlayerID": "4567506",
    "TeamID": "15"
  },
  "Isaiah Wynn": {
    "PlayerID": "3128713",
    "TeamID": "15"
  },
  "William Bradley-King": {
    "PlayerID": "4036476",
    "TeamID": "15"
  },
  "Jackson Carman": {
    "PlayerID": "4360320",
    "TeamID": "15"
  },
  "Jordan Colbert": {
    "PlayerID": "4367504",
    "TeamID": "15"
  },
  "Dee Eskridge": {
    "PlayerID": "4043016",
    "TeamID": "15"
  },
  "Erik Ezukanma": {
    "PlayerID": "4362186",
    "TeamID": "15"
  },
  "Neil Farrell": {
    "PlayerID": "4242234",
    "TeamID": "15"
  },
  "Anderson Hardy": {
    "PlayerID": "4360787",
    "TeamID": "15"
  },
  "Jonathan Harris": {
    "PlayerID": "4422407",
    "TeamID": "15"
  },
  "Chasen Hines": {
    "PlayerID": "4362642",
    "TeamID": "15"
  },
  "Dequan Jackson": {
    "PlayerID": "4361282",
    "TeamID": "15"
  },
  "Isaiah Johnson": {
    "PlayerID": "4367699",
    "TeamID": "15"
  },
  "Bayron Matos": {
    "PlayerID": "4612507",
    "TeamID": "15"
  },
  "Derrick McLendon": {
    "PlayerID": "4430153",
    "TeamID": "15"
  },
  "Deneric Prince": {
    "PlayerID": "4372526",
    "TeamID": "15"
  },
  "Hayden Rucci": {
    "PlayerID": "4428396",
    "TeamID": "15"
  },
  "Jordan Addison": {
    "PlayerID": "4429205",
    "TeamID": "16"
  },
  "Garrett Bradbury": {
    "PlayerID": "3116729",
    "TeamID": "16"
  },
  "Blake Brandel": {
    "PlayerID": "3930270",
    "TeamID": "16"
  },
  "Ty Chandler": {
    "PlayerID": "4242431",
    "TeamID": "16"
  },
  "Sam Darnold": {
    "PlayerID": "3912547",
    "TeamID": "16"
  },
  "Christian Darrisaw": {
    "PlayerID": "4361985",
    "TeamID": "16"
  },
  "Dan Feeney": {
    "PlayerID": "2979482",
    "TeamID": "16"
  },
  "Myles Gaskin": {
    "PlayerID": "3886818",
    "TeamID": "16"
  },
  "C.J. Ham": {
    "PlayerID": "4012556",
    "TeamID": "16"
  },
  "Ed Ingram": {
    "PlayerID": "4242227",
    "TeamID": "16"
  },
  "Trishton Jackson": {
    "PlayerID": "4046715",
    "TeamID": "16"
  },
  "Justin Jefferson": {
    "PlayerID": "4262921",
    "TeamID": "16"
  },
  "Aaron Jones": {
    "PlayerID": "3042519",
    "TeamID": "16"
  },
  "Michael Jurgens": {
    "PlayerID": "4362010",
    "TeamID": "16"
  },
  "Nick Mullens": {
    "PlayerID": "3059989",
    "TeamID": "16"
  },
  "Johnny Mundt": {
    "PlayerID": "3052096",
    "TeamID": "16"
  },
  "Jalen Nailor": {
    "PlayerID": "4382466",
    "TeamID": "16"
  },
  "Brian O'Neill": {
    "PlayerID": "3123954",
    "TeamID": "16"
  },
  "Josh Oliver": {
    "PlayerID": "3921690",
    "TeamID": "16"
  },
  "Brandon Powell": {
    "PlayerID": "3115255",
    "TeamID": "16"
  },
  "David Quessenberry": {
    "PlayerID": "15946",
    "TeamID": "16"
  },
  "Walter Rouse": {
    "PlayerID": "4428394",
    "TeamID": "16"
  },
  "Brett Rypien": {
    "PlayerID": "3722362",
    "TeamID": "16"
  },
  "Trent Sherfield Sr.": {
    "PlayerID": "3122168",
    "TeamID": "16"
  },
  "Robert Tonyan": {
    "PlayerID": "2975674",
    "TeamID": "16"
  },
  "Brian Asamoah II": {
    "PlayerID": "4360255",
    "TeamID": "16"
  },
  "Jonathan Bullard": {
    "PlayerID": "2980097",
    "TeamID": "16"
  },
  "Camryn Bynum": {
    "PlayerID": "4035861",
    "TeamID": "16"
  },
  "Blake Cashman": {
    "PlayerID": "3728281",
    "TeamID": "16"
  },
  "Akayleb Evans": {
    "PlayerID": "4244607",
    "TeamID": "16"
  },
  "Stephon Gilmore": {
    "PlayerID": "14942",
    "TeamID": "16"
  },
  "Jonathan Greenard": {
    "PlayerID": "3916409",
    "TeamID": "16"
  },
  "Shaquill Griffin": {
    "PlayerID": "3054026",
    "TeamID": "16"
  },
  "Kamu Grugier-Hill": {
    "PlayerID": "3050851",
    "TeamID": "16"
  },
  "Theo Jackson": {
    "PlayerID": "4242436",
    "TeamID": "16"
  },
  "Pat Jones II": {
    "PlayerID": "4036063",
    "TeamID": "16"
  },
  "Bobby McCain": {
    "PlayerID": "2575606",
    "TeamID": "16"
  },
  "Dwight McGlothern": {
    "PlayerID": "4429128",
    "TeamID": "16"
  },
  "Josh Metellus": {
    "PlayerID": "4046537",
    "TeamID": "16"
  },
  "Fabian Moreau": {
    "PlayerID": "2971586",
    "TeamID": "16"
  },
  "Byron Murphy Jr.": {
    "PlayerID": "4038999",
    "TeamID": "16"
  },
  "Ivan Pace Jr.": {
    "PlayerID": "4430280",
    "TeamID": "16"
  },
  "Harrison Phillips": {
    "PlayerID": "3117255",
    "TeamID": "16"
  },
  "Jalen Redmond": {
    "PlayerID": "4360277",
    "TeamID": "16"
  },
  "Levi Drake Rodriguez": {
    "PlayerID": "5093973",
    "TeamID": "16"
  },
  "Harrison Smith": {
    "PlayerID": "14945",
    "TeamID": "16"
  },
  "Taki Taimani": {
    "PlayerID": "4361114",
    "TeamID": "16"
  },
  "Jerry Tillery": {
    "PlayerID": "3863182",
    "TeamID": "16"
  },
  "Dallas Turner": {
    "PlayerID": "4565190",
    "TeamID": "16"
  },
  "Andrew Van Ginkel": {
    "PlayerID": "3133487",
    "TeamID": "16"
  },
  "Jay Ward": {
    "PlayerID": "4568007",
    "TeamID": "16"
  },
  "Jihad Ward": {
    "PlayerID": "3115914",
    "TeamID": "16"
  },
  "Andrew DePaola": {
    "PlayerID": "15726",
    "TeamID": "16"
  },
  "Will Reichard": {
    "PlayerID": "4567104",
    "TeamID": "16"
  },
  "Ryan Wright": {
    "PlayerID": "4361823",
    "TeamID": "16"
  },
  "Mekhi Blackmon": {
    "PlayerID": "4360677",
    "TeamID": "16"
  },
  "T.J. Hockenson": {
    "PlayerID": "4036133",
    "TeamID": "16"
  },
  "Jordan Kunaszyk": {
    "PlayerID": "4035866",
    "TeamID": "16"
  },
  "J.J. McCarthy": {
    "PlayerID": "4433970",
    "TeamID": "16"
  },
  "Gabriel Murphy": {
    "PlayerID": "4428080",
    "TeamID": "16"
  },
  "Nick Muse": {
    "PlayerID": "4249624",
    "TeamID": "16"
  },
  "Dalton Risner": {
    "PlayerID": "3125082",
    "TeamID": "16"
  },
  "Henry Byrd": {
    "PlayerID": "4367995",
    "TeamID": "16"
  },
  "Andre Carter II": {
    "PlayerID": "4577333",
    "TeamID": "16"
  },
  "Dallas Gant": {
    "PlayerID": "4361348",
    "TeamID": "16"
  },
  "N'Keal Harry": {
    "PlayerID": "4047839",
    "TeamID": "16"
  },
  "Lucky Jackson": {
    "PlayerID": "3915802",
    "TeamID": "16"
  },
  "Marcellus Johnson": {
    "PlayerID": "4363547",
    "TeamID": "16"
  },
  "Jeshaun Jones": {
    "PlayerID": "4360637",
    "TeamID": "16"
  },
  "Sammis Reyes": {
    "PlayerID": "3148929",
    "TeamID": "16"
  },
  "Bo Richter": {
    "PlayerID": "4875564",
    "TeamID": "16"
  },
  "Tyrese Robinson": {
    "PlayerID": "4241398",
    "TeamID": "16"
  },
  "Zavier Scott": {
    "PlayerID": "4257364",
    "TeamID": "16"
  },
  "Thayer Thomas": {
    "PlayerID": "4240121",
    "TeamID": "16"
  },
  "Max Tooley": {
    "PlayerID": "4373648",
    "TeamID": "16"
  },
  "Nahshon Wright": {
    "PlayerID": "4570470",
    "TeamID": "16"
  },
  "Javon Baker": {
    "PlayerID": "4692022",
    "TeamID": "17"
  },
  "Jaheim Bell": {
    "PlayerID": "4429262",
    "TeamID": "17"
  },
  "Kendrick Bourne": {
    "PlayerID": "3045523",
    "TeamID": "17"
  },
  "Kayshon Boutte": {
    "PlayerID": "4429022",
    "TeamID": "17"
  },
  "Jacoby Brissett": {
    "PlayerID": "2578570",
    "TeamID": "17"
  },
  "DeMario Douglas": {
    "PlayerID": "4427095",
    "TeamID": "17"
  },
  "Antonio Gibson": {
    "PlayerID": "4360294",
    "TeamID": "17"
  },
  "JaMycal Hasty": {
    "PlayerID": "3928925",
    "TeamID": "17"
  },
  "Hunter Henry": {
    "PlayerID": "3046439",
    "TeamID": "17"
  },
  "Austin Hooper": {
    "PlayerID": "3043275",
    "TeamID": "17"
  },
  "Bryan Hudson": {
    "PlayerID": "4426489",
    "TeamID": "17"
  },
  "Jalen Hurd": {
    "PlayerID": "3115328",
    "TeamID": "17"
  },
  "Demontrey Jacobs": {
    "PlayerID": "4250935",
    "TeamID": "17"
  },
  "Michael Jordan": {
    "PlayerID": "4040622",
    "TeamID": "17"
  },
  "Nick Leverett": {
    "PlayerID": "3920591",
    "TeamID": "17"
  },
  "Vederian Lowe": {
    "PlayerID": "4240554",
    "TeamID": "17"
  },
  "Drake Maye": {
    "PlayerID": "4431452",
    "TeamID": "17"
  },
  "Joe Milton III": {
    "PlayerID": "4360698",
    "TeamID": "17"
  },
  "Mike Onwenu": {
    "PlayerID": "4046545",
    "TeamID": "17"
  },
  "K.J. Osborn": {
    "PlayerID": "3916566",
    "TeamID": "17"
  },
  "Ja'Lynn Polk": {
    "PlayerID": "4430637",
    "TeamID": "17"
  },
  "Layden Robinson": {
    "PlayerID": "4428368",
    "TeamID": "17"
  },
  "Sidy Sow": {
    "PlayerID": "4244826",
    "TeamID": "17"
  },
  "Rhamondre Stevenson": {
    "PlayerID": "4569173",
    "TeamID": "17"
  },
  "Zach Thomas": {
    "PlayerID": "4036834",
    "TeamID": "17"
  },
  "Tyquan Thornton": {
    "PlayerID": "4362921",
    "TeamID": "17"
  },
  "Isaiah Bolden": {
    "PlayerID": "4711029",
    "TeamID": "17"
  },
  "Marcellas Dial Jr.": {
    "PlayerID": "4875079",
    "TeamID": "17"
  },
  "Kyle Dugger": {
    "PlayerID": "4401811",
    "TeamID": "17"
  },
  "Daniel Ekuale": {
    "PlayerID": "3052059",
    "TeamID": "17"
  },
  "Christian Elliss": {
    "PlayerID": "4245273",
    "TeamID": "17"
  },
  "Davon Godchaux": {
    "PlayerID": "3115383",
    "TeamID": "17"
  },
  "Christian Gonzalez": {
    "PlayerID": "4686772",
    "TeamID": "17"
  },
  "Jaylinn Hawkins": {
    "PlayerID": "3858276",
    "TeamID": "17"
  },
  "Curtis Jacobs": {
    "PlayerID": "4429097",
    "TeamID": "17"
  },
  "Anfernee Jennings": {
    "PlayerID": "3925350",
    "TeamID": "17"
  },
  "Eric Johnson II": {
    "PlayerID": "4050971",
    "TeamID": "17"
  },
  "Jonathan Jones": {
    "PlayerID": "2971027",
    "TeamID": "17"
  },
  "Marcus Jones": {
    "PlayerID": "4241720",
    "TeamID": "17"
  },
  "Jamree Kromah": {
    "PlayerID": "4372463",
    "TeamID": "17"
  },
  "Marte Mapu": {
    "PlayerID": "4248899",
    "TeamID": "17"
  },
  "Ochaun Mathis": {
    "PlayerID": "4362486",
    "TeamID": "17"
  },
  "Raekwon McMillan": {
    "PlayerID": "3121423",
    "TeamID": "17"
  },
  "Jabrill Peppers": {
    "PlayerID": "3115962",
    "TeamID": "17"
  },
  "Dell Pettus": {
    "PlayerID": "4428232",
    "TeamID": "17"
  },
  "Jeremiah Pharms Jr.": {
    "PlayerID": "5081728",
    "TeamID": "17"
  },
  "Jaquelin Roy": {
    "PlayerID": "4429034",
    "TeamID": "17"
  },
  "Brenden Schooler": {
    "PlayerID": "4047941",
    "TeamID": "17"
  },
  "Jahlani Tavai": {
    "PlayerID": "3124587",
    "TeamID": "17"
  },
  "Joshua Uche": {
    "PlayerID": "4046528",
    "TeamID": "17"
  },
  "Keion White": {
    "PlayerID": "4243493",
    "TeamID": "17"
  },
  "Marco Wilson": {
    "PlayerID": "4240595",
    "TeamID": "17"
  },
  "Deatrich Wise Jr.": {
    "PlayerID": "2980080",
    "TeamID": "17"
  },
  "Bryce Baringer": {
    "PlayerID": "4240545",
    "TeamID": "17"
  },
  "Joe Cardona": {
    "PlayerID": "2575907",
    "TeamID": "17"
  },
  "Joey Slye": {
    "PlayerID": "3124084",
    "TeamID": "17"
  },
  "David Andrews": {
    "PlayerID": "2578529",
    "TeamID": "17"
  },
  "Jake Andrews": {
    "PlayerID": "4362732",
    "TeamID": "17"
  },
  "Alex Austin": {
    "PlayerID": "4426599",
    "TeamID": "17"
  },
  "Christian Barmore": {
    "PlayerID": "4372030",
    "TeamID": "17"
  },
  "Ja'Whaun Bentley": {
    "PlayerID": "3116187",
    "TeamID": "17"
  },
  "JaQuae Jackson": {
    "PlayerID": "5160748",
    "TeamID": "17"
  },
  "Cole Strange": {
    "PlayerID": "4051001",
    "TeamID": "17"
  },
  "Sione Takitaki": {
    "PlayerID": "3138834",
    "TeamID": "17"
  },
  "Caedan Wallace": {
    "PlayerID": "4426446",
    "TeamID": "17"
  },
  "Oshane Ximines": {
    "PlayerID": "3123233",
    "TeamID": "17"
  },
  "Jerome Carvin": {
    "PlayerID": "4369859",
    "TeamID": "17"
  },
  "Liam Fornadel": {
    "PlayerID": "4249599",
    "TeamID": "17"
  },
  "Joe Giles-Harris": {
    "PlayerID": "3917797",
    "TeamID": "17"
  },
  "Kevin Harris": {
    "PlayerID": "4570674",
    "TeamID": "17"
  },
  "Trysten Hill": {
    "PlayerID": "4042141",
    "TeamID": "17"
  },
  "DJ James": {
    "PlayerID": "4429891",
    "TeamID": "17"
  },
  "Terrell Jennings": {
    "PlayerID": "4427600",
    "TeamID": "17"
  },
  "Caleb Jones": {
    "PlayerID": "4258246",
    "TeamID": "17"
  },
  "Matt Landers": {
    "PlayerID": "4259550",
    "TeamID": "17"
  },
  "Jalen McKenzie": {
    "PlayerID": "4259644",
    "TeamID": "17"
  },
  "Mark Perry": {
    "PlayerID": "4428223",
    "TeamID": "17"
  },
  "Jotham Russell": {
    "PlayerID": "5209588",
    "TeamID": "17"
  },
  "Jack Westover": {
    "PlayerID": "4361100",
    "TeamID": "17"
  },
  "Mitchell Wilcox": {
    "PlayerID": "3923392",
    "TeamID": "17"
  },
  "Derek Carr": {
    "PlayerID": "16757",
    "TeamID": "18"
  },
  "Taliese Fuaga": {
    "PlayerID": "4606711",
    "TeamID": "18"
  },
  "Jake Haener": {
    "PlayerID": "4243322",
    "TeamID": "18"
  },
  "Taysom Hill": {
    "PlayerID": "2468609",
    "TeamID": "18"
  },
  "Dallin Holker": {
    "PlayerID": "4373634",
    "TeamID": "18"
  },
  "Juwan Johnson": {
    "PlayerID": "3929645",
    "TeamID": "18"
  },
  "Alvin Kamara": {
    "PlayerID": "3054850",
    "TeamID": "18"
  },
  "Shane Lemieux": {
    "PlayerID": "3915142",
    "TeamID": "18"
  },
  "Bub Means": {
    "PlayerID": "4427985",
    "TeamID": "18"
  },
  "Jordan Mims": {
    "PlayerID": "4243004",
    "TeamID": "18"
  },
  "Foster Moreau": {
    "PlayerID": "3843945",
    "TeamID": "18"
  },
  "Chris Olave": {
    "PlayerID": "4361370",
    "TeamID": "18"
  },
  "Lucas Patrick": {
    "PlayerID": "2576736",
    "TeamID": "18"
  },
  "Trevor Penning": {
    "PlayerID": "4248627",
    "TeamID": "18"
  },
  "Adam Prentice": {
    "PlayerID": "3929914",
    "TeamID": "18"
  },
  "Spencer Rattler": {
    "PlayerID": "4426339",
    "TeamID": "18"
  },
  "Cesar Ruiz": {
    "PlayerID": "4258199",
    "TeamID": "18"
  },
  "Nick Saldiveri": {
    "PlayerID": "4361600",
    "TeamID": "18"
  },
  "Rashid Shaheed": {
    "PlayerID": "4032473",
    "TeamID": "18"
  },
  "Mason Tipton": {
    "PlayerID": "4573697",
    "TeamID": "18"
  },
  "Olisaemeka Udoh": {
    "PlayerID": "3120502",
    "TeamID": "18"
  },
  "Jamaal Williams": {
    "PlayerID": "2980453",
    "TeamID": "18"
  },
  "Cedrick Wilson Jr.": {
    "PlayerID": "4036335",
    "TeamID": "18"
  },
  "Landon Young": {
    "PlayerID": "4035079",
    "TeamID": "18"
  },
  "Paulson Adebo": {
    "PlayerID": "4242547",
    "TeamID": "18"
  },
  "Khristian Boyd": {
    "PlayerID": "4384595",
    "TeamID": "18"
  },
  "Bryan Bresee": {
    "PlayerID": "4428988",
    "TeamID": "18"
  },
  "Demario Davis": {
    "PlayerID": "14958",
    "TeamID": "18"
  },
  "Jaylan Ford": {
    "PlayerID": "4566088",
    "TeamID": "18"
  },
  "Isaiah Foskey": {
    "PlayerID": "4426457",
    "TeamID": "18"
  },
  "Willie Gay": {
    "PlayerID": "4259804",
    "TeamID": "18"
  },
  "Carl Granderson": {
    "PlayerID": "3918310",
    "TeamID": "18"
  },
  "J.T. Gray": {
    "PlayerID": "3115481",
    "TeamID": "18"
  },
  "Will Harris": {
    "PlayerID": "3915297",
    "TeamID": "18"
  },
  "Jordan Howden": {
    "PlayerID": "4360949",
    "TeamID": "18"
  },
  "D'Marco Jackson": {
    "PlayerID": "4241007",
    "TeamID": "18"
  },
  "Cameron Jordan": {
    "PlayerID": "13971",
    "TeamID": "18"
  },
  "Marshon Lattimore": {
    "PlayerID": "3121421",
    "TeamID": "18"
  },
  "Tyrann Mathieu": {
    "PlayerID": "15851",
    "TeamID": "18"
  },
  "Kool-Aid McKinstry": {
    "PlayerID": "4433975",
    "TeamID": "18"
  },
  "Anfernee Orji": {
    "PlayerID": "4567535",
    "TeamID": "18"
  },
  "Rico Payton": {
    "PlayerID": "4368350",
    "TeamID": "18"
  },
  "John Ridgeway III": {
    "PlayerID": "4248047",
    "TeamID": "18"
  },
  "Khalen Saunders": {
    "PlayerID": "3121634",
    "TeamID": "18"
  },
  "Nathan Shepherd": {
    "PlayerID": "4076951",
    "TeamID": "18"
  },
  "Alontae Taylor": {
    "PlayerID": "4369835",
    "TeamID": "18"
  },
  "Payton Turner": {
    "PlayerID": "4240269",
    "TeamID": "18"
  },
  "Pete Werner": {
    "PlayerID": "4241993",
    "TeamID": "18"
  },
  "Chase Young": {
    "PlayerID": "4241986",
    "TeamID": "18"
  },
  "Blake Grupe": {
    "PlayerID": "4259619",
    "TeamID": "18"
  },
  "Matthew Hayball": {
    "PlayerID": "4571597",
    "TeamID": "18"
  },
  "Zach Wood": {
    "PlayerID": "2575788",
    "TeamID": "18"
  },
  "Justin Herron": {
    "PlayerID": "3124112",
    "TeamID": "18"
  },
  "Tanoh Kpassagnon": {
    "PlayerID": "2982313",
    "TeamID": "18"
  },
  "Erik McCoy": {
    "PlayerID": "3917331",
    "TeamID": "18"
  },
  "Kendre Miller": {
    "PlayerID": "4599739",
    "TeamID": "18"
  },
  "Camron Peterson": {
    "PlayerID": "4371506",
    "TeamID": "18"
  },
  "Ryan Ramczyk": {
    "PlayerID": "3917676",
    "TeamID": "18"
  },
  "Nephi Sewell": {
    "PlayerID": "4241611",
    "TeamID": "18"
  },
  "Rejzohn Wright": {
    "PlayerID": "4696043",
    "TeamID": "18"
  },
  "Johnathan Abram": {
    "PlayerID": "3728305",
    "TeamID": "18"
  },
  "Ugo Amadi": {
    "PlayerID": "3886834",
    "TeamID": "18"
  },
  "Kevin Austin Jr.": {
    "PlayerID": "4372758",
    "TeamID": "18"
  },
  "Millard Bradford": {
    "PlayerID": "4569352",
    "TeamID": "18"
  },
  "Austin Deculus": {
    "PlayerID": "4242229",
    "TeamID": "18"
  },
  "Josiah Ezirim": {
    "PlayerID": "4570883",
    "TeamID": "18"
  },
  "Kyle Hergel": {
    "PlayerID": "4384683",
    "TeamID": "18"
  },
  "Jermaine Jackson": {
    "PlayerID": "4698301",
    "TeamID": "18"
  },
  "Michael Jacobson": {
    "PlayerID": "3911895",
    "TeamID": "18"
  },
  "Shemar Jean-Charles": {
    "PlayerID": "4036430",
    "TeamID": "18"
  },
  "Niko Lalos": {
    "PlayerID": "4030955",
    "TeamID": "18"
  },
  "Chris Reed": {
    "PlayerID": "3163375",
    "TeamID": "18"
  },
  "Charlie Smyth": {
    "PlayerID": "5208518",
    "TeamID": "18"
  },
  "Equanimeous St. Brown": {
    "PlayerID": "3932442",
    "TeamID": "18"
  },
  "Isaiah Stalbird": {
    "PlayerID": "4361194",
    "TeamID": "18"
  },
  "Kendal Vickers": {
    "PlayerID": "3044732",
    "TeamID": "18"
  },
  "Treyton Welch": {
    "PlayerID": "4430684",
    "TeamID": "18"
  },
  "Daniel Bellinger": {
    "PlayerID": "4361516",
    "TeamID": "19"
  },
  "Tommy DeVito": {
    "PlayerID": "4240391",
    "TeamID": "19"
  },
  "Jermaine Eluemunor": {
    "PlayerID": "3115303",
    "TeamID": "19"
  },
  "Joshua Ezeudu": {
    "PlayerID": "4373280",
    "TeamID": "19"
  },
  "Bryce Ford-Wheaton": {
    "PlayerID": "4362227",
    "TeamID": "19"
  },
  "Eric Gray": {
    "PlayerID": "4570561",
    "TeamID": "19"
  },
  "Isaiah Hodgins": {
    "PlayerID": "4242540",
    "TeamID": "19"
  },
  "Jalin Hyatt": {
    "PlayerID": "4692590",
    "TeamID": "19"
  },
  "Theo Johnson": {
    "PlayerID": "4429148",
    "TeamID": "19"
  },
  "Daniel Jones": {
    "PlayerID": "3917792",
    "TeamID": "19"
  },
  "Jake Kubas": {
    "PlayerID": "4383405",
    "TeamID": "19"
  },
  "Drew Lock": {
    "PlayerID": "3924327",
    "TeamID": "19"
  },
  "Chris Manhertz": {
    "PlayerID": "2531358",
    "TeamID": "19"
  },
  "Dante Miller": {
    "PlayerID": "4367510",
    "TeamID": "19"
  },
  "Malik Nabers": {
    "PlayerID": "4595348",
    "TeamID": "19"
  },
  "Evan Neal": {
    "PlayerID": "4567134",
    "TeamID": "19"
  },
  "Wan'Dale Robinson": {
    "PlayerID": "4569587",
    "TeamID": "19"
  },
  "Jon Runyan": {
    "PlayerID": "3929936",
    "TeamID": "19"
  },
  "John Michael Schmitz Jr.": {
    "PlayerID": "4240771",
    "TeamID": "19"
  },
  "Devin Singletary": {
    "PlayerID": "4040761",
    "TeamID": "19"
  },
  "Darius Slayton": {
    "PlayerID": "3916945",
    "TeamID": "19"
  },
  "Ihmir Smith-Marsette": {
    "PlayerID": "4240573",
    "TeamID": "19"
  },
  "Aaron Stinnie": {
    "PlayerID": "3049339",
    "TeamID": "19"
  },
  "Andrew Thomas": {
    "PlayerID": "4259566",
    "TeamID": "19"
  },
  "Tyrone Tracy Jr.": {
    "PlayerID": "4360516",
    "TeamID": "19"
  },
  "Greg Van Roten": {
    "PlayerID": "15718",
    "TeamID": "19"
  },
  "Matthew Adams": {
    "PlayerID": "3126179",
    "TeamID": "19"
  },
  "Deonte Banks": {
    "PlayerID": "4428328",
    "TeamID": "19"
  },
  "Boogie Basham": {
    "PlayerID": "4037239",
    "TeamID": "19"
  },
  "Dane Belton": {
    "PlayerID": "4426686",
    "TeamID": "19"
  },
  "Brian Burns": {
    "PlayerID": "4035631",
    "TeamID": "19"
  },
  "Elijah Chatman": {
    "PlayerID": "4429392",
    "TeamID": "19"
  },
  "D.J. Davidson": {
    "PlayerID": "4242899",
    "TeamID": "19"
  },
  "Cor'Dale Flott": {
    "PlayerID": "4429607",
    "TeamID": "19"
  },
  "Tre Hawkins III": {
    "PlayerID": "4686553",
    "TeamID": "19"
  },
  "Adoree' Jackson": {
    "PlayerID": "3120347",
    "TeamID": "19"
  },
  "Patrick Johnson": {
    "PlayerID": "4243916",
    "TeamID": "19"
  },
  "Anthony Johnson Jr.": {
    "PlayerID": "4361748",
    "TeamID": "19"
  },
  "Dexter Lawrence II": {
    "PlayerID": "4035483",
    "TeamID": "19"
  },
  "Nick McCloud": {
    "PlayerID": "4036169",
    "TeamID": "19"
  },
  "Micah McFadden": {
    "PlayerID": "4371961",
    "TeamID": "19"
  },
  "Darius Muasau": {
    "PlayerID": "4428072",
    "TeamID": "19"
  },
  "Tyler Nubin": {
    "PlayerID": "4430261",
    "TeamID": "19"
  },
  "Rakeem Nunez-Roches": {
    "PlayerID": "2575453",
    "TeamID": "19"
  },
  "Azeez Ojulari": {
    "PlayerID": "4379409",
    "TeamID": "19"
  },
  "Bobby Okereke": {
    "PlayerID": "3117253",
    "TeamID": "19"
  },
  "Dru Phillips": {
    "PlayerID": "4431321",
    "TeamID": "19"
  },
  "Jason Pinnock": {
    "PlayerID": "4240706",
    "TeamID": "19"
  },
  "Jordon Riley": {
    "PlayerID": "4240677",
    "TeamID": "19"
  },
  "Isaiah Simmons": {
    "PlayerID": "4035462",
    "TeamID": "19"
  },
  "Ty Summers": {
    "PlayerID": "3116431",
    "TeamID": "19"
  },
  "Kayvon Thibodeaux": {
    "PlayerID": "4426326",
    "TeamID": "19"
  },
  "Jamie Gillan": {
    "PlayerID": "3936185",
    "TeamID": "19"
  },
  "Greg Joseph": {
    "PlayerID": "3975763",
    "TeamID": "19"
  },
  "Casey Kreiter": {
    "PlayerID": "17304",
    "TeamID": "19"
  },
  "Graham Gano": {
    "PlayerID": "12460",
    "TeamID": "19"
  },
  "Timmy Horne": {
    "PlayerID": "4045701",
    "TeamID": "19"
  },
  "Dyontae Johnson": {
    "PlayerID": "4362280",
    "TeamID": "19"
  },
  "Gunner Olszewski": {
    "PlayerID": "4424106",
    "TeamID": "19"
  },
  "Elijah Riley": {
    "PlayerID": "4036924",
    "TeamID": "19"
  },
  "Austin Schlottmann": {
    "PlayerID": "4038544",
    "TeamID": "19"
  },
  "Jonathan Sutherland": {
    "PlayerID": "4259608",
    "TeamID": "19"
  },
  "Curtis Bolton": {
    "PlayerID": "3116367",
    "TeamID": "19"
  },
  "Carter Coughlin": {
    "PlayerID": "4034766",
    "TeamID": "19"
  },
  "Tomon Fox": {
    "PlayerID": "4037520",
    "TeamID": "19"
  },
  "Elijah Garcia": {
    "PlayerID": "4039170",
    "TeamID": "19"
  },
  "Art Green": {
    "PlayerID": "4689674",
    "TeamID": "19"
  },
  "Kearis Jackson": {
    "PlayerID": "4361778",
    "TeamID": "19"
  },
  "Jakob Johnson": {
    "PlayerID": "3115349",
    "TeamID": "19"
  },
  "Raheem Layne": {
    "PlayerID": "4258237",
    "TeamID": "19"
  },
  "Cade Mays": {
    "PlayerID": "4361788",
    "TeamID": "19"
  },
  "Jude McAtamney": {
    "PlayerID": "5092436",
    "TeamID": "19"
  },
  "Joshua Miles": {
    "PlayerID": "3120434",
    "TeamID": "19"
  },
  "Jimmy Morrissey": {
    "PlayerID": "4046165",
    "TeamID": "19"
  },
  "Gervarrius Owens": {
    "PlayerID": "4567482",
    "TeamID": "19"
  },
  "Casey Rogers": {
    "PlayerID": "4361189",
    "TeamID": "19"
  },
  "Duke Shelley": {
    "PlayerID": "3916126",
    "TeamID": "19"
  },
  "Greg Stroman Jr.": {
    "PlayerID": "3124086",
    "TeamID": "19"
  },
  "Israel Abanikanda": {
    "PlayerID": "4429202",
    "TeamID": "20"
  },
  "Braelon Allen": {
    "PlayerID": "4685247",
    "TeamID": "20"
  },
  "Brenden Bates": {
    "PlayerID": "4362603",
    "TeamID": "20"
  },
  "Irvin Charles": {
    "PlayerID": "3929636",
    "TeamID": "20"
  },
  "Tyler Conklin": {
    "PlayerID": "3915486",
    "TeamID": "20"
  },
  "Malachi Corley": {
    "PlayerID": "4613104",
    "TeamID": "20"
  },
  "Isaiah Davis": {
    "PlayerID": "4695404",
    "TeamID": "20"
  },
  "Olu Fashanu": {
    "PlayerID": "4431809",
    "TeamID": "20"
  },
  "Xavier Gipson": {
    "PlayerID": "4427278",
    "TeamID": "20"
  },
  "Breece Hall": {
    "PlayerID": "4427366",
    "TeamID": "20"
  },
  "Jake Hanson": {
    "PlayerID": "3915139",
    "TeamID": "20"
  },
  "Allen Lazard": {
    "PlayerID": "3128390",
    "TeamID": "20"
  },
  "Adrian Martinez": {
    "PlayerID": "4361182",
    "TeamID": "20"
  },
  "Max Mitchell": {
    "PlayerID": "4373656",
    "TeamID": "20"
  },
  "Morgan Moses": {
    "PlayerID": "16771",
    "TeamID": "20"
  },
  "Xavier Newman": {
    "PlayerID": "4259186",
    "TeamID": "20"
  },
  "Aaron Rodgers": {
    "PlayerID": "8439",
    "TeamID": "20"
  },
  "Jeremy Ruckert": {
    "PlayerID": "4361372",
    "TeamID": "20"
  },
  "John Simpson": {
    "PlayerID": "4035479",
    "TeamID": "20"
  },
  "Tyron Smith": {
    "PlayerID": "13978",
    "TeamID": "20"
  },
  "Tyrod Taylor": {
    "PlayerID": "14163",
    "TeamID": "20"
  },
  "Joe Tippmann": {
    "PlayerID": "4428681",
    "TeamID": "20"
  },
  "Alijah Vera-Tucker": {
    "PlayerID": "4259646",
    "TeamID": "20"
  },
  "Carter Warren": {
    "PlayerID": "4240723",
    "TeamID": "20"
  },
  "Mike Williams": {
    "PlayerID": "3045138",
    "TeamID": "20"
  },
  "Garrett Wilson": {
    "PlayerID": "4569618",
    "TeamID": "20"
  },
  "Tony Adams": {
    "PlayerID": "4240532",
    "TeamID": "20"
  },
  "Jarrick Bernard-Converse": {
    "PlayerID": "4361834",
    "TeamID": "20"
  },
  "Michael Carter II": {
    "PlayerID": "4240456",
    "TeamID": "20"
  },
  "Chuck Clark": {
    "PlayerID": "3045463",
    "TeamID": "20"
  },
  "Micheal Clemons": {
    "PlayerID": "4240896",
    "TeamID": "20"
  },
  "Ashtyn Davis": {
    "PlayerID": "3858271",
    "TeamID": "20"
  },
  "Brandin Echols": {
    "PlayerID": "4567979",
    "TeamID": "20"
  },
  "Sam Eguavoen": {
    "PlayerID": "2577637",
    "TeamID": "20"
  },
  "Sauce Gardner": {
    "PlayerID": "4427250",
    "TeamID": "20"
  },
  "Anthony Hines III": {
    "PlayerID": "4240909",
    "TeamID": "20"
  },
  "Jalyn Holmes": {
    "PlayerID": "3121414",
    "TeamID": "20"
  },
  "Javon Kinlaw": {
    "PlayerID": "4259491",
    "TeamID": "20"
  },
  "Marcelino McCrary-Ball": {
    "PlayerID": "4045299",
    "TeamID": "20"
  },
  "Will McDonald IV": {
    "PlayerID": "4361767",
    "TeamID": "20"
  },
  "Braiden McGregor": {
    "PlayerID": "4429005",
    "TeamID": "20"
  },
  "Takk McKinley": {
    "PlayerID": "3152371",
    "TeamID": "20"
  },
  "C.J. Mosley": {
    "PlayerID": "16720",
    "TeamID": "20"
  },
  "Isaiah Oliver": {
    "PlayerID": "3915437",
    "TeamID": "20"
  },
  "Haason Reddick": {
    "PlayerID": "2980504",
    "TeamID": "20"
  },
  "D.J. Reed": {
    "PlayerID": "3139387",
    "TeamID": "20"
  },
  "Jamien Sherwood": {
    "PlayerID": "4361331",
    "TeamID": "20"
  },
  "Qwan'tez Stiggers": {
    "PlayerID": "5208977",
    "TeamID": "20"
  },
  "Chazz Surratt": {
    "PlayerID": "4037521",
    "TeamID": "20"
  },
  "Leonard Taylor III": {
    "PlayerID": "4431598",
    "TeamID": "20"
  },
  "Solomon Thomas": {
    "PlayerID": "3117258",
    "TeamID": "20"
  },
  "Eric Watts": {
    "PlayerID": "4569016",
    "TeamID": "20"
  },
  "Quincy Williams": {
    "PlayerID": "3110565",
    "TeamID": "20"
  },
  "Quinnen Williams": {
    "PlayerID": "4040982",
    "TeamID": "20"
  },
  "Thomas Hennessy": {
    "PlayerID": "2983155",
    "TeamID": "20"
  },
  "Thomas Morstead": {
    "PlayerID": "12701",
    "TeamID": "20"
  },
  "Greg Zuerlein": {
    "PlayerID": "14993",
    "TeamID": "20"
  },
  "Zaire Barnes": {
    "PlayerID": "4362234",
    "TeamID": "20"
  },
  "Jimmy Ciarlo": {
    "PlayerID": "4689804",
    "TeamID": "20"
  },
  "Leki Fotu": {
    "PlayerID": "4035666",
    "TeamID": "20"
  },
  "Jermaine Johnson": {
    "PlayerID": "4567962",
    "TeamID": "20"
  },
  "Marcus Riley": {
    "PlayerID": "4360803",
    "TeamID": "20"
  },
  "Wes Schweitzer": {
    "PlayerID": "2581273",
    "TeamID": "20"
  },
  "Malik Taylor": {
    "PlayerID": "4408988",
    "TeamID": "20"
  },
  "Jordan Travis": {
    "PlayerID": "4360799",
    "TeamID": "20"
  },
  "Kenny Yeboah": {
    "PlayerID": "4044144",
    "TeamID": "20"
  },
  "Jason Brownlee": {
    "PlayerID": "4689988",
    "TeamID": "20"
  },
  "Obinna Eze": {
    "PlayerID": "4243386",
    "TeamID": "20"
  },
  "Anthony Firkser": {
    "PlayerID": "3049698",
    "TeamID": "20"
  },
  "Bruce Hector": {
    "PlayerID": "3051369",
    "TeamID": "20"
  },
  "Zack Kuntz": {
    "PlayerID": "4361417",
    "TeamID": "20"
  },
  "Kohl Levao": {
    "PlayerID": "4373951",
    "TeamID": "20"
  },
  "Jalen Mills": {
    "PlayerID": "2976540",
    "TeamID": "20"
  },
  "Jarius Monroe": {
    "PlayerID": "4430182",
    "TeamID": "20"
  },
  "Kene Nwangwu": {
    "PlayerID": "4035537",
    "TeamID": "20"
  },
  "Kendall Sheffield": {
    "PlayerID": "3925358",
    "TeamID": "20"
  },
  "Jackson Sirmon": {
    "PlayerID": "4361101",
    "TeamID": "20"
  },
  "Brandon Smith": {
    "PlayerID": "4240577",
    "TeamID": "20"
  },
  "Tre Swilling": {
    "PlayerID": "4240476",
    "TeamID": "20"
  },
  "Saquon Barkley": {
    "PlayerID": "3929630",
    "TeamID": "21"
  },
  "Mekhi Becton": {
    "PlayerID": "4240090",
    "TeamID": "21"
  },
  "A.J. Brown": {
    "PlayerID": "4047646",
    "TeamID": "21"
  },
  "Grant Calcaterra": {
    "PlayerID": "4241374",
    "TeamID": "21"
  },
  "Landon Dickerson": {
    "PlayerID": "4035624",
    "TeamID": "21"
  },
  "Jahan Dotson": {
    "PlayerID": "4361409",
    "TeamID": "21"
  },
  "Kenneth Gainwell": {
    "PlayerID": "4371733",
    "TeamID": "21"
  },
  "Nick Gates": {
    "PlayerID": "3116096",
    "TeamID": "21"
  },
  "Dallas Goedert": {
    "PlayerID": "3121023",
    "TeamID": "21"
  },
  "Jalen Hurts": {
    "PlayerID": "4040715",
    "TeamID": "21"
  },
  "Fred Johnson": {
    "PlayerID": "3915106",
    "TeamID": "21"
  },
  "Lane Johnson": {
    "PlayerID": "15797",
    "TeamID": "21"
  },
  "Cam Jurgens": {
    "PlayerID": "4361178",
    "TeamID": "21"
  },
  "Trevor Keegan": {
    "PlayerID": "4427140",
    "TeamID": "21"
  },
  "Darian Kinnard": {
    "PlayerID": "4362611",
    "TeamID": "21"
  },
  "Jordan Mailata": {
    "PlayerID": "4334215",
    "TeamID": "21"
  },
  "Tanner McKee": {
    "PlayerID": "4685201",
    "TeamID": "21"
  },
  "Kenny Pickett": {
    "PlayerID": "4240703",
    "TeamID": "21"
  },
  "Will Shipley": {
    "PlayerID": "4431545",
    "TeamID": "21"
  },
  "DeVonta Smith": {
    "PlayerID": "4241478",
    "TeamID": "21"
  },
  "Tyler Steen": {
    "PlayerID": "4362805",
    "TeamID": "21"
  },
  "Jack Stoll": {
    "PlayerID": "4034862",
    "TeamID": "21"
  },
  "Johnny Wilson": {
    "PlayerID": "4686104",
    "TeamID": "21"
  },
  "Zack Baun": {
    "PlayerID": "3917657",
    "TeamID": "21"
  },
  "Reed Blankenship": {
    "PlayerID": "4243956",
    "TeamID": "21"
  },
  "Thomas Booker IV": {
    "PlayerID": "4360749",
    "TeamID": "21"
  },
  "Oren Burks": {
    "PlayerID": "3051746",
    "TeamID": "21"
  },
  "Jalen Carter": {
    "PlayerID": "4685759",
    "TeamID": "21"
  },
  "Jordan Davis": {
    "PlayerID": "4381558",
    "TeamID": "21"
  },
  "Nakobe Dean": {
    "PlayerID": "4426340",
    "TeamID": "21"
  },
  "Cooper DeJean": {
    "PlayerID": "4682618",
    "TeamID": "21"
  },
  "C.J. Gardner-Johnson": {
    "PlayerID": "4034953",
    "TeamID": "21"
  },
  "Brandon Graham": {
    "PlayerID": "13239",
    "TeamID": "21"
  },
  "Bryce Huff": {
    "PlayerID": "4039375",
    "TeamID": "21"
  },
  "Jalyx Hunt": {
    "PlayerID": "4571162",
    "TeamID": "21"
  },
  "Avonte Maddox": {
    "PlayerID": "3123938",
    "TeamID": "21"
  },
  "Tristin McCollum": {
    "PlayerID": "4250393",
    "TeamID": "21"
  },
  "Quinyon Mitchell": {
    "PlayerID": "4686273",
    "TeamID": "21"
  },
  "Moro Ojomo": {
    "PlayerID": "4362116",
    "TeamID": "21"
  },
  "Eli Ricks": {
    "PlayerID": "4429011",
    "TeamID": "21"
  },
  "Kelee Ringo": {
    "PlayerID": "4428992",
    "TeamID": "21"
  },
  "Isaiah Rodgers": {
    "PlayerID": "4044540",
    "TeamID": "21"
  },
  "Darius Slay Jr.": {
    "PlayerID": "15863",
    "TeamID": "21"
  },
  "Nolan Smith Jr.": {
    "PlayerID": "4426331",
    "TeamID": "21"
  },
  "Josh Sweat": {
    "PlayerID": "3693166",
    "TeamID": "21"
  },
  "Jeremiah Trotter Jr.": {
    "PlayerID": "4432777",
    "TeamID": "21"
  },
  "Ben VanSumeren": {
    "PlayerID": "4372070",
    "TeamID": "21"
  },
  "Devin White": {
    "PlayerID": "4035434",
    "TeamID": "21"
  },
  "Milton Williams": {
    "PlayerID": "4239699",
    "TeamID": "21"
  },
  "Jake Elliott": {
    "PlayerID": "3050478",
    "TeamID": "21"
  },
  "Rick Lovato": {
    "PlayerID": "2565971",
    "TeamID": "21"
  },
  "Braden Mann": {
    "PlayerID": "4035239",
    "TeamID": "21"
  },
  "James Bradberry IV": {
    "PlayerID": "2572841",
    "TeamID": "21"
  },
  "Sydney Brown": {
    "PlayerID": "4360386",
    "TeamID": "21"
  },
  "Le'Raven Clark": {
    "PlayerID": "2577631",
    "TeamID": "21"
  },
  "Britain Covey": {
    "PlayerID": "3926231",
    "TeamID": "21"
  },
  "Mekhi Garner": {
    "PlayerID": "4570294",
    "TeamID": "21"
  },
  "Jacob Harris": {
    "PlayerID": "3932144",
    "TeamID": "21"
  },
  "Albert Okwuegbunam Jr.": {
    "PlayerID": "4035115",
    "TeamID": "21"
  },
  "Ainias Smith": {
    "PlayerID": "4428532",
    "TeamID": "21"
  },
  "David Anenih": {
    "PlayerID": "4240263",
    "TeamID": "21"
  },
  "Parris Campbell": {
    "PlayerID": "3121410",
    "TeamID": "21"
  },
  "Tyrion Davis-Price": {
    "PlayerID": "4426475",
    "TeamID": "21"
  },
  "Danny Gray": {
    "PlayerID": "4689546",
    "TeamID": "21"
  },
  "Will Grier": {
    "PlayerID": "3115252",
    "TeamID": "21"
  },
  "Gabe Hall": {
    "PlayerID": "4429731",
    "TeamID": "21"
  },
  "E.J. Jenkins": {
    "PlayerID": "4248557",
    "TeamID": "21"
  },
  "Marcus Rosemy-Jacksaint": {
    "PlayerID": "4429019",
    "TeamID": "21"
  },
  "John Ross": {
    "PlayerID": "3052177",
    "TeamID": "21"
  },
  "Andre' Sam": {
    "PlayerID": "4250510",
    "TeamID": "21"
  },
  "Caden Sterns": {
    "PlayerID": "4362077",
    "TeamID": "21"
  },
  "Brett Toth": {
    "PlayerID": "3129116",
    "TeamID": "21"
  },
  "Laekin Vakalahi": {
    "PlayerID": "5211218",
    "TeamID": "21"
  },
  "A.J. Woods": {
    "PlayerID": "4428932",
    "TeamID": "21"
  },
  "JT Woods": {
    "PlayerID": "4362917",
    "TeamID": "21"
  },
  "Kyle Allen": {
    "PlayerID": "3115293",
    "TeamID": "23"
  },
  "Calvin Anderson": {
    "PlayerID": "3123867",
    "TeamID": "23"
  },
  "Spencer Anderson": {
    "PlayerID": "4372056",
    "TeamID": "23"
  },
  "Calvin Austin III": {
    "PlayerID": "4243389",
    "TeamID": "23"
  },
  "Justin Fields": {
    "PlayerID": "4362887",
    "TeamID": "23"
  },
  "Zach Frazier": {
    "PlayerID": "4429775",
    "TeamID": "23"
  },
  "Pat Freiermuth": {
    "PlayerID": "4361411",
    "TeamID": "23"
  },
  "Najee Harris": {
    "PlayerID": "4241457",
    "TeamID": "23"
  },
  "Connor Heyward": {
    "PlayerID": "4241961",
    "TeamID": "23"
  },
  "Van Jefferson": {
    "PlayerID": "3930066",
    "TeamID": "23"
  },
  "Brandon Johnson": {
    "PlayerID": "4035198",
    "TeamID": "23"
  },
  "Broderick Jones": {
    "PlayerID": "4428990",
    "TeamID": "23"
  },
  "Ryan McCollum": {
    "PlayerID": "4035253",
    "TeamID": "23"
  },
  "Mason McCormick": {
    "PlayerID": "4368304",
    "TeamID": "23"
  },
  "Scotty Miller": {
    "PlayerID": "3914397",
    "TeamID": "23"
  },
  "Dan Moore Jr.": {
    "PlayerID": "4240920",
    "TeamID": "23"
  },
  "Cordarrelle Patterson": {
    "PlayerID": "15807",
    "TeamID": "23"
  },
  "George Pickens": {
    "PlayerID": "4426354",
    "TeamID": "23"
  },
  "MyCole Pruitt": {
    "PlayerID": "2508256",
    "TeamID": "23"
  },
  "Max Scharping": {
    "PlayerID": "3126035",
    "TeamID": "23"
  },
  "Isaac Seumalo": {
    "PlayerID": "2978247",
    "TeamID": "23"
  },
  "Aaron Shampklin": {
    "PlayerID": "4248068",
    "TeamID": "23"
  },
  "Jonathan Ward": {
    "PlayerID": "4039274",
    "TeamID": "23"
  },
  "Jaylen Warren": {
    "PlayerID": "4569987",
    "TeamID": "23"
  },
  "Darnell Washington": {
    "PlayerID": "4430802",
    "TeamID": "23"
  },
  "Rodney Williams": {
    "PlayerID": "4250969",
    "TeamID": "23"
  },
  "Roman Wilson": {
    "PlayerID": "4431492",
    "TeamID": "23"
  },
  "Russell Wilson": {
    "PlayerID": "14881",
    "TeamID": "23"
  },
  "Montravius Adams": {
    "PlayerID": "3051894",
    "TeamID": "23"
  },
  "Keeanu Benton": {
    "PlayerID": "4426694",
    "TeamID": "23"
  },
  "Beanie Bishop Jr.": {
    "PlayerID": "4363052",
    "TeamID": "23"
  },
  "Terrell Edmunds": {
    "PlayerID": "3124067",
    "TeamID": "23"
  },
  "DeShon Elliott": {
    "PlayerID": "3929846",
    "TeamID": "23"
  },
  "Minkah Fitzpatrick": {
    "PlayerID": "3925345",
    "TeamID": "23"
  },
  "Nick Herbig": {
    "PlayerID": "4429164",
    "TeamID": "23"
  },
  "Cameron Heyward": {
    "PlayerID": "13977",
    "TeamID": "23"
  },
  "Alex Highsmith": {
    "PlayerID": "4037333",
    "TeamID": "23"
  },
  "Donte Jackson": {
    "PlayerID": "3843769",
    "TeamID": "23"
  },
  "Damontae Kazee": {
    "PlayerID": "2976099",
    "TeamID": "23"
  },
  "Miles Killebrew": {
    "PlayerID": "2575164",
    "TeamID": "23"
  },
  "DeMarvin Leal": {
    "PlayerID": "4426359",
    "TeamID": "23"
  },
  "Isaiahh Loudermilk": {
    "PlayerID": "4035798",
    "TeamID": "23"
  },
  "Dean Lowry": {
    "PlayerID": "2974348",
    "TeamID": "23"
  },
  "Jeremiah Moon": {
    "PlayerID": "4034959",
    "TeamID": "23"
  },
  "Larry Ogunjobi": {
    "PlayerID": "3050122",
    "TeamID": "23"
  },
  "James Pierre": {
    "PlayerID": "4259252",
    "TeamID": "23"
  },
  "Joey Porter Jr.": {
    "PlayerID": "4426506",
    "TeamID": "23"
  },
  "Patrick Queen": {
    "PlayerID": "4242207",
    "TeamID": "23"
  },
  "Elandon Roberts": {
    "PlayerID": "2987743",
    "TeamID": "23"
  },
  "Mark Robinson": {
    "PlayerID": "4249342",
    "TeamID": "23"
  },
  "Cameron Sutton": {
    "PlayerID": "3044724",
    "TeamID": "23"
  },
  "T.J. Watt": {
    "PlayerID": "3045282",
    "TeamID": "23"
  },
  "Payton Wilson": {
    "PlayerID": "4361652",
    "TeamID": "23"
  },
  "Chris Boswell": {
    "PlayerID": "17372",
    "TeamID": "23"
  },
  "Christian Kuntz": {
    "PlayerID": "2978524",
    "TeamID": "23"
  },
  "Corliss Waitman": {
    "PlayerID": "3125280",
    "TeamID": "23"
  },
  "Dylan Cook": {
    "PlayerID": "4570898",
    "TeamID": "23"
  },
  "James Daniels": {
    "PlayerID": "3894849",
    "TeamID": "23"
  },
  "Troy Fautanu": {
    "PlayerID": "4427170",
    "TeamID": "23"
  },
  "Nate Herbig": {
    "PlayerID": "4044438",
    "TeamID": "23"
  },
  "Cole Holcomb": {
    "PlayerID": "3116689",
    "TeamID": "23"
  },
  "Cameron Johnston": {
    "PlayerID": "3051397",
    "TeamID": "23"
  },
  "Logan Lee": {
    "PlayerID": "4569474",
    "TeamID": "23"
  },
  "Tyler Matakevich": {
    "PlayerID": "2976249",
    "TeamID": "23"
  },
  "David Perales": {
    "PlayerID": "4365839",
    "TeamID": "23"
  },
  "Ben Skowronek": {
    "PlayerID": "4035656",
    "TeamID": "23"
  },
  "Cory Trice Jr.": {
    "PlayerID": "4372492",
    "TeamID": "23"
  },
  "Ryan Watts": {
    "PlayerID": "4685092",
    "TeamID": "23"
  },
  "Anthony Averett": {
    "PlayerID": "3054841",
    "TeamID": "23"
  },
  "Thomas Graham Jr.": {
    "PlayerID": "4242485",
    "TeamID": "23"
  },
  "Devin Harper": {
    "PlayerID": "4038436",
    "TeamID": "23"
  },
  "C.J. Henderson": {
    "PlayerID": "4240596",
    "TeamID": "23"
  },
  "D'Shawn Jamison": {
    "PlayerID": "4362082",
    "TeamID": "23"
  },
  "Jaray Jenkins": {
    "PlayerID": "4362650",
    "TeamID": "23"
  },
  "John Leglue": {
    "PlayerID": "3126261",
    "TeamID": "23"
  },
  "Eku Leota": {
    "PlayerID": "4361272",
    "TeamID": "23"
  },
  "Doug Nester": {
    "PlayerID": "4426368",
    "TeamID": "23"
  },
  "Adetokunbo Ogundeji": {
    "PlayerID": "4046693",
    "TeamID": "23"
  },
  "Ayo Oyelola": {
    "PlayerID": "5054379",
    "TeamID": "23"
  },
  "La'Mical Perine": {
    "PlayerID": "4034952",
    "TeamID": "23"
  },
  "Jacob Slade": {
    "PlayerID": "4382475",
    "TeamID": "23"
  },
  "Quez Watkins": {
    "PlayerID": "4050373",
    "TeamID": "23"
  },
  "Jacoby Windmon": {
    "PlayerID": "4428909",
    "TeamID": "23"
  },
  "Brandon Aiyuk": {
    "PlayerID": "4360438",
    "TeamID": "25"
  },
  "Brandon Allen": {
    "PlayerID": "2574511",
    "TeamID": "25"
  },
  "Aaron Banks": {
    "PlayerID": "4242390",
    "TeamID": "25"
  },
  "Ben Bartch": {
    "PlayerID": "4611506",
    "TeamID": "25"
  },
  "Ronnie Bell": {
    "PlayerID": "4372063",
    "TeamID": "25"
  },
  "Jake Brendel": {
    "PlayerID": "2577185",
    "TeamID": "25"
  },
  "Spencer Burford": {
    "PlayerID": "4362999",
    "TeamID": "25"
  },
  "Chris Conley": {
    "PlayerID": "2578533",
    "TeamID": "25"
  },
  "Jacob Cowing": {
    "PlayerID": "4575665",
    "TeamID": "25"
  },
  "Joshua Dobbs": {
    "PlayerID": "3044720",
    "TeamID": "25"
  },
  "Isaac Guerendo": {
    "PlayerID": "4372561",
    "TeamID": "25"
  },
  "Jauan Jennings": {
    "PlayerID": "3886598",
    "TeamID": "25"
  },
  "Kyle Juszczyk": {
    "PlayerID": "16002",
    "TeamID": "25"
  },
  "George Kittle": {
    "PlayerID": "3040151",
    "TeamID": "25"
  },
  "Jordan Mason": {
    "PlayerID": "4360569",
    "TeamID": "25"
  },
  "Colton McKivitz": {
    "PlayerID": "3916075",
    "TeamID": "25"
  },
  "Jaylon Moore": {
    "PlayerID": "4043041",
    "TeamID": "25"
  },
  "Dominick Puni": {
    "PlayerID": "5092959",
    "TeamID": "25"
  },
  "Brock Purdy": {
    "PlayerID": "4361741",
    "TeamID": "25"
  },
  "Deebo Samuel Sr.": {
    "PlayerID": "3126486",
    "TeamID": "25"
  },
  "Eric Saubert": {
    "PlayerID": "2975863",
    "TeamID": "25"
  },
  "Trent Taylor": {
    "PlayerID": "3040569",
    "TeamID": "25"
  },
  "Patrick Taylor Jr.": {
    "PlayerID": "4039358",
    "TeamID": "25"
  },
  "Jake Tonges": {
    "PlayerID": "4259147",
    "TeamID": "25"
  },
  "Trent Williams": {
    "PlayerID": "13241",
    "TeamID": "25"
  },
  "Nick Zakelj": {
    "PlayerID": "4247590",
    "TeamID": "25"
  },
  "Robert Beal Jr.": {
    "PlayerID": "4259558",
    "TeamID": "25"
  },
  "Tatum Bethune": {
    "PlayerID": "4426698",
    "TeamID": "25"
  },
  "Nick Bosa": {
    "PlayerID": "4040605",
    "TeamID": "25"
  },
  "Ji'Ayir Brown": {
    "PlayerID": "4693644",
    "TeamID": "25"
  },
  "De'Vondre Campbell": {
    "PlayerID": "3040180",
    "TeamID": "25"
  },
  "Maliek Collins": {
    "PlayerID": "3040471",
    "TeamID": "25"
  },
  "Kalia Davis": {
    "PlayerID": "4243541",
    "TeamID": "25"
  },
  "Jordan Elliott": {
    "PlayerID": "4039052",
    "TeamID": "25"
  },
  "Demetrius Flannigan-Fowles": {
    "PlayerID": "3931424",
    "TeamID": "25"
  },
  "Leonard Floyd": {
    "PlayerID": "3043136",
    "TeamID": "25"
  },
  "Kevin Givens": {
    "PlayerID": "3929641",
    "TeamID": "25"
  },
  "Jalen Graham": {
    "PlayerID": "4570410",
    "TeamID": "25"
  },
  "Renardo Green": {
    "PlayerID": "4427325",
    "TeamID": "25"
  },
  "Talanoa Hufanga": {
    "PlayerID": "4360853",
    "TeamID": "25"
  },
  "Deommodore Lenoir": {
    "PlayerID": "4242488",
    "TeamID": "25"
  },
  "Darrell Luter Jr.": {
    "PlayerID": "4685978",
    "TeamID": "25"
  },
  "T.Y. McGill": {
    "PlayerID": "2577757",
    "TeamID": "25"
  },
  "Malik Mustapha": {
    "PlayerID": "4696211",
    "TeamID": "25"
  },
  "George Odum": {
    "PlayerID": "3050199",
    "TeamID": "25"
  },
  "Sam Okuayinonu": {
    "PlayerID": "4569497",
    "TeamID": "25"
  },
  "Charvarius Ward": {
    "PlayerID": "4037361",
    "TeamID": "25"
  },
  "Fred Warner": {
    "PlayerID": "3138826",
    "TeamID": "25"
  },
  "Dee Winters": {
    "PlayerID": "4428914",
    "TeamID": "25"
  },
  "Rock Ya-Sin": {
    "PlayerID": "3910229",
    "TeamID": "25"
  },
  "Isaac Yiadom": {
    "PlayerID": "3122797",
    "TeamID": "25"
  },
  "Jake Moody": {
    "PlayerID": "4372066",
    "TeamID": "25"
  },
  "Taybor Pepper": {
    "PlayerID": "2979553",
    "TeamID": "25"
  },
  "Mitch Wishnowsky": {
    "PlayerID": "4035685",
    "TeamID": "25"
  },
  "Jon Feliciano": {
    "PlayerID": "2512577",
    "TeamID": "25"
  },
  "Dre Greenlaw": {
    "PlayerID": "3916903",
    "TeamID": "25"
  },
  "Yetur Gross-Matos": {
    "PlayerID": "4259594",
    "TeamID": "25"
  },
  "Javon Hargrave": {
    "PlayerID": "2983055",
    "TeamID": "25"
  },
  "Drake Jackson": {
    "PlayerID": "4569511",
    "TeamID": "25"
  },
  "Christian McCaffrey": {
    "PlayerID": "3117251",
    "TeamID": "25"
  },
  "Elijah Mitchell": {
    "PlayerID": "4241555",
    "TeamID": "25"
  },
  "Ricky Pearsall": {
    "PlayerID": "4428209",
    "TeamID": "25"
  },
  "Curtis Robinson": {
    "PlayerID": "4044448",
    "TeamID": "25"
  },
  "Ambry Thomas": {
    "PlayerID": "4258209",
    "TeamID": "25"
  },
  "Isaac Alarcon": {
    "PlayerID": "4686629",
    "TeamID": "25"
  },
  "Evan Anderson": {
    "PlayerID": "4612182",
    "TeamID": "25"
  },
  "Alex Barrett": {
    "PlayerID": "2976114",
    "TeamID": "25"
  },
  "Jonathan Garvin": {
    "PlayerID": "4240655",
    "TeamID": "25"
  },
  "Chris Hubbard": {
    "PlayerID": "16076",
    "TeamID": "25"
  },
  "Chase Lucas": {
    "PlayerID": "4047846",
    "TeamID": "25"
  },
  "Jaylen Mahoney": {
    "PlayerID": "4567534",
    "TeamID": "25"
  },
  "Terrace Marshall Jr.": {
    "PlayerID": "4362630",
    "TeamID": "25"
  },
  "Tanner Mordecai": {
    "PlayerID": "4360271",
    "TeamID": "25"
  },
  "Drake Nugent": {
    "PlayerID": "4428144",
    "TeamID": "25"
  },
  "Terique Owens": {
    "PlayerID": "4571579",
    "TeamID": "25"
  },
  "Mason Pline": {
    "PlayerID": "4911517",
    "TeamID": "25"
  },
  "Ke'Shawn Vaughn": {
    "PlayerID": "3917612",
    "TeamID": "25"
  },
  "DaShaun White": {
    "PlayerID": "4360289",
    "TeamID": "25"
  },
  "Brayden Willis": {
    "PlayerID": "4360290",
    "TeamID": "25"
  },
  "AJ Barner": {
    "PlayerID": "4576297",
    "TeamID": "26"
  },
  "Jake Bobo": {
    "PlayerID": "4360405",
    "TeamID": "26"
  },
  "Anthony Bradford": {
    "PlayerID": "4429211",
    "TeamID": "26"
  },
  "Pharaoh Brown": {
    "PlayerID": "2971281",
    "TeamID": "26"
  },
  "Zach Charbonnet": {
    "PlayerID": "4426385",
    "TeamID": "26"
  },
  "Charles Cross": {
    "PlayerID": "4426376",
    "TeamID": "26"
  },
  "McClendon Curtis": {
    "PlayerID": "4247276",
    "TeamID": "26"
  },
  "Noah Fant": {
    "PlayerID": "4036131",
    "TeamID": "26"
  },
  "Stone Forsythe": {
    "PlayerID": "4034962",
    "TeamID": "26"
  },
  "Christian Haynes": {
    "PlayerID": "4362135",
    "TeamID": "26"
  },
  "Sam Howell": {
    "PlayerID": "4426875",
    "TeamID": "26"
  },
  "Michael Jerrell": {
    "PlayerID": "5209093",
    "TeamID": "26"
  },
  "Sataoa Laumea": {
    "PlayerID": "4427770",
    "TeamID": "26"
  },
  "Tyler Lockett": {
    "PlayerID": "2577327",
    "TeamID": "26"
  },
  "Kenny McIntosh": {
    "PlayerID": "4427391",
    "TeamID": "26"
  },
  "DK Metcalf": {
    "PlayerID": "4047650",
    "TeamID": "26"
  },
  "Olu Oluwatimi": {
    "PlayerID": "4370807",
    "TeamID": "26"
  },
  "Brady Russell": {
    "PlayerID": "4243176",
    "TeamID": "26"
  },
  "Laviska Shenault Jr.": {
    "PlayerID": "4243160",
    "TeamID": "26"
  },
  "Geno Smith": {
    "PlayerID": "15864",
    "TeamID": "26"
  },
  "Jaxon Smith-Njigba": {
    "PlayerID": "4430878",
    "TeamID": "26"
  },
  "Jalen Sundell": {
    "PlayerID": "4383409",
    "TeamID": "26"
  },
  "Laken Tomlinson": {
    "PlayerID": "2512477",
    "TeamID": "26"
  },
  "Kenneth Walker III": {
    "PlayerID": "4567048",
    "TeamID": "26"
  },
  "Connor Williams": {
    "PlayerID": "3821577",
    "TeamID": "26"
  },
  "Dareke Young": {
    "PlayerID": "4401805",
    "TeamID": "26"
  },
  "Myles Adams": {
    "PlayerID": "4039164",
    "TeamID": "26"
  },
  "Jerome Baker": {
    "PlayerID": "3915507",
    "TeamID": "26"
  },
  "Tre Brown": {
    "PlayerID": "4241373",
    "TeamID": "26"
  },
  "Coby Bryant": {
    "PlayerID": "4239094",
    "TeamID": "26"
  },
  "Tyrel Dodson": {
    "PlayerID": "4035232",
    "TeamID": "26"
  },
  "Trevis Gipson": {
    "PlayerID": "3917016",
    "TeamID": "26"
  },
  "Derick Hall": {
    "PlayerID": "4567226",
    "TeamID": "26"
  },
  "Johnathan Hankins": {
    "PlayerID": "15841",
    "TeamID": "26"
  },
  "Rayshawn Jenkins": {
    "PlayerID": "2969961",
    "TeamID": "26"
  },
  "Dre'Mont Jones": {
    "PlayerID": "3915525",
    "TeamID": "26"
  },
  "Tyrice Knight": {
    "PlayerID": "4686540",
    "TeamID": "26"
  },
  "Julian Love": {
    "PlayerID": "4046675",
    "TeamID": "26"
  },
  "Boye Mafe": {
    "PlayerID": "4240754",
    "TeamID": "26"
  },
  "Mike Morris": {
    "PlayerID": "4572055",
    "TeamID": "26"
  },
  "Byron Murphy II": {
    "PlayerID": "4570040",
    "TeamID": "26"
  },
  "Uchenna Nwosu": {
    "PlayerID": "3120358",
    "TeamID": "26"
  },
  "Nehemiah Pritchett": {
    "PlayerID": "4567222",
    "TeamID": "26"
  },
  "Jarran Reed": {
    "PlayerID": "3115312",
    "TeamID": "26"
  },
  "Drake Thomas": {
    "PlayerID": "4428659",
    "TeamID": "26"
  },
  "K'Von Wallace": {
    "PlayerID": "4035463",
    "TeamID": "26"
  },
  "Dee Williams": {
    "PlayerID": "5081362",
    "TeamID": "26"
  },
  "Leonard Williams": {
    "PlayerID": "2971622",
    "TeamID": "26"
  },
  "Devon Witherspoon": {
    "PlayerID": "4575431",
    "TeamID": "26"
  },
  "Riq Woolen": {
    "PlayerID": "4245185",
    "TeamID": "26"
  },
  "Michael Dickson": {
    "PlayerID": "3929851",
    "TeamID": "26"
  },
  "Jason Myers": {
    "PlayerID": "2473037",
    "TeamID": "26"
  },
  "Chris Stoll": {
    "PlayerID": "4259606",
    "TeamID": "26"
  },
  "George Fant": {
    "PlayerID": "2583951",
    "TeamID": "26"
  },
  "Abraham Lucas": {
    "PlayerID": "4245171",
    "TeamID": "26"
  },
  "Joshua Onujiogu": {
    "PlayerID": "4071085",
    "TeamID": "26"
  },
  "Jerrick Reed II": {
    "PlayerID": "4570084",
    "TeamID": "26"
  },
  "Marcus Simms": {
    "PlayerID": "4039244",
    "TeamID": "26"
  },
  "Cameron Young": {
    "PlayerID": "4362911",
    "TeamID": "26"
  },
  "Quinton Bohanna": {
    "PlayerID": "4259978",
    "TeamID": "26"
  },
  "Miles Boykin": {
    "PlayerID": "3932423",
    "TeamID": "26"
  },
  "Brittain Brown": {
    "PlayerID": "4036032",
    "TeamID": "26"
  },
  "Artie Burns": {
    "PlayerID": "3051921",
    "TeamID": "26"
  },
  "Jaren Hall": {
    "PlayerID": "4373632",
    "TeamID": "26"
  },
  "Faion Hicks": {
    "PlayerID": "4242333",
    "TeamID": "26"
  },
  "George Holani": {
    "PlayerID": "4429835",
    "TeamID": "26"
  },
  "Josh Jobe": {
    "PlayerID": "4372020",
    "TeamID": "26"
  },
  "DeVere Levelston": {
    "PlayerID": "4687580",
    "TeamID": "26"
  },
  "Tyler Mabry": {
    "PlayerID": "3916587",
    "TeamID": "26"
  },
  "Patrick O'Connell": {
    "PlayerID": "4364623",
    "TeamID": "26"
  },
  "Kenneth Odumegwu": {
    "PlayerID": "5149889",
    "TeamID": "26"
  },
  "Ty Okada": {
    "PlayerID": "4247808",
    "TeamID": "26"
  },
  "Jason Peters": {
    "PlayerID": "6012",
    "TeamID": "26"
  },
  "Devin Richardson": {
    "PlayerID": "4361480",
    "TeamID": "26"
  },
  "Jamie Sheriff": {
    "PlayerID": "4685984",
    "TeamID": "26"
  },
  "Tyreke Smith": {
    "PlayerID": "4361340",
    "TeamID": "26"
  },
  "Cody White": {
    "PlayerID": "4241983",
    "TeamID": "26"
  },
  "Graham Barton": {
    "PlayerID": "4429251",
    "TeamID": "27"
  },
  "Ben Bredeson": {
    "PlayerID": "4046551",
    "TeamID": "27"
  },
  "Devin Culp": {
    "PlayerID": "4361112",
    "TeamID": "27"
  },
  "Payne Durham": {
    "PlayerID": "4372505",
    "TeamID": "27"
  },
  "Mike Evans": {
    "PlayerID": "16737",
    "TeamID": "27"
  },
  "Chris Godwin": {
    "PlayerID": "3116165",
    "TeamID": "27"
  },
  "Luke Goedeke": {
    "PlayerID": "4380507",
    "TeamID": "27"
  },
  "Robert Hainsey": {
    "PlayerID": "4242391",
    "TeamID": "27"
  },
  "Bucky Irving": {
    "PlayerID": "4596448",
    "TeamID": "27"
  },
  "Kameron Johnson": {
    "PlayerID": "5097554",
    "TeamID": "27"
  },
  "Ko Kieft": {
    "PlayerID": "4034779",
    "TeamID": "27"
  },
  "Elijah Klein": {
    "PlayerID": "4362066",
    "TeamID": "27"
  },
  "Cody Mauch": {
    "PlayerID": "4248545",
    "TeamID": "27"
  },
  "Baker Mayfield": {
    "PlayerID": "3052587",
    "TeamID": "27"
  },
  "Jalen McMillan": {
    "PlayerID": "4430834",
    "TeamID": "27"
  },
  "Royce Newman": {
    "PlayerID": "4047660",
    "TeamID": "27"
  },
  "Cade Otton": {
    "PlayerID": "4243331",
    "TeamID": "27"
  },
  "Trey Palmer": {
    "PlayerID": "4426407",
    "TeamID": "27"
  },
  "Sterling Shepard": {
    "PlayerID": "2976592",
    "TeamID": "27"
  },
  "Justin Skule": {
    "PlayerID": "3915777",
    "TeamID": "27"
  },
  "Kyle Trask": {
    "PlayerID": "4034946",
    "TeamID": "27"
  },
  "Sean Tucker": {
    "PlayerID": "4430871",
    "TeamID": "27"
  },
  "Rachaad White": {
    "PlayerID": "4697815",
    "TeamID": "27"
  },
  "Tristan Wirfs": {
    "PlayerID": "4240589",
    "TeamID": "27"
  },
  "Chris Braswell": {
    "PlayerID": "4428989",
    "TeamID": "27"
  },
  "C.J. Brewer": {
    "PlayerID": "4052017",
    "TeamID": "27"
  },
  "K.J. Britt": {
    "PlayerID": "4242521",
    "TeamID": "27"
  },
  "Lavonte David": {
    "PlayerID": "14985",
    "TeamID": "27"
  },
  "Jamel Dean": {
    "PlayerID": "3873935",
    "TeamID": "27"
  },
  "Yaya Diaby": {
    "PlayerID": "4686334",
    "TeamID": "27"
  },
  "Tyrek Funderburk": {
    "PlayerID": "4367330",
    "TeamID": "27"
  },
  "Greg Gaines": {
    "PlayerID": "3127294",
    "TeamID": "27"
  },
  "William Gholston": {
    "PlayerID": "16019",
    "TeamID": "27"
  },
  "Antonio Grier Jr.": {
    "PlayerID": "4360864",
    "TeamID": "27"
  },
  "Logan Hall": {
    "PlayerID": "4360189",
    "TeamID": "27"
  },
  "Josh Hayes": {
    "PlayerID": "4248533",
    "TeamID": "27"
  },
  "Christian Izien": {
    "PlayerID": "4372459",
    "TeamID": "27"
  },
  "Calijah Kancey": {
    "PlayerID": "4427673",
    "TeamID": "27"
  },
  "Zyon McCollum": {
    "PlayerID": "4250392",
    "TeamID": "27"
  },
  "Kaevon Merriweather": {
    "PlayerID": "4360502",
    "TeamID": "27"
  },
  "Anthony Nelson": {
    "PlayerID": "3894856",
    "TeamID": "27"
  },
  "Jose Ramirez": {
    "PlayerID": "4569068",
    "TeamID": "27"
  },
  "J.J. Russell": {
    "PlayerID": "4243366",
    "TeamID": "27"
  },
  "Tykee Smith": {
    "PlayerID": "4428522",
    "TeamID": "27"
  },
  "Tavierre Thomas": {
    "PlayerID": "4334405",
    "TeamID": "27"
  },
  "Joe Tryon-Shoyinka": {
    "PlayerID": "4243333",
    "TeamID": "27"
  },
  "Vita Vea": {
    "PlayerID": "3134362",
    "TeamID": "27"
  },
  "Markees Watts": {
    "PlayerID": "4373706",
    "TeamID": "27"
  },
  "Jordan Whitehead": {
    "PlayerID": "3895798",
    "TeamID": "27"
  },
  "Antoine Winfield Jr.": {
    "PlayerID": "4034790",
    "TeamID": "27"
  },
  "Jake Camarda": {
    "PlayerID": "4379396",
    "TeamID": "27"
  },
  "Chase McLaughlin": {
    "PlayerID": "3150744",
    "TeamID": "27"
  },
  "Zach Triner": {
    "PlayerID": "3065813",
    "TeamID": "27"
  },
  "Earnest Brown IV": {
    "PlayerID": "4242292",
    "TeamID": "27"
  },
  "Evan Deckers": {
    "PlayerID": "4361727",
    "TeamID": "27"
  },
  "SirVocea Dennis": {
    "PlayerID": "4429511",
    "TeamID": "27"
  },
  "Silas Dzansi": {
    "PlayerID": "4240865",
    "TeamID": "27"
  },
  "Chase Edmonds": {
    "PlayerID": "3119195",
    "TeamID": "27"
  },
  "Bryce Hall": {
    "PlayerID": "4037584",
    "TeamID": "27"
  },
  "Rakim Jarrett": {
    "PlayerID": "4429006",
    "TeamID": "27"
  },
  "Sua Opeta": {
    "PlayerID": "3121009",
    "TeamID": "27"
  },
  "Marcus Banks": {
    "PlayerID": "4567109",
    "TeamID": "27"
  },
  "Kalen DeLoach": {
    "PlayerID": "4427291",
    "TeamID": "27"
  },
  "Trenton Gill": {
    "PlayerID": "4240128",
    "TeamID": "27"
  },
  "Mike Greene": {
    "PlayerID": "4249596",
    "TeamID": "27"
  },
  "Daniel Grzesiak": {
    "PlayerID": "4361448",
    "TeamID": "27"
  },
  "Luke Haggard": {
    "PlayerID": "4686884",
    "TeamID": "27"
  },
  "Keenan Isaac": {
    "PlayerID": "4366534",
    "TeamID": "27"
  },
  "Vi Jones": {
    "PlayerID": "4259636",
    "TeamID": "27"
  },
  "Lorenz Metz": {
    "PlayerID": "4360063",
    "TeamID": "27"
  },
  "Ryan Miller": {
    "PlayerID": "4369466",
    "TeamID": "27"
  },
  "Raiqwon O'Neal": {
    "PlayerID": "4361528",
    "TeamID": "27"
  },
  "Michael Pratt": {
    "PlayerID": "4685039",
    "TeamID": "27"
  },
  "Tanner Taula": {
    "PlayerID": "4248052",
    "TeamID": "27"
  },
  "Cody Thompson": {
    "PlayerID": "3126115",
    "TeamID": "27"
  },
  "DJ Williams": {
    "PlayerID": "4567216",
    "TeamID": "27"
  },
  "Rashad Wisdom": {
    "PlayerID": "4428917",
    "TeamID": "27"
  },
  "Tyler Boyd": {
    "PlayerID": "3045144",
    "TeamID": "10"
  },
  "Daniel Brunskill": {
    "PlayerID": "2976117",
    "TeamID": "10"
  },
  "Treylon Burks": {
    "PlayerID": "4567156",
    "TeamID": "10"
  },
  "Julius Chestnut": {
    "PlayerID": "4367567",
    "TeamID": "10"
  },
  "Lloyd Cushenberry III": {
    "PlayerID": "4035448",
    "TeamID": "10"
  },
  "Jaelyn Duncan": {
    "PlayerID": "4372058",
    "TeamID": "10"
  },
  "DeAndre Hopkins": {
    "PlayerID": "15795",
    "TeamID": "10"
  },
  "Jha'Quan Jackson": {
    "PlayerID": "4427575",
    "TeamID": "10"
  },
  "JC Latham": {
    "PlayerID": "4431437",
    "TeamID": "10"
  },
  "Will Levis": {
    "PlayerID": "4361418",
    "TeamID": "10"
  },
  "David Martin-Robinson": {
    "PlayerID": "4360978",
    "TeamID": "10"
  },
  "Thomas Odukoya": {
    "PlayerID": "4363554",
    "TeamID": "10"
  },
  "John Ojukwu": {
    "PlayerID": "4240015",
    "TeamID": "10"
  },
  "Chig Okonkwo": {
    "PlayerID": "4360635",
    "TeamID": "10"
  },
  "Nicholas Petit-Frere": {
    "PlayerID": "4361368",
    "TeamID": "10"
  },
  "Tony Pollard": {
    "PlayerID": "3916148",
    "TeamID": "10"
  },
  "Dillon Radunz": {
    "PlayerID": "4040945",
    "TeamID": "10"
  },
  "Calvin Ridley": {
    "PlayerID": "3925357",
    "TeamID": "10"
  },
  "Mason Rudolph": {
    "PlayerID": "3116407",
    "TeamID": "10"
  },
  "Andrew Rupcich": {
    "PlayerID": "4916597",
    "TeamID": "10"
  },
  "Peter Skoronski": {
    "PlayerID": "4429100",
    "TeamID": "10"
  },
  "Tyjae Spears": {
    "PlayerID": "4428557",
    "TeamID": "10"
  },
  "Nick Vannett": {
    "PlayerID": "2576399",
    "TeamID": "10"
  },
  "Nick Westbrook-Ikhine": {
    "PlayerID": "3929785",
    "TeamID": "10"
  },
  "Josh Whyle": {
    "PlayerID": "4360086",
    "TeamID": "10"
  },
  "Jamal Adams": {
    "PlayerID": "3115373",
    "TeamID": "10"
  },
  "Darrell Baker Jr.": {
    "PlayerID": "4036660",
    "TeamID": "10"
  },
  "Mike Brown": {
    "PlayerID": "4244310",
    "TeamID": "10"
  },
  "Jarvis Brownlee Jr.": {
    "PlayerID": "4426817",
    "TeamID": "10"
  },
  "Keondre Coburn": {
    "PlayerID": "4362117",
    "TeamID": "10"
  },
  "Quandre Diggs": {
    "PlayerID": "2577553",
    "TeamID": "10"
  },
  "Ali Gaye": {
    "PlayerID": "4243321",
    "TeamID": "10"
  },
  "Jack Gibbens": {
    "PlayerID": "4249739",
    "TeamID": "10"
  },
  "Luke Gifford": {
    "PlayerID": "3116097",
    "TeamID": "10"
  },
  "Jaylen Harrell": {
    "PlayerID": "4429058",
    "TeamID": "10"
  },
  "Amani Hooker": {
    "PlayerID": "4036134",
    "TeamID": "10"
  },
  "Ernest Jones IV": {
    "PlayerID": "4362851",
    "TeamID": "10"
  },
  "Sebastian Joseph-Day": {
    "PlayerID": "3047495",
    "TeamID": "10"
  },
  "Arden Key": {
    "PlayerID": "3843843",
    "TeamID": "10"
  },
  "Harold Landry III": {
    "PlayerID": "3122793",
    "TeamID": "10"
  },
  "James Lynch": {
    "PlayerID": "4259181",
    "TeamID": "10"
  },
  "Roger McCreary": {
    "PlayerID": "4371973",
    "TeamID": "10"
  },
  "Caleb Murphy": {
    "PlayerID": "4911489",
    "TeamID": "10"
  },
  "Kenneth Murray Jr.": {
    "PlayerID": "4241394",
    "TeamID": "10"
  },
  "Otis Reese IV": {
    "PlayerID": "4379411",
    "TeamID": "10"
  },
  "Jeffery Simmons": {
    "PlayerID": "4035369",
    "TeamID": "10"
  },
  "L'Jarius Sneed": {
    "PlayerID": "4040432",
    "TeamID": "10"
  },
  "T'Vondre Sweat": {
    "PlayerID": "4428617",
    "TeamID": "10"
  },
  "James Williams": {
    "PlayerID": "4431613",
    "TeamID": "10"
  },
  "Julius Wood": {
    "PlayerID": "4872841",
    "TeamID": "10"
  },
  "Morgan Cox": {
    "PlayerID": "13848",
    "TeamID": "10"
  },
  "Nick Folk": {
    "PlayerID": "10621",
    "TeamID": "10"
  },
  "Ryan Stonehouse": {
    "PlayerID": "4256051",
    "TeamID": "10"
  },
  "Chidobe Awuzie": {
    "PlayerID": "3052101",
    "TeamID": "10"
  },
  "Chance Campbell": {
    "PlayerID": "4372051",
    "TeamID": "10"
  },
  "Marlon Davidson": {
    "PlayerID": "4035494",
    "TeamID": "10"
  },
  "Colton Dowell": {
    "PlayerID": "4250945",
    "TeamID": "10"
  },
  "Cedric Gray": {
    "PlayerID": "4429834",
    "TeamID": "10"
  },
  "TK McLendon Jr.": {
    "PlayerID": "4568018",
    "TeamID": "10"
  },
  "Garret Wallow": {
    "PlayerID": "4241807",
    "TeamID": "10"
  },
  "McTelvin Agim": {
    "PlayerID": "4035566",
    "TeamID": "10"
  },
  "Abdullah Anderson": {
    "PlayerID": "3119119",
    "TeamID": "10"
  },
  "Tre Avery": {
    "PlayerID": "4259300",
    "TeamID": "10"
  },
  "Kendell Brooks": {
    "PlayerID": "4585317",
    "TeamID": "10"
  },
  "Khalid Duke": {
    "PlayerID": "4427108",
    "TeamID": "10"
  },
  "Isaiah Iton": {
    "PlayerID": "4570970",
    "TeamID": "10"
  },
  "Gabe Jeudy-Lally": {
    "PlayerID": "4567529",
    "TeamID": "10"
  },
  "Kyron Johnson": {
    "PlayerID": "4241302",
    "TeamID": "10"
  },
  "Anthony Kendall": {
    "PlayerID": "5143279",
    "TeamID": "10"
  },
  "Mason Kinsey": {
    "PlayerID": "4057082",
    "TeamID": "10"
  },
  "Corey Levin": {
    "PlayerID": "2973637",
    "TeamID": "10"
  },
  "Tay Martin": {
    "PlayerID": "4245144",
    "TeamID": "10"
  },
  "Bryce Oliver": {
    "PlayerID": "4362617",
    "TeamID": "10"
  },
  "Jabari Small": {
    "PlayerID": "4432545",
    "TeamID": "10"
  },
  "Cole Spencer": {
    "PlayerID": "4243472",
    "TeamID": "10"
  },
  "Leroy Watson IV": {
    "PlayerID": "4570018",
    "TeamID": "10"
  },
  "Nick Allegretti": {
    "PlayerID": "3115922",
    "TeamID": "28"
  },
  "John Bates": {
    "PlayerID": "4048228",
    "TeamID": "28"
  },
  "Tyler Biadasz": {
    "PlayerID": "4035788",
    "TeamID": "28"
  },
  "Dyami Brown": {
    "PlayerID": "4361577",
    "TeamID": "28"
  },
  "Noah Brown": {
    "PlayerID": "3121409",
    "TeamID": "28"
  },
  "Brandon Coleman": {
    "PlayerID": "4685030",
    "TeamID": "28"
  },
  "Sam Cosmi": {
    "PlayerID": "4262199",
    "TeamID": "28"
  },
  "Jayden Daniels": {
    "PlayerID": "4426348",
    "TeamID": "28"
  },
  "Michael Deiter": {
    "PlayerID": "3121541",
    "TeamID": "28"
  },
  "Jeff Driskel": {
    "PlayerID": "2574630",
    "TeamID": "28"
  },
  "Austin Ekeler": {
    "PlayerID": "3068267",
    "TeamID": "28"
  },
  "Zach Ertz": {
    "PlayerID": "15835",
    "TeamID": "28"
  },
  "Sam Hartman": {
    "PlayerID": "4361994",
    "TeamID": "28"
  },
  "Cornelius Lucas": {
    "PlayerID": "17202",
    "TeamID": "28"
  },
  "Marcus Mariota": {
    "PlayerID": "2576980",
    "TeamID": "28"
  },
  "Luke McCaffrey": {
    "PlayerID": "4426948",
    "TeamID": "28"
  },
  "Terry McLaurin": {
    "PlayerID": "3121422",
    "TeamID": "28"
  },
  "Jeremy McNichols": {
    "PlayerID": "3127586",
    "TeamID": "28"
  },
  "Chris Paul": {
    "PlayerID": "4244615",
    "TeamID": "28"
  },
  "Brian Robinson Jr.": {
    "PlayerID": "4241474",
    "TeamID": "28"
  },
  "Trent Scott": {
    "PlayerID": "3123303",
    "TeamID": "28"
  },
  "Ben Sinnott": {
    "PlayerID": "4690923",
    "TeamID": "28"
  },
  "Brycen Tremayne": {
    "PlayerID": "4360763",
    "TeamID": "28"
  },
  "Andrew Wylie": {
    "PlayerID": "3042702",
    "TeamID": "28"
  },
  "Colson Yankoff": {
    "PlayerID": "4361088",
    "TeamID": "28"
  },
  "Olamide Zaccheaus": {
    "PlayerID": "3917914",
    "TeamID": "28"
  },
  "Jonathan Allen": {
    "PlayerID": "3054840",
    "TeamID": "28"
  },
  "Dorance Armstrong": {
    "PlayerID": "3928979",
    "TeamID": "28"
  },
  "Nick Bellore": {
    "PlayerID": "14471",
    "TeamID": "28"
  },
  "Percy Butler": {
    "PlayerID": "4363097",
    "TeamID": "28"
  },
  "Jeremy Chinn": {
    "PlayerID": "4043169",
    "TeamID": "28"
  },
  "Jamin Davis": {
    "PlayerID": "4240778",
    "TeamID": "28"
  },
  "Michael Davis": {
    "PlayerID": "3053795",
    "TeamID": "28"
  },
  "Clelin Ferrell": {
    "PlayerID": "3728258",
    "TeamID": "28"
  },
  "Emmanuel Forbes Jr.": {
    "PlayerID": "4429767",
    "TeamID": "28"
  },
  "Darrick Forrest": {
    "PlayerID": "4239088",
    "TeamID": "28"
  },
  "Dante Fowler Jr.": {
    "PlayerID": "2980100",
    "TeamID": "28"
  },
  "Dominique Hampton": {
    "PlayerID": "4361094",
    "TeamID": "28"
  },
  "Noah Igbinoghene": {
    "PlayerID": "4242516",
    "TeamID": "28"
  },
  "Javontae Jean-Baptiste": {
    "PlayerID": "4361357",
    "TeamID": "28"
  },
  "Frankie Luvu": {
    "PlayerID": "3127273",
    "TeamID": "28"
  },
  "Quan Martin": {
    "PlayerID": "4360378",
    "TeamID": "28"
  },
  "Phidarian Mathis": {
    "PlayerID": "4241468",
    "TeamID": "28"
  },
  "Jer'Zhan Newton": {
    "PlayerID": "4430560",
    "TeamID": "28"
  },
  "Tyler Owens": {
    "PlayerID": "4572460",
    "TeamID": "28"
  },
  "Daron Payne": {
    "PlayerID": "3925354",
    "TeamID": "28"
  },
  "Jeremy Reaves": {
    "PlayerID": "3125248",
    "TeamID": "28"
  },
  "Mike Sainristil": {
    "PlayerID": "4428414",
    "TeamID": "28"
  },
  "Kevon Seymour": {
    "PlayerID": "2971603",
    "TeamID": "28"
  },
  "Benjamin St-Juste": {
    "PlayerID": "4258206",
    "TeamID": "28"
  },
  "Bobby Wagner": {
    "PlayerID": "14979",
    "TeamID": "28"
  },
  "Mykal Walker": {
    "PlayerID": "4243009",
    "TeamID": "28"
  },
  "Tyler Ott": {
    "PlayerID": "17378",
    "TeamID": "28"
  },
  "Austin Seibert": {
    "PlayerID": "3821683",
    "TeamID": "28"
  },
  "Tress Way": {
    "PlayerID": "16166",
    "TeamID": "28"
  },
  "Jamison Crowder": {
    "PlayerID": "2576716",
    "TeamID": "28"
  },
  "Jordan Magee": {
    "PlayerID": "4568617",
    "TeamID": "28"
  },
  "Efe Obada": {
    "PlayerID": "3734467",
    "TeamID": "28"
  },
  "Norell Pollard": {
    "PlayerID": "4430326",
    "TeamID": "28"
  },
  "Kazmeir Allen": {
    "PlayerID": "4367180",
    "TeamID": "28"
  },
  "Chigozie Anusiem": {
    "PlayerID": "4360475",
    "TeamID": "28"
  },
  "Anim Dankwah": {
    "PlayerID": "4579564",
    "TeamID": "28"
  },
  "Sheldon Day": {
    "PlayerID": "2976194",
    "TeamID": "28"
  },
  "Julian Good-Jones": {
    "PlayerID": "3917949",
    "TeamID": "28"
  },
  "Marquis Hayes": {
    "PlayerID": "4241382",
    "TeamID": "28"
  },
  "Justin Hollins": {
    "PlayerID": "3122678",
    "TeamID": "28"
  },
  "Andre Jones Jr.": {
    "PlayerID": "4249214",
    "TeamID": "28"
  },
  "Haggai Ndubuisi": {
    "PlayerID": "5033343",
    "TeamID": "28"
  },
  "Bobby Price": {
    "PlayerID": "4030779",
    "TeamID": "28"
  },
  "Sheldrick Redwine": {
    "PlayerID": "3917852",
    "TeamID": "28"
  },
  "Chris Rodriguez Jr.": {
    "PlayerID": "4362619",
    "TeamID": "28"
  },
  "Mitchell Tinsley": {
    "PlayerID": "4690070",
    "TeamID": "28"
  },
  "Cole Turner": {
    "PlayerID": "4361438",
    "TeamID": "28"
  },
  "Michael Wiley": {
    "PlayerID": "4569156",
    "TeamID": "28"
  }
}


function getNFLScores() {
//    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
//    const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${currentDate}`;


const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const formattedDate = yesterday.toISOString().slice(0, 10).replace(/-/g, "");
const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${formattedDate}`;




    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayNFLGameInfo(data);
        })
        .catch(error => {
            console.error('Error fetching NFL scores:', error);
            document.getElementById('scores-container').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Unable to load NFL scores. Please try again later.
                </div>`;
        });
}

function getGameStatus() {
    const status = event.status.type.name;
    const shortDetail = event.status.type.shortDetail;

    switch (status) {
        case 'STATUS_SCHEDULED':
            return shortDetail; // This will be the start time
        case 'STATUS_IN_PROGRESS':
            return `${event.status.period} ${event.status.displayClock}`;
        case 'STATUS_HALFTIME':
            return 'Halftime';
        case 'STATUS_END_PERIOD':
            return 'End of Quarter';
        case 'STATUS_FINAL':
            return 'Final';
        default:
            return shortDetail;
    }
}



function displayNFLGameInfo(data) {
    console.log("Wet pussy")
    const scoresContainer = document.getElementById('scores-container');
    scoresContainer.innerHTML = '';

    data.events.forEach(event => {
        var color
        const game = event.competitions[0];
        const homeTeam = game.competitors.find(team => team.homeAway === "home");
        console.log(homeTeam)
        const awayTeam = game.competitors.find(team => team.homeAway === "away");
        const isInProgress = event.status.type.state === "in";
        if(isInProgress){
            color = 'danger'
        } else {
            color = 'success'
        }
        var away_score = event.competitions[0].competitors[1].score || 0;
        var home_score = event.competitions[0].competitors[0].score || 0;
        const cardTemplate = `
            <div class="scoreboard-item card h-100">
    <div class="card-body" style="padding-top:5px">
        <!-- Row 1 -->
        <div class="row mt-4 align-items-center">
            <!-- Column 1: Away Team -->
            <div class="col-6 d-flex justify-content-start">
                <span style="width:40px;height: 40px;"><img src="${awayTeam.team.logo}" width="40px" height="40px"></span>
                <span class="team-name">${awayTeam.team.displayName}</span>
                <span class="score">${away_score}</span>
            </div>
            <!-- Column 2: Game Status and Total -->
            <div class="col-6 justify-content-end text-align-right" style="position:absolute;right:-10%;top:25%">
                <span class="game-status badge bg-${color}"></span><br>
                <small class="total">Total: </small><br>
                <span class="total-score">${parseInt(away_score) + parseInt(home_score)}</span>
            </div>
        </div>
        <div style="position: absolute;width:70%;left:0px;height:60%; border-right:2px solid #474E72;top:20%">
        </div>
        <!-- Row 2 -->
        <div class="row mt-2 align-items-center">
            <!-- Column 1: Home Team -->
            <div class="col-6 d-flex justify-content-start">
                <span style="width:40px;height: 40px;"><img src="${homeTeam.team.logo}" width="40px" height="40px"></span>
                <span class="team-name">${homeTeam.team.displayName}</span>
                <span class="score">${home_score}</span>
            </div>
        </div>
    </div>
</div>
        `;
        scoresContainer.innerHTML += cardTemplate;
    });
}

// Fetch and display scores initially
getNFLScores();

// Poll the API every 60 seconds to get the latest scores
setInterval(getNFLScores, 60000);

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
const [month, day, year] = currentDate.toLocaleDateString('en-US', options)
    .split('/')
    .map((part) => part.padStart(2, '0'));
const formattedDate = `${month}-${day}-${year}`;

document.addEventListener('sbAPILoaded', function() {

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sbApiAuthToken.access_token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(`https://cdn.overdogbets.com/predictions/nfl/player_props/predictions_${formattedDate}.json`, requestOptions)
        .then(response => response.json())
        .then(result => {
            playerData = result;
            processProps(playerData);
        })
        .catch(error => console.log('error', error));

})

function getPremium() {
    // Handle the logic for upgrading to premium
    openPaymentModal()
    //console.log('User clicked Get Premium');
}

function getTeamName(teamName) {
    const areas = ["Atlanta", "Dallas", "Chicago", "Las Vegas", "Connecticut", "Los Angeles", "Indiana", "Minnesota", "New York", "Phoenix", "Washington", "Seattle"]
    let strippedName = teamName;
    for (let area of areas) {
        if (teamName.includes(area)) {
            strippedName = teamName.replace(area + ' ', ''); // Remove the city/area name
            if (strippedName == "Timberwolves") {
                strippedName = 'Timber Wolves'
            }
            break; // Stop after finding the first match
        }
    }
    if (teamName == "Timberwolves") {
        strippedName = "Timber Wolves"
    }
    return strippedName.trim() // Trim any leading or trailing spaces
}






function buildPredictions(predictions) {
    //buildParlays(predictions)
    const aiContainer = document.getElementById('picks');
    aiContainer.innerHTML = '';
    for (var i in predictions) {
        const game = predictions[i]
        /*if (game.under_over === "UNDER") {
            game.total = game.total += 5
        } else if (game.under_over === "OVER") {
            game.total = game.total -= 5
        }*/
        if (game.expected_value_colors.home_color == "RED" && game.expected_value_colors.away_color == "RED") {
            var WinningTeam = "AI UNSURE"
        } else if (game.expected_value_colors.home_color == "RED" && game.expected_value_colors.away_color == "GREEN") {
            WinningTeam = game.home_team
        } else {
            var WinningTeam = game.away_team
        }
        const cardTemplate = `
        <div class="col-lg-3 col-sm-6 mb-4 ai-pick">
          <div class="card h-100">
              <div class="card-header">
                  <center>
                      <h4 class="card-title mb-1">${WinningTeam}<span class="badge bg-danger" id="${WinningTeam}-moneyline-status" style="display:none; margin-left:10px"></span></a></h4>
              </center>
              <br>
              <center class="text-success"><small id="bulls-status">To Win</small></center>
          </div>
          <div class="card-body">
              <div class="row">
                  <div class="col-4">
                      <div class="d-flex  align-items-center mb-2">
                          <span><img src="../../assets/img/wnba-logos/${getTeamName(game.away_team).toLowerCase()}.svg" width="40px" height="40px"></span>
                          <p class="team-name1 mb-0 team-away">${getTeamName(game.away_team)}</p>
                      </div>
                      
                  </div>
                  <div class="col-4">
                      <div class="divider divider-vertical">
                          <div class="divider-text" style="border-radius:50%">
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="40" height="40" fill="url(#pattern0_79_9)"/>
<defs>
<pattern id="pattern0_79_9" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_79_9" transform="scale(0.002)"/>
</pattern>
<image id="image0_79_9" width="500" height="500" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
                          </div>
                      </div>
                  </div>
                  <div class="col-4 text-end">
                      <div class="d-flex  justify-content-end align-items-center mb-2">
                          <p class=" team-name1 mb-0 team-home">${getTeamName(game.home_team)}</p>
                          <span><img src="../../assets/img/nba-logos/${getTeamName(game.home_team).toLowerCase()}.svg" width="40px" height="40px"></span>
                      </div>
                      
                  </div>
              </div>
              <center><small>Game Total:</small></center>
              <center>
                  <h4 class="card-title mb-1">${game.under_over} ${game.total}</h4>
              </center>
          </div>
      </div>
  </div>
    `;

        aiContainer.innerHTML += cardTemplate;
    }
}





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
function processProps(props) {
    console.log("Raw props data:", props);

    const propsContainer = document.getElementById('picks');
    propsContainer.innerHTML = '';

    // Ensure props is an array
    if (!Array.isArray(props)) {
        console.log("Props is not an array, converting to array.");
        props = [props];
    }

    props.forEach((propObject, index) => {
        Object.entries(propObject).forEach(([playerName, playerStats]) => {
            // Check if all stats are zero or NaN
            const hasNonZeroStat = Object.values(playerStats).some(value => 
                typeof value === 'number' && value !== 0 && !isNaN(value)
            );

            if (!hasNonZeroStat) {
                console.log(`Skipping player ${playerName} due to all zero or NaN stats`);
                return; // Skip this player
            }

            const playerId = players[playerName]?.PlayerID || '0';
            const imageUrl = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${playerId}.png&w=350&h=254`;
            const defaultImageUrl = 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=350&h=254';

            const cardTemplate = `
            <div class="col-lg-3 col-sm-6 mb-4 ai-pick">
              <div class="card h-100">
                  <div class="card-header">
                      <center>
                          <h4 class="card-title mb-1" style="font-family: 'OVERDOG';color:white !important">${playerName}</h4>
                      </center>
                  </div>
                  <div class="card-body">
                      <div class="row">
                          <div class="col-12 text-center mb-3">
                              <img width="100px" height="100px" src="${imageUrl}" alt="${playerName}" 
                                   style=" object-fit: cover;"
                                   onerror="this.onerror=null; this.src='${defaultImageUrl}';">
                          </div>
                      </div>
                      <div class="table-responsive">
                          <table class="table table-bordered table-sm">
                              <thead>
                                  <tr>
                                      <th>Stat</th>
                                      <th>Prediction</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  ${Object.entries(playerStats)
                                      .filter(([key, value]) => typeof value === 'number' && value !== 0 && !isNaN(value))
                                      .map(([key, value]) => `
                                          <tr>
                                              <td>${key}</td>
                                              <td>${value.toFixed(1)}</td>
                                          </tr>
                                      `).join('')}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
            </div>
            `;

            propsContainer.innerHTML += cardTemplate;
        });
    });
}
function getPlayerIdByName(name) {
    if (typeof name !== 'string') {
        console.error('Invalid input: name must be a string');
        return null;
    }
    const normalizedName = name.trim().toLowerCase();
    for (const [playerName, data] of Object.entries(players)) {
        if (playerName.toLowerCase() === normalizedName) {
            return data.PlayerID;
        }
    }
    return null;
}

let playerData = [];

function processProps(props) {
    console.log("Raw props data:", props);

    playerData = []; // Reset playerData

    // Ensure props is an array
    if (!Array.isArray(props)) {
        console.log("Props is not an array, converting to array.");
        props = [props];
    }

    props.forEach((propObject) => {
        Object.entries(propObject).forEach(([playerName, playerStats]) => {
            // Check if all stats are zero or NaN
            const hasNonZeroStat = Object.values(playerStats).some(value => 
                typeof value === 'number' && value !== 0 && !isNaN(value)
            );

            if (hasNonZeroStat) {
                playerData.push({ [playerName]: playerStats });
            } else {
                console.log(`Skipping player ${playerName} due to all zero or NaN stats`);
            }
        });
    });

    populatePlayerCards(playerData);
}

function createPlayerCard(playerName, stats) {
    const playerId = getPlayerIdByName(playerName);
    console.log(playerId)
    const imageUrl = `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${playerId}.png&w=350&h=254`
    const defaultImageUrl = 'https://a.espncdn.com/combiner/i?img=/i/headshots/nophoto.png&w=350&h=254';

    const roundedStats = Object.fromEntries(
        Object.entries(stats).map(([key, value]) => [key, Math.round(value * 100) / 100])
    );

    return `
        <div class="col-lg-3 col-sm-6 mb-4 ai-pick">
            <div class="card h-100">
                <div class="card-header">
                    <center>
                        <h4 class="card-title mb-1" style="font-family: 'OVERDOG';color:white !important">${playerName}</h4>
                    </center>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12 text-center mb-3">
                            <img width="100px" height="100px" src="${imageUrl}" alt="${playerName}" 
                                 style="object-fit: cover;"
                                 onerror="this.onerror=null; this.src='${defaultImageUrl}';">
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>Stat</th>
                                    <th>Prediction</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.entries(roundedStats)
                                    .filter(([key, value]) => typeof value === 'number' && value !== 0 && !isNaN(value))
                                    .map(([key, value]) => `
                                        <tr>
                                            <td>${key}</td>
                                            <td>${value.toFixed(1)}</td>
                                        </tr>
                                    `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function populatePlayerCards(data) {
    const container = document.getElementById('picks');
    container.innerHTML = data.map(player => {
        const [playerName, stats] = Object.entries(player)[0];
        return createPlayerCard(playerName, stats);
    }).join('');
}

function searchPlayers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = playerData.filter(player => {
        const playerName = Object.keys(player)[0];
        if (typeof playerName !== 'string') {
            console.error('Invalid player data structure:', player);
            return false;
        }
        return playerName.toLowerCase().includes(searchTerm);
    });
    populatePlayerCards(filteredData);
}

// Add event listener for search input
document.getElementById('searchInput').addEventListener('input', searchPlayers);
// Standings

function extractData(table) {
    const tableRows = table.querySelectorAll('.bsp_row_item');
    const data = [];

    tableRows.forEach((row) => {
        const columns = row.children;
        const team = columns[0].querySelector('.bsp_row_teamname').textContent.trim();
        const w = columns[2].textContent.trim();
        const l = columns[3].textContent.trim();
        const t = columns[4].textContent.trim();
        const pct = columns[5].textContent.trim();
        const pf = columns[6].textContent.trim();
        const pa = columns[7].textContent.trim();
        const strk = columns[8].textContent.trim();

        data.push({
            Team: team,
            W: w,
            L: l,
            T: t,
            PCT: pct,
            PF: pf,
            PA: pa,
            STRK: strk
        });
    });

    return data;
}

function buildTable(data, tableId) {
    const table = document.getElementById(tableId);
    table.innerHTML = ''; // Clear existing content

    // Create table header
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Team</th>
        <th>W</th>
        <th>L</th>
        <th>T</th>
        <th>PCT</th>
        <th>PF</th>
        <th>PA</th>
        <th>STRK</th>
    `;
    table.appendChild(headerRow);

    // Create table rows
    data.forEach((team) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${team.Team}</td>
            <td>${team.W}</td>
            <td>${team.L}</td>
            <td>${team.T}</td>
            <td>${team.PCT}</td>
            <td>${team.PF}</td>
            <td>${team.PA}</td>
            <td>${team.STRK}</td>
        `;
        table.appendChild(row);
    });
}

function displayStandings(htmlDoc) {
    const afcPanel = htmlDoc.querySelector('#SportRadar_Football_NFL_2024_Conference_1bdefe12-6cb2-4d6a-b208-b04602ae79c3_Panel');
    const nfcPanel = htmlDoc.querySelector('#SportRadar_Football_NFL_2024_Conference_b1808e5f-d40b-47c0-8af8-5175c0fdcd26_Panel');

    const afcDivisions = afcPanel.querySelectorAll('.bsp_table_card');
    const nfcDivisions = nfcPanel.querySelectorAll('.bsp_table_card');

    const divisions = [
        { name: 'AFC East', data: extractData(afcDivisions[3]) },
        { name: 'AFC North', data: extractData(afcDivisions[2]) },
        { name: 'AFC South', data: extractData(afcDivisions[1]) },
        { name: 'AFC West', data: extractData(afcDivisions[0]) },
        { name: 'NFC East', data: extractData(nfcDivisions[2]) },
        { name: 'NFC North', data: extractData(nfcDivisions[0]) },
        { name: 'NFC South', data: extractData(nfcDivisions[1]) },
        { name: 'NFC West', data: extractData(nfcDivisions[3]) }
    ];

    divisions.forEach((division, index) => {
        const tableId = `standings-table-${index}`;
        const container = document.createElement('div');
        container.innerHTML = `
            <h2>${division.name}</h2>
            <table id="${tableId}"></table>
        `;
        document.body.appendChild(container);
        buildTable(division.data, tableId);
    });
}

// Fetch data from API and display standings
fetch("https://script.google.com/macros/s/AKfycbxkaIgu6c45mvRjzO7ss8EdEDAhScywcFw6Z7sxyQQN4vEvh7I5ueACR_2uHRCE55YG/exec")
    .then(response => response.text())
    .then(text => {
        // Create a DOMParser object
        const parser = new DOMParser();
        // Parse the plain text response as HTML
        const htmlDoc = parser.parseFromString(text, 'text/html');
        // Now you can work with the HTML document
        console.log("pussy");
        displayStandings(htmlDoc);
    })
    .catch(error => console.error('Error:', error));
