import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import { BehaviorSubject, Observable , of} from 'rxjs';
import { debounceTime, map, switchMap,catchError, } from 'rxjs/operators';

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
    params.set('id','bf836439582965760')  
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
    return '386bfd1227ef470ff88f123e3d9e5546'
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

    getUserList=(info): Observable<any>=> {
      let params = new URLSearchParams();
      params.set('keyword', info.keywords)
      let headers = new Headers()
      headers.append('accessToken', this.getAccessToken())
      return this.http.post(
          '/ermsapi/user/get_matched_user_list',{
              columns : [],
              pagingSort : {
                  currentPage : info.currentPage,
                  pageSize : info.pageSize
              }
          }
          , { headers: headers, params: params })
          .pipe(map((res: any) => res.json()),
          catchError(this.handleObservablError('获取失败', []))
          )  
          .pipe(map((res: any) => {
              let data = res.data.map(c=>{
                return {
                  displayName : c.displayName,
                  value : c.loginName
                }
              })
              return {
                  data : data,
                  pageInfo : res.pageInfo
              }
          }))         
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

    public handleObservablError<T>(operation = 'operation', result?: T) {    
      return (error: any): Observable<T> => {      
        let errorData = error.json()
        
        
        return of(result as T)
      };
    }
}
export enum ActionType{
  record = "1",
  volume = "0"
}