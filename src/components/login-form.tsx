"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { register } from '@/actions/userActions';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

type FormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const loginSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const registerSchema = loginSchema.shape({
  name: yup.string().required('Name is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register: registerField, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setErrorMessage(null);
 
    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });
 
        if (result?.error) {
          setErrorMessage('Invalid email or password. Please try again.');
        } else {
          router.push('/dashboard');
        }
      } else {
        const result = await register(data.name!, data.email, data.password);
        if (result.error) {
          setErrorMessage('This email is already in use. Please try another one.');
        } else {
          await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
          });
          router.push('/dashboard');
        }
      }
    } catch (error) {
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };
  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
    setErrorMessage(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto bg-purple-900 p-8 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        {isLogin ? 'Welcome Back' : 'Create Account'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              key="name"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <Input
                  {...registerField('name')}
                  placeholder="Your Name"
                  className="bg-purple-800 text-white placeholder-purple-300 pl-10"
                />
              </div>
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <Input
            {...registerField('email')}
            placeholder="Email Address"
            className="bg-purple-800 text-white placeholder-purple-300 pl-10"
          />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
          <Input
            {...registerField('password')}
            type="password"
            placeholder="Password"
            className="bg-purple-800 text-white placeholder-purple-300 pl-10"
          />
        </div>
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              key="confirmPassword"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                <Input
                  {...registerField('confirmPassword')}
                  type="password"
                  placeholder="Confirm Password"
                  className="bg-purple-800 text-white placeholder-purple-300 pl-10"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-red-400 text-sm bg-red-100 border border-red-400 rounded p-2"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
        <Button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-t-2 border-white rounded-full"
            />
          ) : (
            isLogin ? 'Log In' : 'Sign Up'
          )}
        </Button>
      </form>
      <p className="text-center text-purple-300 mt-4">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={toggleForm}
          className="text-purple-400 hover:text-purple-200 ml-1 focus:outline-none transition-colors duration-300"
        >
          {isLogin ? 'Sign Up' : 'Log In'}
        </button>
      </p>
    </motion.div>
  );
};

export default LoginForm;