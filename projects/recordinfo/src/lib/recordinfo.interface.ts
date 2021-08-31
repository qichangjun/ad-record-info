export interface InValidateValue {
    title : string,
    errorMessage : string
}

export interface ProcessNode {
    property : NodeProperty[];
    class? : ProcessNodeClass;
    name : string;
    operate_date : string;
    operator : string;
}

export interface NodeProperty {
    content : string;
    title : string;
}


export enum ProcessNodeClass {
    Whole_LAST_RIGHT = 'whole_last_right',
    Whole_LAST_LEFT = 'whole_last_left',
    JI_FIRST = '_first',
    OU_FIRST = 'first',
    JI_LAST = '_last',
    OU_LAST = 'last',
    JI_MIDDLE = '_middle',
    OU_MIDDLE = 'middle'
}