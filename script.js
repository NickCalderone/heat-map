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
 //       .domain(['December', 'November', 'October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January'])
        .domain([12,11,10,9,8,7,6,5,4,3,2,1])
        .range([h - padding, padding]) 

    svg.selectAll('rect')
        .data(response.monthlyVariance)
        .enter()
        .append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', yScale.bandwidth())
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.month))
        .attr('fill', 'navy')
    
    console.log(yScale(1), yScale(12))
    console.log(xScale(1800))
    
})