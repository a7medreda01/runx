import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import {
  ApiResponse,
  PagedData,
  ServiceCategory,
  ServiceCategoryRequest,
  PaginationParams
} from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class ServiceCategoryService {
  private readonly baseUrl = `${environment.apiBaseUrl}/ServiceCategory`;

  constructor(private http: HttpClient) {}

  getAll(params?: PaginationParams): Observable<ApiResponse<PagedData<ServiceCategory>>> {
    let httpParams = new HttpParams();
    if (params?.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber);
    if (params?.PageSize)   httpParams = httpParams.set('PageSize', params.PageSize);
    return this.http.get<ApiResponse<PagedData<ServiceCategory>>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<ServiceCategory>> {
    return this.http.get<ApiResponse<ServiceCategory>>(`${this.baseUrl}/${id}`);
  }

  create(body: ServiceCategoryRequest): Observable<ApiResponse<ServiceCategory>> {
    return this.http.post<ApiResponse<ServiceCategory>>(this.baseUrl, body);
  }

  update(id: number, body: ServiceCategoryRequest): Observable<ApiResponse<ServiceCategory>> {
    return this.http.put<ApiResponse<ServiceCategory>>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
