import { Component, OnInit,Input } from '@angular/core';
import { forkJoin } from 'rxjs';
import { NpmResponseDownloadCounter } from 'src/app/models/npm-response-download-counter';
import { NpmResponsePackageInfo } from 'src/app/models/npm-response-package-info';
import { NpmInfoServiceService } from 'src/app/services/npm-info-service.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {

  @Input() packageName:string = ""

  totalDownload = 0;

  creationDate: Date = new Date();

  chartDownloadByYearOption:any
  
  constructor(private infoNpmService: NpmInfoServiceService) { }

  ngOnInit(): void {
    this.infoNpmService.getPackageInfo(this.packageName).subscribe(
      {
        next: (data:NpmResponsePackageInfo) => {
          console.log(data)
          const today: Date = new Date()
          this.creationDate= new Date(data.time.created)
          const listInterval = []
          const listYear:string[] = []
          listYear.push(this.creationDate.getFullYear().toString())
          if (today.getFullYear() == this.creationDate.getFullYear()){
            listInterval.push({startInterval:this.creationDate, endInterval:today})
          } else {

            listInterval.push({startInterval:this.creationDate, endInterval:new Date(this.creationDate.getFullYear() + "-12-31")})
            let indexYear = this.creationDate.getFullYear() +1
            while (indexYear < today.getFullYear()) {
              listYear.push(indexYear.toString())
              listInterval.push({startInterval:new Date(indexYear + "-01-01"), endInterval:new Date(indexYear + "-12-31")})
              indexYear +=1
            }
            listInterval.push({startInterval:new Date(indexYear + "-01-01"), endInterval:today})
            listYear.push(today.getFullYear().toString())
          }


          const listRequest =listInterval.map(item => {
            return this.infoNpmService.getPackageDownloadCount(this.packageName,this.getDateFormat(item.startInterval), this.getDateFormat(item.endInterval))
          })

          forkJoin(
            listRequest
          ).subscribe(
            {
              next: (listResult: NpmResponseDownloadCounter[]) => {
                const downloadByYear:number[] = []
                listResult.forEach((res) => {
                  let downloadYearTemp = 0

                  res.downloads.forEach((downloadDay) => {
                    this.totalDownload += downloadDay.downloads
                    downloadYearTemp += downloadDay.downloads
                  })
                  downloadByYear.push(downloadYearTemp)


                })
                console.log(listYear)
                console.log(downloadByYear)

                this.chartDownloadByYearOption = {
                  title:{
                    text:"Téléchargement par année",
                    
                  },
                  tooltip: {
                    trigger: 'axis'
                  },
                  xAxis: {
                    name:"Années",
                    nameLocation:"center",
                    type: 'category',
                    data: listYear,
                  },
                  yAxis: {
                    type:"value",
                    name:"Nombre de Téléchargements"
                  },
                  series: [
                    {
                      name:"Téléchargements",
                      data: downloadByYear,
                      type: 'line',
                    },
                  ],
                };

              },
              error: (e) => {
                console.log(e)
              }
            }
          )

        },
        error: (e:any) => {
          console.log(e)
        }
      })
  }


  getDateFormat(dateNotFormated: Date) {
    const month = dateNotFormated.getMonth() + 1
    let day = ""
    if (dateNotFormated.getDate() < 10) {
      day = "0" + dateNotFormated.getDate()
    } else {
      day = "" + dateNotFormated.getDate()
    }
    
    const year = dateNotFormated.getFullYear()
    if (month > 9){
      return year + "-" + "0" + month + "-" + day;
    } else {
      return year + "-" + month + "-" + day;
    }
  }

}
