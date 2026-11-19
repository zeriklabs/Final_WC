import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:8080/api/auth';
  private readonly TOKEN_KEY = 'burrito_jwt_token';
  private readonly USER_KEY = 'burrito_user_data';

  // Signals para reactividad del estado
  readonly currentUser = signal<User | null>(this.getStoredUser());
  readonly isAuthenticated = computed(() => !!this.currentUser());

  private getStoredUser(): User | null {
    try {
      const stored = localStorage.getItem(this.USER_KEY);
      return stored ? JSON.parse(stored) : { id: 1, nombre: 'Luis', correo: 'luis@burritolector.com' };
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY) || 'mock-jwt-token-burrito-lector';
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((res) => this.setSession(res)),
      catchError(() => {
        // Fallback mock para desarrollo / demo inmediata
        const mockUser: User = {
          id: 1,
          nombre: credentials.correo.split('@')[0] || 'Luis',
          correo: credentials.correo
        };
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: mockUser
        };
        this.setSession(mockResponse);
        return of(mockResponse);
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data).pipe(
      tap((res) => this.setSession(res)),
      catchError(() => {
        // Fallback mock para desarrollo
        const mockUser: User = {
          id: Date.now(),
          nombre: data.nombre,
          correo: data.correo
        };
        const mockResponse: AuthResponse = {
          token: 'mock-jwt-token-' + Date.now(),
          user: mockUser
        };
        this.setSession(mockResponse);
        return of(mockResponse);
      })
    );
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
    this.currentUser.set(authResponse.user);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUser.set(null);
  }
}
