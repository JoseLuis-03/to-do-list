import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TasksGraphService } from '../tasks-graph.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-graph-tasks',
  templateUrl: './bar-graph-tasks.component.html',
  styleUrls: ['./bar-graph-tasks.component.css']
})

export class BarGraphTasksComponent implements AfterViewInit {
    @ViewChild('svgElement') element!: ElementRef;

    public svgWidth = 500;
    public svgHeight = 300;
    public barWidth = 0;
    
    //private host!: d3.Selection<d3.BaseType, {}, d3.BaseType, any>;
    private host!: d3.Selection<HTMLElement, {}, HTMLElement | null, any>;
    private svg!: d3.Selection<SVGSVGElement, {}, HTMLElement | null, any>;
    private htmlElement!: HTMLElement;

    public dataset: number[] = []; // Variable para almacenar los datos del servicio

    constructor(private tasksGraphService: TasksGraphService) { }


    ngAfterViewInit(): void {

        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.htmlElement);
        // Suscríbete al observable para recibir los datos del servicion
        this.tasksGraphService.data$.subscribe(newData => {
            //const dataArray = newData as number[];
            this.dataset = newData;
            
        });
        this.buildSVG();
        this.createGraph();

        // if (this.svgElement && this.svgElement.nativeElement) {
        //     const svg = d3.select(this.svgElement.nativeElement as any);
        //     this.createGraph(svg);
        //   }
      }

      buildSVG(): void {
        this.host.html('');
        this.svg = this.host.append('svg')
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .style("overflow", "visible")
            .style("margin-top", "75px")
            .style("margin-left", "25px");
            
            this.barWidth = (this.svgWidth / this.dataset.length);
      }

    createGraph(): void {

        const filteredDataset = this.dataset.filter(d => typeof d === 'number' && !isNaN(d));
            
        const xScale = d3.scaleBand()
            .domain(filteredDataset.map((f, i) => i.toString()))   // define el dominio de la escala (cantidad de datos)
            .range([0, this.svgWidth])
            .padding(0.5);

        const yScale = d3.scaleLinear()      // crea una escala lineal  
            .domain([0, d3.max(filteredDataset.filter(f => f !== undefined)) as number])   // define rango de valores de la escala (mayor de los datos)
            .range([this.svgHeight, 0])          // define el espacio de la escala (alto del svg)
            
            
        const x_axis = d3.axisBottom(xScale)  // crea un eje horizontal
            .ticks(filteredDataset.length);         // define la cantidad de ticks del eje

        const y_axis = d3.axisLeft(yScale)
            .ticks(10);                      // define la cantidad de ticks del eje

        //var xAxisTranslate = svgHeight - 20;

        this.svg.append("g")
            .call(x_axis)
            .attr("transform", `translate(0, ${this.svgHeight})`);

        this.svg.append("g")                                    // agrega un grupo al svg
            //.attr("transform", "translate(50, 10)")         // posiciona el grupo en el svg (x,y) 
            .call(y_axis);                                  // agrega el eje vertical al grupo

        this.svg.selectAll(".bar")    
            .data(filteredDataset)      
            .enter()
            .append("rect")       // appends a rectangle for each data value
            //.attr("x", (_f, i) => xScale(i))
            .attr("y", yScale)
            .attr("width", xScale.bandwidth())    
            .attr("height", f => this.svgHeight - yScale(f));       
    }
}