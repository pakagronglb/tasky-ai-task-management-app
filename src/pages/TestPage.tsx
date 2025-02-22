import { useEffect, useState } from 'react';
import { testEnvironment, TestEnvironmentComponent, isProduction } from '@/utils/test-environment';

const TestPage = () => {
  const [results, setResults] = useState<Awaited<ReturnType<typeof testEnvironment>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clerkStatus = TestEnvironmentComponent();

  useEffect(() => {
    const runTests = async () => {
      try {
        const testResults = await testEnvironment();
        setResults(testResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    runTests();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Environment Test Results</h1>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
          <p className="font-bold">Environment: {isProduction ? 'Production' : 'Development'}</p>
          <p className="text-sm">Testing API connections and environment variables</p>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      <div className="grid gap-4">
        {/* Clerk Status */}
        <div className={`p-4 rounded-md border ${
          clerkStatus.clerk.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{clerkStatus.clerk.message}</h3>
            <span className={`px-2 py-1 rounded text-sm ${
              clerkStatus.clerk.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {clerkStatus.clerk.status}
            </span>
          </div>
          {clerkStatus.clerk.details && (
            <pre className="mt-2 text-sm bg-black/5 p-2 rounded">
              {JSON.stringify(clerkStatus.clerk.details, null, 2)}
            </pre>
          )}
        </div>

        {/* API Test Results */}
        {results.map((result, index) => (
          <div
            key={index}
            className={`p-4 rounded-md border ${
              result.status === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{result.message}</h3>
              <span className={`px-2 py-1 rounded text-sm ${
                result.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {result.status}
              </span>
            </div>
            {result.details && (
              <pre className="mt-2 text-sm bg-black/5 p-2 rounded">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestPage; 