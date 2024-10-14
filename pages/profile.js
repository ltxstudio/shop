// pages/profile.js
import { getSession } from 'next-auth/client';

const ProfilePage = ({ session }) => {
  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-bold">Profile</h2>
      <div className="my-4">
        <p>Name: {session.user.name}</p>
        <p>Email: {session.user.email}</p>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export default ProfilePage;
