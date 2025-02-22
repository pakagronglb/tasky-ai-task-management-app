/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Project context for the app
 */

/**
 * Node modules
 */
import { createContext, useContext } from 'react';

/**
 * Types
 */
import type { Models } from 'appwrite';

type ProjectProviderProps = {
  projects: Models.DocumentList<Models.Document>;
  children: React.ReactNode;
};

const ProjectContext =
  createContext<Models.DocumentList<Models.Document> | null>(null);

export const ProjectProvider: React.FC<ProjectProviderProps> = ({
  projects,
  children,
}) => {
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
