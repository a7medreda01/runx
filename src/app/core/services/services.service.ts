import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceItem } from '../models/project.model';
import { INITIAL_SERVICES } from './data/initial-services.data';
import { ApiService } from './api.service';
import { catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);

  private servicesList = signal<ServiceItem[]>([]);
  public services = this.servicesList.asReadonly();
  public isLoading = signal<boolean>(false);

  constructor() {
    this.fetchServicesFromApi();
  }

  public fetchServicesFromApi(): void {
    this.isLoading.set(true);
    this.apiService.getServices().pipe(
      tap(services => {
        if (services && services.length > 0) {
          this.servicesList.set(services);
        } else {
          this.servicesList.set(INITIAL_SERVICES);
        }
        this.isLoading.set(false);
      }),
      catchError(() => {
        this.servicesList.set(INITIAL_SERVICES);
        this.isLoading.set(false);
        return of(INITIAL_SERVICES);
      })
    ).subscribe();
  }
}
