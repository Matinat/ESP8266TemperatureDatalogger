var Views;
(function (Views) {
    var Shared;
    (function (Shared) {
        var Components;
        (function (Components) {
            var Charts;
            (function (Charts) {
                var LineChart;
                (function (LineChart) {
                    class LineChartXY {
                        constructor(canvas) {
                            this.colorposition = 0;
                            if (typeof canvas == "string")
                                this.canvas = document.getElementById(canvas);
                            else
                                this.canvas = canvas;
                            this.contextcanvas = this.canvas.getContext('2d');
                            this.datasets = [];
                            this.chart = new Chart(this.contextcanvas, {
                                type: 'line',
                                data: {
                                    datasets: this.datasets
                                },
                                options: {
                                    responsive: true,
                                    hover: {
                                        mode: 'x',
                                        intersect: false
                                    },
                                    tooltips: {
                                        mode: 'index',
                                        intersect: false,
                                        position: 'nearest'
                                    },
                                    scales: {
                                        xAxes: [{
                                                display: true,
                                                type: 'time',
                                                time: {
                                                    tooltipFormat: DateUtilities.dateFormat + ', h:mm:ss a',
                                                    display: false,
                                                },
                                                ticks: {
                                                    min: 0,
                                                },
                                            }],
                                        yAxes: [{
                                                display: true
                                            }]
                                    },
                                    legend: {
                                        labels: {
                                            usePointStyle: true
                                        },
                                        onClick: (e, item) => {
                                            this.removeTrendLine(this.datasets[item.datasetIndex].parameterdeviceID);
                                            this.datasets.splice(item.datasetIndex, 1);
                                            this.chart.update();
                                        }
                                    },
                                    annotation: {
                                        annotations: [{}]
                                    },
                                }
                            });
                        }
                        exist(parameterdeviceid) {
                            for (let i = 0; i < this.datasets.length; i++) {
                                if (this.datasets[i].parameterdeviceID === parameterdeviceid)
                                    return true;
                            }
                            return false;
                        }
                        getDataset() {
                            let dataset = new Array(this.datasets.length);
                            for (let i = 0; i < this.datasets.length; i++) {
                                dataset[i] = new HistoricalDataset(this.datasets[i].parameterdeviceID, this.datasets[i].label, undefined, undefined);
                            }
                            return dataset;
                        }
                        getDatasetWithValues() {
                            let dataset = [];
                            for (let i = 0; i < this.datasets.length; ++i) {
                                let data = new Array(this.datasets.length);
                                let value = this.datasets[i];
                                for (let j = 0; j < value.data.length; ++j) {
                                    data[j] = { x: value.data[j].x, y: value.data[j].y };
                                    dataset.push({
                                        parameterid: value.parameterdeviceID,
                                        datasetlabel: value.label,
                                        instant: data[j].x,
                                        value: data[j].y,
                                    });
                                }
                            }
                            return dataset;
                        }
                        sortByDate(a, b) {
                            var xA = new Date(a.instant).getTime();
                            var xB = new Date(b.instant).getTime();
                            return xA > xB ? 1 : -1;
                        }
                        setLineColor() {
                            let LINECOLOR1 = "#02c8a7";
                            let LINECOLOR2 = "#0A337F";
                            let LINECOLOR3 = "#ff420e";
                            let LINECOLOR4 = "#598234";
                            let LINECOLOR5 = "#0A3409";
                            let LINECOLOR6 = "#305A30";
                            let LINECOLOR7 = "#559E54";
                            let LINECOLOR8 = "#92C591";
                            let LINECOLOR9 = "#950E17";
                            let LINECOLOR10 = "#EA202C";
                            let LINECOLOR11 = "#F37C84";
                            let LINECOLOR12 = "#3A004C";
                            let LINECOLOR13 = "#8601AF";
                            let LINECOLOR14 = "#C91BFE";
                            let LINECOLOR15 = "#CBCB01";
                            let LINECOLOR16 = "#7C7C18";
                            let LINECOLOR17 = "#1688B6";
                            let LINECOLOR18 = "#67AFCB";
                            let LINECOLOR19 = "#17B814";
                            let LINECOLOR20 = "#FD3A0F";
                            let colors = [LINECOLOR1, LINECOLOR2, LINECOLOR3, LINECOLOR4, LINECOLOR5, LINECOLOR6, LINECOLOR7, LINECOLOR7, LINECOLOR8, LINECOLOR9, LINECOLOR10,
                                LINECOLOR11, LINECOLOR12, LINECOLOR13, LINECOLOR14, LINECOLOR15, LINECOLOR16, LINECOLOR17, LINECOLOR18, LINECOLOR19, LINECOLOR20];
                            let position = this.colorposition;
                            let color = colors[position];
                            this.colorposition = this.colorposition + 1;
                            if (this.colorposition > 19) {
                                this.colorposition = 0;
                            }
                            return color;
                        }
                        setData(label, values, parameterdeviceid) {
                            this.clearDataById(parameterdeviceid);
                            if (values.length >= 0) {
                                let data = new Array(values.length);
                                for (let i = 0; i < values.length; i++) {
                                    let value = values[i];
                                    data[i] = { x: value.instant, y: value.value };
                                }
                                let color = this.setLineColor();
                                this.datasets.push({
                                    label: label,
                                    data: data,
                                    fill: false,
                                    lineTension: 0.05,
                                    backgroundColor: color,
                                    borderWidth: 1.8,
                                    borderJoinStyle: 'round',
                                    borderColor: color,
                                    pointBorderColor: color,
                                    pointHoverBackgroundColor: color,
                                    pointHoverBorderColor: color,
                                    pointBackgroundColor: color,
                                    pointBorderWidth: 0.4,
                                    pointHoverRadius: 4,
                                    pointHoverBorderWidth: 1,
                                    pointRadius: 2.1,
                                    pointHitRadius: 2,
                                    steppedLine: 'before',
                                    parameterdeviceID: parameterdeviceid,
                                });
                                this.chart.update();
                            }
                        }
                        getData(pd_id) {
                            let i = this.datasets.length;
                            while (i--) {
                                let aux = this.datasets[i];
                                if (aux.parameterdeviceID == pd_id)
                                    return aux.data;
                            }
                        }
                        setEmptyData(label, parameterdeviceid) {
                            this.datasets.push({
                                label: label,
                                data: [10],
                                parameterdeviceID: parameterdeviceid,
                            });
                            this.chart.update();
                        }
                        setTrendLine(pd_id, value, color, width) {
                            let id = pd_id.toString();
                            let i = this.chart.options.annotation.annotations.length;
                            while (i--) {
                                let aux = this.chart.options.annotation.annotations[i];
                                if (aux.id == id) {
                                    aux.value = value;
                                    this.chart.update();
                                    return;
                                }
                            }
                            let ann = {
                                id: pd_id.toString(),
                                drawTime: 'afterDraw',
                                type: "line",
                                mode: "horizontal",
                                scaleID: "y-axis-0",
                                value: value,
                                borderColor: color,
                                borderWidth: width,
                                label: {
                                    backgroundColor: "green",
                                    content: "Average " + value.toFixed(3) + " Kg/h",
                                    enabled: true
                                },
                                onClick: function () { this.removeTrendLine; },
                            };
                            this.chart.options.annotation.annotations.push(ann);
                            this.chart.update();
                        }
                        removeTrendLine(pd_id) {
                            let id = pd_id.toString();
                            let i = this.chart.options.annotation.annotations.length;
                            while (i--) {
                                let aux = this.chart.options.annotation.annotations[i];
                                if (aux.id == id) {
                                    this.chart.options.annotation.annotations.splice(i, 1);
                                    this.chart.update();
                                    return;
                                }
                            }
                        }
                        clearData() {
                            while (this.datasets.length > 0) {
                                this.datasets.pop();
                            }
                            this.chart.update();
                        }
                        clearDataById(id) {
                            for (let i = 0; i < this.datasets.length; i++) {
                                if (this.datasets[i].parameterdeviceID === id) {
                                    this.datasets.splice(i, 1);
                                }
                            }
                            this.chart.update();
                        }
                    }
                    LineChart.LineChartXY = LineChartXY;
                })(LineChart = Charts.LineChart || (Charts.LineChart = {}));
            })(Charts = Components.Charts || (Components.Charts = {}));
        })(Components = Shared.Components || (Shared.Components = {}));
    })(Shared = Views.Shared || (Views.Shared = {}));
})(Views || (Views = {}));
