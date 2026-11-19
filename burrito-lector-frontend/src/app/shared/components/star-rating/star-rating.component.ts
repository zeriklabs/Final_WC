import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="star-rating d-inline-flex align-items-center" [class.interactive]="!readonly">
      <span
        *ngFor="let star of stars; let i = index"
        class="star-wrapper"
        [class.interactive]="!readonly"
        (click)="onSelect(i + 1)"
        [title]="!readonly ? 'Calificar con ' + (i + 1) + ' estrellas' : rating + ' de ' + maxRating"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          [attr.fill]="i < rating ? '#ffc107' : '#f0f2f5'"
          [attr.stroke]="i < rating ? '#ffc107' : '#d5d9e2'"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="star-svg"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      </span>
    </div>
  `,
  styles: [`
    .star-rating {
      gap: 3px;
      line-height: 1;
      user-select: none;
    }
    .star-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.15s ease;
    }
    .star-wrapper.interactive:hover {
      cursor: pointer;
      transform: scale(1.25);
    }
    .star-svg {
      transition: fill 0.15s ease, stroke 0.15s ease;
    }
  `]
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Input() readonly: boolean = true;
  @Output() ratingChange = new EventEmitter<number>();

  get stars(): number[] {
    return Array.from({ length: this.maxRating }, (_, i) => i + 1);
  }

  onSelect(value: number): void {
    if (!this.readonly) {
      this.rating = value;
      this.ratingChange.emit(value);
    }
  }
}
