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

    const colorScale = d3.scaleLinear()
        .domain([d3.min(response.monthlyVariance, d => d.variance + baseTemperature), d3.mean(response.monthlyVariance, d => d.variance + baseTemperature), d3.max(response.monthlyVariance, d => d.variance + baseTemperature)])
        .range(['blue','#ffd885 ', 'red'])

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
        .call(xAxis)
    
    const legend = d3.select('body')
        .append('svg')
        .attr('id', 'legend')
        .attr('height', 200)
        .attr('width', 600)

    legend.append
})