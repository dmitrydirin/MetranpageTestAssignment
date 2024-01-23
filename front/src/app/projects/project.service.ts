import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, firstValueFrom } from 'rxjs';
import { ProjectResponse, BuildResponse, TemplateResponse } from '../models/api-models';
import { Template } from '../models/project-models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
	private readonly backendUrl = "http://localhost:3000";

	private templates = new BehaviorSubject<Template[] | null>(null);
	templates$ = this.templates.asObservable();

	constructor(private readonly http: HttpClient) {
		
	}

	getProjects(): Observable<ProjectResponse> {
		return this.http.get<ProjectResponse>(`${this.backendUrl}/projects`);
	}

	private getTemplates(): Observable<TemplateResponse> {
		return this.http.get<TemplateResponse>(`${this.backendUrl}/templates`);
	}

	announceTemplates() {
		this.getTemplates().subscribe(templateResponse => {
			this.templates.next(templateResponse.templates);
		});
	}

	buildProject(id: number, templateId: number): Promise<BuildResponse> {
		return firstValueFrom(
			this.http.post<BuildResponse>(`${this.backendUrl}/build`, {
				id,
				templateId
			}).pipe(delay(5000)),
		);
	}
}
