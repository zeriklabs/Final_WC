# Proyecto Final - Desarrollo de Aplicaciones Web y Cliente (Final_WC)
## Plataforma "Burrito Lector"

Repositorio del proyecto final que integra una arquitectura moderna desacoplada:
- **Parte 1 (Frontend):** Angular (v22, Standalone Components, Signals, Reactive Forms, Guards, Interceptors) con diseño basado en HexaDash.
- **Parte 2 (Backend):** Spring Boot (API REST, autenticación JWT, Controladores, Servicios, DTOs, Validaciones, JPA y manejo de imágenes).

---

### Estructura del Repositorio

```text
Final_WC/
├── burrito-lector-frontend/    # Aplicación cliente en Angular
└── README.md                   # Documentación general del proyecto
```

---

### 📚 Parte 1: Frontend (Burrito Lector)

Ubicación: `burrito-lector-frontend/`

#### Rutas implementadas:
1. `http://localhost:4200/burritolector/login` - Acceso (Pública)
2. `http://localhost:4200/burritolector/registro` - Registro de usuarios (Pública)
3. `http://localhost:4200/burritolector/galeria` - Galería de Reseñas (Protegida)
4. `http://localhost:4200/burritolector/galeria/:id` - Detalle de Reseña y calificación (Protegida)
5. `http://localhost:4200/burritolector/afinidad` - Tabla de afinidad entre lectores (Protegida)

#### Ejecución:
```bash
cd burrito-lector-frontend
npm install
npm start
```
