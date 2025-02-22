/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Appwrite module for the app
 */

/**
 * Node modules
 */
import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Default Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const databases = new Databases(client);

export default client;

export { ID, Query }