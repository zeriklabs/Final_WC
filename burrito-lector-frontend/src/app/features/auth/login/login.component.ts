import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <main class="main-content">
      <div class="admin">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-12 d-flex justify-content-center">
              <div class="edit-profile">
                <!-- Título Superior: Acceso -->
                <div class="edit-profile__logos text-center mb-25">
                  <h2 class="fw-bold text-dark mb-0 fs-2">Acceso</h2>
                </div>

                <!-- Tarjeta de Login con Elementos de HexaDash -->
                <div class="card border-0">
                  <div class="card-body">
                    <div class="edit-profile__body">
                      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>
                        <!-- Campo Correo -->
                        <div class="form-group mb-25">
                          <label for="username">correo</label>
                          <input
                            type="email"
                            class="form-control"
                            id="username"
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
                            <input class="checkbox" type="checkbox" id="check-1" checked>
                            <label for="check-1" class="mb-0">
                              <span class="checkbox-text">Recordarme</span>
                            </label>
                          </div>
                          <a href="javascript:void(0)" class="color-primary fs-13">¿Olvidaste tu contraseña?</a>
                        </div>

                        <!-- Botón Ingresar -->
                        <div class="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center">
                          <button
                            type="submit"
                            class="btn btn-primary btn-default w-100 btn-squared text-capitalize lh-normal px-50 signIn-createBtn"
                            [disabled]="loginForm.invalid || loading"
                          >
                            {{ loading ? 'Ingresando...' : 'Ingresar' }}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div><!-- End: .card-body -->

                  <!-- Barra inferior de HexaDash -->
                  <div class="admin-topbar">
                    <p class="mb-0">
                      ¿No tienes una cuenta?
                      <a routerLink="/burritolector/registro" class="color-primary">
                        Registrarse
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
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loading = false;
  showPassword = false;

  readonly loginForm: FormGroup = this.fb.group({
    correo: ['luis@burritolector.com', [Validators.required, Validators.email]],
    clave: ['123456', [Validators.required, Validators.minLength(4)]]
  });

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
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
