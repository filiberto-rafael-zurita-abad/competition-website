import projectsData from './data/projectsCards.json';
import ProjectCards from './containers/ProjectCards';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Projects</h1>
        <ProjectCards projects={projectsData.projects} />
      </div>
    </div>
  );
}
