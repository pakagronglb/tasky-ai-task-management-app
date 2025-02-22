/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Completed task page for the app
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
 * Types
 */
import type { Models } from 'appwrite';

const CompletedTaskPage = () => {
  const { tasks } = useLoaderData<{
    tasks: Models.DocumentList<Models.Document>;
  }>();

  return (
    <>
      <Head title='Completed – Tasky AI' />

      <TopAppBar title='Completed' />

      <Page>
        <PageHeader>
          <PageTitle>Completed</PageTitle>
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

          {!tasks.total && <TaskEmptyState type='completed' />}
        </PageList>
      </Page>
    </>
  );
};

export default CompletedTaskPage;
