- # recordinfo ![npm version](https://badge.fury.io/js/recordinfo.svg) [![npm downloads](https://img.shields.io/npm/dm/recordinfo.svg)](https://npmjs.org/recordinfo)
  - [amberdata-recordinfo](#amberdata-recordinfo)
  - [add-electronic-document](#add-electronic-document)


## 快速上手

1. 安装 ***recordinfo*** 命令如下:
  `npm i ng-ad-ui --save`


2. 更多 ***recordinfo*** 使用信息请看下面介绍
  [demo](http://valor-software.github.io/ng2-file-upload/) and [demo sources](https://github.com/valor-software/ng2-file-upload/tree/master/demo).


## 在项目中使用 ***recordinfo*** 

1. 安装步骤如上描述.

2. Import `RecordinfoModule` into the module that declares the component using ***recordinfo***:

    ```import { RecordinfoModule } from 'recordinfo';```

3. Add it to `[imports]` under `@NgModule`:

## amberdata-recordinfo


### Properties

- `option` - (`amberdata-recordinfo`) - amberdata-recordinfo object. 

    id : string;                                        ```record或volume的id（用于跳转到预览页面）```

    objectPath : string                                 ```预览用到的（record的路径，拼接文件的id就是实际的预览id）```

    disableEdit? : boolean                              ```是否禁止显示修改按钮```

    serverFiles? : ***暂时没用了，待销毁***                

    showTemplateXml : string                            ```显示模版的xml```

    jsonMetadataTemplate? : {record:{[key:string]:any}} ```record数据xml转化成的json```

    info : {jsonData:jsonMetadataTemplate}              ```父组件的保存record修改后数据的对象，与recordinfo是双向绑定的 ```

    formType? : 'create' | 'edit'                       ```是编辑还是创建状态，如果是新建状态，则会做初始化赋默认值的操作```

    language? : 'zh-CN' | 'en-US'                       ```当前的语言环境```


    getMulModifeProPertyValues : (allowedValuesCode: string) => Promise<Array<{displayName:string,value:string}>>  ```获取下拉框内标准代码项的service方法```

    getDefaultValue: (defaultValue: DefaultValue) => string ```获取默认值的方法，非http请求，一般在recordInfo.service中，但需要用到缓存里的信息，所以每个应用都不相同```

    _SelectUserServiceGetList : () => Observable<any>   ```根据keywords筛选用户列表的方法```

    _DepartmentManageServiceGetList: () => Promise<any> ```获取部门列表的http请求方法(暂时没用了)```

    _chooseUsersAccessServiceGetRoleList: () => Promise<any> ```暂时没用了```

    _chooseUsersAccessServiceGetUserByDept: (groupName: string) => Promise<any> ```暂时没用了```

    _chooseUsersAccessServiceGetUserByRole: (groupName: string) => Promise<any> ```暂时没用了```

    _dwClassManageServiceGetMetadataCategoryInfo: (metadataSchemeId: string) => Promise<any> ```根据元数据id获取类目信息(用于选择门类时获取他的名字和id)```

    environmentBaseUrl : string ```点击文件预览时需要的应用根路由，一般就传enviroment文件里的baseUrl```

    ApiUrl? : enum ```api接口枚举类，用于上传组件(没用了，现在都是在add-elec组件里做上传)```
 
    baseUrl? ```上传接口用到的，后台根地址(没用了，现在都是在add-elec组件里做上传)```

    AuthenticationService? ```用户信息的服务，一般在core文件夹中的同名service文件(没用了)```
    
    scene? : string  ```当前所属的业务场景```
    
## add-electronic-document


### Properties

- `option` - (`add-electronic-document`) - add-electronic-document object. 

    ***@Input()*** currentFile? : string                                 ```当前选中的文件的url```
    ***@Input()*** needSelectFirstFileInit? : boolean                    ```是否需要初始化后直接自动预览第一个文件```
  ***@Input()*** acceptFiles? : string                                  ```允许上传的文件类型```
    ***@Input()*** id? : string                                         ```当前的recordId```
    ***@Input()*** previewInCurrentWindow : boolean                     ```是否不打开新窗口，而是路由跳转到预览页```
    ***@Input()*** environmentBaseUrl : string                          ```当前的应用路径(用于打开新的预览窗口)```
    ***@Input()*** objectPath : string                                  ```当前的record的path，用于和文件id拼接生成预览id```
    ***@Input()*** baseUrl : string                                     ```后台的根路径比如/erms,/tdr```

    ***@Input()*** ApiUrl : enum                                        ```接口枚举类，用于上传```

    ***@Input()*** serverFiles : any[]                                          ```服务器端文件集合，用于补录```

    ***@Input()*** AuthenticationService                                        ```用户相关操作的service```

    ***@Input()*** metadataSchemeId :string                                     ```元数据id```

    ***@Input()*** jsonMetadataTemplate : {record:{[key:string]:any}}           ```元数据数据xml转化的json```


    ***@Input()*** disableEdit : boolean                                        ```是否允许修改```

    ***@Input()*** scene : string                                               ```当前业务场景```

    ***@Input()*** customPreviewHandle : boolean                                ```是否自定义预览事件```

    ***@Input()*** getPolicyInfoPomise : (metadataId: string) => Promise<any>   ```获取文件策略集合的service方法```

    ***@Input()*** customPreviewHandle : boolean                                ```是否自定义预览事件```

    ***@outPut()*** removeDocumentIdsEvent : EventEmitter(url:string)           ```删除文件的事件，传递一个url```

    ***@outPut()*** uploadFinishEvent : EventEmitter(file)                      ```上传完成的回调```

    ***@outPut()*** previewDocHandle : EventEmitter(objectId:string)           ```自定义的预览事件点击回调```

    
