import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import { ApiResponse, Company, CompanyUpdateForm } from '../Models/api.models';


@Injectable({ providedIn: 'root' })
export class CompanyService {
  private readonly baseUrl = `${environment.apiBaseUrl}/Company`;

  constructor(private http: HttpClient) {}

  /** Returns list of companies (typically just one record) */
  getAll(): Observable<ApiResponse<Company[]>> {
    return this.http.get<ApiResponse<Company[]>>(this.baseUrl);
  }

  getById(id: number): Observable<ApiResponse<Company>> {
    return this.http.get<ApiResponse<Company>>(`${this.baseUrl}/${id}`);
  }

  /** Update company info using multipart/form-data */
  update(id: number, form: CompanyUpdateForm): Observable<ApiResponse<Company>> {
    const formData = this.buildCompanyFormData(form);
    return this.http.put<ApiResponse<Company>>(`${this.baseUrl}/${id}`, formData);
  }

  /** Upload/replace logo only */
  uploadLogo(companyId: number, logo: File): Observable<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('companyId', companyId.toString());
    formData.append('Logo', logo);
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/logo`, formData);
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private buildCompanyFormData(form: CompanyUpdateForm): FormData {
    const fd = new FormData();
    fd.append('Name', form.Name);
    if (form.About !== undefined)              fd.append('About', form.About);
    if (form.Vision !== undefined)             fd.append('Vision', form.Vision);
    if (form.Mission !== undefined)            fd.append('Mission', form.Mission);
    if (form.YearsOfExperience !== undefined)  fd.append('YearsOfExperience', form.YearsOfExperience.toString());
    if (form.Logo)                             fd.append('Logo', form.Logo);
    if (form.CoverImage)                       fd.append('CoverImage', form.CoverImage);
    return fd;
  }
}
