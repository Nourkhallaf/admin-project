import { AfterViewInit, Component, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';
import { GenericConfirmationPopUpComponent } from '../generic-confirmation-pop-up/generic-confirmation-pop-up.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgConfirmService } from 'ng-confirm-box';
import { take } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  
  books: Book[];
  dataSource: MatTableDataSource<Book>;


  

  @ViewChild('paginator', {static: false}) paginator: MatPaginator;

    filterForm: FormGroup;
    length: number;
    pageSize: number;
    currentPage: number;








  constructor(
    private router: Router, 
    private bookService: BookService, 
    private confirmService: NgConfirmService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
   ){

      this.books = [];
     this.dataSource = new MatTableDataSource<Book>(this.books); // check if what to delete 
    }


  ngOnInit(): void {

    // this.createSearchForm();
    this.pageInitialize()

  }


  // createSearchForm() {
  //   this.filterForm = this.formBuilder.group({
  //     title: this.formBuilder.control(''),
  //     author: this.formBuilder.control(''),
  //   });
  // }


  // pageInitialize() {
  //   const title = this.filterForm.value.title;
  //   const author = this.filterForm.value.author;
  
  //   // Filter the books based on the search criteria
  //   const filteredBooks = this.bookService.getBooks().filter(book => {
  //     const isTitleMatch = book.title.toLowerCase().includes(title.toLowerCase());
  //     const isCategoryMatch = book.author.toLowerCase().includes(author.toLowerCase());
  //     return isTitleMatch && isCategoryMatch;
  //   });
  
  //   // Update the book list and paginator
  //   this.books = filteredBooks;
  //   this.dataSource.data = filteredBooks;
  //   this.paginator.pageIndex = 0;
  //   this.paginator.length = filteredBooks.length;
  
  //   setTimeout(() => {
  //     this.dataSource.paginator = this.paginator;
  //   }, 0);
  // }
  pageInitialize(){
    this.books = this.bookService.getBooks();
     this.dataSource.data = this.books;

    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.paginator.length = this.dataSource.data.length;
    }, 0);
  }

  // searchBooks() {
  //   const title = this.filterForm.value.title;
  //   const author = this.filterForm.value.author;
    
  //   // Filter the books based on the search criteria
  //   const filteredBooks = this.bookService.getBooks().filter(book => {
  //     const isTitleMatch = book.title.toLowerCase().includes(title.toLowerCase());
  //     const isAuthorMatch = book.author.toLowerCase().includes(author.toLowerCase());
  //     return isTitleMatch || isAuthorMatch;
  //   });
  
  //   // Update the book list and paginator
  //   this.books = filteredBooks;
  //   this.dataSource.data = filteredBooks;
  //   this.paginator.pageIndex = 0;
  //   this.paginator.length = filteredBooks.length;
  // }

  public ViewBook(book){
    this.router.navigate(['/book-details', book.id]);
  }

  public addBook(){
    this.router.navigateByUrl(`books/create`);

  }

  editBook(book: Book) {
    this.router.navigateByUrl(`books/update/${book.id}`);    
  }


  openDeleteConfirmationDialog(book: Book): void {

        const dialogRef = this.dialog.open(GenericConfirmationPopUpComponent, {
        width: '200px',
        height: '250px',
        data: {
        // tslint:disable-next-line: max-line-length
        description: `<h5>Are you sure you want to remove the book ${book.title} </h5>`,
        title: 'Removing Book',
        action: () => {
        
          const updatedBooks = this.books.filter(b => b.id !== book.id);
          this.bookService.saveBooks(updatedBooks);
          this.books = updatedBooks;
        
          }
         }
        });

       dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
        
          this.books = result;
          dialogRef.close()
        });
    
  }
  deleteBook(book) {

    const updatedBooks = this.books.filter(b => b.id !== book.id);
    this.bookService.saveBooks(updatedBooks);
    this.books = updatedBooks;

}

  public change(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
   const part = this.books.slice(start, end);
   this.books = part;
  }

  get tittle() {
    return this.filterForm.get('title');
  }

  get author() {
    return this.filterForm.get('author');
  }
}
