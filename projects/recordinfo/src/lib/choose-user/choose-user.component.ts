import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
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
export class RecordInfoSelectUsersComponent implements OnInit {
  @Input() selectedUser : string;
  randomUserUrl = 'https://api.randomuser.me/?results=5';
  searchChange$ = new BehaviorSubject('');
  optionList: string[] = [];  
  isLoading = false;

  onSearch(value: string): void {
    this.isLoading = true;
    this.searchChange$.next(value);
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // tslint:disable-next-line:no-any
    const getRandomNameList = (name: string) =>
      this.http
        .get(`${this.randomUserUrl}`)
        .pipe(map((res: any) => res.results))
        .pipe(
          map((list: any) => {
            return list.map((item: any) => `${item.name.first} ${name}`);
          })
        );
    const optionList$: Observable<string[]> = this.searchChange$
      .asObservable()
      .pipe(debounceTime(500))
      .pipe(switchMap(getRandomNameList));
    optionList$.subscribe(data => {
      this.optionList = data;
      this.isLoading = false;
    });
  }
}
