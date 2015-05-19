;
(function() {
    function drawDonutChart(elementId, data) {
        var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();
        console.log("========================")
        console.log(data)
        console.log("========================")
        var pie = d3.layout.pie()
            .value(function(d) { return d.apples; })
            .sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 100)
            .outerRadius(radius - 20);

        var svg = d3.select(elementId).append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var path = svg.datum(data).selectAll("path")
            .data(pie)
            .enter().append("path")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", arc)
            .each(function(d) { this._current = d; }); // store the initial angles

        d3.selectAll("input")
            .on("change", change);

        var timeout = setTimeout(function() {
            d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
        }, 2000);

        function change() {
            var value = this.value;
            clearTimeout(timeout);
            pie.value(function(d) { return d[value]; }); // change the value function
            path = path.data(pie); // compute the new angles
            path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
        }


        function type(d) {
            d.apples = +d.apples;
            d.oranges = +d.oranges;
            return d;
        }

        // Store the displayed angles in _current.
        // Then, interpolate from _current to the new angles.
        // During the transition, _current is updated in-place by d3.interpolate.
        function arcTween(a) {
            var i = d3.interpolate(this._current, a);
            this._current = i(0);
            return function(t) {
                return arc(i(t));
            };
        }
    }

    data_fetch = function(url) {
        url = url + "/donut"
        console.log(url)
        $.get(url, function(res) {
            console.log(res)
            drawDonutChart("#donutChart", res);
        });
    }


    function donutgo() {
        console.log("GO GO GADGET");
        data_fetch(document.URL);
    }
    $(document).ready(donutgo);
    return $(document).on("page:load", donutgo);

})();