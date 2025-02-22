import { databases } from '@/lib/appwrite';
import { useAuth } from '@clerk/clerk-react';

interface EnvironmentTestResult {
  status: 'success' | 'error';
  message: string;
  details?: Record<string, unknown>;
}

export async function testEnvironment(): Promise<EnvironmentTestResult[]> {
  const results: EnvironmentTestResult[] = [];

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

  // Test Appwrite connection
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
      },
    });
  } catch (error) {
    results.push({
      status: 'error',
      message: 'Appwrite Connection: Failed',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });
  }

  // Test Gemini API
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
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
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    results.push({
      status: 'success',
      message: 'Gemini API: Success',
      details: {
        model: data.candidates?.[0]?.model || 'gemini-pro',
      },
    });
  } catch (error) {
    results.push({
      status: 'error',
      message: 'Gemini API: Failed',
      details: {
        error: error instanceof Error ? error.message : 'Unknown error',
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
      },
    },
  };
}

// Helper to check if we're in production
export const isProduction = import.meta.env.PROD;

// Helper to check if we're in development
export const isDevelopment = import.meta.env.DEV; 