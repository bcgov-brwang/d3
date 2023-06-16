import * as d3 from 'd3';

const loadData = (data) => {

        const width = 1500;
        const height = 600;
      
        // Specify the color scale.
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Process the JSON data
        // The force simulation mutates links and nodes, so create a copy
        // so that re-evaluating this cell produces the same result.
        const links = data.links.map(d => ({...d}));
        const nodes = data.nodes.map(d => ({...d}));
        // Create a simulation with several forces.
        const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.name))
                .force("charge", d3.forceManyBody())
                .force("center", d3.forceCenter(width / 2, height / 2 - 80))
                .on("tick", ticked);

        var svg = d3.select("#chart")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    // .attr("viewBox", [0, 0, width, height])
                    .attr("style", "max-width: 100%; height: auto;");

            // Add a line for each link, and a circle for each node.
        const link = svg.append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value))
        .attr("x1", d => d.source.x) // Starting point x-coordinate
        .attr("y1", d => d.source.y) // Starting point y-coordinate
        .attr("x2", d => d.target.x) // Ending point x-coordinate
        .attr("y2", d => d.target.y); // Ending point y-coordinate;

        // Increase line length by multiplying the coordinates
        const lineLengthMultiplier = 5; // Adjust this value to make the lines longer

        link.attr("x2", d => d.target.x + (d.target.x - d.source.x) * lineLengthMultiplier)
        .attr("y2", d => d.target.y + (d.target.y - d.source.y) * lineLengthMultiplier);

        const node = svg.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 5)
            .attr("fill", d => color(d.group))
            .text(d => d.name);

        node.append("title")
            .text(d => d.name);



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

        // Add a drag behavior.
        node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

                var g = svg.selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("transform", function(d, i) {
                    return "translate(0,0)";
                });
                    
        // Set the position attributes of links and nodes each time the simulation ticks.
        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
            
        }

        // Reheat the simulation when drag starts, and fix the subject position.
        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }

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

      


  


}

export default loadData;
