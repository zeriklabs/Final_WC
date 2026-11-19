import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Book } from '../../../core/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card blog-card border-0 shadow-sm h-100" (click)="onClick()">
      <div class="card-body p-20 d-flex flex-column">
        <!-- Badge de Género de Hexadash -->
        <div class="cos-author-title d-flex align-items-center mb-15">
          <div class="avatar-circle me-10">
            <span>{{ book.generoInicial || (book.genero ? book.genero.charAt(0) : 'L') }}</span>
          </div>
          <div class="author-details">
            <span class="genre-tag d-block">Genero</span>
            <span class="genre-val fw-bold text-dark">{{ book.genero }}</span>
          </div>
        </div>

        <!-- Imagen / Ilustración -->
        <div class="blog-card-thumbnail mb-15 d-flex align-items-center justify-content-center">
          <svg class="placeholder-icon" viewBox="0 0 100 80" width="80" height="60" fill="none">
            <rect width="100" height="80" rx="8" fill="#e9edf5" />
            <circle cx="70" cy="25" r="10" fill="#c7d0e0" />
            <polygon points="15,70 45,35 65,55 75,45 95,70" fill="#b0bccd" />
          </svg>
        </div>

        <!-- Título de Reseña de Hexadash -->
        <div class="blog-card-title mt-auto">
          <h6 class="title-text mb-0">
            {{ book.resenaTitulo }}
          </h6>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .blog-card {
      background-color: #f7f5fb;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.25s ease-in-out;
      border: 1px solid #ebe8f5 !important;
    }
    .blog-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(116, 51, 255, 0.12) !important;
      background-color: #f2eefc;
      border-color: #dfd7f7 !important;
    }
    .p-20 {
      padding: 20px;
    }
    .mb-15 {
      margin-bottom: 15px;
    }
    .me-10 {
      margin-right: 10px;
    }
    .avatar-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: #ede7fc;
      color: #7433ff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.95rem;
    }
    .genre-tag {
      font-size: 0.72rem;
      color: #9299b8;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      line-height: 1.1;
    }
    .genre-val {
      font-size: 0.875rem;
      color: #272b41;
      line-height: 1.2;
    }
    .blog-card-thumbnail {
      height: 140px;
      background-color: #ede9f7;
      border-radius: 8px;
    }
    .title-text {
      font-size: 0.875rem;
      line-height: 1.4;
      color: #494e63;
      font-weight: 500;
    }
  `]
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  @Output() viewDetail = new EventEmitter<number>();

  onClick(): void {
    this.viewDetail.emit(this.book.id);
  }
}
