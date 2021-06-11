import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-single-bar',
  templateUrl: './single-bar.component.html',
  styleUrls: ['./single-bar.component.scss']
})
export class SingleBarComponent implements OnInit {

  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];

  private svg;
  private margin = 50;
  private width = 550;
  private height = 200;
  private barHeight = 100;

  private createSvg(): void {
    this.svg = d3.select("figure#singleBar")
    .append("svg")
    .attr("width", this.width)
    .attr("height", this.height)
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawSingleLine(data: any[]): void {

    const x = d3.scaleBand()
    .range([0, this.width])
    .padding(0.2);

    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x));

    this.svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 200)
    .attr("height", 100)
    .attr('fill', 'tomato')
    .attr("stroke", "black")
  }
  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawSingleLine(this.data);
  }

}
