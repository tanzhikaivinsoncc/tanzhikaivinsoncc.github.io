// generated data
var x_data_agglo = []
var y_data_agglo = []
var text_data_agglo = []
var symbol_data_agglo = []
var color_data_agglo = []
var marker_data_agglo = {}
var datasize_agglo = 200;
var currentIteration_agglo = 0;
var converged_agglo = false;

var trace_data_agglo = {
    x: x_data_agglo,
    y: y_data_agglo,
    text: text_data_agglo,
    mode: 'markers',
    marker: marker_data_agglo
};

var layout_data_agglo = {
    title: 'Hierarchical Agglomerative Clustering (Epoch 0)',
    showlegend: false,
    height: 500,
    width: 500,
    xaxis: { range: [-1, 15], fixedrange: true },
    yaxis: { range: [-1, 15], fixedrange: true }
};

function produceDataAgglo() {
    var group1_x = []
    var group1_y = []
    var group2_x = []
    var group2_y = []

    var pointsCircle = datasize_agglo / 2
    var outerRadius = 5.0
    var outerDiv = 10.0 / (pointsCircle / 2)
    var outerStart_X = 7.0 - 5.0
    for (i = 0; i < datasize_agglo / 4; i++) {
        group1_x.push(outerStart_X)
        group1_x.push(outerStart_X)
        var height_1 = Math.sqrt(Math.pow(outerRadius, 2) - Math.pow(outerStart_X - 7.0, 2)) + 7.0;
        group1_y.push(height_1)
        var height_2 = -1.0 * Math.sqrt(Math.pow(outerRadius, 2) - Math.pow(outerStart_X - 7.0, 2)) + 7.0;
        group1_y.push(height_2)

        outerStart_X += outerDiv
    }

    var innerRadius = 2.0
    var innerDiv = 4.0 / (pointsCircle / 2)
    var innerStart_X = 7.0 - 2.0
    for (i = 0; i < datasize_agglo / 4; i++) {
        group2_x.push(innerStart_X)
        group2_x.push(innerStart_X)
        var height_1 = Math.sqrt(Math.pow(innerRadius, 2) - Math.pow(innerStart_X - 7.0, 2)) + 7.0;
        group2_y.push(height_1)
        var height_2 = -1.0 * Math.sqrt(Math.pow(innerRadius, 2) - Math.pow(innerStart_X - 7.0, 2)) + 7.0;
        group2_y.push(height_2)

        innerStart_X += innerDiv
    }
    return [group1_x, group1_y, group2_x, group2_y]

}

function generateDataAgglo() {

    converged = false

    layout_data_agglo.title = 'Hierarchical Agglomerative Clustering (Epoch 0)'

    $("#converged_notification").text("");
    $("#epochs_md").text("Epochs to Convergence: ?");

    currentIteration_agglo = 0;
    text_data_agglo = []

    color_data_agglo = []
    size_data_agglo = []
    symbol_data_agglo = []
    marker_data_agglo = {}

    for (i = 0; i < datasize_agglo; i++) {
        text_data_agglo.push('')
        color_data_agglo.push('grey')
        symbol_data_agglo.push('circle')
        size_data_agglo.push(20)
    }

    var circle_data = produceDataAgglo()

    outer_x_agglo = circle_data[0]
    outer_y_agglo = circle_data[1]
    inner_x_agglo = circle_data[2]
    inner_y_agglo = circle_data[3]

    x_data_agglo = outer_x_agglo.concat(inner_x_agglo);
    y_data_agglo = outer_y_agglo.concat(inner_y_agglo);

    marker_data_agglo = { color: color_data_agglo, size: size_data_agglo, symbol: symbol_data_agglo }
    trace_data_agglo = {
        x: x_data_agglo,
        y: y_data_agglo,
        text: text_data_agglo,
        mode: 'markers',
        marker: marker_data_agglo
    };

    Plotly.newPlot('alggloPlotDiv', [trace_data_agglo], layout_data_agglo);
}

function displayConvergenceInformation_agg() {
    $("#converged_notification_agg").text("Converged! Now compare to K-means or run K-means to convergence if you haven't.")
    $("#epochs_md_agg").text("Epochs to Convergence: " + currentIteration_agglo);
}

function nextIterationAgglo() {

    if (currentIteration_agglo == datasize_agglo) {
        return
    }

    offset = datasize / 2;

    if (currentIteration_agglo % 2 == 0) {
        color_data_agglo[currentIteration_agglo / 2] = 'red'
    } else {
        color_data_agglo[offset + Math.floor(currentIteration_agglo / 2)] = 'blue'
    }

    currentIteration_agglo += 1

    if (currentIteration_agglo == datasize_agglo) {
        converged_agglo = true
        displayConvergenceInformation_agg()
    }

    layout_data_agglo.title = 'Hierarchical Agglomerative Clustering (Epoch ' + currentIteration_agglo + ')'
    Plotly.newPlot('alggloPlotDiv', [trace_data_agglo], layout_data_agglo);
}

function nextTenIterationAgglo() {

    for (i = 0; i < 10; i++) {
        nextIterationAgglo();
    }

}

generateDataAgglo()