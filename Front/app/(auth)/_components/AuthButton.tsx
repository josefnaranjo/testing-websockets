'use client';

import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const AuthButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/signin');
  };

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

//Currently Not being Used
