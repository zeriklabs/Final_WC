import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AffinityService } from '../../../core/services/affinity.service';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';

@Component({
  selector: 'app-afinidad',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  template: `
    <div class="afinidad-page">
      <!-- Breadcrumb / Título de Hexadash -->
      <div class="breadcrumb-main mb-25">
        <h4 class="text-capitalize fw-bold text-dark mb-0">
          Afinidad con otros burritos lectores
        </h4>
      </div>

      <!-- Componente userDatatable de Hexadash -->
      <div class="card border-0 shadow-sm radius-xl">
        <div class="card-body p-0">
          <div class="userDatatable global-shadow border-0 bg-white radius-xl w-100">
            <div class="table-responsive">
              <table class="table mb-0 table-borderless">
                <thead>
                  <tr class="userDatatable-header">
                    <th><span class="userDatatable-title">Título</span></th>
                    <th><span class="userDatatable-title">Lector</span></th>
                    <th><span class="userDatatable-title">Su rating</span></th>
                    <th><span class="userDatatable-title">Mi rating</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of affinities()">
                    <td>
                      <div class="userDatatable-content fw-medium text-dark">
                        {{ row.titulo }}
                      </div>
                    </td>
                    <td>
                      <div class="userDatatable-content text-secondary">
                        {{ row.lector }}
                      </div>
                    </td>
                    <td>
                      <div class="userDatatable-content">
                        <app-star-rating [rating]="row.suRating" [readonly]="true"></app-star-rating>
                      </div>
                    </td>
                    <td>
                      <div class="userDatatable-content">
                        <app-star-rating [rating]="row.miRating" [readonly]="true"></app-star-rating>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .afinidad-page {
      max-width: 1100px;
      margin: 0 auto;
    }
    .userDatatable-header th {
      background-color: #fafafb;
      padding: 16px 25px;
      border-bottom: 1px solid #f1f2f6;
    }
    .userDatatable-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #9299b8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .userDatatable tbody tr {
      border-bottom: 1px solid #f8f9fb;
      transition: background-color 0.15s ease;
    }
    .userDatatable tbody tr:hover {
      background-color: #fafbfc;
    }
    .userDatatable tbody td {
      padding: 18px 25px;
      vertical-align: middle;
    }
    .userDatatable-content {
      font-size: 0.95rem;
    }
    .radius-xl {
      border-radius: 10px;
      overflow: hidden;
    }
  `]
})
export class AfinidadComponent implements OnInit {
  private readonly affinityService = inject(AffinityService);

  readonly affinities = this.affinityService.affinities;

  ngOnInit(): void {
    this.affinityService.getAffinities().subscribe();
  }
}
