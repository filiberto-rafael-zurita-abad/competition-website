import { UserButton } from "@clerk/nextjs";
import Sidebar from "../components/Sidebar";
import ServiceGrid from "../components/ServiceGrid";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900">Welcome to your dashboard!</h2>
            <p className="mt-2 text-gray-600">
              This is a protected page. You can only see this if you&#39;re signed in.
            </p>
          </div>

          <ServiceGrid />
        </main>
      </div>
    </div>
  );
}
