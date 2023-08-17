import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';
import { GenericConfirmationPopUpComponent } from '../../generic-confirmation-pop-up/generic-confirmation-pop-up.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit {
  
  bookId: number;
  selectedBook: Book

  book: Book = {
    id: undefined,
    title: '',
    author: '',
    category: '',
    price: 0,
    pdfFile: null,
    coverPhoto: null,
    version: '',
    olderVersion: '',
    edition: '',
    isbn: '',
    releaseDate: null,
    describtion: ''
  };

  constructor(private bookService: BookService, 
              private route: ActivatedRoute,
               private router: Router ,
               public dialog: MatDialog,

  //  private confirmService: NgConfirmService
    ) {}


  ngOnInit(): void {
      const id = this.route.snapshot.params['id'];
      this.book = this.bookService.getBookById(id);

      this.bookId=id
      this.selectedBook = JSON.parse(JSON.stringify(this.book))
  }


  EditBook(book){
    this.router.navigateByUrl(`books/update/${book.id}`);    
  }

  



}
