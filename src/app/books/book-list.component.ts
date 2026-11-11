import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorComponent } from '../shared/loading-indicator.component';
import { BookApiClient } from './book-api-client.service';
import { BookItemComponent } from './book-item.component';
import { Book } from './book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookItemComponent, LoadingIndicatorComponent],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit, OnDestroy {
  @Input() pageSize = 10;

  books: Book[] = [];
  loading = true;
  searchTerm = '';

  private readonly bookApiClient = inject(BookApiClient);
  private searchTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.loadBooks();
  }

  ngOnDestroy(): void {
    clearTimeout(this.searchTimeout);
  }

  onSearchChange(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.loadBooks(this.searchTerm), 300);
  }

  clearSearch(): void {
    clearTimeout(this.searchTimeout);
    this.searchTerm = '';
    this.loadBooks();
  }

  trackById(index: number, book: Book): string {
    return book.id;
  }

  private loadBooks(search?: string): void {
    this.loading = true;
    this.bookApiClient.getBooks(this.pageSize, search).subscribe({
      next: books => {
        this.books = books;
        this.loading = false;
      },
      error: error => {
        console.error('Error fetching books:', error);
        this.loading = false;
      }
    });
  }
}
