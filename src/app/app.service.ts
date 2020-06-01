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
    headers.append('accessToken','de49a255d0bed39e2b8d5c80e4fed6f4')         
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
    headers.append('accessToken','c16376b73c27a2cf6c0351244c56142e')         
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
      headers.append('accessToken','a8ada0079cf1dfb4bb65d506a16192fe')         
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
