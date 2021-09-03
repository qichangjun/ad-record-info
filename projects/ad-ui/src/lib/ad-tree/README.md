

# API for `AdUiTreeComponent`

1. you can also import the component you need from the specify module ***like this***:

    ``` import { AdTreeModule } from 'ad-ui'; ```

2. Properties

- `option` - (`AdTreeOption`) - AdTreeOption object. 

    url : string;                          ```后台接口地址```

    headers? : {[key: string]: any;}       ```传给后台的header```

    additionParams? : {[key: string]: any;} ```额外传给后台的参数```

    ajaxFilterFn? : (data:any[])=>NzTreeNodeOptions[]   ```异步加载子节点后格式数据的方法```

    additionRootData? : any[]                           ```额外添加跟节点数据```

    rootId? : string | number                           ```根节点id    ```

    formatDataFn? : (data:any)=>NzTreeNodeOptions[]     ```初始化后台返回的数据的方法```

    api? : any                                          ```映射的treecomonent里的方法 ```

    data? : any[]                                       ```树节点数据```

    enableCheck? : boolean                              ```是否显示checkbox```

3. DEMO
   
        <ad-tree [option]="option" [nzTreeTemplateDiy]="nzTreeTemplateDiy"
        [ids]="ids"
        (clickTree)="clickTree($event)"
        >
                <!-- <ng-template #nzTreeTemplateDiy let-node>
                <span class="custom-node">
                    <span *ngIf="!node.isLeaf" >
                    
                    <span class="folder-name">{{ node.title }} </span>
                    </span>
                    <span *ngIf="node.isLeaf">
                    
                    <span class="file-name">{{ node.title }}</span>
                    </span>
                </span>
                </ng-template> -->
        </ad-tree>