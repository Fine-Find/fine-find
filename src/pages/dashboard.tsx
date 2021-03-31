import { useSession } from 'next-auth/client';

import DashboardLayout from '../components/DashboardLayout';
import InstagramLoginButton from '../components/Instagram/InstagramLoginButton';
import { useRequireAuth } from '../hooks/useRequireAuth';

const Loading = () => {
  return (
    <div id="skeleton">
      <div className="ion-padding">
        <ion-skeleton-text animated></ion-skeleton-text>
      </div>
    </div>
  );
};

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();

  const [session, loading] = useSession();

  if (!auth.isInitialized || loading) return <>{Loading()}</>;

  return (
    <DashboardLayout>
      <div className="min-h-screen flex bg-gray-200">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center mt-24">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {`Welcome ${auth.user.name}!`}
            </h2>
            <p className="mt-2 text-center text-md text-gray-600">
              {`You are logged in with ${auth.user.email}`}
            </p>
            <button
              onClick={() => auth.signOut()}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Sign out
            </button>
            {session && session.accessToken ? (
              <p>Connected to {session.user.name}'s Instagram account</p>
            ) : (
              <InstagramLoginButton />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default DashBoardPage;
