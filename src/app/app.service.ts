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
    headers.append('accessToken','0a3f1234e2dc18d0f8fa30702accd5de')         
    params.set('id','bf834175564775424')  
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
    headers.append('accessToken','0a3f1234e2dc18d0f8fa30702accd5de')         
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
      headers.append('accessToken','0a3f1234e2dc18d0f8fa30702accd5de')         
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
    //修改record
    uodataRecordemial(id:string,actionType,jsonMetadata,categoryCode?,licensed?:any) : Promise<any> {
      let params = new URLSearchParams();
      let headers = new Headers()
      headers.append('accessToken','0a3f1234e2dc18d0f8fa30702accd5de')         
      params.set('id',id)
      params.set('actionType','1')
      params.set('licensed',licensed)
      params.set('categoryCode',categoryCode) 
      // params.set("actionType", '')
      // params.set('parentId','bf834002767314944')
      // params.set('collectionWay', 'record')
      // params.set('aclName', '')
      // params.set('metadataSchemeId', 'f045c1fa-1d2e-4b15-b6b0-02291d0b0d65')
      // params.set('licensed','')
      // params.set('categoryId', '')
      // params.set('year', '2022')
      // params.set('categoryCode','')
      // params.set('versionNo','')
      // return this.http.put('./ermsapi/record/create_record',jsonMetadata,{ headers:headers,search: params })
      return this.http.put('./ermsapi/record/update_record',jsonMetadata,{ headers:headers,search: params })
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
export enum ActionType{
  record = "1",
  volume = "0"
}