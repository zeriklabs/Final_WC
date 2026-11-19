import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../../../core/services/book.service';
import { Book } from '../../../core/models/book.model';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  template: `
    <div class="product-details" *ngIf="book(); else notFound">
      <!-- Breadcrumb y botón Volver de Hexadash -->
      <div class="breadcrumb-main d-flex align-items-center justify-content-between mb-25">
        <a routerLink="/burritolector/galeria" class="btn btn-outline-lighten btn-sm d-inline-flex align-items-center gap-2">
          <img src="img/svg/arrow-left.svg" alt="back" width="14" height="14" />
          <span>Volver a Galería</span>
        </a>
      </div>

      <div class="card border-0 shadow-sm radius-xl p-30">
        <!-- Título de la Reseña -->
        <h3 class="fw-bold mb-30 text-dark">
          {{ book()?.resenaTitulo }}
        </h3>

        <!-- Fila de Portada y Metadatos de Hexadash -->
        <div class="row g-4 mb-30">
          <!-- Portada del Libro -->
          <div class="col-12 col-md-5 col-lg-4">
            <div class="product-details__image d-flex align-items-center justify-content-center">
              <svg class="placeholder-icon" viewBox="0 0 160 120" width="140" height="100" fill="none">
                <rect width="160" height="120" rx="8" fill="#e9edf5" />
                <circle cx="115" cy="35" r="14" fill="#c7d0e0" />
                <polygon points="20,110 65,55 95,85 115,70 145,110" fill="#b0bccd" />
              </svg>
            </div>
          </div>

          <!-- Metadatos de Hexadash -->
          <div class="col-12 col-md-7 col-lg-8">
            <div class="product-info-box">
              <div class="meta-item mb-2">
                <span class="meta-label fw-bold">Título: </span>
                <span class="meta-val text-dark">{{ book()?.titulo }}</span>
              </div>

              <div class="meta-item mb-2">
                <span class="meta-label fw-bold">Autores: </span>
                <span class="meta-val text-dark">{{ book()?.autores }}</span>
              </div>

              <div class="meta-item mb-2">
                <span class="meta-label fw-bold">Editor: </span>
                <span class="meta-val text-dark">{{ book()?.editor }}</span>
              </div>

              <div class="meta-item mb-3">
                <span class="meta-label fw-bold">Género(s): </span>
                <span class="meta-val text-dark">
                  {{ book()?.generosList ? book()?.generosList?.join(', ') : book()?.genero }}
                </span>
              </div>

              <div class="rating-box d-flex align-items-center gap-2 mt-4 pt-2">
                <span class="meta-label fw-bold">Mi puntuación:</span>
                <app-star-rating
                  [rating]="book()?.miPuntuacion || 0"
                  [readonly]="false"
                  (ratingChange)="onRatingChanged($event)"
                ></app-star-rating>
              </div>
              <small class="text-muted d-block mt-1">
                (Haz clic en las estrellas para actualizar tu valoración)
              </small>
            </div>
          </div>
        </div>

        <!-- Sinopsis -->
        <div class="sinopsis-wrap mt-30 pt-25 border-top">
          <h5 class="fw-bold mb-15 text-dark">Sinopsis</h5>
          <p class="sinopsis-text text-secondary lh-lg mb-0" style="white-space: pre-line;">
            {{ book()?.sinopsis }}
          </p>
        </div>
      </div>
    </div>

    <ng-template #notFound>
      <div class="alert alert-warning my-4">
        Reseña no encontrada. <a routerLink="/burritolector/galeria">Regresar a la Galería</a>.
      </div>
    </ng-template>
  `,
  styles: [`
    .product-details {
      max-width: 1000px;
      margin: 0 auto;
    }
    .p-30 {
      padding: 30px;
    }
    .mb-25 {
      margin-bottom: 25px;
    }
    .mb-30 {
      margin-bottom: 30px;
    }
    .mt-30 {
      margin-top: 30px;
    }
    .pt-25 {
      padding-top: 25px;
    }
    .btn-outline-lighten {
      color: #5a5f7d;
      border: 1px solid #e3e6ef;
      background: #ffffff;
      padding: 6px 14px;
      font-size: 0.875rem;
      border-radius: 5px;
    }
    .btn-outline-lighten:hover {
      background: #f8f9fb;
      color: #272b41;
    }
    .product-details__image {
      background-color: #ede9f7;
      border-radius: 10px;
      min-height: 200px;
      height: 100%;
    }
    .meta-label {
      min-width: 100px;
      display: inline-block;
      color: #272b41;
      font-size: 0.95rem;
    }
    .meta-val {
      font-size: 0.95rem;
    }
    .sinopsis-text {
      color: #5a5f7d;
      font-size: 0.95rem;
      line-height: 1.8;
    }
    .radius-xl {
      border-radius: 12px;
    }
  `]
})
export class DetalleComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly bookService = inject(BookService);

  @Input() id?: string;
  readonly book = signal<Book | undefined>(undefined);

  ngOnInit(): void {
    const bookId = Number(this.id || this.route.snapshot.paramMap.get('id'));
    if (bookId) {
      this.bookService.getBookById(bookId).subscribe((found) => {
        this.book.set(found);
      });
    }
  }

  onRatingChanged(newRating: number): void {
    const current = this.book();
    if (current) {
      this.bookService.updateRating(current.id, newRating).subscribe((updated) => {
        if (updated) {
          this.book.set(updated);
        }
      });
    }
  }
}
