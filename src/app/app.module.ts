import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UsersService } from "./services/users.service";
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { AppComponent } from './app.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { UsersTableComponent } from "./components/users-table/users-table.component";
import { DialogComponent } from "./components/dialog/dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    UsersTableComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    DialogModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputTextModule,
    ToolbarModule,
    CheckboxModule,
    InputTextareaModule,
    ConfirmDialogModule,
  ],
  providers: [
    UsersService,
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
