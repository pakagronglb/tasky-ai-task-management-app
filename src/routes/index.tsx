/**
 * Node modules
 */
import { createBrowserRouter } from 'react-router';

/**
 * Pages
 */
import HomePage from '@/pages/HomePage';
import RegisterPage from '@/pages/RegisterPage';
import LoginPage from '@/pages/LoginPage';
import AuthSyncPage from '@/pages/AuthSyncPage';
import InboxPage from '@/pages/InboxPage';
import TodayTaskPage from '@/pages/TodayTaskPage';
import UpcomingTaskPage from '@/pages/UpcomingTaskPage';
import CompletedTaskPage from '@/pages/CompletedTaskPage';
import ProjectsPage from '@/pages/ProjectsPage';
import ProjectDetailPage from '@/pages/ProjectDetailPage';
import TestPage from '@/pages/TestPage';

/**
 * Layouts
 */
import RootLayout from '@/layouts/RootLayout';
import AppLayout from '@/layouts/AppLayout';

/**
 * Error boundaries
 */
import RootErrorBoundary from '@/pages/RootErrorBoundary';
import ProjectErrorBoundary from '@/pages/ProjectErrorBoundary';

/**
 * Actions
 */
import appAction from '@/routes/actions/appAction';
import projectAction from '@/routes/actions/projectAction';

/**
 * Loaders
 */
import inboxTaskLoader from '@/routes/loaders/inboxLoader';
import todayTaskLoader from '@/routes/loaders/todayTaskLoader';
import upcomingTaskLoader from '@/routes/loaders/upcomingTaskLoader';
import completedTaskLoader from '@/routes/loaders/completedTaskLoader';
import projectsLoader from '@/routes/loaders/projectsLoader';
import projectDetailLoader from '@/routes/loaders/projectDetailLoader';
import appLoader from '@/routes/loaders/appLoader';

/**
 * Types
 */
import type { RouteObject } from 'react-router';

const rootRouteChildren: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'auth-sync',
    element: <AuthSyncPage />,
  },
];

const appRouteChildren: RouteObject[] = [
  {
    path: 'inbox',
    element: <InboxPage />,
    loader: inboxTaskLoader,
  },
  {
    path: 'today',
    element: <TodayTaskPage />,
    loader: todayTaskLoader,
  },
  {
    path: 'upcoming',
    element: <UpcomingTaskPage />,
    loader: upcomingTaskLoader,
  },
  {
    path: 'completed',
    element: <CompletedTaskPage />,
    loader: completedTaskLoader,
  },
  {
    path: 'projects',
    element: <ProjectsPage />,
    action: projectAction,
    loader: projectsLoader,
  },
  {
    path: 'projects/:projectId',
    element: <ProjectDetailPage />,
    loader: projectDetailLoader,
    errorElement: <ProjectErrorBoundary />,
  },
  {
    path: 'test',
    element: <TestPage />,
  },
];

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: rootRouteChildren,
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: appRouteChildren,
    action: appAction,
    loader: appLoader,
  },
]);

export default router;
