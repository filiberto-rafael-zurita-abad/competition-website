interface ProjectsContainerProps {
  children: React.ReactNode;
}

export default function ProjectsContainer({ children }: ProjectsContainerProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-20"></div>
      {children}
    </div>
  );
}
