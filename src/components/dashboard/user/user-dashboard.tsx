"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpenIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

type UserDashboardProps = {
  user: {
    name: string;
    email: string;
    enrollments: {
      course: {
        id: string;
        title: string;
        description: string;
      };
    }[];
  };
};

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
  return (
    <div className="min-h-screen bg-purple-950 text-white pt-24 pb-8 px-8"> {/* Added pt-24 for top padding */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}!</h1>
        <div className="bg-purple-900 rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
          {user.enrollments.length === 0 ? (
            <p className="text-purple-300">You are not enrolled in any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.enrollments.map(({ course }) => (
                <motion.div
                  key={course.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-purple-800 rounded-lg p-4 shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-purple-300 mb-4">{course.description}</p>
                  <Link
                    href={`/course/${course.id}`}
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
                  >
                    <BookOpenIcon className="w-5 h-5 mr-2" />
                    Continue Learning
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-purple-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Learning Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/courses"
              className="bg-purple-800 rounded-lg p-4 shadow-md hover:bg-purple-700 transition-colors duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <AcademicCapIcon className="w-6 h-6 mr-2" />
                Browse All Courses
              </h3>
              <p className="text-purple-300">Discover new courses and expand your knowledge.</p>
            </Link>
            <Link
              href="/progress"
              className="bg-purple-800 rounded-lg p-4 shadow-md hover:bg-purple-700 transition-colors duration-200"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-2" />
                View Learning Progress
              </h3>
              <p className="text-purple-300">Track your learning journey and achievements.</p>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDashboard;