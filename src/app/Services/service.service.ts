import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import {
  ApiResponse,
  PagedData,
  Service,
  ServiceForm,
  PaginationParams
} from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class ServiceService {
  private readonly baseUrl = `${environment.apiBaseUrl}/services`;

  constructor(private http: HttpClient) {}

  getAll(params?: PaginationParams): Observable<ApiResponse<PagedData<Service>>> {
    let httpParams = new HttpParams();
    if (params?.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber);
    if (params?.PageSize)   httpParams = httpParams.set('PageSize', params.PageSize);
    return this.http.get<ApiResponse<PagedData<Service>>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<Service>> {
    return this.http.get<ApiResponse<Service>>(`${this.baseUrl}/${id}`);
  }

  /** Get all services belonging to a specific category */
  getByCategory(categoryId: number): Observable<ApiResponse<Service[]>> {
    return this.http.get<ApiResponse<Service[]>>(`${this.baseUrl}/category/${categoryId}`);
  }

  create(form: ServiceForm): Observable<ApiResponse<Service>> {
    return this.http.post<ApiResponse<Service>>(this.baseUrl, this.buildFormData(form));
  }

  update(id: number, form: ServiceForm): Observable<ApiResponse<Service>> {
    return this.http.put<ApiResponse<Service>>(`${this.baseUrl}/${id}`, this.buildFormData(form));
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  /** Upload a single image for an existing service */
  uploadImage(serviceId: number, image: File): Observable<ApiResponse<any>> {
    const fd = new FormData();
    fd.append('serviceId', serviceId.toString());
    fd.append('Image', image);
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/upload-image`, fd);
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private buildFormData(form: ServiceForm): FormData {
    const fd = new FormData();
    fd.append('Name', form.Name);
    fd.append('Description', form.Description);
    fd.append('ServiceCategoryId', form.ServiceCategoryId.toString());
    if (form.Image) fd.append('Image', form.Image);
    return fd;
  }
}
