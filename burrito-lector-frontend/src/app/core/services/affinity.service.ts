import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { AffinityRecord } from '../models/affinity.model';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class AffinityService {
  private readonly http = inject(HttpClient);
  private readonly bookService = inject(BookService);
  private readonly API_URL = 'http://localhost:8080/api/afinidad';

  private readonly rawAffinities = signal<AffinityRecord[]>([
    {
      id: 1,
      titulo: 'Cien años de soledad',
      lector: 'Jose',
      suRating: 4,
      miRating: 4
    },
    {
      id: 2,
      titulo: 'Cien años de soledad',
      lector: 'Nora',
      suRating: 5,
      miRating: 4
    },
    {
      id: 3,
      titulo: 'El nadador en el mar secreto',
      lector: 'Ana',
      suRating: 4,
      miRating: 5
    },
    {
      id: 4,
      titulo: 'El nadador en el mar secreto',
      lector: 'Jose',
      suRating: 3,
      miRating: 5
    }
  ]);

  // Computed signal que sincroniza "Mi rating" con los libros calificados
  readonly affinities = computed(() => {
    const books = this.bookService.books();
    return this.rawAffinities().map((item) => {
      const match = books.find((b) => b.titulo.toLowerCase() === item.titulo.toLowerCase());
      return {
        ...item,
        miRating: match ? match.miPuntuacion : item.miRating
      };
    });
  });

  getAffinities(): Observable<AffinityRecord[]> {
    return this.http.get<AffinityRecord[]>(this.API_URL).pipe(
      tap((data) => {
        if (data && data.length > 0) {
          this.rawAffinities.set(data);
        }
      }),
      catchError(() => of(this.affinities()))
    );
  }
}
