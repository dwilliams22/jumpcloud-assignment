import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent implements OnInit {

  user: User = { email: '', username: ''};

  users: User[] = [];

  totalCount: number = 0;

  userDialog: boolean = false;

  selectedUsers: User[] = [];

  //@ts-ignore
  @ViewChild('dialog', { static: true }) dialog: DialogComponent;

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.usersService.getUsers()
    .subscribe(
      ({ results: users, totalCount }) => {
        this.users = users;
        this.totalCount = totalCount;
      },
      (error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to retrieve users!', life: 3000});
      }
    );
  }

  editUser(user: User) {
    this.user = { ...user };
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity:'info', summary: 'Info', detail: 'Deleting multiple users coming soon...', life: 3000});
      }
    });
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${user.firstname + ' ' + user.lastname}?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(user.id!)
        .subscribe(
          (removedUser: User) => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'User Deleted', life: 3000});
            this.getUsers()
          },
          (error) => {
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Unable to delete user!', life: 3000});
          }
        )
      }
    });
  }

  openNewUserDialog() {
    this.user = { email: '', username: '' };
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
  }

  refreshData() {
    this.getUsers()
  }

}
