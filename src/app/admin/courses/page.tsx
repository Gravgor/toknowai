import React from 'react';
import { getCourses } from '@/actions/adminActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';

export default async function AdminCoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-purple-950 text-white pt-24 pb-8 px-8">      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Admin Courses</h1>
        <Link href="/admin/courses/add">
          <Button>
            <PlusIcon className="w-5 h-5 mr-2" />
            Add New Course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/admin/courses/${course.id}`}>
            <div className="bg-purple-800 rounded-lg shadow-lg p-6 hover:bg-purple-700 transition-colors">
              <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">{course.title}</h2>
              <p className="text-purple-200 mb-2">{course.description.substring(0, 100)}...</p>
              <p className="text-purple-300">Price: ${course.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}