import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';
import { NpmResponsePackageInfo } from '../models/npm-response-package-info';
import { NpmResponseDownloadCounter } from '../models/npm-response-download-counter';


@Injectable({
  providedIn: 'root'
})
export class NpmInfoServiceService {

  private baseUrlInfo = "https://registry.npmjs.org/"
  private baseUrlDownloadCount = "https://api.npmjs.org/downloads/range/"


  constructor(private httpClient: HttpClient) { }

  getPackageInfo(packageName:string):Observable<NpmResponsePackageInfo> {
      return this.httpClient.get<NpmResponsePackageInfo>(this.baseUrlInfo + packageName);
  }

  getPackageDownloadCount(packageName:string, startPeriod:string , endPeriod:string):Observable<NpmResponseDownloadCounter>{
    return this.httpClient.get<NpmResponseDownloadCounter>(this.baseUrlDownloadCount + "/" + startPeriod + ":" + endPeriod + "/" + packageName);
  }

}
