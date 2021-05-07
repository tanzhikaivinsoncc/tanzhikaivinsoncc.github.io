function generateData(dataset_index) {

    // circle in circle dataset
    if (dataset_index == 0) {

        var group1_x = []
        var group1_y = []
        var group2_x = []
        var group2_y = []

        // generate the outer circle (60 dots)
        // (7,7)
        var outerRadius = 5.0
        var outerDiv = 10.0/25.0
        var outerStart_X = 7.0 - 5.0
        for (i = 0; i < 25; i++) {
            group1_x.push(outerStart_X)
            group1_x.push(outerStart_X)
            var height_1 = Math.sqrt(Math.pow(outerRadius,2) - Math.pow(outerStart_X - 7.0,2)) + 7.0;
            group1_y.push(height_1)
            var height_2 = -1.0 * Math.sqrt(Math.pow(outerRadius,2) - Math.pow(outerStart_X - 7.0,2)) + 7.0;
            group1_y.push(height_2)

            outerStart_X += outerDiv
        }

        var innerRadius = 2.0
        var innerDiv = 4.0/25.0
        var innerStart_X = 7.0 - 2.0
        for (i = 0; i < 25; i++) {
            group2_x.push(innerStart_X)
            group2_x.push(innerStart_X)
            var height_1 = Math.sqrt(Math.pow(innerRadius,2) - Math.pow(innerStart_X - 7.0,2)) + 7.0;
            group2_y.push(height_1)
            var height_2 = -1.0 * Math.sqrt(Math.pow(innerRadius,2) - Math.pow(innerStart_X - 7.0,2)) + 7.0;
            group2_y.push(height_2)

            innerStart_X += innerDiv
        }

        return [group1_x, group1_y, group2_x, group2_y]
    }
}