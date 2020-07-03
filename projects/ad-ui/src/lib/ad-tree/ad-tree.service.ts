import {Injectable} from "@angular/core";
import { Http, Headers, Response,URLSearchParams } from '@angular/http';
import { HttpClient,HttpParams,HttpHeaders } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
  })
export class AdTreeService {
    constructor(
        private _http : HttpClient,
        // private jsonp:Jsonp,
        private http : Http
    ){}
    getTreeDataPaths(
        url : string,
        headersParams:{[key: string]: any;},
        additionParams :{[key: string]: any;},
        ids : string[]
    ) : Promise<any> {
        let other_param : any = Object.assign({},additionParams)
        other_param.parentId = ids.join('*')
        let params = new HttpParams({fromObject:other_param})
        let headers = new HttpHeaders(headersParams)        
        return this._http.get(url,{ params: params,headers:headers })
                        .toPromise()
                        .then(res =>
                            res
                        //   this._responseHandleService.extractData(res)
                        )
                        .catch(error =>
                            error
                        //   this._responseHandleService.handleError(error)
                        );
    }

    getTreeChildren(
        url : string,
        headersParams:{[key: string]: any;},
        additionParams :{[key: string]: any;},
        parentId : string
    ) : Promise<any> {
        let other_param : any = Object.assign({},additionParams)
        other_param.parentId = parentId
        let params = new HttpParams({fromObject:other_param})
        let headers = new HttpHeaders(headersParams)        
        return this._http.get(url,{ params: params,headers:headers })
                        .toPromise()
                        .then(res =>
                            res
                        //   this._responseHandleService.extractData(res)
                        )
                        .catch(error =>
                            error
                        //   this._responseHandleService.handleError(error)
                        );
    }
}