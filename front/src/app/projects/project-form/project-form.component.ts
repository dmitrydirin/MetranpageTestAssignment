import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ProjectState, Template } from 'src/app/models/project-models';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-project-form',
	templateUrl: './project-form.component.html',
	styleUrls: ['./project-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent {

	@Input() projectState?: ProjectState;
	templates$?: Observable<Template[] | null>;

	templateId?: number;

	processing:boolean = false;

	constructor(
		private readonly projectService: ProjectService,
		private readonly _changeDetector: ChangeDetectorRef
	) {
		this.templates$ = projectService.templates$;
	}

	async buildProject() {
		if (!this.projectState || !this.templateId) {
			return;
		}

		this.processing = true;

		try {
			const result = await this.projectService.buildProject(this.projectState.project.id, this.templateId);

			this.projectState.buildedProject = result.buildedProject;
		} catch (e) {
			console.error(e);
			this.projectState.error = "Something went wrong";
		}
		finally {
			this.processing = false;
			this._changeDetector.markForCheck();
		}
	}
}
