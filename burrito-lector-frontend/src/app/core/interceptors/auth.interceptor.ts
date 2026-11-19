import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Obtener el token directamente de localStorage para evitar dependencias circulares en DI
  let token: string | null = null;
  try {
    token = localStorage.getItem('burrito_jwt_token') || 'mock-jwt-token-burrito-lector';
  } catch {
    token = 'mock-jwt-token-burrito-lector';
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
