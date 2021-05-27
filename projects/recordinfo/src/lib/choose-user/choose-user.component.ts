import { InValidateValue } from './../recordinfo.interface';
import { Tile } from './../recordTile.class';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';

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
  @Input() placeHolderWords? : string = ''
  @Input() disableEdit : boolean = false;     
  @Output() changeUser : EventEmitter<any> = new EventEmitter();
  @Input() getList : Function
  @Input() scene : string    
  @Input() tile : Tile
  @Input() validPass : InValidateValue[] = []       
  @Input() dontLoadInit : boolean 
  @Input() optionList: any[] = [];  
  @Input() otherParams: {[key:string]:any} = {}
  currentPage : number = 1
  searchChange$ = new BehaviorSubject('');
  isLoading = false;
  totalCount = 0  
  keywords : string = ''
  enableGetSearch : boolean = false 

  onSearch(value: any): void {       
    this.isLoading = true;
    this.enableGetSearch = true
    this.optionList = []
    this.currentPage = 1
    this.keywords = value 
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const getRandomNameList = (name: string) => {
      let parameter = {
        pageSize : 20,
        currentPage : this.currentPage,
        keywords : name
      }
      parameter = Object.assign(this.otherParams,parameter)
      if ( this.getList && (this.enableGetSearch || !this.selectedUser || !this.dontLoadInit)){
        return this.getList(parameter)
      }else{
        return new Promise((resolve)=>resolve(null))
      }   
    }            
    const optionList$: Observable<any> = this.searchChange$
        .asObservable()
        .pipe(debounceTime(500))        
        .pipe(switchMap(getRandomNameList))            
    optionList$.subscribe(res => {   
        if(!res){
          this.isLoading = false;
          return 
        }
        let datas = res.data.filter(c=>{          
          let row = this.optionList.find(option=>option.value == c.value)
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
