$(document).ready(function () {
    var id;
    id = new URLSearchParams(window.location.search).get('id');
    if (id !== null) {
        chartSetup(id)
    }
    $('.sqltable').on('click', '.viewcustomer', function () {
        id = new URLSearchParams(window.location.search).get('id');
        chartSetup(id);
    });
    $('.closemodal').click(function (e) {
        window.chart1.destroy();
        window.chart2.destroy();
        window.chart3.destroy();
        var vdata = [];
        var labels = [];
        var weekdata = [];
        var weeklabels = [];
        var monthdata = [];
        var monthlabels = [];
    })
});

function chartSetup(id) {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var ctx = document.getElementById("timeschart").getContext('2d');
    var weekctx = document.getElementById("weekschart").getContext('2d');
    var monthctx = document.getElementById("monthschart").getContext('2d');
    var vdata = [];
    var labels = [];
    var weekdata = [];
    var weeklabels = [];
    var monthdata = [];
    var monthlabels = [];

    $.post('/getcustomervisittimes?id=' + id, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                labels.push(value.time);
                vdata.push(value.value);
            })
            window.chart1 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "# Of Visits",
                        data: vdata
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                precision: 0
                            }
                        }]
                    },
                }

            })
        }
    })
    $.post('/customermeanweek?id=' + id, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                if (new Date().getFullYear() == value.year) {
                    weeklabels.push(`${-value.week} weeks ago`);
                } else {
                    weeklabels.push("week " + value.week + ' ' + value.year);
                }

                weekdata.push(value.average);
            })
            window.chart2 = new Chart(weekctx, {
                type: 'bar',
                data: {
                    labels: weeklabels,
                    datasets: [{
                        label: "Average weekly transcactions",
                        data: weekdata
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }

            })
        }
    })
    $.post('/customermeanmonth?id=' + id, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                monthlabels.push(`${monthNames[value.month - 1]} ${value.year}`);
                monthdata.push(value.average);
            })
            window.chart3 = new Chart(monthctx, {
                type: 'bar',
                data: {
                    labels: monthlabels,
                    datasets: [{
                        label: "Average monthly transcactions",
                        data: monthdata
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }

            })
        }
    })
}