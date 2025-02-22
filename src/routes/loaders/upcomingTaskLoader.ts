/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Loader function for upcoming tasks
 */

/**
 * Node modules
 */
import { databases, Query } from "@/lib/appwrite";
import { startOfToday } from "date-fns";

/**
 * Custom modules
 */
import { getUserId } from "@/lib/utils";

/**
 * Types
 */
import type { LoaderFunction } from "react-router";

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID

const getTasks = async () => {
  try {
    return await databases.listDocuments(
      APPWRITE_DATABASE_ID,
      'tasks',
      [
        Query.equal('completed', false), // Get only incomplete tasks
        Query.isNotNull('due_date'), // Get tasks with due dates
        Query.greaterThanEqual('due_date', startOfToday().toISOString()), // Get tasks due today or later
        Query.orderAsc('due_date'), // Order tasks by due date
        Query.equal('userId', getUserId()) // Get only tasks for the current user
      ]
    )
  } catch (err) {
    console.log(err);
    throw new Error('Error getting upcoming tasks');
  }
}

const upcomingTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks }
}

export default upcomingTaskLoader;