import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="layout-light side-menu">
      <!-- Header Top de Hexadash -->
      <header class="header-top">
        <nav class="navbar navbar-light px-30">
          <div class="navbar-left d-flex align-items-center">
            <div class="logo-area">
              <a class="navbar-brand d-flex align-items-center gap-2" routerLink="/burritolector/galeria">
                <span class="brand-text">Burrito Lector</span>
              </a>
            </div>
          </div>
          <div class="navbar-right">
            <div class="author-info d-flex align-items-center gap-2">
              <span class="user-avatar-badge">
                <img src="img/svg/user.svg" alt="user" class="nav-icon" width="18" height="18" />
              </span>
              <span class="nav-item__title fw-semibold text-dark">{{ userName }}</span>
            </div>
          </div>
        </nav>
      </header>

      <!-- Layout Wrapper de Hexadash: Sidebar + Contents -->
      <div class="contents-wrapper d-flex">
        <!-- Sidebar de Hexadash -->
        <aside class="sidebar">
          <div class="sidebar__menu-group">
            <ul class="sidebar_nav">
              <li class="menu-title">
                <span>MENÚ PRINCIPAL</span>
              </li>
              <li>
                <a routerLink="/burritolector/galeria" routerLinkActive="active" class="sidebar-item">
                  <img src="img/svg/book.svg" alt="galeria" class="menu-svg-icon" width="18" height="18" />
                  <span class="menu-text">Galería</span>
                </a>
              </li>
              <li>
                <a routerLink="/burritolector/afinidad" routerLinkActive="active" class="sidebar-item">
                  <img src="img/svg/users.svg" alt="afinidad" class="menu-svg-icon" width="18" height="18" />
                  <span class="menu-text">Afinidad</span>
                </a>
              </li>
              <li class="sidebar-separator"></li>
              <li>
                <a href="javascript:void(0)" (click)="onLogout()" class="sidebar-item text-danger">
                  <img src="img/svg/log-out.svg" alt="salir" class="menu-svg-icon logout-icon" width="18" height="18" />
                  <span class="menu-text">Salir</span>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Área de Contenido Principal de Hexadash -->
        <main class="contents flex-grow-1 p-30">
          <div class="crm mb-25">
            <div class="container-fluid p-0">
              <router-outlet></router-outlet>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-light {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: #fafbfc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .header-top {
      height: 72px;
      background-color: #ffffff;
      border-bottom: 1px solid #f1f2f6;
      box-shadow: 0 5px 20px rgba(116, 51, 255, 0.03);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .navbar {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
    }
    .navbar-brand {
      text-decoration: none !important;
      outline: none;
    }
    .navbar-brand:hover,
    .navbar-brand:focus {
      text-decoration: none !important;
    }
    .brand-text {
      color: #272b41;
      font-size: 1.75rem;
      font-weight: 800;
      letter-spacing: -0.5px;
      line-height: 1.2;
      text-decoration: none !important;
      display: inline-block;
    }
    .user-avatar-badge {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #f4f5f7;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .contents-wrapper {
      flex: 1;
      display: flex;
    }
    .sidebar {
      width: 260px;
      min-width: 260px;
      background-color: #ffffff;
      border-right: 1px solid #f1f2f6;
      padding: 20px 0;
      min-height: calc(100vh - 72px);
    }
    .sidebar_nav {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .sidebar_nav li {
      list-style: none;
    }
    .menu-title {
      padding: 10px 25px 6px;
      font-size: 0.72rem;
      font-weight: 700;
      color: #9299b8;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 25px;
      color: #5a5f7d;
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      border-left: 3px solid transparent;
      transition: all 0.2s ease;
    }
    .sidebar-item:hover {
      color: #7433ff;
      background-color: rgba(116, 51, 255, 0.04);
    }
    .sidebar-item.active {
      color: #7433ff;
      background-color: rgba(116, 51, 255, 0.08);
      font-weight: 600;
      border-left-color: #7433ff;
    }
    .menu-svg-icon {
      opacity: 0.75;
      transition: opacity 0.2s, filter 0.2s;
    }
    .sidebar-item:hover .menu-svg-icon,
    .sidebar-item.active .menu-svg-icon {
      opacity: 1;
      filter: invert(24%) sepia(91%) saturate(3025%) hue-rotate(256deg) brightness(97%) contrast(106%);
    }
    .logout-icon {
      filter: invert(34%) sepia(76%) saturate(2051%) hue-rotate(334deg) brightness(95%) contrast(93%);
    }
    .sidebar-separator {
      height: 1px;
      background-color: #f1f2f6;
      margin: 15px 25px;
    }
    .contents {
      background-color: #fafbfc;
      min-height: calc(100vh - 72px);
      padding: 30px;
    }
    .p-30 {
      padding: 30px !important;
    }
  `]
})
export class LayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  get userName(): string {
    return this.authService.currentUser()?.nombre || 'Luis';
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/burritolector/login']);
  }
}
