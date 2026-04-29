'use client';

import { useAuth } from '../context/AuthContext';
import { FiEdit2, FiMoreVertical, FiEye, FiCalendar } from 'react-icons/fi';
import TitleHeader from '../components/dashboard/TitleHeader';
import StatsCards from '../components/dashboard/StatsCards';
import RecentActivity from '../components/dashboard/RecentActivity';
import DashboardNavbar from '../components/dashboard/Navbar';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  const posts = [
    {
      title: 'Getting Started with Next.js',
      category: 'Development',
      status: 'Published',
      publishDate: '2024-03-20',
      views: 156,
    },
    {
      title: 'Understanding TypeScript Generics',
      category: 'TypeScript',
      status: 'Draft',
      publishDate: '-',
      views: 0,
    },
    {
      title: 'React Best Practices',
      category: 'React',
      status: 'Published',
      publishDate: '2024-03-15',
      views: 234,
    }
  ];
  
  return (
    <div className="min-h-screen bg-black text-white">
      <DashboardNavbar />
      <div className="px-32 py-6">
        <div className="max-w-[1200px] mx-auto space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {/* Left Section: Title and Stats */}
            <div className="col-span-3 bg-black rounded-xl flex flex-col justify-end min-h-[200px]">
              <TitleHeader />
              <StatsCards />
            </div>

            {/* Right Section: Recent Activity */}
            <RecentActivity />
          </div>

          {/* Posts List Section */}
          <div className="bg-[#111] rounded-xl overflow-hidden">
            <div className="px-12 py-4 border-b border-gray-800">
              <h2 className="text-lg font-bold">Post Lists</h2>
            </div>
            <div className="px-12 py-4">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full bg-black/20 border border-gray-800 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-y border-gray-800">
                    <tr>
                      <th className="text-left px-8 py-3 font-medium text-xs">Title</th>
                      <th className="text-left px-8 py-3 font-medium text-xs">Category</th>
                      <th className="text-left px-8 py-3 font-medium text-xs">Status</th>
                      <th className="text-left px-8 py-3 font-medium text-xs">Publish Date</th>
                      <th className="text-left px-8 py-3 font-medium text-xs">Views</th>
                      <th className="text-left px-8 py-3 font-medium text-xs">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-white/5">
                        <td className="px-8 py-3 text-sm">{post.title}</td>
                        <td className="px-8 py-3">
                          <span className="px-2.5 py-1 bg-purple-500/20 text-purple-500 rounded-full text-[11px]">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-8 py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                            post.status === 'Published' 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="px-8 py-3">
                          <div className="flex items-center gap-1 text-xs">
                            <FiCalendar className="text-gray-500" size={12} />
                            {post.publishDate}
                          </div>
                        </td>
                        <td className="px-8 py-3">
                          <div className="flex items-center gap-1 text-xs">
                            <FiEye className="text-gray-500" size={12} />
                            {post.views}
                          </div>
                        </td>
                        <td className="px-8 py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-gray-400 hover:text-white">
                              <FiEdit2 size={12} />
                            </button>
                            <button className="text-gray-400 hover:text-white">
                              <FiMoreVertical size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 