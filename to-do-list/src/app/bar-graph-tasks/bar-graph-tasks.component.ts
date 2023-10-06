import { Component, OnInit, AfterViewInit, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { TasksGraphService } from '../tasks-graph.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-graph-tasks',
  templateUrl: './bar-graph-tasks.component.html',
  styleUrls: ['./bar-graph-tasks.component.css']
})

export class BarGraphTasksComponent {
    public svgWidth = 500;
    public svgHeight = 300;
    public barWidth = 0;
  
    public dataset: number[] = []; // Variable para almacenar los datos del servicio

    constructor(private tasksGraphService: TasksGraphService) { }

    ngOnInit(): void {
        // Suscríbete al observable para recibir los datos del servicio
        this.tasksGraphService.data$.subscribe(newData => {
            const dataArray = newData as number[];
            console.log('Datos recibidos del servicio:', dataArray);
            this.dataset = dataArray;
        // Ahora puedes utilizar this.data en tu componente

        this.barWidth = (this.svgWidth / this.dataset.length);

        this.createGraph();
        });
    }

    createGraph(): void {

        const filteredDataset = this.dataset.filter(d => typeof d === 'number' && !isNaN(d));

        const svg = d3.select('svg')
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .style("overflow", "visible")
            .style("margin-top", "75px")
            .style("margin-left", "25px");

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

        svg.append("g")
            .call(x_axis)
            .attr("transform", `translate(0, ${this.svgHeight})`);

        svg.append("g")                                    // agrega un grupo al svg
            //.attr("transform", "translate(50, 10)")         // posiciona el grupo en el svg (x,y) 
            .call(y_axis);                                  // agrega el eje vertical al grupo

        svg.selectAll(".bar")    
            .data(filteredDataset)      
            .enter()
            .append("rect")       // appends a rectangle for each data value
            //.attr("x", (_f, i) => xScale(i))
            .attr("y", yScale)
            .attr("width", xScale.bandwidth())    
            .attr("height", f => this.svgHeight - yScale(f));       
    }
}