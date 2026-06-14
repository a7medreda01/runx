import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import { ApiResponse, ContactInfo, ContactInfoRequest } from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class ContactInfoService {
  private readonly baseUrl = `${environment.apiBaseUrl}/ContactInfo`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<ApiResponse<ContactInfo>> {
    return this.http.get<ApiResponse<ContactInfo>>(`${this.baseUrl}/${id}`);
  }

  create(body: ContactInfoRequest): Observable<ApiResponse<ContactInfo>> {
    return this.http.post<ApiResponse<ContactInfo>>(this.baseUrl, body);
  }

  update(id: number, body: ContactInfoRequest): Observable<ApiResponse<ContactInfo>> {
    return this.http.put<ApiResponse<ContactInfo>>(`${this.baseUrl}/${id}`, body);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }
}
