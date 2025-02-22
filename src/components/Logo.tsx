

/**
 * Assets
 */
import { logo } from '@/assets';

const Logo = () => {
  return (
    <div className='flex items-center gap-3 font-semibold text-lg'>
      <img
        src={logo}
        alt='Tasky AI'
        className='w-6 h-6'
      />
      Tasky AI
    </div>
  );
};

export default Logo;
