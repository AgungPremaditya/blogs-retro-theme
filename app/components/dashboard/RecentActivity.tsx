interface ActivityItem {
  type: 'like' | 'comment' | 'post';
  title: string;
  time: string;
  icon: string;
}

export default function RecentActivity() {
  const recentActivity: ActivityItem[] = [
    {
      type: 'like',
      title: 'Mastering Tailwind CSS',
      time: '2 minutes ago',
      icon: '💚'
    },
    {
      type: 'comment',
      title: 'Building Accessible Web Applications',
      time: '15 minutes ago',
      icon: '💬'
    }
  ];

  return (
    <div className="col-span-1 bg-[#111] rounded-xl p-5">
      <h2 className="text-lg font-bold px-4 pb-4 border-b border-gray-800">Recent Activity</h2>
      <div className="space-y-5 mt-4">
        {recentActivity.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 px-4">
            <div className="w-8 h-8 bg-[#1c1c1c] rounded-lg flex items-center justify-center text-base">
              {activity.icon}
            </div>
            <div>
              <p className="text-xs leading-tight">
                {activity.type === 'like' && 'New like on "'}
                {activity.type === 'comment' && 'New comment on "'}
                {activity.type === 'post' && 'You created a new post "'}
                <span className="font-medium">{activity.title}</span>"
              </p>
              <p className="text-[11px] text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 