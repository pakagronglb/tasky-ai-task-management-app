import { databases } from '@/lib/appwrite';
import { useAuth } from '@clerk/clerk-react';

interface EnvironmentTestResult {
  status: 'success' | 'error';
  message: string;
  details?: Record<string, unknown>;
}

export async function testEnvironment(): Promise<EnvironmentTestResult[]> {
  const results: EnvironmentTestResult[] = [];

  // Test Vercel environment
  const vercelEnv = {
    environment: process.env.VERCEL_ENV || 'development',
    url: process.env.VERCEL_URL,
    region: process.env.VERCEL_REGION,
    git: {
      commit: process.env.VERCEL_GIT_COMMIT_SHA,
      branch: process.env.VERCEL_GIT_COMMIT_REF,
    },
  };

  results.push({
    status: 'success',
    message: 'Vercel Environment',
    details: vercelEnv,
  });

  // Test environment variables
  const envVars = {
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteEndpoint: 'https://cloud.appwrite.io/v1', // Default Appwrite endpoint
    appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    clerkPublishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
    geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
  };

  // Check environment variables
  Object.entries(envVars).forEach(([key, value]) => {
    results.push({
      status: value ? 'success' : 'error',
      message: `${key}: ${value ? 'Present' : 'Missing'}`,
      details: value ? { value: `${value.substring(0, 4)}...` } : undefined,
    });
  });

  // Test Appwrite connection with error details
  try {
    await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'tasks',
      []
    );
    results.push({
      status: 'success',
      message: 'Appwrite Connection: Success',
      details: {
        database: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        endpoint: 'https://cloud.appwrite.io/v1',
        projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
      },
    });
  } catch (error) {
    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      name: error.name,
    } : 'Unknown error';

    results.push({
      status: 'error',
      message: 'Appwrite Connection: Failed',
      details: {
        error: errorDetails,
        config: {
          database: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          endpoint: 'https://cloud.appwrite.io/v1',
          projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
        },
      },
    });
  }

  // Test Gemini API with detailed error handling
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Test message",
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify({
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      }));
    }

    const data = await response.json();
    results.push({
      status: 'success',
      message: 'Gemini API: Success',
      details: {
        model: data.candidates?.[0]?.model || 'gemini-pro',
        responseStatus: response.status,
      },
    });
  } catch (error) {
    results.push({
      status: 'error',
      message: 'Gemini API: Failed',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
    });
  }

  return results;
}

export function TestEnvironmentComponent() {
  const { isLoaded, isSignedIn } = useAuth();

  return {
    clerk: {
      status: isLoaded ? 'success' : 'error',
      message: `Clerk: ${isLoaded ? 'Loaded' : 'Not Loaded'}`,
      details: {
        isSignedIn,
        environment: import.meta.env.MODE,
        timestamp: new Date().toISOString(),
      },
    },
  };
}

// Helper to check if we're in production
export const isProduction = import.meta.env.PROD;

// Helper to check if we're in development
export const isDevelopment = import.meta.env.DEV;

// Helper to check if we're in Vercel
export const isVercel = Boolean(process.env.VERCEL);

// Helper to get Vercel environment
export const vercelEnvironment = process.env.VERCEL_ENV; 