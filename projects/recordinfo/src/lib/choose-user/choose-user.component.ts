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
  optionList: string[] = [];  
  isLoading = false;

  onSearch(value: any): void {   
    this.isLoading = true;
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
    const optionList$: Observable<any[]> = this.searchChange$
        .asObservable()
        .pipe(debounceTime(500))
        .pipe(switchMap(getRandomNameList))            
    optionList$.subscribe(data => {                     
        this.optionList = data;
        this.isLoading = false;
    });          
  }

  ngOnChanges(){   
    this.searchChange$.next(this.selectedUser || ''); 
  }
}
