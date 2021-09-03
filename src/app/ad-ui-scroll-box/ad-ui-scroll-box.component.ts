import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-ui-scroll-box',
  templateUrl: './ad-ui-scroll-box.component.html',
  styleUrls: ['./ad-ui-scroll-box.component.scss']
})
export class AdUiScrollBoxComponent implements OnInit {
  lists : any[] = [
    {name:'a'},
    {name:'a'},
    {name:'a'},
    {name:'a'},
    {name:'a'},{name:'a'},{name:'a'},{name:'a'},{name:'a'},{name:'a'},{name:'a'},{name:'a'}
  ]
  constructor() { }

  ngOnInit() {
  }

  previewFile(file){
    console.log(file)
  }
}
