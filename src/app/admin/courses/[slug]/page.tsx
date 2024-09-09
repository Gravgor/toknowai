import React from 'react';
import { getCourseById } from '@/actions/adminActions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PencilIcon } from '@heroicons/react/24/outline';

export default async function AdminCoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourseById(params.slug);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-purple-950 text-white pt-24 pb-8 px-8">
      <div className="bg-purple-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">{course.title}</h1>
          <Link href={`/admin/courses/${course.id}/edit`}>
            <Button>
              <PencilIcon className="w-5 h-5 mr-2" />
              Edit Course
            </Button>
          </Link>
        </div>
        <img src={course.imageUrl} alt={course.title} className="w-full h-64 object-cover rounded-md mb-4" />
        <p className="text-purple-200 mb-4">{course.description}</p>
        <p className="text-purple-300 mb-2">Price: ${course.price}</p>
        <p className="text-purple-300 mb-2">Category: {course.category}</p>
        <p className="text-purple-300 mb-2">Level: {course.level}</p>
        <p className="text-purple-300 mb-4">Featured: {course.isFeatured ? 'Yes' : 'No'}</p>
        <h2 className="text-2xl font-semibold text-white mb-4">Lessons</h2>
        <ul className="space-y-2">
          {course.lessons.map((lesson) => (
            <li key={lesson.id} className="bg-purple-700 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
              <p className="text-purple-200">{lesson.content.substring(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}