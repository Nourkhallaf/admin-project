import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { BooksComponent } from './pages/books/books.component';
import { CreateOrUpdateBooksComponent } from './pages/books/create-or-update-books/create-or-update-books.component';
import { AuthGuard } from './services/auth.guard';
import { NoAuthGuard } from './services/noauth.guard';
import { ViewBookComponent } from './pages/books/view-book/view-book.component';

const routes: Routes = [

  { 
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  { 
    path: 'books',
    component: BooksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'books/create',
    component: CreateOrUpdateBooksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'books/update/:id',
    component: CreateOrUpdateBooksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'book-details/:id',
    component: ViewBookComponent,
    canActivate: [AuthGuard],
  },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
