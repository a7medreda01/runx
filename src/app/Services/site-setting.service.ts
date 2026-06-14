import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import {
  ApiResponse,
  PagedData,
  SiteSetting,
  SiteSettingRequest,
  PaginationParams
} from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class SiteSettingService {
  private readonly baseUrl = `${environment.apiBaseUrl}/SiteSetting`;

  constructor(private http: HttpClient) {}

  getAll(params?: PaginationParams): Observable<ApiResponse<PagedData<SiteSetting>>> {
    let httpParams = new HttpParams();
    if (params?.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber);
    if (params?.PageSize)   httpParams = httpParams.set('PageSize', params.PageSize);
    return this.http.get<ApiResponse<PagedData<SiteSetting>>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<SiteSetting>> {
    return this.http.get<ApiResponse<SiteSetting>>(`${this.baseUrl}/${id}`);
  }

  create(body: SiteSettingRequest): Observable<ApiResponse<SiteSetting>> {
    return this.http.post<ApiResponse<SiteSetting>>(this.baseUrl, body);
  }

  update(id: number, body: SiteSettingRequest): Observable<ApiResponse<SiteSetting>> {
    return this.http.put<ApiResponse<SiteSetting>>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
