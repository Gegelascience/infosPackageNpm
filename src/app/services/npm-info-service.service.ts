import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NpmInfoServiceService {

  private baseUrlInfo = "https://registry.npmjs.org/"
  private baseUrlDownloadCount = "https://api.npmjs.org/downloads/range/"


  constructor(private httpClient: HttpClient) { }

  getPackageInfo(packageName:string) {
      return this.httpClient.get(this.baseUrlInfo + packageName)
  }

  getPackageDownloadCount(packageName:string, startPeriod:string , endPeriod:string){
    return this.httpClient.get(this.baseUrlDownloadCount + "/" + startPeriod + ":" + endPeriod + "/" + packageName)
  }

}
