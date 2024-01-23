import { Component } from '@angular/core';
import { ProjectService } from 'src/app/projects/project.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent {

	constructor(private readonly projectService: ProjectService) {
		this.projectService.announceTemplates();
	}
}
