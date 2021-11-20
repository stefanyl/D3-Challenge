// @TODO: YOUR CODE HERE!
var svgSize = {
    width: 800,
    height: 450

}
                            
var margin = {
    top: 30,
    bottom : 60,
    left : 100,
    right : 30
}

var radius = 15

var chartSize = {
        width: svgSize.width - margin.left - margin.right,
        height: svgSize.height - margin.top - margin.bottom
}
// Create an SVG wrapper and append SVG group
var svg = d3.select("#scatter").append("svg")
                                .attr("width", svgSize.width)
                                .attr("height", svgSize.height)
                                .attr("style", "border:1px solid black")

var frame = svg.append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`)
                

// Import data using d3.csv              
d3.csv(".\\assets\\data\\data.csv").then(data =>{
    console.log(data)

    // Use the healthcare and income variables.
    data.forEach(state => {
        state.healthcare = +state.healthcare;
        state.income = +state.income
    })

    var xvals = data.map(state => state.healthcare)
    var yvals = data.map(state => state.income)

    //console.log(xvals)
    //console.log(yvals)

    var xScale = d3.scaleLinear()
                    .domain([.9 * d3.min(xvals), d3.max(xvals)])
                    .range([0, chartSize.width])

    var yScale = d3.scaleLinear()
                    .domain([.9 * d3.min(yvals), d3.max(yvals)])
                    .range([chartSize.height, 0])

    var bottomAxis = d3.axisBottom(xScale)
    var leftAxis = d3.axisLeft(yScale)

    frame.append("g").attr("transform", `translate(0, ${chartSize.height})`)
                            .call(bottomAxis)
    frame.append("g").call(leftAxis)


    var chartData = frame.append("g").attr("id", "ChartData")

    //chartData.call(toolTip)
    /* var toolTip = d3.tip()
                    .attr("class", "tooltip")
                    .offset([80, 60])
                    .html(function(d){
                        return ("<div>Hi</div>")
                    }) */

    var circles = chartData.selectAll("circle").data(data)
                            .enter().append("circle")
                            .attr("r", radius)
                            .attr("cx", state => xScale(state.healthcare))
                            .attr("cy", state => yScale(state.income))
                            .attr("stroke", "blue")
                            .attr("fill", "white")
                            /*
                            .attr("opacity", ".5")
                            .on("mouseover", function(d)
                            {
                                toolTip.show(data, this);
                            })
                            .on("mouseout")
                            */

    var text = chartData.selectAll("text").data(data)
                        .enter().append("text")
                        .attr("dx", state => xScale(state.healthcare))
                        .attr("dy", state => yScale(state.income))
                        .text(state => state.abbr)

})
