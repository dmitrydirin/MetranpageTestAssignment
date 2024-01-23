import { Project, Template } from "./project-models";

export type ProjectResponse = {
  projects: Project[];
};

export type TemplateResponse = {
	templates: Template[];
};

export type BuildResponse = {
  buildedProject: string;
}
