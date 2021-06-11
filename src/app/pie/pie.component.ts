import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  private data = [
    {
      label: 'Total Support 1',
      info: '500.00',
    },
    {
      label: 'Subsidies 3',
      info: '400.00',
    },
    {
      label: 'Covid 19 5',
      info: '100.00',
    },
    {
      label: 'Generation 8',
      info: '290.00',
    },
    {
      label: 'Total Support 2',
      info: '500.00',
    },
    {
      label: 'Subsidies 4',
      info: '400.00',
    },
    {
      label: 'Covid 19 6',
      info: '100.00',
    },
    {
      label: 'Generation 9',
      info: '290.00',
    },
    {
      label: 'Covid 19 7',
      info: '100.00',
    },
    {
      label: 'Generation 10',
      info: '290.00',
    }
  ];
  private svg;
  private margin = 50;
  private width = 650;
  private height = 400;
  // The radius of the pie chart is half the smallest side
  private radius = Math.min(this.width, this.height) / 2 - this.margin;
  private colors;


  constructor(private elem: ElementRef, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createSvg();
    this.createColors();
    this.drawChart();
  }

  ngOnChanges() {
    this.createSvg();
    this.createColors();
    this.drawChart();
    this.cdRef.detectChanges();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#pie")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr(
      "transform",
      "translate(" + this.width / 2 + "," + this.height / 2 + ")"
    );
  }

  private createColors(): void {
    
    const COLOR_RANGE = [
      '#E5B464',
      '#1AA594',
      '#E5ADD9',
      '#8CA1A1',
      '#FFA596',
      '#215452',
      '#559BE4',
      '#FFD025',
      '#8B55E5',
      '#99EAFF',
      '#A5CF4C',
    ];
    
    //MAP THE COLOR CORRECTLY ACCORDING TO THE COLOR RANGE
    this.colors = 
      d3.scaleOrdinal(COLOR_RANGE);

    //MAP THE COLOR ACCORDING TO THE RANGE OF THE COLOR, FROM LIGHTEST TO THE HEAVIEST COLOR
    // this.colors = 
    //   d3.scaleOrdinal()
    //   .domain(this.data.map(d => d.info.toString()))
    //   .range(COLOR_RANGE);
  }

  private drawChart(): void {
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.info));

    // Build the pie chart
    this.svg
    .selectAll('pieces')
    .data(pie(this.data))
    .enter()
    .append('path')
    .attr('d', d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius)
    )
    .attr('fill', (d, i) => (this.colors(i)))
    .attr("stroke", "#fff")
    .style("stroke-width", "3px");

    //first headline
    this.svg
    .append("text")
    .attr("x", -83)
    .attr("y", -20)
    .attr("stroke", "steelblue")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("font-weight", "400")
    .text("The amount that is left is");

    //second headline
    this.svg
    .append("text")
    .attr("x", -49)
    .attr("y", 4)
    .attr("stroke", "steelblue")
    .attr("font-family", "sans-serif")
    .attr("font-size", "16px")
    .attr("font-weight", "400")
    .text("01 Jan 2021");

    //total value/figure
    this.svg
    .append("text")
    .attr("x", -70)
    .attr("y", 40)
    .attr("stroke", "steelblue")
    .attr("font-family", "sans-serif")
    .attr("font-size", "32px")
    .attr("font-weight", "400")
    .text("$1,290.00");
  }



}
