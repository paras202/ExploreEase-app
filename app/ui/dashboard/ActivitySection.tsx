import React from 'react';
import { Button, Timeline, Badge } from 'flowbite-react';
import { 
  HiShoppingCart, 
  HiHeart, 
  HiCog,
  HiOutlineChartPie 
} from 'react-icons/hi';

const ActivitySection = () => {
  const activities = [
    {
      id: 1,
      type: 'purchase',
      description: 'Purchased Product XYZ',
      date: new Date('2024-03-22'),
      icon: HiShoppingCart,
      color: 'success'
    },
    {
      id: 2,
      type: 'wishlist',
      description: 'Added item to wishlist',
      date: new Date('2024-03-21'),
      icon: HiHeart,
      color: 'pink'
    },
    {
      id: 3,
      type: 'settings',
      description: 'Updated account settings',
      date: new Date('2024-03-20'),
      icon: HiCog,
      color: 'gray'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Recent Activity
        </h2>
        <Badge color="info">
          <HiOutlineChartPie className="mr-1 h-4 w-4" />
          Activity Log
        </Badge>
      </div>

      <Timeline>
        {activities.map((activity) => (
          <Timeline.Item key={activity.id}>
            <Timeline.Point icon={activity.icon} />
            <Timeline.Content>
              <Timeline.Time>
                {activity.date.toLocaleDateString()} at{' '}
                {activity.date.toLocaleTimeString()}
              </Timeline.Time>
              <Timeline.Title>
                {activity.description}
              </Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>

      <div className="flex justify-center">
        <Button color="gray" size="sm">
          View All Activity
        </Button>
      </div>
    </div>
  );
};

export default ActivitySection;