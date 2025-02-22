/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Upcoming task page for the app
 */

/**
 * Node modules
 */
import { useLoaderData } from 'react-router';

/**
 * Components
 */
import Head from '@/components/Head';
import TopAppBar from '@/components/TopAppBar';
import { Page, PageHeader, PageTitle, PageList } from '@/components/Page';
import TaskEmptyState from '@/components/TaskEmptyState';
import TaskCard from '@/components/TaskCard';

/**
 * Assets
 */
import { CheckCircle2 } from 'lucide-react';

/**
 * Types
 */
import type { Models } from 'appwrite';

const UpcomingTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title='Upcoming – Tasky AI' />

      <TopAppBar
        title='Upcoming'
        taskCount={tasks.total}
      />

      <Page>
        <PageHeader>
          <PageTitle>Upcoming</PageTitle>

          {tasks.total > 0 && (
            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
              <CheckCircle2 size={16} /> {tasks.total} tasks
            </div>
          )}
        </PageHeader>

        <PageList>
          {tasks.documents.map(
            ({ $id, content, completed, due_date, project }) => (
              <TaskCard
                key={$id}
                id={$id}
                content={content}
                completed={completed}
                dueDate={due_date}
                project={project}
              />
            ),
          )}

          {!tasks.total && <TaskEmptyState type='upcoming' />}
        </PageList>
      </Page>
    </>
  );
};

export default UpcomingTaskPage;
