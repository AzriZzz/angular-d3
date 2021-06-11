import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const bindId = 'figure#' + this.barId;
    const bind = bindId;
    this.svg = d3.select(bind).selectAll('svg').remove();
    this.updateColorRange();
    this.drawChart();
    this.cdRef.detectChanges();
  }

  barId: any;
  allValue: any[];
  firstValue: number;
  totalValue: number = 0;
  svg: any;


  private support = [
    {
      value: 250,
      colorScheme: '',
      label: 'Used'
    },
    {
      value: 700,
      colorScheme: '',
      label: 'Remaining'
    }
  ]

  constructor(private elem: ElementRef, private cdRef: ChangeDetectorRef) {}

  private colorRange = [
    '#A5CF4C',
    '#759BE4',
    '#1AA594',
    '#FFA596',
    '#307472',
    '#E7B464',
    '#E7ADD9',
    '#8CA0A1',
    '#FFD037',
    '#8B77E7',
    '#99EAFF',
  ];
  private width = 0;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.updateColorRange();
    this.drawChart();
    this.sumValue();
    this.cdRef.detectChanges();
  }

  sumValue() {    
    this.support.forEach( i => {
      this.totalValue += i.value;
    })
    this.firstValue = this.support[0].value;
  }

  updateColorRange() {
    const dataLength = Object.keys(this.support).length;
    this.colorRange = this.colorRange.slice(0, dataLength);
    this.colorRange.forEach((element, index) => {
      this.support[index].colorScheme = element;
    });

    console.log(this.colorRange, this.support);
  }

  private drawChart(): void {
    let button = this.elem.nativeElement.querySelector('#' + this.barId);
    if (button) {
      let buttonWidth = parseInt(window.getComputedStyle(button).width, 10);
      this.width = buttonWidth;
      const bindId = 'figure#' + this.barId;
      const bind = bindId;
      const data = this.support;
      var config = {
        f: d3.format('.1f'),
        margin: { top: 0, right: 10, bottom: 0, left: 10 },
        width: buttonWidth,
        height: 24,
        barHeight: 24,
        colors: this.colorRange,
        ...config,
      };
      const { f, margin, width, height, barHeight, colors } = config;
      const w = width - margin.left - margin.right;
      const h = height - margin.top - margin.bottom;
      const halfBarHeight = barHeight / 2;

      const total = d3.sum(data, (d) => d.value);

      let cumulative = 0;
      const _data = data
        .map((d) => {
          cumulative += d.value;
          return {
            value: d.value,
            // want the cumulative to prior value (start of rect)
            cumulative: cumulative - d.value,
            label: d.label,
          };
        })
        .filter((d) => d.value >= 0);

      // set up scales for horizontal placement
      const xScale = d3.scaleLinear().domain([0, total]).range([0, width]);

      // create svg in passed in div
      this.svg = d3
        .select(bind)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', '0 0 ' + width + ' ' + height)
        .style('border-radius', '6px')
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + margin.top + ')');

      // stack rect for each data value

      this.svg
        .selectAll('rect')
        .data(_data)
        .enter()
        .append('rect')
        .attr('class', 'rect-stacked')
        .attr('x', (d) => xScale(d.cumulative))
        .attr('y', h / 2 - halfBarHeight)
        .attr('height', barHeight)
        .attr('width', (d) => xScale(d.value))
        .style('stroke', 'white')
        .style('fill', (d, i) => colors[i]);
      this.cdRef.detectChanges();
    }
  }

}
