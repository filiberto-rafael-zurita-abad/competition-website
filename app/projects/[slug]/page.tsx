import { Project } from '../types';
import { notFound } from 'next/navigation';
import ProjectDetails from '../components/ProjectDetails';
import AINewsReporter from '../components/AINewsReporter';

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  // Process params synchronously first (Next.js requirement)
  const slug = params.slug;
  
  // Load project data asynchronously with proper typing
  const { projects } = await import('../data/projectsCards.json') as { projects: Project[] };
  
  // Find project with type-safe comparison
  const project = projects.find((p: Project) => 
    p.title.toLowerCase().replace(/ /g, '-') === slug.toLowerCase()
  ) || null;
  
  if (!project) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {project.title === 'AI News Reporter' ? <AINewsReporter /> : <ProjectDetails project={project} />}
    </div>
  );
}
