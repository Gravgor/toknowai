'use server'

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/lib/server/auth";
import { Level } from "@prisma/client";

async function isAdmin() {
    const session = await getServerAuthSession();
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
        redirect("/login");
    }
}
export async function createCourse(formData: FormData) {
    await isAdmin();
    console.log(formData)
    try {
      // Extract course data
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const price = parseFloat(formData.get('price') as string)
      const imageFile = formData.get('image') as File
      const category = formData.get('category') as string
      const level = formData.get('level') as Level
      const isFeatured = formData.get('isFeatured') === 'true'

      const imageUrl = "https://via.placeholder.com/600x400"


      // Create course
      const course = await prisma.course.create({
        data: {
          title,
          description,
          imageUrl,
          category,
          level,
          price,
          isFeatured,
        },
      })

       // Extract and create lessons
    const lessonCount = parseInt(formData.get('lessonCount') as string)
    for (let i = 0; i < lessonCount; i++) {
      const lessonTitle = formData.get(`lessons.${i}.title`) as string
      const lessonContent = formData.get(`lessons.${i}.content`) as string
      const lessonOrder = i + 1

      await prisma.lesson.create({
        data: {
          title: lessonTitle,
          content: lessonContent,
          order: lessonOrder,
          courseId: course.id,
        },
      })
    }

    revalidatePath('/admin/courses')
    return { success: true, courseId: course.id }
  } catch (error) {
    console.error('Error creating course:', error)
    return { success: false, error: 'Failed to create course' }
  }
}

export async function getCourses() {
    await isAdmin();
  
    try {
      const courses = await prisma.course.findMany({
        include: {
          lessons: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      })
      return courses
    } catch (error) {
      console.error('Error fetching courses:', error)
      throw new Error('Failed to fetch courses')
    }
  }

  export async function getCourseById(id: string) {
    await isAdmin();
  
    try {
      const course = await prisma.course.findUnique({
        where: { id },
        include: {
          lessons: true,
        },
      })
      return course
    } catch (error) {
      console.error('Error fetching course:', error)
      throw new Error('Failed to fetch course')
    }
  }

  export async function updateCourse(courseId: string, formData: FormData) {
    await isAdmin();    
  
    try {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const price = parseFloat(formData.get('price') as string)
      const imageFile = formData.get('image') as File
      const category = formData.get('category') as string
      const level = formData.get('level') as Level
      const isFeatured = formData.get('isFeatured') === 'true'
  
      let imageUrl = formData.get('currentImageUrl') as string
      if (imageFile instanceof File && imageFile.size > 0) {
        // Upload new image if provided
        imageUrl = "https://via.placeholder.com/600x400"
      }

      const course = await prisma.course.update({
        where: { id: courseId },
        data: {
          title,
          description,
          imageUrl,
          category,
          level,
          price,
          isFeatured,
        },
      })
  
      // Update lessons
      const lessonCount = parseInt(formData.get('lessonCount') as string)
      const existingLessons = await prisma.lesson.findMany({ where: { courseId } })
  
      await prisma.lesson.deleteMany({
        where: {
          courseId,
          id: {
            notIn: existingLessons.slice(0, lessonCount).map(lesson => lesson.id)
          }
        }
      })
      for (let i = 0; i < lessonCount; i++) {
        const lessonTitle = formData.get(`lessons.${i}.title`) as string
        const lessonContent = formData.get(`lessons.${i}.content`) as string
        const lessonId = formData.get(`lessons.${i}.id`) as string | null
  
        if (lessonId) {
          // Update existing lesson
          await prisma.lesson.update({
            where: { id: lessonId },
            data: {
              title: lessonTitle,
              content: lessonContent,
              order: i + 1,
            },
          })
        } else {
            await prisma.lesson.create({
                data: {
                  title: lessonTitle,
                  content: lessonContent,
                  order: i + 1,
                  courseId: course.id,
                },
              })
            }
          }
          revalidatePath('/admin/courses')
          revalidatePath(`/admin/courses/${courseId}`)
          return { success: true, courseId: course.id }
        } catch (error) {
          console.error('Error updating course:', error)
          return { success: false, error: 'Failed to update course' }
        }
      }