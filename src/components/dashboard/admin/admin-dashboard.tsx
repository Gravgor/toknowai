"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlusIcon, UserGroupIcon, AcademicCapIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import AddCourseModal from '@/components/dashboard/admin/add-course-modal';
import AddLessonModal from '@/components/dashboard/admin/add-lesson-modal';
import UserManagementTable from '@/components/dashboard/admin/user-managment-table';

type AdminDashboardProps = {
  user: {
    name: string;
    email: string;
  };
  statistics: {
    totalUsers: number;
    totalCourses: number;
    totalEarnings: number;
    monthlyEarnings: { month: string; earnings: number }[];
  };
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, statistics }) => {
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-purple-950 text-white pt-24 pb-8 px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard icon={<UserGroupIcon className="w-8 h-8" />} title="Total Users" value={statistics.totalUsers} />
          <StatCard icon={<AcademicCapIcon className="w-8 h-8" />} title="Total Courses" value={statistics.totalCourses} />
          <StatCard icon={<CurrencyDollarIcon className="w-8 h-8" />} title="Total Earnings" value={`$${statistics.totalEarnings.toLocaleString()}`} />
        </div>

        <div className="bg-purple-900 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Monthly Earnings</h2>
          
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="mt-8">
        <Link href="/admin/add-course" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200 inline-flex items-center">
          <PlusIcon className="w-5 h-5 mr-2" />
          Add New Course
        </Link>
      </div>
    
        </div>

        <div className="bg-purple-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <UserManagementTable />
        </div>

        <AddCourseModal isOpen={isAddCourseModalOpen} onClose={() => setIsAddCourseModalOpen(false)} />
        <AddLessonModal isOpen={isAddLessonModalOpen} onClose={() => setIsAddLessonModalOpen(false)} />
      </motion.div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number }> = ({ icon, title, value }) => (
  <div className="bg-purple-900 rounded-xl p-6 shadow-lg flex items-center">
    <div className="bg-purple-800 rounded-full p-3 mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;