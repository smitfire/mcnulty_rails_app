
;
(function() {
    var DURATION = 1500;
    var DELAY = 500;

    /*
    draw the fancy pie chart
    @param {String} elementId elementId
    @param {Array}  data      data
   */

    function drawPieChart(elementId, data) {

        console.log(elementId);
        console.log("yo mama");

        var containerEl = document.getElementById(elementId),
            width = containerEl.clientWidth,
            height = width * 0.4,
            radius = Math.min(width, height) / 2,
            container = d3.select(containerEl),
            svg = container.select('svg')
                        .attr('width', width)
                        .attr('height', height);
        var pie = svg.append('g')
            .attr(
                'transform',
                'translate(' + width / 2 + ',' + height / 2 + ')'
            );

        var detailedInfo = svg.append('g')
            .attr('class', 'pieChart--detailedInformation');

        var twoPi = 2 * Math.PI;
        var pieData = d3.layout.pie()
            .value(function(d) {
                return d.value;
            });

        var arc = d3.svg.arc()
            .outerRadius(radius - 20)
            .innerRadius(0);

        var pieChartPieces = pie.datum(data)
            .selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('class', function(d) {
                return 'pieChart__' + d.data.color;
            })
            .attr('filter', 'url(#pieChartInsetShadow)')
            .attr('d', arc)
            .each(function() {
                this._current = {
                    startAngle: 0,
                    endAngle: 0
                };
            })
            .transition()
            .duration(DURATION)
            .attrTween('d', function(d) {
                var interpolate = d3.interpolate(this._current, d);
                this._current = interpolate(0);

                return function(t) {
                    return arc(interpolate(t));
                };
            })
            .each('end', function handleAnimationEnd(d) {
                drawDetailedInformation(d.data, this);
            });

        drawChartCenter();

        function drawChartCenter() {
            var centerContainer = pie.append('g')
                .attr('class', 'pieChart--center');

            centerContainer.append('circle')
                .attr('class', 'pieChart--center--outerCircle')
                .attr('r', 0)
                .attr('filter', 'url(#pieChartDropShadow)')
                .transition()
                .duration(DURATION)
                .delay(DELAY)
                .attr('r', radius - 50);

            centerContainer.append('circle')
                .attr('id', 'pieChart-clippy')
                .attr('class', 'pieChart--center--innerCircle')
                .attr('r', 0)
                .transition()
                .delay(DELAY)
                .duration(DURATION)
                .attr('r', radius - 55)
                .attr('fill', '#fff');
        }

        function drawDetailedInformation(data, element) {
            var bBox = element.getBBox(),
                infoWidth = width * 0.4,
                anchor,
                infoContainer,
                position;
                // console.log(bBox.x);
                console.log(element);
                console.log( bBox.x + (bBox.width - 1) < 0 );

            if ( bBox.x + (bBox.width - 1) < 0) {
                infoContainer = detailedInfo.append('g')
                    .attr('width', infoWidth)
                    .attr(
                        'transform',
                        'translate(' + (width - infoWidth) + ',' + (bBox.height + bBox.y) + ')'
                );
                anchor = 'end';
                position = 'right';
            } else {
                console.log("YOLOLOLO");
                infoContainer = detailedInfo.append('g')
                    .attr('width', infoWidth)
                    .attr(
                        'transform',
                        'translate(' + 0 + ',' + (bBox.height + bBox.y) + ')'
                );
                anchor = 'start';
                position = 'left';
            }

            infoContainer.data([data.value])
                .append('text')
                .text('0 ')
                .attr('class', (position === 'left' ? 'pieChart--detail--percentage pieChart__red' : 'pieChart--detail--percentage pieChart__blue'))
                .attr('x', (position === 'left' ? 0 : infoWidth ) )
                .attr('y', (position === 'left' ? -130 : height - 200) )
                .attr('text-anchor', anchor)
                .transition()
                .duration(DURATION)
                .tween('text', function(d) {
                    var i = d3.interpolateRound(+this.textContent.replace(/\s%/ig, ''),
                        d
                    );
                    return function(t) {
                        this.textContent = i(t) + "      " + data.description;
                    };
                });
            
            infoContainer.data([data.title])
                .append('text')
                .text(data.title)
                .attr('class', 'pieChart--detail--textContainer')
                .attr('x', (position === 'left' ? 0 : infoWidth - 0))
                .attr('y', (position === 'left' ? -100 : height-170) )
                .attr('text-anchor', anchor);

            infoContainer.append('line')
                .attr('class', 'pieChart--detail--divider')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', 0)
                .transition()
                .duration(DURATION)
                .attr('x2', infoWidth);
            // infoContainer.data( [ data.description ] )
            //               .append( 'foreignObject' )
            //               .attr( 'width', infoWidth  )
            //               .attr( 'height', 100 )
            //               .append( 'xhtml:body' )
            //               .attr(
            //                 'class',
            //                 'pieChart--detail--textContainer ' + 'pieChart--detail__' + position
            //               )
            //               .html( data.description );
        }
    }

    data_fetch = function(url) {
        console.log(url)
        $.get(url, function(res) {
            drawPieChart("pieChart", res.pieChart);
            add_text(res.pieChart);
            // drawLineChart("lineChart", res.lineChart);
        });
    };
    function add_text(data){
        data.forEach(function(item){
            console.log(item);
            $("#detail").append("<li><p>" + item.description + "</p><small>" + item.title + "</small><br><span>" + item.value + "</span></li>");
        });
        // $("#detailright").append(data.value);
    }
    function go() {
        console.log("GO GO GADGET");
        data_fetch(document.URL);
    }

    $(document).ready(go);
    return $(document).on("page:load", go);
})();