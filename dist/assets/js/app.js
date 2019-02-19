(function(window,document,jQuery){
(() => {
  let cards = $('.card');
  cards.css('color', 'red');

  cards.innerText = "testing";
})();

// 2. Use the margin convention practice 
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = 200 // Use the window's width
  , height = 200; // Use the window's height

// The number of datapoints
var n = 21;

// 5. X scale will use the index of our data
var xScale = d3.scaleLinear()
  .domain([0, n-1]) // input
  .range([0, width]); // output

// 6. Y scale will use the randomly generate number 
var yScale = d3.scaleLinear()
  .domain([0, 1]) // input
  .range([height, 0]); // output

// 7. d3's line generator
var line = d3.line()
  .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
  .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
  .curve(d3.curveMonotoneX) // apply smoothing to the line

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })

// 1. Add the SVG to the page and employ #2
var svg = d3.select(".d3chart").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// 3. Call the x axis in a group tag
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

// 4. Call the y axis in a group tag
svg.append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

// 9. Append the path, bind the data, and call the line generator 
svg.append("path")
  .datum(dataset) // 10. Binds data to the line
  .attr("class", "line") // Assign a class for styling
  .attr("d", line); // 11. Calls the line generator

// 12. Appends a circle for each datapoint 
svg.selectAll(".dot")
  .data(dataset)
  .enter().append("circle") // Uses the enter().append() method
  .attr("class", "dot") // Assign a class for styling
  .attr("cx", function(d, i) { return xScale(i) })
  .attr("cy", function(d) { return yScale(d.y) })
  .attr("r", 5)
  .on("mouseover", function(a, b, c) {
    console.log(a)
    this.attr('class', 'focus')
  })
  .on("mouseout", function() {  })
//       .on("mousemove", mousemove);

//   var focus = svg.append("g")
//       .attr("class", "focus")
//       .style("display", "none");

//   focus.append("circle")
//       .attr("r", 4.5);

//   focus.append("text")
//       .attr("x", 9)
//       .attr("dy", ".35em");

//   svg.append("rect")
//       .attr("class", "overlay")
//       .attr("width", width)
//       .attr("height", height)
//       .on("mouseover", function() { focus.style("display", null); })
//       .on("mouseout", function() { focus.style("display", "none"); })
//       .on("mousemove", mousemove);

