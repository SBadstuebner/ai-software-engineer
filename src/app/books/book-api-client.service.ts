import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Book } from './book';
import { EXAMPLE_BOOKS } from './example-books';

@Injectable({ providedIn: 'root' })
export class BookApiClient {
  private readonly apiUrl = 'http://localhost:4730/books';
  private readonly http = inject(HttpClient);
  private usingExampleBooks = false;

  getBooks(pageSize: number = 10, searchTerm?: string): Observable<Book[]> {
    if (this.usingExampleBooks) {
      return of(this.filterExampleBooks(pageSize, searchTerm));
    }

    let params = new HttpParams().set('_limit', pageSize.toString());

    if (searchTerm) {
      // Search in title and author fields
      params = params.set('q', searchTerm);
    }

    return this.http.get<Book[]>(this.apiUrl, { params }).pipe(
      map(books => {
        if (books.length > 0 || searchTerm) {
          return books;
        }

        this.usingExampleBooks = true;
        return this.filterExampleBooks(pageSize);
      }),
      catchError(() => {
        this.usingExampleBooks = true;
        return of(this.filterExampleBooks(pageSize, searchTerm));
      })
    );
  }

  getBook(isbn: string): Observable<Book> {
    const exampleBook = EXAMPLE_BOOKS.find(book => book.isbn === isbn);

    if (this.usingExampleBooks && exampleBook) {
      return of(exampleBook);
    }

    return this.http
      .get<Book>(`${this.apiUrl}/${encodeURIComponent(isbn)}`)
      .pipe(catchError(error => (exampleBook ? of(exampleBook) : throwError(() => error))));
  }

  private filterExampleBooks(pageSize: number, searchTerm?: string): Book[] {
    const normalizedSearchTerm = searchTerm?.trim().toLowerCase();
    const matchingBooks = normalizedSearchTerm
      ? EXAMPLE_BOOKS.filter(book => `${book.title} ${book.author ?? ''}`.toLowerCase().includes(normalizedSearchTerm))
      : EXAMPLE_BOOKS;

    return matchingBooks.slice(0, pageSize);
  }
}
