import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/app/lib/userUtils';
import DashboardContent from '../ui/dashboard/DashboardContent';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return <DashboardContent user={user} />;
}