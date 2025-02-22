/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Top app bar component for the app
 */

/**
 * Node modules
 */
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

/**
 * Components
 */
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Kbd from '@/components/Kbd';

/**
 * Types
 */
type TopAppBarProps = {
  title: string;
  taskCount?: number;
};

const TopAppBar: React.FC<TopAppBarProps> = ({ title, taskCount }) => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const listener = () => setShowTitle(window.scrollY > 70);

    listener();
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, []);

  return (
    <div
      className={cn(
        'sticky z-40 bg-background top-0 h-14 grid grid-cols-[40px,minmax(0,1fr),40px] items-center px-4',
        showTitle && 'border-b',
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>

        <TooltipContent className='flex items-center'>
          <p>Toggle sidebar</p>

          <Kbd kbdList={['Ctrl', 'B']} />
        </TooltipContent>
      </Tooltip>

      <div
        className={cn(
          'max-w-[480px] mx-auto text-center transition-[transform,opacity]',
          showTitle ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        )}
      >
        <h1 className='font-semibold truncate'>{title}</h1>

        {Boolean(taskCount) && (
          <div className='text-xs text-muted-foreground'>{taskCount} tasks</div>
        )}
      </div>
    </div>
  );
};

export default TopAppBar;
