import React from 'react';
import { getCourseById } from '@/actions/adminActions';
import CourseForm from '@/components/dashboard/admin/add-course-form';

export default async function EditCoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourseById(params.slug);

  if (!course) {
    return <div>Course not found</div>;
  }

  const initialData = {
    title: course.title,
    description: course.description,
    price: course.price,
    category: course.category,
    level: course.level,
    isFeatured: course.isFeatured,
    lessons: course.lessons.map(lesson => ({
      title: lesson.title,
      content: lesson.content,
    })),
  };

  const initialDataWithImage = {
    ...initialData,
    image: '',
  };

  return (
    <div className="min-h-screen bg-purple-950 text-white pt-24 pb-8 px-8">
        <CourseForm initialData={initialDataWithImage} courseId={course.id} />
    </div>
  )
}