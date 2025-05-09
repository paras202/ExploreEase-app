import { auth } from '@clerk/nextjs/server';
import TourismCalendar from '@/app/ui/scheduler/Events';
import { redirect } from 'next/navigation';

export default async function SchedulerPage() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <TourismCalendar userId={userId} />;
}