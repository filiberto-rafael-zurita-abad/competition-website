interface ProjectsGridContainerProps {
  children: React.ReactNode;
}

export default function ProjectsGridContainer({ children }: ProjectsGridContainerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      {children}
    </div>
  );
}
