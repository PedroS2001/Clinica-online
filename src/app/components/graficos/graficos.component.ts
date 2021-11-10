import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  queGrafico:any;
  logs:any;

  constructor(private auth:AuthService, private afs:FirebaseService) {
  
  }

  ngOnInit(): void {
    this.cargarValoresPorEspecialidad();
    this.calcularDiasConTurno();
    this.afs.leerLogs().subscribe((logs:any) =>{
      this.logs = logs;
    })
  }

  @ViewChild('chartObj') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;



  valoresPorEspecialidad:any;
  cargarValoresPorEspecialidad()
  {
    this.valoresPorEspecialidad= []
    this.afs.listaEspecialidades;
    console.info(this.afs.listaEspecialidades);

    this.afs.listaEspecialidades.forEach( (especialidad:any) => {
      let aux = 0;
      
      this.afs.listaTurnos.forEach( (turno:any) => {
        console.info(turno);
        if(turno.data.especialidad == especialidad)
        {
          aux++;
        }
      });
      this.valoresPorEspecialidad.push(aux);
    });

    console.info('valoresPorEspecialidad', this.valoresPorEspecialidad);
  }


  armarGraficoTurnosXEspecialidad()
  {
    this.queGrafico = 'Turnos por especialidad'
    this.chartOptions = {
      series: [
        {
          name: "Turnos",
          data:  this.valoresPorEspecialidad
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "bottom" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val:any) {
          return val;
        },
        style: {
          fontSize: "14px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories:  this.afs.listaEspecialidades,
        position: "bottom",
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: function(val:any) {
            return val;
          }
        }
      },
      title: {
        text: "Turnos por especialidad",
        floating: false,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }





/*********************************TURNOS POR DIA******************************* */

  diasConTurno:any;
  turnosPordia:any;

  
  calcularDiasConTurno()
  {
    let data :any= [];
    this.afs.listaTurnos.forEach( (turno:any) => {
      data.push(turno.data.fecha);
    });

    this.diasConTurno = data.filter((item:any,index:any)=>{
      return data.indexOf(item) === index;
    });

    this.cargarTurnosPorDia();
    console.info(this.diasConTurno);
  }

  cargarTurnosPorDia()
  {
    this.turnosPordia= []

    this.diasConTurno.forEach( (fecha:any) => {
      let aux = 0;
      
      this.afs.listaTurnos.forEach( (turno:any) => {
        console.info(turno);
        if(turno.data.fecha == fecha)
        {
          aux++;
        }
      });
      this.turnosPordia.push(aux);
    });

    console.info('turnosPordia', this.turnosPordia);
  }
  


  armarGraficoTurnosPorDia()
  {
    this.queGrafico = 'Turnos por dia';
    this.chartOptions = {
      series: [
        {
          name: "Turnos",
          data:  this.turnosPordia
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "bottom" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val:any) {
          return val;
        },
        style: {
          fontSize: "14px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories:  this.diasConTurno,
        position: "bottom",
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: function(val:any) {
            return val;
          }
        }
      },
      title: {
        text: "Turnos por dia",
        floating: false,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  /************************************** *************************************************** */

  imprimirPDF()
  {
   //  let doc = new jspdf.jsPDF();
   let data =(<HTMLElement>document.getElementById('chart'));  
 
   html2canvas(data).then(canvas => {
     const contentDataURL = canvas.toDataURL('image/png')  
     // let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
     let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in portrait mode
     
     pdf.addImage(contentDataURL, 'PNG', 0, 0, 0, 0);  
     pdf.save('estadisticas'+ this.queGrafico +'.pdf');   
   }); 
  }

  verLogs:boolean = false;
  leerLogs()
  {
    this.verLogs = true;
    console.info(this.logs);

    this.logs.forEach( (element:any) => {
      console.info( (element.fecha/86400)+25569+(-5/24) );
      
    });
  }

}
