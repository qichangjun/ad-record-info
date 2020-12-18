import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormChooseCategoryDialog } from './form-choose-category/form-choose-category.dialog';
import { FormSelectUserDialog } from './form-select-user/form-select-user.dialog';
import { ComponentType } from '../recordTile.class';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'form-other-component',
  templateUrl: './form-other-component.component.html',
  styleUrls: ['./form-other-component.component.scss'],
})
export class FormOtherCompComponent implements OnInit {
  @Input() componentType : ComponentType;
  @Input() valueAttrName : any;  
  @Input() keyAttrName : any;  
  @Input() entity : any
  @Input() disableEdit : boolean;
  @Input() _SelectUserServiceGetList : () => Observable<any>
  @Input() _DepartmentManageServiceGetList : ()=> Promise<any>;
  @Input() _chooseUsersAccessServiceGetRoleList : ()=> Promise<any>;
  @Input() _chooseUsersAccessServiceGetUserByDept : (groupName:string) => Promise<any>;
  @Input() _chooseUsersAccessServiceGetUserByRole : (groupName:string) => Promise<any>;  
  @Input() _dwClassManageServiceGetMetadataCategoryInfo : (metadataSchemeId:string) => Promise<any>;  
  @Input() _dwClassManageServiceGetMetaSysClassList : (id:string) => Promise<any>;  
  @Output() closeSideNav : EventEmitter<any> = new EventEmitter();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {      
  }

  chooseCategory(){
    if (!this._dwClassManageServiceGetMetadataCategoryInfo || !this._dwClassManageServiceGetMetaSysClassList) return 
    let dialogRef = this.dialog.open(FormChooseCategoryDialog, {
      width: '',
      disableClose: true,
      data: {
        _dwClassManageServiceGetMetaSysClassList : this._dwClassManageServiceGetMetaSysClassList,
        _dwClassManageServiceGetMetadataCategoryInfo : this._dwClassManageServiceGetMetadataCategoryInfo,
        attrValue: this.entity[this.valueAttrName]
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {        
        this.entity[this.valueAttrName] = res.id
        this.entity[this.keyAttrName] = res.name
      }
    });
  }

  selectUser(){
    if (!this._DepartmentManageServiceGetList || !this._chooseUsersAccessServiceGetRoleList || !this._chooseUsersAccessServiceGetUserByDept || !this._chooseUsersAccessServiceGetUserByRole) return 
    let saveUser = []
    let user_idLists = this.entity[this.valueAttrName] ? this.entity[this.valueAttrName].split(',') : []
    let user_nameLists = this.entity[this.keyAttrName] ? this.entity[this.keyAttrName].split(',') : []
    user_idLists.forEach((user,index) => {
      saveUser.push({
        id : user,
        displayName : user_nameLists[index]
      })
    });  
    let dialogRef = this.dialog.open(FormSelectUserDialog, {
      width: '',
      disableClose: true,
      data: {
        _DepartmentManageServiceGetList : this._DepartmentManageServiceGetList,
        _chooseUsersAccessServiceGetRoleList : this._chooseUsersAccessServiceGetRoleList,
        _chooseUsersAccessServiceGetUserByDept : this._chooseUsersAccessServiceGetUserByDept,
        _chooseUsersAccessServiceGetUserByRole : this._chooseUsersAccessServiceGetUserByRole,
        saveUser: saveUser
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.entity[this.valueAttrName] = res.map(c=>c.id).join(',')
        this.entity[this.keyAttrName] = res.map(c=>c.displayName).join(',')
      }
    });
  }
}

