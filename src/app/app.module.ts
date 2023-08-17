import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './pages/books/books.component';
import { HeaderComponent } from './skeleton/header/header.component';
import { SidebarComponent } from './skeleton/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateOrUpdateBooksComponent } from './pages/books/create-or-update-books/create-or-update-books.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { ViewBookComponent } from './pages/books/view-book/view-book.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {  MatButtonModule } from '@angular/material/button'; 
import { MatMenuModule } from '@angular/material/menu'; 
import {MatDialogModule} from '@angular/material/dialog';
import { ContentAreaComponent } from './skeleton/content-area/content-area.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {NgConfirmModule} from 'ng-confirm-box'; 





@NgModule({
  declarations: [
    AppComponent,
    ContentAreaComponent,
    LoginComponent,
    BooksComponent,
    HeaderComponent,
    SidebarComponent,
    CreateOrUpdateBooksComponent,
    ViewBookComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    NgConfirmModule 
    
  
  ],

  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
