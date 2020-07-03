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
    headers.append('accessToken',this.getAccessToken())         
    params.set('id','bf835132050636800')  
    params.set('collectionWay','record')
    params.set('actionType','1')
    params.set('sceneCode','zljh')      
    return this.http.get('/ermsapi/record/get_record_details',{ headers:headers,search: params })
                    .toPromise()
                    .then(res =>{
                        let body = res.json();
                        return body
                    })
                    .catch(error =>
                      1
                      // alert (error)
                    );
  }

  getRecordJson() : Promise<any> {
    let params = new URLSearchParams();
    let headers = new Headers()  
    return this.http.get('/assets/record.json',{ headers:headers,search: params })
                    .toPromise()
                    .then(res =>{
                        let body = res.json();
                        return body
                    })
                    .catch(error =>
                      1
                      // alert (error)
                    );
  }

  getAccessToken = ()=>{
    return '8d04351c452281d8364cf451fd713ac3'
  }

  getClassLIst = (parentId: string): Promise<any> => {
    let params = new URLSearchParams();
    let headers = new Headers()
    headers.append('accessToken',this.getAccessToken())         
    params.set('parentId',parentId)              
    return this.http.get('./transferapi/metadata/get_category_list',{ headers:headers,search: params })
                    .toPromise()
                    .then(res =>{
                        let body = res.json();
                        return body
                    })
                    .catch(error =>
                      1
                      // alert (error)
                    );
  }
    //获取电子文件类型
    getRecordemial = (metadataSchemeId) : Promise<any> =>{
      let params = new URLSearchParams();
      let headers = new Headers()
      headers.append('accessToken',this.getAccessToken())         
      params.set('metadataSchemeId',metadataSchemeId)  
      // return this.http.get('/assets/policy.json',{ headers:headers,search: params })
      return this.http.get('./ermsapi/metadata/get_record_policy_details',{ headers:headers,search: params })
                      .toPromise()
                      .then(res =>{                         
                          let body = res.json();                                                    
                          return body 
                      })
                      .catch(error =>
                        []
                        // alert (error)
                      );
    }
    //修改record
    uodataRecordemial(id:string,actionType,jsonMetadata,categoryCode?,licensed?:any) : Promise<any> {
      let params = new URLSearchParams();
      let headers = new Headers()
      headers.append('accessToken',this.getAccessToken())         
      params.set('id',id)
      params.set('actionType','1')
      params.set('licensed',licensed)
      params.set('categoryCode',categoryCode)
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

    getMulModifeProPertyValuesFormatted = (objectName: string): Promise<any> => {
      let params = new URLSearchParams();
      let headers = new Headers()
      params.set('objectName', objectName)
      headers.append('accessToken', this.getAccessToken())
      return this.http.get('/ermsapi/metadata/get_standard_code_by_name', { search: params, headers: headers })
        .toPromise()
        .then(res => {
          let data = res.json();
          return data.map(c => {
            return {
              displayName: c.name,
              value: c.value
            }
          })
        })
        .catch(error =>
          []
        );
    }


    createRecord(create_info): Promise<any> {
      let params = new URLSearchParams();
      let headers = new Headers()
      headers.set('accessToken', this.getAccessToken())
      params.set('id','bf834864754982912')
      params.set('actionType','1')
      params.set('sceneCode','zljh') 
      return this.http.put('/ermsapi/record/update_record',
        create_info
        , { search: params, headers: headers })
        .toPromise()
        .then(res =>
          {
            let body = res.json();
            return body
          }
        )
        .catch(error =>
          1
        );
    }
}
export enum ActionType{
  record = "1",
  volume = "0"
}