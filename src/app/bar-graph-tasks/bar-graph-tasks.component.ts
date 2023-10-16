import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TasksGraphService } from '../tasks-graph.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-graph-tasks',
  templateUrl: './bar-graph-tasks.component.html',
  styleUrls: ['./bar-graph-tasks.component.css']
})

export class BarGraphTasksComponent implements OnInit, AfterViewInit {
    //@ViewChild('asBar') bar!: ElementRef;

    public svgWidth = 500;
    public svgHeight = 300;
    public barWidth = 0;

    //hostElement: any ; // Native element hosting the SVG container
    svg: any; // Top level SVG element
    g: any; // SVG Group element
    x: any; // X-axis graphical coordinates
    y: any; // Y-axis graphical coordinates
    margin = { top: 10, right: 10, bottom: 5, left: 30 };
    
    //private host!: d3.Selection<d3.BaseType, {}, d3.BaseType, any>;
    //private host!: d3.Selection<HTMLElement, {}, HTMLElement | null, any>;
    //private svg!: d3.Selection<SVGSVGElement, {}, HTMLElement | null, any>;
    //private htmlElement!: HTMLElement;

    public dataset: number[] = []; // Variable para almacenar los datos del servicio
    public filteredDataset: number[] = [];

    constructor(private tasksGraphService: TasksGraphService) { }

    ngOnInit(): void {
        this.tasksGraphService.data$.subscribe(newData => {
            this.dataset = newData;
            this.filteredDataset = this.dataset.filter(d => typeof d === 'number' && !isNaN(d));


        });
        this.buildSVG();
        this.initAxis();
        this.drawAxis();
        this.drawBar();
    }

    ngAfterViewInit() {       //  se ejecuta después de que Angular haya inicializado las vistas del componente

        //this.htmlElement = this.bar.nativeElement;
        //this.host = d3.select(this.htmlElement);
        // Suscríbete al observable para recibir los datos del servicion
        setTimeout(() => {
            this.tasksGraphService.data$.subscribe(newData => {
                this.dataset = newData;
                this.filteredDataset = this.dataset.filter(d => typeof d === 'number' && !isNaN(d));
                
                //console.log(this.filteredDataset);
 
                this.drawBar();
            });
        }, 0)

    }

    buildSVG(): void {
        //this.host.html('');
        this.svg = d3.select('#bar')
            .append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            //.style("overflow", "visible")
            //.style("margin-top", "75px")
            //.style("margin-left", "25px");
            .attr('viewBox', `0 0 ${this.svgWidth + 50} ${this.svgHeight + 50}`);
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    } 

    initAxis() {        // inicializa los ejes

        this.x = d3.scaleBand()
            .domain(this.filteredDataset.map((f, i) => i.toString()))   // define el dominio de la escala (cantidad de datos)
            .range([0, this.svgWidth])
            .padding(0.5);

        this.y = d3.scaleLinear()      // crea una escala lineal  
            .domain([0, d3.max(this.filteredDataset.filter(f => f !== undefined)) as number])   // define rango de valores de la escala (mayor de los datos)
            .range([this.svgHeight, 0]);          // define el espacio de la escala (alto del svg)

    }

    drawAxis() {        // dibuja los ejes

        this.g.append('g')
            .attr('class', 'axis axis--x')
            .attr("transform", `translate(0, ${this.svgHeight})`)
            .call(d3.axisBottom(this.x));
            //.ticks(this.filteredDataset.length);         // define la cantidad de ticks del eje

        this.g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(this.y))
            //.ticks(10)                     // define la cantidad de ticks del eje
            .append("text")
            .attr('class', 'axis-title')
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr('text-anchor', 'end')
            .text("Tasks");

    }

    drawBar(){
        

        this.g.selectAll("rect").remove();     // Elimina las barras anteriores

        // Actualiza el dominio de las escalas si es necesario
        // this.x.domain(this.filteredDataset.map((d, i) => i.toString()));
        this.y.domain([0, d3.max(this.filteredDataset)]);

        this.g.select(".axis--y").remove();
        this.drawAxis();

        console.log(this.filteredDataset);
        
        this.g.selectAll(".bar")
            .data(this.filteredDataset)      
            .enter().append("rect")       // appends a rectangle for each data value
            .attr("x", (f: number, i: number) => this.x(i.toString()))
            .attr("y", this.y)
            .attr("width", this.x.bandwidth())  
            .attr("fill", "steelblue")  
            .attr("height", (f: number) => this.svgHeight - this.y(f));       
    }
}