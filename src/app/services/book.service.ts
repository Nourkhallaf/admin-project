// book.service.ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly STORAGE_KEY = 'books';

  constructor(private formBuilder: FormBuilder) {}

  getBooks(): Book[] {
    const booksData = localStorage.getItem(this.STORAGE_KEY);
    return booksData ? JSON.parse(booksData) : [];
  }

  getBookById(id: number): Book | undefined {
    const books = this.getBooks();
    return books.find(book => book.id == id);
  }

  saveBooks(books: Book[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
  }

  updateBook(id: number, updatedBook: Book) {
    const books = this.getBooks();
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
      books[bookIndex] = { id, ...updatedBook };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(books));
    }
  }


  public  generateBookId(): number {
    const books = this.getBooks();
    const lastBook = books[books.length - 1];
    return lastBook ? lastBook.id + 1 : 1;
  }
}