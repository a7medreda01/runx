import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import {
  ApiResponse,
  PagedData,
  Package,
  PackageForm,
  PaginationParams
} from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class PackageService {
  private readonly baseUrl = `${environment.apiBaseUrl}/Package`;

  constructor(private http: HttpClient) {}

  getAll(params?: PaginationParams): Observable<ApiResponse<PagedData<Package>>> {
    let httpParams = new HttpParams();
    if (params?.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber);
    if (params?.PageSize)   httpParams = httpParams.set('PageSize', params.PageSize);
    return this.http.get<ApiResponse<PagedData<Package>>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<Package>> {
    return this.http.get<ApiResponse<Package>>(`${this.baseUrl}/${id}`);
  }

  create(form: PackageForm): Observable<ApiResponse<Package>> {
    return this.http.post<ApiResponse<Package>>(this.baseUrl, this.buildFormData(form));
  }

  update(id: number, form: PackageForm): Observable<ApiResponse<Package>> {
    return this.http.put<ApiResponse<Package>>(`${this.baseUrl}/${id}`, this.buildFormData(form));
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private buildFormData(form: PackageForm): FormData {
    const fd = new FormData();
    fd.append('Name', form.Name);
    fd.append('Price', form.Price.toString());
    if (form.Description) fd.append('Description', form.Description);
    if (form.Image)       fd.append('Image', form.Image);

    // Features: each string item appended separately under the same key
    if (form.Features?.length) {
      form.Features.forEach(f => fd.append('Features', f));
    }

    return fd;
  }
}
