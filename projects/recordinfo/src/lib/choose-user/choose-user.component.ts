import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'recordinfo-select-users',
  templateUrl: './choose-user.component.html',
  styles: [
    `
      :host{
        width:100%;
        display:block
      }
      .loading-icon {
        margin-right: 8px;
      }
    `
  ]
})
export class RecordInfoSelectUsersComponent implements OnInit,OnChanges {
  @Input() selectMode? : 'multiple' | 'defulat' = 'multiple'  
  @Input() selectedUser : string;  
  @Input() disableEdit : boolean = false;     
  @Output() changeUser : EventEmitter<any> = new EventEmitter();
  @Input() getList : Function  
  currentPage : number = 1
  searchChange$ = new BehaviorSubject('');
  optionList: any[] = [];  
  isLoading = false;
  totalCount = 0  
  keywords : string = ''
  onSearch(value: any): void {       
    this.isLoading = true;
    this.optionList = []
    this.currentPage = 1
    this.keywords = value 
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // tslint:disable-next-line:no-any
    const getRandomNameList = (name: string) => {
      let parameter = {
        pageSize : 20,
        currentPage : this.currentPage,
        keywords : name
      }
      if ( this.getList ){
        return this.getList(parameter)
      } else{
        return this.http
        .get(`https://api.randomuser.me/?results=5`)
        .pipe(map((res: any) => res.results))
        .pipe(
          map((list: any) => {
            return list.map((item: any) => {
              return {
                displayName : `${item.name.first} ${name}`,
                value : `${item.name.first} ${name}`
              }
            });
          })
        );
      }     
    }            
    const optionList$: Observable<any> = this.searchChange$
        .asObservable()
        .pipe(debounceTime(500))
        .pipe(switchMap(getRandomNameList))            
    optionList$.subscribe(res => {   
        let datas = res.data.filter(c=>{
          let row = this.optionList.find(option=>option.id == c.id)
          return row ? false : true 
        })
        this.optionList = this.optionList.concat(datas);
        this.totalCount = res.pageInfo.totalCount
        this.currentPage = res.pageInfo.currentPage
        this.isLoading = false;
    });          
  }

  scrollToBottom(){
    if (this.optionList.length < this.totalCount){
      this.isLoading = true;   
      this.currentPage ++   
      this.searchChange$.next(this.keywords);
    }
  }

  ngOnChanges(){   
    this.searchChange$.next(this.selectedUser || ''); 
  }
}
