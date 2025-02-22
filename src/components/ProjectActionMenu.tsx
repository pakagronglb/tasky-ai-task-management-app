/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Project action menu component for the app
 */

/**
 * Components
 */
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import ProjectFormDialog from '@/components/ProjectFormDialog';
import { Button } from '@/components/ui/button';
import ProjectDeleteButton from '@/components/ProjectDeleteButton';

/**
 * Assets
 */
import { Edit } from 'lucide-react';

/**
 * Types
 */
import type { Project } from '@/types';
import type { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu';

interface ProjectActionMenuProps extends DropdownMenuContentProps {
  defaultFormData: Project;
}

const ProjectActionMenu: React.FC<ProjectActionMenuProps> = ({
  children,
  defaultFormData,
  ...props
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent {...props}>
        <DropdownMenuItem asChild>
          <ProjectFormDialog
            method='PUT'
            defaultFormData={defaultFormData}
          >
            <Button
              variant='ghost'
              size='sm'
              className='w-full justify-start px-2'
            >
              <Edit /> Edit
            </Button>
          </ProjectFormDialog>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <ProjectDeleteButton defaultFormData={defaultFormData} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectActionMenu;
