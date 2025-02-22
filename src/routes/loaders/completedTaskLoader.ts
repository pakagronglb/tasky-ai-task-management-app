/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Loader function for completed tasks
 */

/**
 * Node modules
 */
import { databases, Query } from "@/lib/appwrite";

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
        Query.equal('completed', true), // Get only complete tasks
        Query.orderDesc('$updatedAt'), // Order by last updated
        Query.equal('userId', getUserId()) // Get only tasks for the current user
      ]
    )
  } catch (err) {
    console.log(err);
    throw new Error('Error getting completed tasks');
  }
}

const completedTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks }
}

export default completedTaskLoader;