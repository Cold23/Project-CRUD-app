$(document).ready(function () {
    let id = new URLSearchParams(window.location.search).get('id');
    //#region  
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
    //#endregion
    $.post('/getcustomervisittimes?id=' + id, function (data) {
        if (data) {
            $.each(data, function (index, value) {
                labels.push(value.time);
                vdata.push(value.value);
            })
            var BarChart = new Chart(ctx, {
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
                weeklabels.push(value.week);
                weekdata.push(value.average);
            })
            console.log(weekdata);
            var BarChart = new Chart(weekctx, {
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
                monthlabels.push(monthNames[value.month - 1]);
                monthdata.push(value.average);
                console.log(value.month)
            })
            var BarChart = new Chart(monthctx, {
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
});