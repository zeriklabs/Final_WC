export interface Book {
  id: number;
  titulo: string;
  subtitulo?: string;
  autores: string;
  editor: string;
  genero: string;
  generosList?: string[];
  generoInicial?: string;
  miPuntuacion: number;
  sinopsis: string;
  imagen: string;
  resenaTitulo: string;
}
