d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', response => {
     return response.json()
}).then(response => {
    console.log(response)

    const h = 600
    const w = 1500
    padding = 60
    baseTemperature = 8.66

    const svg = d3.select('body')
        .append('svg')
        .attr('height', h)
        .attr('width', w)

    const xScale = d3.scaleLinear()
        .domain([d3.min(response.monthlyVariance, d => d.year), d3.max(response.monthlyVariance, d => d.year)])
        .range([padding, w - padding])

    const yScale = d3.scaleLinear()
        .domain([d3.max(response.monthlyVariance, d => d.month), d3.min(response.monthlyVariance, d => d.month)])
        .range([h - padding, padding]) 

    
    
    console.log(yScale(1), yScale(12))
    console.log(xScale(1800))
    
})