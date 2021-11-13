import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexPlotOptions, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


import * as Highcharts from 'highcharts';


export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

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

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
} from "ng-apexcharts";
import { ArchivosService } from 'src/app/services/archivos.service';



@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  queGrafico:any;
  logs:any;
  chartOptionsPie!: { series: any; chart: { width: number; type: string; }; labels: string[]; responsive: { breakpoint: number; options: { chart: { width: number; }; legend: { position: string; }; }; }[]; };

  constructor(private auth:AuthService, private afs:FirebaseService, private archivoS:ArchivosService) {
  
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

  /************************************** TURNOS POR MEDICO EN UN LAPSO DE TIEMPO *************************************************** */


  turnosMedicoPorLapso:any;
  turnosFinalizadosMedicoPorLapso:any;

  fechasEnElLapso:any;
  turnosXMedico:any;
  apellidosEspecialistas:any;
  seleccionaLapso()
  {
    this.fechasEnElLapso =[];
    let fechaInicio = (<HTMLInputElement>document.getElementById('dateInicio'));
    let fechaFin = (<HTMLInputElement>document.getElementById('dateFin'));

    console.info(fechaInicio.value);
    console.info(fechaFin.value);

    let fechaIniciov2 = fechaInicio.value.toString().split('-'); //fechaIniciov2[2] es el dia fechaIniciov2[1] es el Mes
    let fechaFinv2 = fechaFin.value.toString().split('-');

    let primerMes = true;
    for(let j = parseInt(fechaIniciov2[1]); j<=parseInt(fechaFinv2[1]); j++)
    { 
      let diaComienzo = parseInt(fechaIniciov2[2]);
      if(primerMes)
      {
        diaComienzo = parseInt(fechaIniciov2[2]);
        primerMes = false;
      }
      else
      {
        diaComienzo = 1;
      }
      console.info('jota',j);
      if(j == parseInt(fechaFinv2[1]) )
      {
        for(let i = diaComienzo ; i<= parseInt(fechaFinv2[2]) ; i++ )
        {
          this.fechasEnElLapso.push(i+'-'+j);
          console.info('i',i);
        }
      }
      else
      {
        for(let i = diaComienzo; i<=31; i++ )
        {
          console.info('i',i);
          this.fechasEnElLapso.push(i+'-'+j)
        }
      }
    }

  }

  segundaParte()
  {
    this.seleccionaLapso();
    console.info('fechasenellapso', this.fechasEnElLapso);


    this.apellidosEspecialistas = [];
    this.turnosXMedico= []

    this.afs.arrayEspecialistas.forEach( (especialista:any) => {
      this.apellidosEspecialistas.push(especialista.data.apellido);
      // console.info('especialista',especialista);
      let aux = 0;
      
      this.afs.listaTurnos.forEach( (turno:any) => {

        this.fechasEnElLapso.forEach( (unaFecha:any) => {
          if(unaFecha == turno.data.fecha)
          {
            if(turno.data.dniEspecialista == especialista.data.dni)
            {
              aux++;
            }
          }
          
        });

      });
      this.turnosXMedico.push(aux);
    });

    console.info('turnosXMedico', this.turnosXMedico);
    

    
  }


  armarGraficoTurnosXEspecialista()
  {
    this.segundaParte();
    this.queGrafico = 'Turnos por especialista en un lapso de tiempo'
    this.chartOptions = {
      series: [
        {
          name: "Turnos",
          data:  this.turnosXMedico
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
        categories:  this.apellidosEspecialistas,
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
        text: "Turnos por Especialista en un lapso de tiempo",
        floating: false,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }


  /************************* TURNOS FINALIZADOS POR MEDICO EN UN LAPSO DE TIEMPO **************************/



  turnosFinXMedico:any;
  turnosCompletadosEnUnLapso()
  {
    this.turnosFinXMedico = []

    this.seleccionaLapso();

    this.apellidosEspecialistas = [];
    this.afs.arrayEspecialistas.forEach( (especialista:any) => {
      this.apellidosEspecialistas.push(especialista.data.apellido);
      let aux = 0;
      
      this.afs.listaTurnos.forEach( (turno:any) => {
        this.fechasEnElLapso.forEach( (unaFecha:any) => {
          if(unaFecha == turno.data.fecha)
          {
            if(turno.data.dniEspecialista == especialista.data.dni && turno.data.estado == 'realizado')
            {
              aux++;
            }
          }
        });
      });
      this.turnosFinXMedico.push(aux);
    });
    
  }


  armarGraficoTurnosFinalizadosXEspecialista()
  { 
    this.turnosCompletadosEnUnLapso();

    this.queGrafico = 'Turnos Finalizados por especialista en un lapso de tiempo'
    this.chartOptions = {
      series: [
        {
          name: "Turnos",
          data:  this.turnosFinXMedico
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
        categories:  this.apellidosEspecialistas,
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
        text: "Turnos por Especialista en un lapso de tiempo",
        floating: false,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }


  armarGraficodeTorta()
  {
    this.chartOptionsPie = {
      series: this.turnosFinXMedico,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
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
  }

  
 exportAsXLSX():void {
  let arrayDatas:any = [];
  let elementFilter:any;

  this.logs.forEach((log:any) => {

    elementFilter = [{
      correo: log.correo,
      fecha: new Date(log.fecha).toLocaleDateString() +'  '+ new Date(log.fecha).toLocaleTimeString()

    }];

    console.info('elementofilter', elementFilter[0]);
    arrayDatas.push(elementFilter[0]);
  });

    this.archivoS.exportAsExcelFile(arrayDatas, 'logsAl'+Date.now());
  }




  chartOptionsv2:any;
  highcharts = Highcharts;

  armarGraficoHighChart()
  {
    this.turnosCompletadosEnUnLapso();
    console.info('apeesp',this.apellidosEspecialistas);
    console.info('turnxmed',this.turnosFinXMedico);
    // this.apellidosEspecialistas = ['juan', 'pedro', 'martias', 'marcos'];
    // this.turnosFinXMedico = [2,3,9,4]

    let data :any= [];
    this.apellidosEspecialistas.forEach( (apEsp:string, index:number) => {
      let elem:any = {};
      elem.name = apEsp;
      elem.y = this.turnosFinXMedico[index];
      data.push(elem);
    });

    this.chartOptionsv2 = Highcharts.setOptions( {
      chart: {
        type: 'pie',
      },
      title: {
        text: "Turnos finalizados por especialista en el lapso seleccionado"
      },
      series: [{
        data : data,
        type: 'pie'
      }]
    })
  }



}
