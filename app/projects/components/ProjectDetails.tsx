import { Project } from '../types';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="min-h-screen pt-16">
      <h1 className="text-4xl font-bold">{project.title}</h1>
    </div>
  );
}
