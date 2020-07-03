import { Component, OnInit } from '@angular/core';
import { AdTreeOption, clickNodeEvent } from '../../../projects/ad-ui/src/lib/ad-tree/ad-tree.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ad-ui-tree',
  templateUrl: './ad-ui-tree.component.html',
  styleUrls: ['./ad-ui-tree.component.scss']
})
export class AdUiTreeComponent implements OnInit {
  parameter : {ids:string}={ids:'0'}
  ids : string[] = ['0']
  option : AdTreeOption = {
    url:'http://amberdata.cn/teamworkapi1.1/basicinfogroup/get_tree_node_list',
    additionParams : {
      schemeId: 1002002
    },
    additionRootData:[{
      id : '0',name : '分类管理',childCount:1
    }],
    data : [],
    headers:{
      accessToken: 'd76fa28aff87116fd3be5ccd4ca247c1'
    }
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.ids){
        this.ids = params.ids.split('*')
        this.parameter.ids = params.ids 
      }      
    })
  }

  clickTree(clickNodeParams:clickNodeEvent){
    this.ids = clickNodeParams.ids
    this.parameter.ids = this.ids.join('*')
    this.router.navigate([],{queryParams:this.parameter})
  }
}
