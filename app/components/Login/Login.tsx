'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

type LoginProps = {
  onActionClick: (isLoggedIn: boolean) => void;
};

export default function Login({ onActionClick }: LoginProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  const URLS_WITH_NO_AVATAR = ['/auth/signin'];

  const handleLoginClick = () => {
    onActionClick(!!session);
    if (session) {
      signOut({ callbackUrl: '/' });
    } else {
      signIn(undefined, { callbackUrl: pathname });
    }
  };

  if (URLS_WITH_NO_AVATAR.includes(pathname)) {
    return null;
  }

  return (
    <button
      onClick={handleLoginClick}
      className="flex flex-nowrap gap-2 justify-center items-center"
    >
      <div className="w-[22px] h-[22px] fill-turquoise-200">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="User avatar"
            className="w-full h-full rounded-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs text-gray-600">
              {session?.user?.name?.charAt(0) || '?'}
            </span>
          </div>
        )}
      </div>
      <div className="flex relative whitespace-nowrap">
        {session ? 'Log Out' : 'Log In'}
      </div>
    </button>
  );
}
