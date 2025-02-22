/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Project form dialog component for the app
 */

/**
 * Node modules
 */
import { useState } from 'react';
import { useFetcher } from 'react-router';

/**
 * Custom modules
 */
import { truncateString } from '@/lib/utils';

/**
 * Components
 */
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import ProjectForm from '@/components/ProjectForm';

/**
 * Hooks
 */
import { useToast } from '@/hooks/use-toast';

/**
 * Types
 */
import type { Project } from '@/types';

type ProjectFormDialogProps = {
  defaultFormData?: Project;
  children: React.ReactNode;
  method: 'POST' | 'PUT';
};

const ProjectFormDialog: React.FC<ProjectFormDialogProps> = ({
  defaultFormData,
  children,
  method,
}) => {
  const fetcher = useFetcher();
  const { toast } = useToast();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className='p-0 border-0 !rounded-xl'>
        <ProjectForm
          mode={method === 'POST' ? 'create' : 'edit'}
          defaultFormData={defaultFormData}
          onCancel={() => setOpen(false)}
          onSubmit={async (data) => {
            setOpen(false);

            const { id, update } = toast({
              title: `${method === 'POST' ? 'Creating' : 'Updating'} project...`,
              duration: Infinity,
            });

            await fetcher.submit(JSON.stringify(data), {
              action: '/app/projects',
              method,
              encType: 'application/json',
            });

            update({
              id,
              title: `Project ${method === 'POST' ? 'created' : 'updated'}.`,
              description: `The project ${truncateString(data.name, 32)} ${data.ai_task_gen ? 'and its tasks' : ''} have been successfully ${method === 'POST' ? 'created' : 'updated'}.`,
              duration: 5000,
            });
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProjectFormDialog;
