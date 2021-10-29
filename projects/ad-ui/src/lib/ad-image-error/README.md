# API for `AdImageError`

1. you can also import the component you need from the specify module ***like this***:

    ``` import { AdImageModule } from 'ad-ui'; ```

    ```  providers:[{provide:'assetsUrl',useValue:environment.assetsUrl}], ```

2. Properties

- `option` 

    ***@Input()*** imgError : string;                                             ```自定义错误图片路径```


3. DEMO 
    
        <img src="" alt="" imgError [imgError]="'/unknown.png'">

    
        