//   function mousemove() {
//     var x0 = x.invert(d3.mouse(this)[0]),
//         i = bisectDate(data, x0, 1),
//         d0 = data[i - 1],
//         d1 = data[i],
//         d = x0 - d0.date > d1.date - x0 ? d1 : d0;
//     focus.attr("transform", "translate(" + x(d.date) + "," + y(d.close) + ")");
//     focus.select("text").text(d);
//   }
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbXBvbmVudHMvY2FyZC9jYXJkLmpzIiwiY29tcG9uZW50cy9kM2NoYXJ0L2QzY2hhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiIsIigoKSA9PiB7XHJcbiAgbGV0IGNhcmRzID0gJCgnLmNhcmQnKTtcclxuICBjYXJkcy5jc3MoJ2NvbG9yJywgJ3JlZCcpO1xyXG5cclxuICBjYXJkcy5pbm5lclRleHQgPSBcInRlc3RpbmdcIjtcclxufSkoKTsiLCJcclxuLy8gMi4gVXNlIHRoZSBtYXJnaW4gY29udmVudGlvbiBwcmFjdGljZSBcclxudmFyIG1hcmdpbiA9IHt0b3A6IDUwLCByaWdodDogNTAsIGJvdHRvbTogNTAsIGxlZnQ6IDUwfVxyXG4gICwgd2lkdGggPSAyMDAgLy8gVXNlIHRoZSB3aW5kb3cncyB3aWR0aFxyXG4gICwgaGVpZ2h0ID0gMjAwOyAvLyBVc2UgdGhlIHdpbmRvdydzIGhlaWdodFxyXG5cclxuLy8gVGhlIG51bWJlciBvZiBkYXRhcG9pbnRzXHJcbnZhciBuID0gMjE7XHJcblxyXG4vLyA1LiBYIHNjYWxlIHdpbGwgdXNlIHRoZSBpbmRleCBvZiBvdXIgZGF0YVxyXG52YXIgeFNjYWxlID0gZDMuc2NhbGVMaW5lYXIoKVxyXG4gIC5kb21haW4oWzAsIG4tMV0pIC8vIGlucHV0XHJcbiAgLnJhbmdlKFswLCB3aWR0aF0pOyAvLyBvdXRwdXRcclxuXHJcbi8vIDYuIFkgc2NhbGUgd2lsbCB1c2UgdGhlIHJhbmRvbWx5IGdlbmVyYXRlIG51bWJlciBcclxudmFyIHlTY2FsZSA9IGQzLnNjYWxlTGluZWFyKClcclxuICAuZG9tYWluKFswLCAxXSkgLy8gaW5wdXRcclxuICAucmFuZ2UoW2hlaWdodCwgMF0pOyAvLyBvdXRwdXRcclxuXHJcbi8vIDcuIGQzJ3MgbGluZSBnZW5lcmF0b3JcclxudmFyIGxpbmUgPSBkMy5saW5lKClcclxuICAueChmdW5jdGlvbihkLCBpKSB7IHJldHVybiB4U2NhbGUoaSk7IH0pIC8vIHNldCB0aGUgeCB2YWx1ZXMgZm9yIHRoZSBsaW5lIGdlbmVyYXRvclxyXG4gIC55KGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHlTY2FsZShkLnkpOyB9KSAvLyBzZXQgdGhlIHkgdmFsdWVzIGZvciB0aGUgbGluZSBnZW5lcmF0b3JcclxuICAuY3VydmUoZDMuY3VydmVNb25vdG9uZVgpIC8vIGFwcGx5IHNtb290aGluZyB0byB0aGUgbGluZVxyXG5cclxuLy8gOC4gQW4gYXJyYXkgb2Ygb2JqZWN0cyBvZiBsZW5ndGggTi4gRWFjaCBvYmplY3QgaGFzIGtleSAtPiB2YWx1ZSBwYWlyLCB0aGUga2V5IGJlaW5nIFwieVwiIGFuZCB0aGUgdmFsdWUgaXMgYSByYW5kb20gbnVtYmVyXHJcbnZhciBkYXRhc2V0ID0gZDMucmFuZ2UobikubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHtcInlcIjogZDMucmFuZG9tVW5pZm9ybSgxKSgpIH0gfSlcclxuXHJcbi8vIDEuIEFkZCB0aGUgU1ZHIHRvIHRoZSBwYWdlIGFuZCBlbXBsb3kgIzJcclxudmFyIHN2ZyA9IGQzLnNlbGVjdChcIi5kM2NoYXJ0XCIpLmFwcGVuZChcInN2Z1wiKVxyXG4gIC5hdHRyKFwid2lkdGhcIiwgd2lkdGggKyBtYXJnaW4ubGVmdCArIG1hcmdpbi5yaWdodClcclxuICAuYXR0cihcImhlaWdodFwiLCBoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcclxuICAuYXBwZW5kKFwiZ1wiKVxyXG4gIC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICsgbWFyZ2luLmxlZnQgKyBcIixcIiArIG1hcmdpbi50b3AgKyBcIilcIik7XHJcblxyXG4vLyAzLiBDYWxsIHRoZSB4IGF4aXMgaW4gYSBncm91cCB0YWdcclxuc3ZnLmFwcGVuZChcImdcIilcclxuICAuYXR0cihcImNsYXNzXCIsIFwieCBheGlzXCIpXHJcbiAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoMCxcIiArIGhlaWdodCArIFwiKVwiKVxyXG4gIC5jYWxsKGQzLmF4aXNCb3R0b20oeFNjYWxlKSk7IC8vIENyZWF0ZSBhbiBheGlzIGNvbXBvbmVudCB3aXRoIGQzLmF4aXNCb3R0b21cclxuXHJcbi8vIDQuIENhbGwgdGhlIHkgYXhpcyBpbiBhIGdyb3VwIHRhZ1xyXG5zdmcuYXBwZW5kKFwiZ1wiKVxyXG4gIC5hdHRyKFwiY2xhc3NcIiwgXCJ5IGF4aXNcIilcclxuICAuY2FsbChkMy5heGlzTGVmdCh5U2NhbGUpKTsgLy8gQ3JlYXRlIGFuIGF4aXMgY29tcG9uZW50IHdpdGggZDMuYXhpc0xlZnRcclxuXHJcbi8vIDkuIEFwcGVuZCB0aGUgcGF0aCwgYmluZCB0aGUgZGF0YSwgYW5kIGNhbGwgdGhlIGxpbmUgZ2VuZXJhdG9yIFxyXG5zdmcuYXBwZW5kKFwicGF0aFwiKVxyXG4gIC5kYXR1bShkYXRhc2V0KSAvLyAxMC4gQmluZHMgZGF0YSB0byB0aGUgbGluZVxyXG4gIC5hdHRyKFwiY2xhc3NcIiwgXCJsaW5lXCIpIC8vIEFzc2lnbiBhIGNsYXNzIGZvciBzdHlsaW5nXHJcbiAgLmF0dHIoXCJkXCIsIGxpbmUpOyAvLyAxMS4gQ2FsbHMgdGhlIGxpbmUgZ2VuZXJhdG9yXHJcblxyXG4vLyAxMi4gQXBwZW5kcyBhIGNpcmNsZSBmb3IgZWFjaCBkYXRhcG9pbnQgXHJcbnN2Zy5zZWxlY3RBbGwoXCIuZG90XCIpXHJcbiAgLmRhdGEoZGF0YXNldClcclxuICAuZW50ZXIoKS5hcHBlbmQoXCJjaXJjbGVcIikgLy8gVXNlcyB0aGUgZW50ZXIoKS5hcHBlbmQoKSBtZXRob2RcclxuICAuYXR0cihcImNsYXNzXCIsIFwiZG90XCIpIC8vIEFzc2lnbiBhIGNsYXNzIGZvciBzdHlsaW5nXHJcbiAgLmF0dHIoXCJjeFwiLCBmdW5jdGlvbihkLCBpKSB7IHJldHVybiB4U2NhbGUoaSkgfSlcclxuICAuYXR0cihcImN5XCIsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIHlTY2FsZShkLnkpIH0pXHJcbiAgLmF0dHIoXCJyXCIsIDUpXHJcbiAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGEsIGIsIGMpIHtcclxuICAgIGNvbnNvbGUubG9nKGEpXHJcbiAgICB0aGlzLmF0dHIoJ2NsYXNzJywgJ2ZvY3VzJylcclxuICB9KVxyXG4gIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKCkgeyAgfSlcclxuLy8gICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsIG1vdXNlbW92ZSk7XHJcblxyXG4vLyAgIHZhciBmb2N1cyA9IHN2Zy5hcHBlbmQoXCJnXCIpXHJcbi8vICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJmb2N1c1wiKVxyXG4vLyAgICAgICAuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbi8vICAgZm9jdXMuYXBwZW5kKFwiY2lyY2xlXCIpXHJcbi8vICAgICAgIC5hdHRyKFwiclwiLCA0LjUpO1xyXG5cclxuLy8gICBmb2N1cy5hcHBlbmQoXCJ0ZXh0XCIpXHJcbi8vICAgICAgIC5hdHRyKFwieFwiLCA5KVxyXG4vLyAgICAgICAuYXR0cihcImR5XCIsIFwiLjM1ZW1cIik7XHJcblxyXG4vLyAgIHN2Zy5hcHBlbmQoXCJyZWN0XCIpXHJcbi8vICAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJvdmVybGF5XCIpXHJcbi8vICAgICAgIC5hdHRyKFwid2lkdGhcIiwgd2lkdGgpXHJcbi8vICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGhlaWdodClcclxuLy8gICAgICAgLm9uKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKCkgeyBmb2N1cy5zdHlsZShcImRpc3BsYXlcIiwgbnVsbCk7IH0pXHJcbi8vICAgICAgIC5vbihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKCkgeyBmb2N1cy5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpOyB9KVxyXG4vLyAgICAgICAub24oXCJtb3VzZW1vdmVcIiwgbW91c2Vtb3ZlKTtcclxuXHJcbi8vICAgZnVuY3Rpb24gbW91c2Vtb3ZlKCkge1xyXG4vLyAgICAgdmFyIHgwID0geC5pbnZlcnQoZDMubW91c2UodGhpcylbMF0pLFxyXG4vLyAgICAgICAgIGkgPSBiaXNlY3REYXRlKGRhdGEsIHgwLCAxKSxcclxuLy8gICAgICAgICBkMCA9IGRhdGFbaSAtIDFdLFxyXG4vLyAgICAgICAgIGQxID0gZGF0YVtpXSxcclxuLy8gICAgICAgICBkID0geDAgLSBkMC5kYXRlID4gZDEuZGF0ZSAtIHgwID8gZDEgOiBkMDtcclxuLy8gICAgIGZvY3VzLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUoXCIgKyB4KGQuZGF0ZSkgKyBcIixcIiArIHkoZC5jbG9zZSkgKyBcIilcIik7XHJcbi8vICAgICBmb2N1cy5zZWxlY3QoXCJ0ZXh0XCIpLnRleHQoZCk7XHJcbi8vICAgfSJdfQ==
})(window,document,jQuery);