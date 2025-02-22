/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Task create button component for the app
 */

/**
 * Components
 */
import { Button } from '@/components/ui/button';

/**
 * Assets
 */
import { CirclePlus } from 'lucide-react';

/**
 * Types
 */

/**
 * How Omit works?
 * Omit is a utility type that removes properties from an object type.
 * It takes two type arguments: the object type and the keys to remove.
 * It returns a new object type with the specified keys removed.
 */
type TaskCreateButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'className'
>;

const TaskCreateButton: React.FC<TaskCreateButtonProps> = (props) => {
  return (
    <Button
      variant='link'
      className='w-full justify-start mb-4 px-0'
      {...props}
    >
      <CirclePlus /> Add task
    </Button>
  );
};

export default TaskCreateButton;
