# Recordinfo
record根据xml数据，格式化成可修改的表单

## amberdata-recordinfo
    getMulModifeProPertyValues: (allowedValuesCode: string) => Promise<any> #获取下拉值选项的http请求方法 

    getDefaultValue: (defaultValue: DefaultValue) => string #获取默认值的方法，非http请求，一般在recordInfo.service中，但需要用到缓存里的信息，所以每个应用都不相同

    _DepartmentManageServiceGetList: () => Promise<any> #获取部门列表的http请求方法

    _chooseUsersAccessServiceGetRoleList: () => Promise<any> #获取角色列表的请求方法

    _chooseUsersAccessServiceGetUserByDept: (groupName: string) => Promise<any> #根据部门id获取用户列表

    _chooseUsersAccessServiceGetUserByRole: (groupName: string) => Promise<any> #根据角色名获取用户列表

    _dwClassManageServiceGetMetadataCategoryInfo: (metadataSchemeId: string) => Promise<any> #根据元数据id获取类目信息

    environmentBaseUrl : string #点击文件预览时需要的应用根路由，一般就传enviroment文件里的baseUrl

    ApiUrl : enum #api接口枚举类，用于上传组件
 
    baseUrl #上传接口用到的，后台根地址

    AuthenticationService #用户信息的服务，一般在core文件夹中的同名service文件
    
    objectPath : record上的s_object_path,用于预览文件
    
## add-electronic-document

    @Input() id : string                    record的id,新建时可不传
    @Input() environmentBaseUrl : string    预览用基本地址
    @Input() objectPath : string            record中的objectPath
    @Input() baseUrl : string               后台接口地址
    @Input() ApiUrl : any                   api接口枚举
    @Input() AuthenticationService : any    用户服务
    @Input() metadataSchemeId : string      元数据id
    @Input() jsonMetadataTemplate : any     原数据的json
    @Input() getPolicyInfoPomise : (metadataId: string) => Promise<any>  根据原数据id获取文件策略集合的服务方法
