
import { NzTreeNodeOptions,NzTreeNode } from 'ng-zorro-antd';

export interface AdTreeOption{
    url : string;                                      //后台接口地址
    headers? : {                                        //传给后台的header
        [key: string]: any;
    }
    additionParams? : {                                 //额外传给后台的参数
        [key: string]: any;
    }
    ajaxFilterFn? : (data:any[],node?)=>any   //异步加载子节点后格式数据的方法
    beforeGetChildrenFn? : (node:NzTreeNode)=>void      //获取子节点前的方法
    additionRootData? : any[]                           //额外添加跟节点数据
    rootId? : string | number                           //根节点id    
    formatDataFn? : (data:any)=>NzTreeNodeOptions[]     //初始化后台返回的数据的方法
    api? : any                                          //映射的treecomonent里的方法            
    data? : any[]                                       //树节点数据
    enableCheck? : boolean                              //是否显示checkbox
    autoParameter? : string[]                            //自定义自动传递的父节点参数及参数名
}

export interface clickNodeEvent{
    node : NzTreeNode,
    ids : string[]
}