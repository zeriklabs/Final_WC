import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { BookCardComponent } from '../../../shared/components/book-card/book-card.component';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  template: `
    <div class="galeria-container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 class="fw-bold mb-1 text-dark">Galería de Reseñas</h4>
          <p class="text-muted mb-0 small">Explora las reseñas literarias compartidas por la comunidad.</p>
        </div>
      </div>

      <!-- Grid de Libros / Reseñas -->
      <div class="row g-4">
        <div
          class="col-12 col-sm-6 col-md-4 col-lg-3"
          *ngFor="let book of books()"
        >
          <app-book-card
            [book]="book"
            (viewDetail)="onSelectBook($event)"
          ></app-book-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .galeria-container {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class GaleriaComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  // Signal con la lista de libros del servicio
  readonly books = this.bookService.books;

  ngOnInit(): void {
    // Carga dinámica de datos desde el servicio
    this.bookService.getBooks().subscribe();
  }

  onSelectBook(bookId: number): void {
    this.router.navigate(['/burritolector/galeria', bookId]);
  }
}
