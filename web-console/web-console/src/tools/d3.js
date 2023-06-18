import * as d3 from 'd3';

const loadData = (data) => {

  var svg = d3.select("svg"),
  width = 1500,
  height = 800;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(function(d) { return d.id; })
  .distance(150)) // Set the desired link distance
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 3, height / 5));

        // Process the JSON data
        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = data.links.map(d => ({...d}));
        const nodes = data.nodes.map(d => ({...d}));

        

        var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")

  var circles = node.append("circle")
    .attr("r", 5)
    .attr("fill", function(d) { return color(d.group); });

  // Create a drag handler and append it to the node object instead
  var drag_handler = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

  drag_handler(node);
  
  var lables = node.append("text")
      .text(function(d) {
        return d.id;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.id; });

  simulation
      .nodes(nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(links);

             // Attach click event listener to nodes
             node.on('click', function(d) {
              // Get the URL you want to navigate to based on the clicked node
              var url = "https://google.com";//d.url; // Assuming you have a 'url' property in your node data
    
              // Perform the navigation
                // Get the text content of the <title> element
              var titleText = d3.select(this).select('title').text();
              // alert(titleText);
              window.location.href = `/documents?name=${titleText}`;
            });

     
      // Define the legend data
// var legendData = [
//     { label: "Legend Item 1", color: "red" },
//     { label: "Legend Item 2", color: "green" },
//     { label: "Legend Item 3", color: "blue" }
//   ];

const legendDataAll = data.nodes.map(d => ({label: d.group, color: color(d.group)}));

var uniqueItems = [];
var legendData = legendDataAll.map(function(item) {
  if (!uniqueItems.map(d => d.label).includes(item.label)) {
    uniqueItems.push(item);
    return item;
  }
});

console.log(uniqueItems);
legendData = uniqueItems;

// Create the legend SVG element
var legend = d3.select("#legend")
  .append("svg")
  .attr("class", "legend")
  .attr("width", 200)
  .attr("height", 150);

// Append legend items
var legendItems = legend.selectAll(".legend-item")
  .data(legendData)
  .enter()
  .append("g")
  .attr("class", "legend-item")
  .attr("transform", function(d, i) {
    return "translate(0," + i * 20 + ")";
  });

// Add colored rectangles to represent the legend items
legendItems.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function(d) {
    return d.color;
  });

// Add labels to the legend items
legendItems.append("text")
  .attr("x", 20)
  .attr("y", 10)
  .text(function(d) {
    return d.label;
  });

    



  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
  }


  
// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }
        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
      }

// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }

// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }
// Update the subject (dragged node) position during drag.
function dragged(event) {
  event.subject.fx = event.x;
  event.subject.fy = event.y;
}

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
function dragended(event) {
  if (!event.active) simulation.alphaTarget(0);
  event.subject.fx = null;
  event.subject.fy = null;
}



}

export default loadData;
