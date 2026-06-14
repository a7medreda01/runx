import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import {
  ApiResponse,
  PagedData,
  SocialMedia,
  SocialMediaRequest,
  PaginationParams
} from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class SocialMediaService {
  private readonly baseUrl = `${environment.apiBaseUrl}/SocialMedia`;

  constructor(private http: HttpClient) {}

  getAll(params?: PaginationParams): Observable<ApiResponse<PagedData<SocialMedia>>> {
    let httpParams = new HttpParams();
    if (params?.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber);
    if (params?.PageSize)   httpParams = httpParams.set('PageSize', params.PageSize);
    return this.http.get<ApiResponse<PagedData<SocialMedia>>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<SocialMedia>> {
    return this.http.get<ApiResponse<SocialMedia>>(`${this.baseUrl}/${id}`);
  }

  create(body: SocialMediaRequest): Observable<ApiResponse<SocialMedia>> {
    return this.http.post<ApiResponse<SocialMedia>>(this.baseUrl, body);
  }

  update(id: number, body: SocialMediaRequest): Observable<ApiResponse<SocialMedia>> {
    return this.http.put<ApiResponse<SocialMedia>>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
