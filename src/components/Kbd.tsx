/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Keyboard component for the app
 */

type KbdProps = {
  kbdList: string[];
};

const Kbd: React.FC<KbdProps> = ({ kbdList }) => {
  return (
    <div className='space-x-1'>
      <span className='sr-only'>Keyboard shortcut is, </span>

      {kbdList.map((item, index) => (
        <kbd
          key={index}
          className='inline-block px-1 py-0.5 bg-background/10 rounded-full'
        >
          {item}
        </kbd>
      ))}
    </div>
  );
};

export default Kbd;
