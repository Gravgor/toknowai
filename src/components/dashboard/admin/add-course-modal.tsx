import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type AddCourseModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddCourseModal: React.FC<AddCourseModalProps> = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    // TODO: Implement course creation logic
    console.log(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel as={motion.div} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="w-full max-w-md bg-purple-900 rounded-xl p-6 shadow-lg">
          <Dialog.Title className="text-2xl font-semibold mb-4">Add New Course</Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register('title', { required: 'Title is required' })} placeholder="Course Title" />
            {errors.title && <p className="text-red-400 text-sm">{errors.title.message?.toString()}</p>}
            <Input {...register('description', { required: 'Description is required' })} placeholder="Course Description" />
            {errors.description && <p className="text-red-400 text-sm">{errors.description.message?.toString()}</p>}
            <Input {...register('price', { required: 'Price is required', pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Invalid price format' } })} placeholder="Price" type="number" step="0.01" />
            {errors.price && <p className="text-red-400 text-sm">{errors.price.message?.toString()}</p>}
            <div className="flex justify-end space-x-2">
              <Button type="button" onClick={onClose} variant="outline">Cancel</Button>
              <Button type="submit">Add Course</Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddCourseModal;