# API for `AdScrollBoxComponent`

1. you can also import the component you need from the specify module ***like this***:

    ``` import { AdScrollBoxModule } from 'ad-ui'; ```

2. Properties

- `option` 

    ***@Input()*** datas : any[];                                                ```数据集合```

    ***@Input()*** scrollBoxTemplateDiy? : TemplateRef<{ $implicit: any}>;      ```自定义模版```

    ***@Output()*** clickBoxEvent : EventEmitter<any>;                          ```点击节点事件```


3. DEMO 
    

        <div style="width:500px;height: 500px;">
            <ad-scroll-box [datas]="lists" [scrollBoxTemplateDiy]="scrollBoxTemplate" (clickBoxEvent)="previewFile($event)">
                <ng-template #scrollBoxTemplate let-node>
                    <img class="file--type--icon"
                    src="" alt="" />
                    <a class="file--name" title="{{node.name}}">{{node.name}}</a>
                </ng-template>
            </ad-scroll-box>
        </div>
