d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', response => {
     return response.json()
}).then(response => {
    console.log(response)

    const h = 600
    const w = 1800
    const padding = 60
    const baseTemperature = 8.66
    const rectWidth = (w - 2 * padding)/((response.monthlyVariance.length + 3) / 12)
    const rectHeight = (h - 2 * padding)/12
    const colors = ['#0146a2','#2480fc','#7bedff','#b5fff1','#feee93','#ffd54d', '#ff8080', '#C70039', '#9a041d']

    function toMonth(num){
        switch(num){
            case 1:
                return 'January'
                break
            case 2:
                return 'February'
                break
            case 3:
                return 'March'
                break
            case 4:
                return 'April'
                break
            case 5:
                return 'May'
                break
            case 6:
                return 'June'
                break
            case 7:
                return 'July'
                break
            case 8:
                return 'August'
                break
            case 9: 
                return 'September'
                break
            case 10:
                return 'October'
                break
            case 11:
                return 'November'
                break
            case 12:
                return 'December'
                break
            default:
                console.log('toMonth() function error')
                break
        }
    }

    const titleDiv = d3.select('body')
        .append('div')
        .attr('id', 'titleDiv')
        .append('h1')
        .attr('id', 'title')
        .text('Monthly Global Land-Surface Temperature')

    const description = d3.select('#titleDiv')
        .append('h2')
        .attr('id', 'description')
        .text('1753-2015, base temperature 8.66C')

    d3.select()

    function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}
    console.log('test', )

    const svg = d3.select('body')
        .append('svg')
        .attr('height', h)
        .attr('width', w)

    const years = response.monthlyVariance.map(v => v.year).filter(onlyUnique)

    const xScale = d3.scaleBand()
        .domain(years)
        .range([padding, w - padding])

    const yScale = d3.scaleBand()
        .domain(['December', 'November', 'October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January'])
 //       .domain([12,11,10,9,8,7,6,5,4,3,2,1])
        .range([h - padding, padding]) 

    const colorDomain = d3.extent(response.monthlyVariance, d => d.variance + baseTemperature)

    const colorScale = d3.scaleQuantile()
        .domain([d3.min(response.monthlyVariance, d => d.variance + baseTemperature), d3.max(response.monthlyVariance, d => d.variance + baseTemperature)])
        .range(colors)

    svg.selectAll('rect')
        .data(response.monthlyVariance)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('data-month', d => d.month - 1)
        .attr('data-year', d => d.year)
        .attr('data-temp', d => d.variance + 8.66)
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(toMonth(d.month)))
        .attr('fill', d => colorScale(d.variance + baseTemperature))
        .on('mouseover', function(d) {d3.select('#tooltip').style('opacity', 1).attr('data-year', d.year).text(`${toMonth(d.month)}, ${d.year} Temperature ${(d.variance + 8.66).toFixed(2)}`)})
        .on('mouseout', function() {d3.select('#tooltip').style('opacity', 0)})
        .on('mousemove', function() {
            d3.select('#tooltip').style('left', (d3.event.pageX+10) + 'px').style('top', (d3.event.pageY) + 'px')
        })

    const xAxis = d3.axisBottom(xScale)
        .tickValues(xScale.domain().filter(d => d % 5 == 0))
    const yAxis = d3.axisLeft(yScale)

    svg.append('g')
        .attr("transform", "translate(" + padding + ", 0)")
        .attr('id', 'y-axis')
        .call(yAxis)

    svg.append('g')
        .attr("transform", "translate(0," + (h - padding) + ")")
        .attr('id', 'x-axis')
        .call(xAxis)          .append('div')
        .attr('id', 'tooltip')
        .attr('style', 'opacity: 0')
        .attr('style', 'position: absolute')
        .attr('width', 500)
        .attr('height', 500)

         //added tooltip div
    d3.select('body')
        .append('div')
        .attr('id', 'tooltip')
        .attr('style', 'opacity: 0')
        .attr('style', 'position: absolute')
    
    const legendSvg = d3.select('body')
        .append('svg')
        .attr('height', 1000)
        .attr('height', 1000)
        .attr('id', 'legend')

    legendSvg.append('text')
        .text('Temperature Range')
        .attr('y', 20)

    legendSvg.selectAll('rect')
        .data(colors)
        .enter()
        .append('rect')
        .attr('height', yScale.bandwidth())
        .attr('width', xScale.bandwidth())
        .attr('x', (d,i) => 20)
        .attr('y', (d,i) => yScale.bandwidth() * (i + 1))
        .attr('fill', d => d)

    function legendText(data, length){
        const simplified = data.map(x => x)
        const difference = simplified[1] - simplified[0] 
        const quantity = difference / length
        const array = []
        array.push()
        for (let i = 0; i < length + 1; i++){
            array.push((quantity * i + simplified[0]).toFixed(2))
        }
        return array
    }

    legendSvg.selectAll('text')
        .data(legendText(colorScale.domain(), colors.length))
        .enter()
        .append('text')
        .text(d => d)
        .attr('x', 30)
        .attr('y', (d,i) => (yScale.bandwidth() * (i + 1)) + 7.5)
})