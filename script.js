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

    const svg = d3.select('body')
        .append('svg')
        .attr('height', h)
        .attr('width', w)
    
    const xScale = d3.scaleLinear()
        .domain([d3.min(response.monthlyVariance, d => d.year), d3.max(response.monthlyVariance, d => d.year)])
        .range([padding, w - padding])

    const yScale = d3.scaleLinear()
        .domain([d3.max(response.monthlyVariance, d => d.month), d3.min(response.monthlyVariance, d => d.month)])
        .range([h - padding - rectHeight, padding]) 

    svg.selectAll('rect')
        .data(response.monthlyVariance)
        .enter()
        .append('rect')
        .attr('width', rectWidth)
        .attr('height', rectHeight)
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.month))
        .attr('fill', 'navy')
    
    console.log(yScale(1), yScale(12))
    console.log(xScale(1800))
    
})