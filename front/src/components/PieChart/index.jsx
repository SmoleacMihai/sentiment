import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ result }) => {
  const svgRef = useRef(null);
  const arrayOfData = [
    {
      label: "Positivity",
      value: result.pos
    },
    {
      label: "Megativity",
      value: result.neg
    },
    {
      label: "Neutrality",
      value: result.neu 
    },
  ];

  useEffect(() => {
    if (result) {
      drawPieChart();
    }
  }, [result]);

  const drawPieChart = () => {
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    const formattedData = d3
      .pie()
      .value(d => d.value)(result);
      
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
    svg.selectAll()
      .data(formattedData)
      .join('path')
        .attr('d', arcGenerator)
        .attr('fill', d => colorScale(d.value))
        .style('opacity', 0.7)

    svg.selectAll()
      .data(formattedData)
      .join('text')
        .text(d => d.data.property)
        .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
        .style('text-anchor', 'middle')

    // const arcs = pie(dataWithPercentages);
  };

  return <svg ref={svgRef} width={800} height={800}  />;
};

export default PieChart;
