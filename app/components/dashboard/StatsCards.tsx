interface StatsCardProps {
  title: string;
  value: number;
  change: number;
  timeframe: string;
}

function StatsCard({ title, value, change, timeframe }: StatsCardProps) {
  return (
    <div className="bg-[#111] px-10 py-4 rounded-xl">
      <h2 className="text-gray-400 text-sm mb-2">{title}</h2>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-green-500 text-xs">+{change} {timeframe}</p>
    </div>
  );
}

export default function StatsCards() {
  const stats = [
    { title: 'Total Posts', value: 10, change: 2, timeframe: 'from last week' },
    { title: 'Total Comments', value: 4, change: 5, timeframe: 'from last week' },
    { title: 'Total Likes', value: 32, change: 4, timeframe: 'from last week' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
} 