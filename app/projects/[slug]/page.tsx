import { Project } from '../types';
import { notFound } from 'next/navigation';
import ProjectDetails from '../components/ProjectDetails';
import AINewsReporter from '../components/AINewsReporter';

async function getProject(slug: string): Promise<Project | null> {
  const { projects } = await import('../data/projectsCards.json');
  return projects.find((p) => p.title.toLowerCase().replace(/ /g, '-') === slug) || null;
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  
  if (!project) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {params.slug === 'ai-news-reporter' ? <AINewsReporter /> : <ProjectDetails project={project} />}
    </div>
  );
}
