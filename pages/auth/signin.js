import { signIn } from 'next-auth/client';

export default function SignIn() {
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        signIn('google');
      }}>
        <button type="submit">Sign In with Google</button>
      </form>
    </div>
  );
}
