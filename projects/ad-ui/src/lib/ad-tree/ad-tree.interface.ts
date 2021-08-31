
import { NzTreeNodeOptions,NzTreeNode } from 'ng-zorro-antd';

export interface AdTreeOption{
    /**
     * 后台接口的url地址
     */
    url : string;       
    /**
     * http请求的header的map
     */
    headers? : {            
        [key: string]: any;
    }
    /**
     * 自定义参数的map
     */
    additionParams? : {
        [key: string]: any;
    }
    /**
     * 格式化加载子节点的方法，可以是返回一个promise对象
     */
    ajaxFilterFn? : (data:any[],node?)=>any  
    /**
     * 加载子节点前的方法
     */
    beforeGetChildrenFn? : (node:NzTreeNode)=>void    
    /**
     * 自定义根节点数据
     */
    additionRootData? : any[]                          
    /**
     * 自定义根节点的id，一般都设置为0
     */
    rootId? : string | number                          
    /**
     * 初次加载数据时的格式化方法
     * @param data:获取到的后台的数据集合
     * @return NzTreeNodeOptions集合
     */
    formatDataFn? : (data:any)=>NzTreeNodeOptions[]   
    /**
     * 映射的treecomonent里的方法            
     */
    api? : any     
    /**
     * 树节点的数据
     */                                   
    data? : any[]                                      
    /**
     * 是否显示checkbox
     */
    enableCheck? : boolean                            
    /**
     * 自定义自动参数，默认是['parentId=id']即将父节点的id作为参数parentId传到后台
     * 添加多个参数就 ['parentId=id','objectType=type'] 以此类推
     * '=' 号后边的字段就是tree的节点里的字段
     */
    autoParameter? : string[]                           
}

export interface clickNodeEvent{
    node : NzTreeNode,
    ids : string[]
}