export interface NpmResponseDownloadCounter {
    downloads:NpmResponseDownloadDay[],
    end:string,
    package:string,
    start:string    
}

interface NpmResponseDownloadDay {
    downloads:number,
    day:string
}
