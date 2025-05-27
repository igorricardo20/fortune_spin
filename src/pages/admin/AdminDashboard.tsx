import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome to the admin dashboard. This is a placeholder component that will be implemented with full administrative features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;