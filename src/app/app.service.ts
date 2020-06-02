import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private http : Http,
  ) { }


  getRecordInfo() : Promise<any> {
    let params = new URLSearchParams();
    let headers = new Headers()
    headers.append('accessToken','26d226377c5f1085dd5f83e6dee1c1ce')         
    params.set('id','bf833644905103360')  
    params.set('collectionWay','record')
    params.set('actionType','1')
    params.set('sceneCode','erms_zljh')      
    return this.http.get('./ermsapi/record/get_record_details',{ headers:headers,search: params })
                    .toPromise()
                    .then(res =>{
                        let body = res.json();
                        return body
                    })
                    .catch(error =>
                      alert (error)
                    );
  }

  getClassLIst = (parentId: string): Promise<any> => {
    let params = new URLSearchParams();
    let headers = new Headers()
    headers.append('accessToken','26d226377c5f1085dd5f83e6dee1c1ce')         
    params.set('parentId',parentId)              
    return this.http.get('./transferapi/metadata/get_category_list',{ headers:headers,search: params })
                    .toPromise()
                    .then(res =>{
                        let body = res.json();
                        return body
                    })
                    .catch(error =>
                      alert (error)
                    );
  }
    //获取电子文件类型
    getRecordemial() : Promise<any> {
      let params = new URLSearchParams();
      let headers = new Headers()
      headers.append('accessToken','26d226377c5f1085dd5f83e6dee1c1ce')         
      params.set('metadataSchemeId','f045c1fa-1d2e-4b15-b6b0-02291d0b0d65')  
      return this.http.get('./ermsapi/metadata/get_record_policy_details',{ headers:headers,search: params })
                      .toPromise()
                      .then(res =>{
                          let body = res.json();
                          return body
                      })
                      .catch(error =>
                        alert (error)
                      );
    }
}
