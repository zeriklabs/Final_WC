import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <main class="main-content">
      <div class="admin">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 d-flex justify-content-center">
              <div class="edit-profile">
                <!-- Título Superior: Registro -->
                <div class="edit-profile__logos text-center mb-25">
                  <h2 class="fw-bold text-dark mb-0 fs-2">Registro</h2>
                </div>

                <!-- Tarjeta de Registro con Elementos de HexaDash -->
                <div class="card border-0">
                  <div class="card-body">
                    <div class="edit-profile__body">
                      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>
                        <!-- Campo Nombre Completo -->
                        <div class="form-group mb-25">
                          <label for="name">nombre completo</label>
                          <input
                            type="text"
                            class="form-control"
                            id="name"
                            placeholder="nombre completo"
                            formControlName="nombre"
                            [class.is-invalid]="isFieldInvalid('nombre')"
                          />
                          <div class="invalid-feedback" *ngIf="isFieldInvalid('nombre')">
                            El nombre completo es obligatorio.
                          </div>
                        </div>

                        <!-- Campo Correo -->
                        <div class="form-group mb-25">
                          <label for="email">correo</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="correo"
                            formControlName="correo"
                            [class.is-invalid]="isFieldInvalid('correo')"
                          />
                          <div class="invalid-feedback" *ngIf="isFieldInvalid('correo')">
                            Por favor ingresa un correo válido.
                          </div>
                        </div>

                        <!-- Campo Clave -->
                        <div class="form-group mb-15">
                          <label for="password-field">clave</label>
                          <div class="position-relative">
                            <input
                              id="password-field"
                              [type]="showPassword ? 'text' : 'password'"
                              class="form-control"
                              placeholder="clave"
                              formControlName="clave"
                              [class.is-invalid]="isFieldInvalid('clave')"
                            />
                            <div
                              class="field-icon toggle-password2"
                              (click)="togglePassword()"
                              title="Mostrar/ocultar contraseña"
                            >
                              <img
                                [src]="showPassword ? 'img/svg/eye.svg' : 'img/svg/eye-off.svg'"
                                alt="toggle password"
                                width="18"
                                height="18"
                              />
                            </div>
                            <div class="invalid-feedback" *ngIf="isFieldInvalid('clave')">
                              La clave es obligatoria (mínimo 4 caracteres).
                            </div>
                          </div>
                        </div>

                        <!-- Opciones de condición de HexaDash -->
                        <div class="admin-condition">
                          <div class="checkbox-theme-default custom-checkbox">
                            <input class="checkbox" type="checkbox" id="terms" checked>
                            <label for="terms" class="mb-0">
                              <span class="checkbox-text">Acepto los términos de servicio</span>
                            </label>
                          </div>
                        </div>

                        <!-- Botón Registrarse -->
                        <div class="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                          <button
                            type="submit"
                            class="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn"
                            [disabled]="registerForm.invalid || loading"
                          >
                            {{ loading ? 'Registrando...' : 'Registrarse' }}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div><!-- End: .card-body -->

                  <!-- Barra inferior de HexaDash -->
                  <div class="admin-topbar">
                    <p class="mb-0">
                      ¿Ya tienes una cuenta?
                      <a routerLink="/burritolector/login" class="color-primary">
                        Ingresar
                      </a>
                    </p>
                  </div><!-- End: .admin-topbar -->
                </div><!-- End: .card -->
              </div><!-- End: .edit-profile -->
            </div>
          </div>
        </div>
      </div>
    </main>
  `
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  showPassword = false;

  readonly registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    clave: ['', [Validators.required, Validators.minLength(4)]]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/burritolector/galeria']);
      },
      error: () => {
        this.loading = false;
        this.router.navigate(['/burritolector/galeria']);
      }
    });
  }
}
