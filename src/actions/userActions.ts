"use server"

import { prisma } from '@/lib/prisma'
import { hash, compare } from 'bcryptjs'


export async function authenticateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email }
    });
  
    if (!user || !user.hashedPassword) {
      return null;
    }
  
    const isPasswordValid = await compare(password, user.hashedPassword);
  
    if (!isPasswordValid) {
      return null;
    }
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  }

  export async function register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return { error: 'User already exists' }
    }
  
    const hashedPassword = await hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, hashedPassword }
    })
  
    return { success: true, user }
  }


  export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.hashedPassword) {
      return { error: 'User not found' }
    }
  
    const passwordMatch = await compare(currentPassword, user.hashedPassword)
    if (!passwordMatch) {
      return { error: 'Current password is incorrect' }
    }
  
    const hashedNewPassword = await hash(newPassword, 10)
    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword: hashedNewPassword }
    })
  
    return { success: true }
  }

  export async function changeEmail(userId: string, newEmail: string, password: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.hashedPassword) {
      return { error: 'User not found' }
    }
  
    const passwordMatch = await compare(password, user.hashedPassword)
    if (!passwordMatch) {
      return { error: 'Password is incorrect' }
    }
  
    const existingUser = await prisma.user.findUnique({ where: { email: newEmail } })
    if (existingUser) {
      return { error: 'Email already in use' }
    }
  
    await prisma.user.update({
      where: { id: userId },
      data: { email: newEmail, emailVerified: null } // Reset email verification
    })
  
    return { success: true }
  }

  export async function updateProfile(userId: string, data: { name?: string, image?: string }) {
    await prisma.user.update({
      where: { id: userId },
      data
    })
  
    return { success: true }
  }