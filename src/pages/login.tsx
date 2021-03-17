import Link from 'next/link';
import { useRouter } from 'next/router';

import LoginForm from '../components/forms/LoginForm';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  if (auth.isInitialized && auth.user && router.isReady) {
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {"Don't have an account? "}
            <Link href="/signup">
              <a className="text-blue-500">Sign Up</a>
            </Link>
          </p>
        </div>
        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
