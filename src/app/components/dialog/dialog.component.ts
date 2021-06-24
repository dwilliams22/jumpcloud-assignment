import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { User } from "src/app/interfaces/user.interface";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Input() user: User = { username: '', email: '' }

  @Input() userDialog: boolean = false

  @Output() close = new EventEmitter();

  @Output() save = new EventEmitter();

  constructor(
    private usersService: UsersService,
    private messageService: MessageService
  ) { }

  isValidEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  saveUser() {
    if (this.user.created) {
      this.usersService.updateUser(this.user)
        .subscribe(
          (updatedUser: User) => {
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000});
            this.hideDialog()
            this.save.emit()
          },
          (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: `${error.error}`, life: 3000});
          }
        )
    } else {
      this.usersService.createUser(this.user)
        .subscribe(
          (createdUser: User) => {
            this.messageService.add({severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000});
            this.hideDialog()
            this.save.emit()
          },
          (error) => {
            this.messageService.add({severity: 'error', summary: 'Error', detail: 'Unable to create user!', life: 3000});
          }
        )
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.close.emit(this.userDialog)
  }

}
