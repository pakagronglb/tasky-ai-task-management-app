/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Sidebar component for the app
 */

/**
 * Node modules
 */
import { Link, useLocation, useLoaderData } from 'react-router';

/**
 * Components
 */
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarGroupAction,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import Logo from '@/components/Logo';
import { UserButton } from '@clerk/clerk-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import TaskFormDialog from '@/components/TaskFormDialog';
import ProjectFormDialog from '@/components/ProjectFormDialog';
import ProjectActionMenu from '@/components/ProjectActionMenu';

/**
 * Hooks
 */
import { useSidebar } from '@/components/ui/sidebar';
import { useProjects } from '@/contexts/ProjectContext';

/**
 * Constants
 */
import { SIDEBAR_LINKS } from '@/constants';

/**
 * Assets
 */
import {
  CirclePlus,
  Plus,
  ChevronRight,
  Hash,
  MoreHorizontal,
} from 'lucide-react';

/**
 * Types
 */
import type { AppLoaderData } from '@/routes/loaders/appLoader';

const AppSidebar = () => {
  const location = useLocation();
  const projects = useProjects();

  const { taskCounts } = useLoaderData() as AppLoaderData;

  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to='/app/inbox'
          className='p-2'
        >
          <Logo />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Task create button */}
              <SidebarMenuItem>
                <TaskFormDialog>
                  <SidebarMenuButton className='!text-primary'>
                    <CirclePlus /> Add task
                  </SidebarMenuButton>
                </TaskFormDialog>
              </SidebarMenuItem>

              {/* Sidebar links */}
              {SIDEBAR_LINKS.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.href}
                    onClick={() => {
                      if (isMobile) setOpenMobile(false);
                    }}
                  >
                    <Link to={item.href}>
                      <item.icon />

                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>

                  {/* Show task count in inbox menu items */}
                  {item.href === '/app/inbox' &&
                    Boolean(taskCounts.inboxTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts.inboxTasks}
                      </SidebarMenuBadge>
                    )}

                  {item.href === '/app/today' &&
                    Boolean(taskCounts.todayTasks) && (
                      <SidebarMenuBadge>
                        {taskCounts.todayTasks}
                      </SidebarMenuBadge>
                    )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* All projects */}
        <Collapsible
          defaultOpen
          className='group/collapsible'
        >
          <SidebarGroup>
            <SidebarGroupLabel
              asChild
              className='text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
            >
              <CollapsibleTrigger>
                <ChevronRight className='me-2 transition-transform group-data-[state=open]/collapsible:rotate-90' />
                Projects
              </CollapsibleTrigger>
            </SidebarGroupLabel>

            {/* Project create button */}
            <Tooltip>
              <ProjectFormDialog method='POST'>
                <TooltipTrigger asChild>
                  <SidebarGroupAction aria-label='Add project'>
                    <Plus />
                  </SidebarGroupAction>
                </TooltipTrigger>
              </ProjectFormDialog>

              <TooltipContent side='right'>Add project</TooltipContent>
            </Tooltip>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {projects?.documents
                    .slice(0, 5)
                    .map(({ $id, name, color_name, color_hex }) => (
                      <SidebarMenuItem key={$id}>
                        <SidebarMenuButton
                          asChild
                          isActive={
                            location.pathname === `/app/projects/${$id}`
                          }
                          onClick={() => {
                            if (isMobile) setOpenMobile(false);
                          }}
                        >
                          <Link to={`/app/projects/${$id}`}>
                            <Hash color={color_hex} />

                            <span>{name}</span>
                          </Link>
                        </SidebarMenuButton>

                        <ProjectActionMenu
                          defaultFormData={{
                            id: $id,
                            name,
                            color_name,
                            color_hex,
                          }}
                          side='right'
                          align='start'
                        >
                          <SidebarMenuAction
                            aria-label='More actions'
                            showOnHover
                            className='bg-sidebar-accent'
                          >
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </ProjectActionMenu>
                      </SidebarMenuItem>
                    ))}

                  {projects !== null && projects.total > 5 && (
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        className='text-muted-foreground'
                        isActive={location.pathname === '/app/projects'}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                      >
                        <Link to='/app/projects'>
                          <MoreHorizontal /> All projects
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}

                  {!projects?.total && (
                    <SidebarMenuItem>
                      <p className='text-muted-foreground text-sm p-2'>
                        Click + to add some projects
                      </p>
                    </SidebarMenuItem>
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter>
        <UserButton
          showName
          appearance={{
            elements: {
              rootBox: 'w-full',
              userButtonTrigger:
                '!shadow-none w-full justify-start p-2 rounded-md hover:bg-sidebar-accent',
              userButtonBox: 'flex-row-reverse shadow-none gap-2',
              userButtonOuterIdentifier: 'ps-0',
              popoverBox: 'pointer-events-auto',
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
