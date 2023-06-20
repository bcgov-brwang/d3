import * as d3 from 'd3';


const loadPieData = (data) => {
  // d3.csv("pie.json").then((data) => {

      // const data = jsonObject["frontend"];

    // Specify the chart’s dimensions.
    const width = 150;
    const height = Math.min(width, 150);
  
    // Create the color scale.
    const color = d3.scaleOrdinal()
        .domain(data.frontendFrameworkData.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.frontendFrameworkData.length).reverse())
  
    //bruce test
    const centerX = width / 2;
    const centerY = height / 2;
    var svg = d3.select("#frontendFramework")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    // .attr("transform", `translate(${centerX}, ${centerY})`)
    .attr("style", "max-width: 100%; height: auto;");
    
  
    // Create the pie layout and arc generator.
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);
  
    const arcs = pie(data.frontendFrameworkData);
  
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 1);
  
    // // Create the SVG container.
    // const svg = d3.create("svg")
    //     .attr("viewBox", [-width / 2, -height / 2, width, height]);
  
    // Add a sector path for each value.
    svg.append("g")
        .attr("stroke", "white")
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
      .append("title")
        .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
  
    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    const labelRadius = arc.outerRadius()() * 0.8;
    const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);
    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(d => d.data.name))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.value.toLocaleString("en-US")));


}

export default loadPieData;
