var currentIteration = 0;
var datasize = 200;

var global_dataset_index = 0

// generated data
var x_data = []
var y_data = []
var text_data = []
var symbol_data = []
var color_data = []
var marker_data = {}


var trace_data = {
    x: x_data,
    y: y_data,
    text: text_data,
    mode: 'markers',
    marker: marker_data
};

var layout_data = {
    title: 'Hierarchical Agglomerative Clustering (Epoch 0)',
    showlegend: false,
    height: 600,
    width: 600,
    xaxis: { range: [-1, 15], fixedrange: true },
    yaxis: { range: [-1, 15], fixedrange: true }
};

function produceData(dataset_index) {
    var group1_x = []
    var group1_y = []
    var group2_x = []
    var group2_y = []

    // circle in circle dataset
    if (dataset_index == 0) {
        var pointsCircle = datasize / 2
        var outerRadius = 5.0
        var outerDiv = 10.0 / (pointsCircle / 2)
        var outerStart_X = 7.0 - 5.0
        for (i = 0; i < datasize / 4; i++) {
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
        for (i = 0; i < datasize / 4; i++) {
            group2_x.push(innerStart_X)
            group2_x.push(innerStart_X)
            var height_1 = Math.sqrt(Math.pow(innerRadius, 2) - Math.pow(innerStart_X - 7.0, 2)) + 7.0;
            group2_y.push(height_1)
            var height_2 = -1.0 * Math.sqrt(Math.pow(innerRadius, 2) - Math.pow(innerStart_X - 7.0, 2)) + 7.0;
            group2_y.push(height_2)

            innerStart_X += innerDiv
        }
        return [group1_x, group1_y, group2_x, group2_y]
    } else if (dataset_index == 1) {
        var pointsCluster = datasize / 2
        clust1_x_start = 2
        clust1_x_end = 5

        clust2_x_start = 9
        clust2_x_end = 12

        y_start = 5
        y_end = 9

        for (i = 0; i < pointsCluster; i++) {
            group1_x.push(Math.random() * (clust1_x_end - clust1_x_start) + clust1_x_start)
            group1_y.push(Math.random() * (y_end - y_start) + y_start)

            group2_x.push(Math.random() * (clust2_x_end - clust2_x_start) + clust2_x_start)
            group2_y.push(Math.random() * (y_end - y_start) + y_start)
        }

        return [group1_x, group1_y, group2_x, group2_y]
    }
}

function generateAllocatedData() {
    generateData(global_dataset_index)
  }

function generateData(dataset_index) {
    
    var navbarCollapse = $(".collapse");               
    navbarCollapse.collapse("hide");

    layout_data.title = 'Hierarchical Agglomerative Clustering (Epoch 0)'

    $("#converged_notification").text("");
    $("#epochs_md").text("Epochs to Convergence: ?");

    global_dataset_index = dataset_index

    currentIteration = 0;
    text_data = []

    color_data = []
    size_data = []
    symbol_data = []
    marker_data = {}

    for (i = 0; i < datasize; i++) {
        text_data.push('')
        color_data.push('grey')
        symbol_data.push('circle')
        size_data.push(20)
    }

    var circle_data = produceData(dataset_index)

    outer_x = circle_data[0]
    outer_y = circle_data[1]
    inner_x = circle_data[2]
    inner_y = circle_data[3]

    x_data = outer_x.concat(inner_x);
    y_data = outer_y.concat(inner_y);

    marker_data = { color: color_data, size: size_data, symbol: symbol_data }

    trace_data = {
        x: x_data,
        y: y_data,
        text: text_data,
        mode: 'markers',
        marker: marker_data
    };

    Plotly.newPlot('kmeansPlotDiv', [trace_data], layout_data);
}

function displayConvergenceInformation() {
    $("#converged_notification").text("Converged! View Results in Step 4.")
    $("#epochs_md").text("Epochs to Convergence: " + currentIteration);
  }

function nextIteration() {

    if (currentIteration == datasize) {
        return
    }

    offset = datasize / 2;

    if (currentIteration % 2 == 0) {
        color_data[currentIteration/2] = 'red'
    } else {
        color_data[offset + Math.floor(currentIteration/2)] = 'blue'
    }

    currentIteration += 1

    if (currentIteration == datasize) {
        converged = true
        displayConvergenceInformation()
    }

    layout_data.title = 'Hierarchical Agglomerative Clustering (Epoch ' + currentIteration + ')'
    Plotly.redraw('kmeansPlotDiv');
}

function skipToConvergence() {

    while (currentIteration < datasize) {
        nextIteration()
    }
}

generateData(0)