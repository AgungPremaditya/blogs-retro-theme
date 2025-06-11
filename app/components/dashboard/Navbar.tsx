import Image from 'next/image';
import { useAuth } from '../../context/AuthContext';

export default function DashboardNavbar() {
  const { user } = useAuth();

  console.log(user);

  return (
    <nav className="w-full bg-[#111] border-b border-gray-800">
      <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-end">
        <button 
          className="w-9 h-9 rounded-full bg-[#1c1c1c] flex items-center justify-center overflow-hidden"
          title={user?.username || 'Profile'}
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/avatar-placeholder.png"
              alt="Profile"
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          )}
        </button>
      </div>
    </nav>
  );
} 