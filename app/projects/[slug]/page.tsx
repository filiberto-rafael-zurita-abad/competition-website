import { Project } from '../types';
import { notFound } from 'next/navigation';
import ProjectDetails from '../components/ProjectDetails';
import AINewsReporter from '../components/AINewsReporter';

async function getProject(slug: string): Promise<Project | null> {
  const { projects } = await import('../data/projectsCards.json');
  return projects.find((p) => p.title.toLowerCase().replace(/ /g, '-') === slug) || null;
}

export async function generateStaticParams() {
  const { projects } = await import('../data/projectsCards.json');
  return projects.map((project) => ({
    slug: project.title.toLowerCase().replace(/ /g, '-'),
  }));
}

export default async function ProjectPage(props: { params: { slug: string } }) {
  // Create async context first
  await Promise.resolve();
  
  // Now safely destructure after await
  const { params } = props;
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {project.title === 'AI News Reporter' ? <AINewsReporter /> : <ProjectDetails project={project} />}
    </div>
  );
}
