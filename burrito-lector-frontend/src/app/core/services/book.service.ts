import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/libros';

  private readonly initialBooks: Book[] = [
    {
      id: 1,
      titulo: 'Primer Contacto',
      subtitulo: 'Antología de ciencia ficción',
      autores: 'Francisco José Segovia Ramos',
      editor: 'Trillas',
      genero: 'Ciencia Ficción',
      generosList: ['Ficción', 'Relatos', 'Ciencia Ficción'],
      generoInicial: 'E',
      miPuntuacion: 3,
      resenaTitulo: 'Reseña de Libro: Primer Contacto de Varios Autores',
      sinopsis: 'El blog de divulgación literaria Relatos y Mentiras presenta la «Antología de ciencia ficción: primer contacto».\n\nEsta obra es una cuidada selección de relatos cuyo tema central es el primer encuentro o comunicación de la humanidad y una especie extraterrestre. Los relatos fueron elegidos entre los presentados al concurso «Antología de ciencia ficción: primer contacto».',
      imagen: 'assets/theme_assets/img/book-placeholder.png'
    },
    {
      id: 2,
      titulo: 'El Cirujano',
      subtitulo: 'Thriller de ciencia ficción',
      autores: 'Carlos Pérez Casas',
      editor: 'Minotauro',
      genero: 'Ciencia Ficción',
      generosList: ['Ficción', 'Suspenso', 'Ciencia Ficción'],
      generoInicial: 'E',
      miPuntuacion: 4,
      resenaTitulo: 'Reseña de Libro: El Cirujano de Carlos Pérez Casas',
      sinopsis: 'Una intrigante historia donde los límites de la bioingeniería y la ética médica se cruzan en un futuro distópico lleno de revelaciones inesperadas.',
      imagen: 'assets/theme_assets/img/book-placeholder.png'
    },
    {
      id: 3,
      titulo: 'Cien años de soledad',
      subtitulo: 'Obra cumbre de la literatura hispanoamericana',
      autores: 'Gabriel García Márquez',
      editor: 'Editorial Sudamericana',
      genero: 'Realismo Mágico',
      generosList: ['Novela', 'Realismo Mágico'],
      generoInicial: 'R',
      miPuntuacion: 4,
      resenaTitulo: 'Reseña de Libro: Cien años de soledad de Gabriel García Márquez',
      sinopsis: 'La épica historia de la familia Buendía a lo largo de siete generaciones en el mítico y recordado pueblo de Macondo.',
      imagen: 'assets/theme_assets/img/book-placeholder.png'
    },
    {
      id: 4,
      titulo: 'El nadador en el mar secreto',
      subtitulo: 'Un relato conmovedor',
      autores: 'William Kotzwinkle',
      editor: 'Navona',
      genero: 'Drama',
      generosList: ['Drama', 'Narrativa Contemporánea'],
      generoInicial: 'D',
      miPuntuacion: 5,
      resenaTitulo: 'Reseña de Libro: El nadador en el mar secreto de William Kotzwinkle',
      sinopsis: 'Un testimonio conmovedor y sincero sobre la paternidad, la pérdida y el amor incondicional en medio de la adversidad.',
      imagen: 'assets/theme_assets/img/book-placeholder.png'
    }
  ];

  // Signal para gestión de estado reactivo
  readonly books = signal<Book[]>(this.initialBooks);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.API_URL).pipe(
      tap((data) => {
        if (data && data.length > 0) {
          this.books.set(data);
        }
      }),
      catchError(() => of(this.books()))
    );
  }

  getBookById(id: number): Observable<Book | undefined> {
    return this.http.get<Book>(`${this.API_URL}/${id}`).pipe(
      catchError(() => of(this.books().find((b) => b.id === id)))
    );
  }

  updateRating(id: number, newRating: number): Observable<Book | undefined> {
    // Actualizar reactivamente el Signal
    this.books.update((list) =>
      list.map((b) => (b.id === id ? { ...b, miPuntuacion: newRating } : b))
    );

    return this.http.patch<Book>(`${this.API_URL}/${id}/rating`, { miPuntuacion: newRating }).pipe(
      catchError(() => of(this.books().find((b) => b.id === id)))
    );
  }
}
