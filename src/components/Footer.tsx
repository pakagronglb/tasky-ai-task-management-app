

/**
 * Components
 */
import { Separator } from '@/components/ui/separator';

/**
 * Constants
 */
import { SOCIAL_LINKS } from '@/constants';

const Footer = () => {
  return (
    <footer className='p-4 pb-0'>
      <div className='container min-h-16 py-4 bg-background border border-b-0 rounded-t-xl flex flex-col gap-3 items-center lg:flex-row lg:justify-between'>
        <p className='text-center text-sm'>&copy; 2025 Pakagrong Lebel</p>

        <ul className='flex flex-wrap items-center'>
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li
              key={index}
              className='flex items-center'
            >
              <a
                href={href}
                className='text-sm text-muted-foreground hover:text-foreground'
                target='_blank'
              >
                {label}
              </a>

              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator
                  orientation='vertical'
                  className='h-3 mx-3'
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
