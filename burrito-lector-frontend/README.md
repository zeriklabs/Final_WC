# Burrito Lector - Frontend (Angular)

Aplicación web desarrollada en **Angular** integrando el sistema de diseño y componentes de **HexaDash**, diseñada para la plataforma **"Burrito Lector"** en cumplimiento de los requerimientos técnicos de la materia.

---

## 🎯 Rutas de la Aplicación (según Wireframes)

| Ruta | Descripción | Estado de Acceso |
| :--- | :--- | :--- |
| `http://localhost:4200/burritolector/login` | Pantalla de **Acceso** con formulario reactivo centrado | Pública |
| `http://localhost:4200/burritolector/registro` | Pantalla de **Registro** de usuarios | Pública |
| `http://localhost:4200/burritolector/galeria` | Catálogo de **Galería de Reseñas** en tarjetas | Protegida (`authGuard`) |
| `http://localhost:4200/burritolector/galeria/:id` | **Detalle de Reseña** con sinopsis y calificación por estrellas | Protegida (`authGuard`) |
| `http://localhost:4200/burritolector/afinidad` | Tabla de **Afinidad con otros burritos lectores** | Protegida (`authGuard`) |

---

## 🛠️ Cumplimiento de Requerimientos Técnicos

1. **Angular (v22 / Standalone Components):** Arquitectura moderna sin módulos innecesarios (`NgModule`), usando componentes standalone.
2. **Formularios Reactivos (`ReactiveFormsModule`):** Formularios en Login y Registro con `FormGroup`, `FormControl` y validaciones estrictas (`Validators.required`, `Validators.email`, `Validators.minLength`).
3. **Signals (`signal`, `computed`):** 
   - `AuthService`: `currentUser = signal<User | null>(...)` y `isAuthenticated = computed(...)`.
   - `BookService`: `books = signal<Book[]>([...])` para reactividad en calificaciones.
   - `AffinityService`: `affinities = computed(...)` sincroniza en tiempo real las calificaciones del usuario con la tabla de afinidad.
4. **Guards de rutas (`CanActivateFn`):** `authGuard` bloquea el acceso a la galería, detalle y afinidad si no hay sesión activa, redirigiendo a `/burritolector/login`.
5. **Interceptores HTTP (`HttpInterceptorFn`):** `authInterceptor` inyecta automáticamente el encabezado `Authorization: Bearer <token>` en todas las peticiones salientes hacia la API REST.
6. **Servicios para consumo de API (`HttpClient`):** `AuthService`, `BookService` y `AffinityService` preparados para consumir los endpoints de Spring Boot (`http://localhost:8080/api`), con respaldo reactivo para demostración offline inmediata.
7. **Componentes reutilizables:**
   - `<app-star-rating>`: Componente de calificación por estrellas (interactivo o de solo lectura).
   - `<app-book-card>`: Tarjeta reutilizable con badge de género, avatar e imagen.
   - `<app-layout>`: Layout principal con barra superior (nombre de usuario) y sidebar interactivo.
8. **Rutas protegidas:** Integradas bajo el layout común con hijos autenticados.
9. **Carga dinámica de datos:** Sincronización de libros y calificaciones en tiempo real.

---

## 🚀 Cómo Ejecutar el Proyecto

1. Abrir una terminal en esta carpeta:
   ```bash
   cd burrito-lector-frontend
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
3. Abrir en el navegador:
   ```text
   http://localhost:4200/burritolector/login
   ```
