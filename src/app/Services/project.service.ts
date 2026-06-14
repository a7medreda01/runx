import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment.prod';
import {
  ApiResponse,
  PagedData,
  Project,
  ProjectImage,
  ProjectForm,
  PaginationParams
} from '../Models/api.models';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly baseUrl = `${environment.apiBaseUrl}/projects`;

  constructor(private http: HttpClient) {}

  getAll(params?: PaginationParams): Observable<ApiResponse<PagedData<Project>>> {
    let httpParams = new HttpParams();
    if (params?.PageNumber) httpParams = httpParams.set('PageNumber', params.PageNumber);
    if (params?.PageSize)   httpParams = httpParams.set('PageSize', params.PageSize);
    return this.http.get<ApiResponse<PagedData<Project>>>(this.baseUrl, { params: httpParams });
  }

  getById(id: number): Observable<ApiResponse<Project>> {
    return this.http.get<ApiResponse<Project>>(`${this.baseUrl}/${id}`);
  }

  /** Get all projects belonging to a specific service category */
  getByCategory(categoryId: number): Observable<ApiResponse<Project[]>> {
    return this.http.get<ApiResponse<Project[]>>(`${this.baseUrl}/category/${categoryId}`);
  }

  create(form: ProjectForm): Observable<ApiResponse<Project>> {
    return this.http.post<ApiResponse<Project>>(this.baseUrl, this.buildFormData(form));
  }

  update(id: number, form: ProjectForm): Observable<ApiResponse<Project>> {
    return this.http.put<ApiResponse<Project>>(`${this.baseUrl}/${id}`, this.buildFormData(form));
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/${id}`);
  }

  /**
   * Add a single image to an existing project.
   * POST /api/projects/{projectId}/images  — field: "File"
   */
  addImage(projectId: number, file: File): Observable<ApiResponse<ProjectImage>> {
    const fd = new FormData();
    fd.append('File', file);
    return this.http.post<ApiResponse<ProjectImage>>(`${this.baseUrl}/${projectId}/images`, fd);
  }

  /**
   * Delete a specific project image by its ID.
   * DELETE /api/projects/images/{imageId}
   */
  deleteImage(imageId: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.baseUrl}/images/${imageId}`);
  }

  /**
   * @deprecated Use addImage() in a loop instead.
   * Upload one or more images to an existing project.
   */
  uploadImages(projectId: number, images: File[]): Observable<ApiResponse<any>> {
    const fd = new FormData();
    fd.append('projectId', projectId.toString());
    images.forEach(img => fd.append('Images', img));
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/upload-images`, fd);
  }

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private buildFormData(form: ProjectForm): FormData {
    const fd = new FormData();
    fd.append('Name', form.Name);
    fd.append('Description', form.Description);
    fd.append('ExecutionDate', form.ExecutionDate);
    fd.append('ServiceCategoryId', form.ServiceCategoryId.toString());
    if (form.Image) fd.append('Image', form.Image);
    return fd;
  }
}
