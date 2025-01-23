import { Project } from '../projects/types';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{project.title}</h1>
      <p className="text-lg text-gray-600">{project.description}</p>
      
      <div className="space-y-4">
        {project.links.map((link, index) => (
          <a
            key={index}
            href={link.type === 'github' ? `https://github.com/${link.text}` : link.text}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <span>{link.icon}</span>
            <span>{link.text}</span>
          </a>
        ))}
      </div>

      {project.walletInfo && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-700">{project.walletInfo.text}</p>
        </div>
      )}
    </div>
  );
}
