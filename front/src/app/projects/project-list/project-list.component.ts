import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, delay, map } from 'rxjs';
import { ProjectState } from 'src/app/models/project-models';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
	projects$?: Observable<ProjectState[]>;

	constructor(private readonly projectService: ProjectService) { }

	ngOnInit() {
		this.projects$ = this.projectService
			.getProjects()
			.pipe(
				map((projectData) => projectData.projects.map((project) => ({ project, buildedProject: "", error: "" })))
			);
	}
	
}
