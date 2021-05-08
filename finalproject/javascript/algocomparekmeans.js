centroids_x = []
centroids_y = []

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

var centroidColor = ['red', 'blue']
var currentIteration = 0;
var centroidGenerated = false;
var converged = false;
var datasize = 200;
var centsize = 2;

var layout_data = {
    title: 'K-means Clustering (Epoch 0)',
    showlegend: false,
    height: 500,
    width: 500,
    xaxis: { range: [-1, 15], fixedrange: true },
    yaxis: { range: [-1, 15], fixedrange: true }
};

function produceDataKmeans(dataset_index) {
    var group1_x = []
    var group1_y = []
    var group2_x = []
    var group2_y = []

    var pointsCircle = datasize / 2
        // generate the outer circle (60 dots)
        // (7,7)
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

    group1_x = group1_x.concat(group2_x)
    group1_y = group1_y.concat(group2_y)

    console.log(group1_x, group1_y)

    return [group1_x, group1_y]
}

function generateDataKmeans() {

    layout_data.title = 'K-means Clustering (Epoch 0)'
    var navbarCollapse = $(".collapse");
    navbarCollapse.collapse("hide");

    $("#next_iter_error").text("")
    $("#converged_notification").text("")
    $("#centroid_error").text("")
    $("#centroid_1_md").text("Centroid 1 Coordinates: ( , )");
    $("#centroid_2_md").text("Centroid 2 Coordinates: ( , )");
    $("#epochs_md").text("Epochs to Convergence: ?");

    converged = false;
    centroidGenerated = false
    currentIteration = 0

    x_data = []
    y_data = []
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

    marker_data = { color: color_data, size: size_data, symbol: symbol_data }

    // generate dataset
    generated_data = produceDataKmeans()
    x_data = generated_data[0]
    y_data = generated_data[1]
    trace_data = {
        x: x_data,
        y: y_data,
        text: text_data,
        mode: 'markers',
        marker: marker_data
    };

    Plotly.newPlot('kmeansPlotDiv', [trace_data], layout_data);
}

function computeEuclideanDistance(point_x, point_y, centroid_x, centroid_y) {
    return Math.sqrt(Math.pow(point_x - centroid_x, 2) + Math.pow(point_y - centroid_y, 2));
}

function generateCentroid() {

    $("#next_iter_error").text("")

    if (converged) {
        $("#centroid_error").text("Converged!")

        return
    }


    if (currentIteration > 0 || centroidGenerated) {

        $("#centroid_error").text("Centroids already generated. Proceed to step 3")

        return
    }

    var cX = 7
    var cY = 13

    centroids_x.push(cX)
    centroids_y.push(cY)

    x_data.push(cX)
    y_data.push(cY)

    text_data.push('')
    color_data.push('black')
    symbol_data.push('cross')
    size_data.push(20)

    var cX = 7
    var cY = 1

    centroids_x.push(cX)
    centroids_y.push(cY)

    x_data.push(cX)
    y_data.push(cY)

    text_data.push('')
    color_data.push('black')
    symbol_data.push('cross')
    size_data.push(20)

    centroidGenerated = true

    Plotly.newPlot('kmeansPlotDiv', [trace_data], layout_data);
}

function displayConvergenceInformation() {
    $("#converged_notification").text("Converged! Now compare to Agglomerative or run Agglomerative to convergence if you haven't.")
    $("#epochs_md").text("Epochs to Convergence: " + currentIteration);
}

function nextIterationKmeans() {

    $("#next_iter_error").text("")
    $("#centroid_error").text("")

    if (converged) {
        return
    }

    // deep copy the information
    // start k-means
    cent_tot = []
    x_dist_sum = []
    y_dist_sum = []

    for (cent = 0; cent < centsize; cent++) {
        cent_tot[cent] = 0;
        x_dist_sum[cent] = 0.0;
        y_dist_sum[cent] = 0.0;
    }

    for (i = 0; i < datasize; i++) {
        // find centroid with the smallest distance
        var minCent = 0
        var minDist = Number.MAX_VALUE
        for (cent = 0; cent < centsize; cent++) {
            var dist = computeEuclideanDistance(x_data[i], y_data[i], centroids_x[cent], centroids_y[cent])
            if (dist < minDist) {
                minDist = dist;
                minCent = cent;
            }
        }

        // add the values in
        cent_tot[minCent] += 1;
        x_dist_sum[minCent] += x_data[i];
        y_dist_sum[minCent] += y_data[i];

        // update the color according to the centroid
        color_data[i] = centroidColor[minCent];
    }

    // update centroid
    var noChange = true;
    for (cent = 0; cent < centsize; cent++) {
        var new_x = x_dist_sum[cent] / cent_tot[cent];
        var new_y = y_dist_sum[cent] / cent_tot[cent];
        if (Math.abs(new_x - centroids_x[cent]) > 0.1 || Math.abs(new_y - centroids_y[cent]) > 0.1) {
            noChange = false;
        }
        centroids_x[cent] = new_x
        centroids_y[cent] = new_y
            // update the centroid's position
        x_data[datasize + cent] = centroids_x[cent]
        y_data[datasize + cent] = centroids_y[cent]
    }
    currentIteration += 1
    if (noChange) {

        console.log("converged!")

        converged = true
        displayConvergenceInformation()
    }

    layout_data.title = 'K-means Clustering (Epoch ' + currentIteration + ')'
    Plotly.redraw('kmeansPlotDiv');
}

function restart() {
    generateDataKmeans()
    generateCentroid()
}

restart()