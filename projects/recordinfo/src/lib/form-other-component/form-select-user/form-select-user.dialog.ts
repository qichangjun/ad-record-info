import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog,MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
@Component({
    selector: 'form-select-user-dialog',
    templateUrl: './form-select-user.dialog.html',
    styleUrls: ['./form-select-user.dialog.scss'],
})
export class FormSelectUserDialog implements OnInit{
    addUser: any = {
        userList : [],
        orgList : [],
        roleList : [],
        saveList : []
    };
    hideOrg : boolean = true;
    hideRole : boolean = true;
    loading : boolean = false 

    constructor(
        public dialogRef: MatDialogRef<FormSelectUserDialog>,
        public dialog: MatDialog,        

        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {             
        this.addUser.saveList = this.data.saveUser
        this.getDeptList()
        
    }

    async getDeptList(){
        this.addUser.orgList = await this.data._DepartmentManageServiceGetList()
        this.getRoleList()   
    }

    async getRoleList(){        
        this.addUser.roleList = await this.data._chooseUsersAccessServiceGetRoleList()
        this.addUser.userList = this.addUser.saveList
        this.addUser.userList.forEach(c => {
            c.c_isChecked = true 
            c.displayName = c.displayName
            c.id = c.id
        });
    }

    async getUser(organizeList){
        if (organizeList.userList){
            return 
        }
        let res = await this.data._chooseUsersAccessServiceGetUserByDept(organizeList.groupName)
        res.forEach(c => {
            this.addUser.saveList.find(row=>{
                if (row.id == c.id){                                        
                    c.c_isChecked = true 
                }
            })   
            this.addUser.userList.find(row=>{
                if(row.id == c.id){
                    c.c_isChecked = true 
                }
            })   
        });     
        organizeList.userList = res
    }

    async getUserByRole(role){
        if (role.userList){
            return 
        }
        let res = await this.data._chooseUsersAccessServiceGetUserByRole(role.groupName)
        res.forEach(c => {
            this.addUser.saveList.find(row=>{
                if (row.id == c.id){                    
                    c.c_isChecked = true 
                }
            })   
            this.addUser.userList.find(row=>{
                if(row.id == c.id){
                    c.c_isChecked = true 
                }
            })      
        });
        role.userList = res
    }

    addUserList(userList){
        let res = this.addUser.userList.find(c=>c.id == userList.id)
        if (!res){
            this.addUser.userList.push(userList)
        }else if(res && !userList.c_isChecked){
            _.remove(this.addUser.userList,(c=>{
                return c['id'] == userList.id
            }))
        }
    }

    saveUser(){        
        this.dialogRef.close(this.addUser.saveList.filter(c=>c.c_isChecked))
    }
}
