import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LoadingIndicatorComponent } from '../shared/loading-indicator.component';
import { BookApiClient } from './book-api-client.service';
import { Book } from './book';

type BookDetailStatus = 'loading' | 'loaded' | 'not-found' | 'request-failed';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingIndicatorComponent],
  templateUrl: './book-detail.component.html'
})
export class BookDetailComponent implements OnInit {
  book?: Book;
  status: BookDetailStatus = 'loading';

  private readonly route = inject(ActivatedRoute);
  private readonly bookApiClient = inject(BookApiClient);

  ngOnInit(): void {
    const isbn = this.route.snapshot.paramMap.get('id');

    if (!isbn) {
      this.status = 'not-found';
      return;
    }

    this.bookApiClient.getBook(isbn).subscribe({
      next: book => {
        this.book = book;
        this.status = 'loaded';
      },
      error: (error: HttpErrorResponse) => {
        this.status = error.status === 404 ? 'not-found' : 'request-failed';
      }
    });
  }
}
