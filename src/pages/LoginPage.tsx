/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 * @description Login page for the app
 */

/**
 * Node modules
 */
import { SignIn } from '@clerk/clerk-react';

/**
 * Components
 */
import Head from '@/components/Head';

const LoginPage = () => {
  return (
    <>
      <Head title='Log In to Tasky AI – Manage Your To-Do Lists and Projects' />

      <section>
        <div className='container flex justify-center'>
          <SignIn signUpUrl='/register' />
        </div>
      </section>
    </>
  );
};

export default LoginPage;
