import { Project, Link } from '../types';

interface ProjectCardsProps {
  projects: Project[];
}

export default function ProjectCards({ projects }: ProjectCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
          <p className="text-gray-600">{project.description}</p>

          <ul className="my-4 space-y-3">
            {project.links.map((link, i) => (
              <li key={i}>
                <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                  {link.icon === 'github' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63.06 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.45.55.38 3.17-1.07 5.46-4.06 5.46-7.58C16 3.58 12.42 0 8 0z"/>
                    </svg>
                  ) : (
                    <span>{link.icon}</span>
                  )}
                  <span className="flex-1 ms-3 whitespace-nowrap">{link.text}</span>
                  {link.tag && (
                    <span className={`inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium rounded ${
                      link.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {link.isAvailable ? 'Available' : 'Unavailable'}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div>
            <a href="#" className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline">
              <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              {project.walletInfo.text}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
