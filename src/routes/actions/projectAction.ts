/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Project action for the app
 */

/**
 * Node modules
 */
import { redirect } from "react-router";

/**
 * Custom modules
 */
import { databases } from "@/lib/appwrite";
import { generateID, getUserId } from "@/lib/utils";
import { generateProjectTasks } from "@/api/googleAi";

/**
 * Environment variables
 */
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

/**
 * Types
 */
import type { ActionFunction } from "react-router";
import type { ProjectForm, Project } from "@/types";
import type { Models } from "appwrite";

type aiGenTask = {
  content: string;
  due_date: Date | null;
}

const createProject = async (data: ProjectForm) => {
  let project: Models.Document | null = null;
  const aiTaskGen = data.ai_task_gen;
  const taskGenPrompt = data.task_gen_prompt;

  let aiGeneratedTasks: aiGenTask[] = [];

  try {
    project = await databases.createDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      generateID(),
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex,
        userId: getUserId()
      }
    );
  } catch (err) {
    console.log('Error creating project: ', err);
  }

  /**
   * Generate tasks using AI
   * If AI task generation is enabled
   */
  if (aiTaskGen) {
    try {
      aiGeneratedTasks = JSON.parse(await generateProjectTasks(taskGenPrompt) || '');
    } catch (err) {
      console.log('Error generating tasks: ', err);
    }
  }

  /**
   * Create project tasks
   * If AI task generation is enabled
   * and tasks are generated
   */
  if (aiGeneratedTasks.length) {
    const promises = aiGeneratedTasks.map((task) => {
      return databases.createDocument(
        APPWRITE_DATABASE_ID,
        'tasks',
        generateID(),
        {
          ...task,
          project: project?.$id,
          userId: getUserId()
        }
      );
    });

    try {
      await Promise.all(promises);
    } catch (err) {
      console.log('Error creating project tasks: ', err);
    }
  }

  return redirect(`/app/projects/${project?.$id}`);
}

const updateProject = async (data: Project) => {
  const documentId = data.id;

  if (!documentId) throw new Error('Project id not found.');

  try {
    return await databases.updateDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId,
      {
        name: data.name,
        color_name: data.color_name,
        color_hex: data.color_hex
      }
    );
  } catch (err) {
    console.log('Error updating project: ', err);
  }
}

const deleteProject = async (data: Project) => {
  const documentId = data.id;

  if (!documentId) throw new Error('No project found with this id.');

  try {
    await databases.deleteDocument(
      APPWRITE_DATABASE_ID,
      'projects',
      documentId
    );
  } catch (err) {
    console.log('Error deleting project: ', err);
  }
}

const projectAction: ActionFunction = async ({ request }) => {
  const method = request.method;
  const data = await request.json() as ProjectForm;

  if (method === 'POST') {
    return await createProject(data);
  }

  if (method === 'PUT') {
    return await updateProject(data);
  }

  if (method === 'DELETE') {
    return await deleteProject(data);
  }

  throw new Error('Invalid method');
}

export default projectAction;