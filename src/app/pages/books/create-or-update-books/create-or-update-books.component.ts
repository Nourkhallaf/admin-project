import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/books.model';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-create-or-update-books',
  templateUrl: './create-or-update-books.component.html',
  styleUrls: ['./create-or-update-books.component.scss']
})
export class CreateOrUpdateBooksComponent implements OnInit {
  bookForm: FormGroup;

  private readonly STORAGE_KEY = 'books';
  book: Book

  categories: string[] = ['Category 1', 'Category 2', 'Category 3']; // Replace with your actual categories
  imagePreview: string | ArrayBuffer | null;
  isEditMode: boolean = false;
  bookId: number | null = null;
  selectedImage: string = null;

  selectedFile: File = null;
  isFileUploaded: boolean = false;

  @ViewChild('fileInput') el: ElementRef;


  imageUrl: any = "https://i.ibb.co/fDWsn3G/buck.jpg";
  editFile: boolean = true;
  removeUpload: boolean = false;


  constructor(private formBuilder: FormBuilder,
               private router: Router,
               private route: ActivatedRoute,

               private bookService: BookService
               ){}

  ngOnInit(): void {
    this.createBookForm()

    const bookId = this.route.snapshot.params.id;
    if(bookId){
       this.book = this.bookService.getBookById(bookId);
       
       this.createBookForm()

      
      
    }
  }


  


    createBookForm() {
      this.bookForm=  this.formBuilder.group({
        id: [this.bookService.generateBookId()],
        title: [this.book?.title, Validators.required],
        author: [this.book?.author, Validators.required],
        category: [this.book?.category, Validators.required],
        // price: ['',[ Validators.required, Validators.min(0), Validators.max(2)]],
       
        price: [this.book?.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        edition:[this.book?.edition],
        pdf: [this.book?.pdfFile, Validators.required],
        coverPhoto: [this.book?.coverPhoto, Validators.required],
        version: [this.book?.version, Validators.required],
        olderVersion: [this.book?.olderVersion],
        isbn: [this.book?.isbn,Validators.required ],

       /// isbn: ['', [Validators.required, Validators.pattern(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/)]],
        // isbn: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{1,7}-\d{1,7}-\d{1,7}-\d{1,3}$/)]],

        describtion: [this.book?.describtion, [Validators.required, Validators.maxLength(800)]],
        releaseDate: [this.book?.releaseDate]
      });
    
    }

    



 


    onFileChange(event: Event, controlName: string) {
      const fileInput = event.target as HTMLInputElement;
      const fileList: FileList | null = fileInput.files;
  
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        this.bookForm.get("pdf")?.setValue(file);
      }
    }

  onPhtotChange(event: Event, controlName: string) {
    const fileInput = event.target as HTMLInputElement;
    const fileList: FileList | null = fileInput.files;

    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.bookForm.get("coverPhoto")?.setValue(file);
      this.previewImage(file);
    }

    console.log("this.form", this.bookForm)
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      
    };
    reader.readAsDataURL(file);

    console.log("imagePreview",this.imagePreview)
  }


  onSubmit(){

      if (this.bookForm.invalid) {
        return;
      }
        const newBook: Book = this.bookForm.value;
        const books = this.bookService.getBooks();
        books.push(newBook);
        this.bookService.saveBooks(books);
      if (this.book) {
        // Update existing book
        if (this.book.id) {
          this.bookService.updateBook(this.book.id, newBook);
        } else {
          const books = this.bookService.getBooks();
          books.push(newBook);
          this.bookService.saveBooks(books);

        }
    }
  
    this.router.navigate(['/books']); 
  }

  onCancel() {
    this.router.navigate(['/books'])
  }


  get title() {
    return this.bookForm.get('title');
  }
  get author() {
    return this.bookForm.get('author');
  }
  get category() {
    return this.bookForm.get('category');
  }
  get price() {
    return this.bookForm.get('price');
  }
  get version() {
    return this.bookForm.get('version');
  }
  get olderVersion() {
    return this.bookForm.get('olderVersion');
  }
  get isbn() {
    return this.bookForm.get('isbn');
  }
  get describtion() {
    return this.bookForm.get('describtion');
  }
  get pdf() {
    return this.bookForm.get('pdf');
  }

  get coverPhoto() {
    return this.bookForm.get('coverPhoto');
  }
  get edition() {
    return this.bookForm.get('edition');
  }

  get releaseDate() {
    return this.bookForm.get('releaseDate');
  }

  

}




