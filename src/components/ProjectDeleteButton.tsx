/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Project delete button component for the app
 */

/**
 * Node modules
 */
import { useFetcher, useNavigate, useLocation } from 'react-router';
import { useCallback } from 'react';

/**
 * Custom modules
 */
import { truncateString } from '@/lib/utils';

/**
 * Components
 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

/**
 * Hooks
 */
import { useToast } from '@/hooks/use-toast';

/**
 * Assets
 */
import { Trash2 } from 'lucide-react';

/**
 * Types
 */
import type { Project } from '@/types';

type ProjectDeleteButtonProps = {
  defaultFormData: Project;
};

const ProjectDeleteButton: React.FC<ProjectDeleteButtonProps> = ({
  defaultFormData,
}) => {
  const fetcher = useFetcher();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProjectDelete = useCallback(async () => {
    // Navigate to inbox page if deleting project from project details page (to avoid 404)
    if (location.pathname === `/app/projects/${defaultFormData.id}`) {
      navigate('/app/inbox');
    }

    const { id, update } = toast({
      title: 'Deleting project...',
      duration: Infinity,
    });

    try {
      await fetcher.submit(defaultFormData, {
        action: '/app/projects',
        method: 'DELETE',
        encType: 'application/json',
      });

      update({
        id,
        title: 'Project deleted',
        description: `The project ${truncateString(defaultFormData.name, 32)} has been successfully deleted.`,
        duration: 5000,
      });
    } catch (err) {
      console.log('Error deleting project: ', err);
      update({
        id,
        title: 'Error deleting project',
        description: `An error occurred while deleting the project.`,
        duration: 5000,
      });
    }
  }, [defaultFormData]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className='w-full justify-start px-2 !text-destructive'
        >
          <Trash2 /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>

          <AlertDialogDescription>
            The <strong>{truncateString(defaultFormData.name, 48)}</strong>{' '}
            project and all of its tasks will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleProjectDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ProjectDeleteButton;
