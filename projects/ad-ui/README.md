
# AD-UI [![npm version](https://badge.fury.io/js/ng2-file-upload.svg)](http://badge.fury.io/js/ng2-file-upload) [![npm downloads](https://img.shields.io/npm/dm/ng2-file-upload.svg)](https://npmjs.org/ng2-file-upload)

Easy to use Angular2 directives for files upload ([demo](http://valor-software.github.io/ng2-file-upload/))

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)


## Quick start

1. A recommended way to install ***ad-ui*** is through [npm](https://www.npmjs.com/search?q=ad-ui) package manager using the following command:

  `npm i ng-ad-ui --save`

  Alternatively, you can [download it in a ZIP file](https://github.com/qichangjun/ad-ui/archive/master.zip).


2. More information regarding using of ***ad-ui*** is located in
  [demo](http://valor-software.github.io/ng2-file-upload/) and [demo sources](https://github.com/valor-software/ng2-file-upload/tree/master/demo).
  

## Using ***ad-ui*** in a project

1. Install as shown in the above section.

2. Import `AdUiModule` into the module that declares the component using ***ad-ui***:

    ```import { AdUiModule } from 'ad-ui';```

   you can also import the component you need from the specify module ***like this***:

    ``` import { AdUiTreeComponent } from 'ad-ui'; ```


3. Add it to `[imports]` under `@NgModule`:

    ```imports: [ ... AdUiModule, ... ]```


## API for `AdUiTreeComponent`

### Properties

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
