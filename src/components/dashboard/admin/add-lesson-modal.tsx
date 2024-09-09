import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

type AddLessonModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddLessonModal: React.FC<AddLessonModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    // TODO: Implement lesson creation logic
    console.log(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel as={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-purple-900 rounded-xl p-6 shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">Add New Lesson</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Select {...register('courseId', { required: 'Course is required' })}>
              <option value="">Select Course</option>
              {/* TODO: Fetch and populate course options */}
            </Select>
            {errors.courseId && <p className="text-red-400 text-sm">{errors.courseId.message?.toString()}</p>}
            <Input {...register('title', { required: 'Title is required' })} placeholder="Lesson Title" />
            {errors.title && <p className="text-red-400 text-sm">{errors.title.message?.toString()}</p>}
            <textarea {...register('content', { required: 'Content is required' })} placeholder="Lesson Content" rows={4} className="w-full p-2 border border-gray-300 rounded-md" />
            {errors.content && <p className="text-red-400 text-sm">{errors.content.message?.toString()}</p>}
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="outline">Cancel</Button>
              <Button type="submit">Add Lesson</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddLessonModal;