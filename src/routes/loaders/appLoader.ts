/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Loader function for the app
 */

/**
 * Node modules
 */
import { databases, Query } from "@/lib/appwrite";
import { startOfToday, startOfTomorrow } from "date-fns";
import { redirect } from "react-router";

/**
 * Custom modules
 */
import { getUserId } from "@/lib/utils";

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

/**
 * Types
 */
import type { LoaderFunction } from "react-router";
import type { Models } from "appwrite";

type TaskCounts = {
  inboxTasks: number;
  todayTasks: number;
}

export type AppLoaderData = {
  projects: Models.DocumentList<Models.Document>;
  taskCounts: TaskCounts
}

const getProjects = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'projects',
      [
        Query.select(['$id', 'name', 'color_name', 'color_hex', '$createdAt']),
        Query.orderDesc('$createdAt'),
        Query.limit(100),
        Query.equal('userId', getUserId())
      ]
    );
  } catch (err) {
    console.log('Error getting projects: ', err);
    throw new Error('Error getting projects');
  }
}

const getTaskCounts = async () => {
  const taskCounts: TaskCounts = {
    inboxTasks: 0,
    todayTasks: 0
  }

  try {
    const { total: totalInboxTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'tasks',
      [
        Query.select(['$id']),
        Query.isNull('project'),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId())
      ]
    );

    taskCounts.inboxTasks = totalInboxTasks;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting inbox task counts');
  }

  try {
    const { total: totalTodayTasks } = await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'tasks',
      [
        Query.select(['$id']),
        Query.and([
          Query.greaterThanEqual('due_date', startOfToday().toISOString()),
          Query.lessThan('due_date', startOfTomorrow().toISOString())
        ]),
        Query.equal('completed', false),
        Query.limit(1),
        Query.equal('userId', getUserId())
      ]
    );

    taskCounts.todayTasks = totalTodayTasks;
  } catch (err) {
    console.log(err);
    throw new Error('Error getting inbox task counts');
  }

  return taskCounts;
}

const appLoader: LoaderFunction = async () => {
  const userId = getUserId();

  if (!userId) return redirect('/login');

  const projects = await getProjects();
  const taskCounts = await getTaskCounts();

  return { projects, taskCounts }
}

export default appLoader;