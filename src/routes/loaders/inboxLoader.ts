/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Loader function for inbox tasks
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
        Query.equal('completed', false), // Get only incomplete tasks
        Query.isNull('project'), // Get only tasks without a project
        Query.equal('userId', getUserId()) // Get only tasks for the current user
      ]
    )
  } catch (err) {
    console.log(err);
    throw new Error('Error getting inbox tasks');
  }
}

const inboxTaskLoader: LoaderFunction = async () => {
  const tasks = await getTasks();

  return { tasks }
}

export default inboxTaskLoader;