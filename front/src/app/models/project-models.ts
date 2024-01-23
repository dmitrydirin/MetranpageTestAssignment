export type Project = {
	id: number;
};

export type Template = {
	id: number;
	arg1: string;
	arg2: string;
};

export type ProjectState = {
	project: Project;
	buildedProject: string;
	error: string;
};