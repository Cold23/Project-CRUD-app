$(document).ready(function () {
    let id = new URLSearchParams(window.location.search).get('id');
    var ctx = document.getElementById("timeschart").getContext('2d');
    var vdata = [];
    var labels = [];
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
});