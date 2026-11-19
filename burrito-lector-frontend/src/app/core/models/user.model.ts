export interface User {
  id?: number;
  nombre: string;
  correo: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  correo: string;
  clave: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  clave: string;
}
