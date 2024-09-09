"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusIcon, TrashIcon, BookOpenIcon, TagIcon, AcademicCapIcon, CurrencyDollarIcon, StarIcon } from '@heroicons/react/24/outline';
import { createCourse, updateCourse } from '@/actions/adminActions';
import { useRouter } from 'next/navigation';
import { Level } from '@prisma/client';

type FormData = {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  level: Level;
  isFeatured: boolean;
  lessons: {
    title: string;
    content: string;
  }[];
};

type CourseFormProps = {
  initialData?: FormData;
  courseId?: string;
};

const CourseForm: React.FC<CourseFormProps> = ({ initialData, courseId }) => {
  const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
    defaultValues: initialData || {
      lessons: [{ title: '', content: '' }],
      isFeatured: false,
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons"
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('category', data.category);
    formData.append('level', data.level);
    formData.append('isFeatured', data.isFeatured.toString());

    // Handle image upload
    if (data.image && data.image.length > 0) {
      formData.append('image', data.image[0]);
    } else if (initialData?.image) {
      formData.append('currentImageUrl', initialData.image);
    }

    // Add lessons
    formData.append('lessonCount', data.lessons.length.toString());
    data.lessons.forEach((lesson, index) => {
      formData.append(`lessons.${index}.title`, lesson.title);
      formData.append(`lessons.${index}.content`, lesson.content);
    });
    try {
      let result;
      if (courseId) {
        result = await updateCourse(courseId, formData);
      } else {
        result = await createCourse(formData);
      }
      if (result.success) {
        router.push(`/admin/courses/${result.courseId}`);
      } else {
        console.error('Failed to save course:', result.error);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error saving course:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-purple-900 p-8 rounded-xl shadow-2xl"
    >
      <h1 className="text-4xl font-bold mb-8 text-white flex items-center">
        <BookOpenIcon className="w-10 h-10 mr-4" />
        {courseId ? 'Edit Course' : 'Add New Course'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-purple-800 p-6 rounded-lg">
          <label className="block mb-2 text-lg font-semibold text-white">Course Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('image', { required: 'Course image is required' })}
            onChange={handleImageChange}
            className="mb-2 text-white"
          />
          {imagePreview && (
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={imagePreview} 
              alt="Course preview" 
              className="w-full max-w-md h-auto rounded-lg mt-4" 
            />
          )}
          {errors.image && <p className="text-red-400 text-sm mt-2">{errors.image.message}</p>}
        </div>

        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <Input
            {...register('title', { required: 'Course title is required' })}
            placeholder="Course Title"
            className="pl-10 bg-purple-800 border-purple-700 text-white"
          />
        </div>
        {errors.title && <p className="text-red-400 text-sm">{errors.title.message}</p>}

        <div className="relative">
          <Textarea
            {...register('description', { required: 'Course description is required' })}
            placeholder="Course Description"
            rows={4}
            className="pl-10 bg-purple-800 border-purple-700 text-white"
          />
          <BookOpenIcon className="absolute left-3 top-3 w-5 h-5 text-purple-300" />
        </div>
        {errors.description && <p className="text-red-400 text-sm">{errors.description.message}</p>}

        <div className="relative">
          <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <Input
            {...register('category', { required: 'Category is required' })}
            placeholder="Course Category"
            className="pl-10 bg-purple-800 border-purple-700 text-white"
          />
        </div>
        {errors.category && <p className="text-red-400 text-sm">{errors.category.message}</p>}

        <div className="relative">
          <AcademicCapIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300 z-10" />
          <Select onValueChange={(value) => setValue('level', value as Level)}>
            <SelectTrigger className="w-full pl-10 bg-purple-800 border-purple-700 text-white">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BEGINNER">Beginner</SelectItem>
              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
              <SelectItem value="ADVANCED">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors.level && <p className="text-red-400 text-sm">{errors.level.message}</p>}

        <div className="relative">
          <CurrencyDollarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <Input
            {...register('price', { 
              required: 'Price is required',
              min: { value: 0, message: 'Price must be positive' },
              valueAsNumber: true
            })}
            type="number"
            step="0.01"
            placeholder="Course Price"
            className="pl-10 bg-purple-800 border-purple-700 text-white"
          />
        </div>
        {errors.price && <p className="text-red-400 text-sm">{errors.price.message}</p>}

        <div className="flex items-center space-x-4 bg-purple-800 p-4 rounded-lg">
          <StarIcon className="w-6 h-6 text-purple-300" />
          <Checkbox
            {...register('isFeatured')}
            id="isFeatured"
          />
          <label htmlFor="isFeatured" className="text-white">Featured Course</label>
        </div>

        <div className="bg-purple-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white flex items-center">
            <BookOpenIcon className="w-6 h-6 mr-2" />
            Lessons
          </h3>
          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-4 p-4 bg-purple-700 rounded-lg"
            >
              <Input
                {...register(`lessons.${index}.title` as const, { required: 'Lesson title is required' })}
                placeholder="Lesson Title"
                className="mb-2"
              />
              <Textarea
                {...register(`lessons.${index}.content` as const, { required: 'Lesson content is required' })}
                placeholder="Lesson Content"
                rows={4}
                className="mb-2"
              />
              <Button type="button" onClick={() => remove(index)} variant="destructive" className="mt-2">
                <TrashIcon className="w-5 h-5 mr-2" />
                Remove Lesson
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            onClick={() => append({ title: '', content: '' })}
            className="mt-4"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Add Lesson
          </Button>
        </div>

        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
          {isSubmitting ? 'Saving Course...' : (courseId ? 'Update Course' : 'Create Course')}
        </Button>
      </form>
    </motion.div>
  );
};

export default CourseForm;