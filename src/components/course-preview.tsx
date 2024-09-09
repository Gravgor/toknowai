"use client"
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { MagnifyingGlassIcon, LayersIcon, StarIcon, UpdateIcon, FileIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { motion, AnimatePresence } from 'framer-motion'

// Mock data for courses
const courses = [
  {
    id: 1,
    title: 'Introduction to AI',
    description: 'Learn the basics of Artificial Intelligence and Machine Learning.',
    image: '/images/intro-to-ai.jpg',
    category: 'AI',
    level: 'Beginner',
    featured: false
  },
  {
    id: 2,
    title: 'Python for Data Science',
    description: 'Master Python programming for data analysis and visualization.',
    image: '/images/python-data-science.jpg',
    category: 'Programming',
    level: 'Intermediate',
    featured: true
  },
  {
    id: 3,
    title: 'Deep Learning Fundamentals',
    description: 'Explore neural networks and deep learning algorithms.',
    image: '/images/deep-learning.jpg',
    category: 'AI',
    level: 'Advanced',
    featured: true
  },
  // Add more courses as needed
]

interface Course {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  level: string;
  featured: boolean;
}

const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <Card className="flex flex-col overflow-hidden bg-purple-800 border-purple-700 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 relative">
    {course.featured && (
      <div className="absolute top-2 right-2 bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-bold flex items-center">
        <StarIcon className="w-4 h-4 mr-1" /> Featured
      </div>
    )}
    <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-semibold mb-2 text-white">{course.title}</h3>
      <p className="text-sm text-purple-200 mb-6 flex-grow">{course.description}</p>
      <Button variant="secondary" className="self-start bg-purple-600 text-white hover:bg-purple-500 transition-colors">View Course</Button>
    </div>
  </Card>
)

const NoCoursesFound = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-64 text-white"
    >
      <FileIcon className="w-16 h-16 mb-4 text-purple-300" />
      <h3 className="text-xl font-semibold mb-2">No Courses Found</h3>
      <p className="text-purple-200 text-center">
        We couldn't find any courses matching your criteria. Try adjusting your search or filters.
      </p>
    </motion.div>
  )
  

const CoursePreviews = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('All')
    const [levelFilter, setLevelFilter] = useState('All')
    const [filteredCourses, setFilteredCourses] = useState(courses)
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const coursesPerPage = 6
  
    useEffect(() => {
      setIsLoading(true)
      const timer = setTimeout(() => {
        const filtered = courses.filter(course => 
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (categoryFilter === 'All' || course.category === categoryFilter) &&
          (levelFilter === 'All' || course.level === levelFilter)
        )
        setFilteredCourses(filtered.slice(0, page * coursesPerPage))
        setIsLoading(false)
      }, 500) // Simulate loading delay
  
      return () => clearTimeout(timer)
    }, [searchTerm, categoryFilter, levelFilter, page])
  
    const loadMore = () => {
      setPage(prevPage => prevPage + 1)
    }
  

  return (
    <section className="py-16    bg-gradient-to-br from-purple-950 to-purple-900">
      <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Explore Our Courses</h2>
        
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 bg-purple-900 border-purple-700 text-white placeholder-purple-300"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
          </div>
          <Select onValueChange={(value) => setCategoryFilter(value)}>
            <SelectPrimitive.Trigger className="w-full md:w-auto bg-purple-900 border-purple-700 text-white">
              <SelectPrimitive.Value placeholder="All Categories" />
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content className="bg-purple-900 border-purple-700 text-white">
              <SelectPrimitive.Item value="All">All Categories</SelectPrimitive.Item>
              <SelectPrimitive.Item value="AI">AI</SelectPrimitive.Item>
              <SelectPrimitive.Item value="Programming">Programming</SelectPrimitive.Item>
            </SelectPrimitive.Content>
          </Select>
          <Select onValueChange={(value) => setLevelFilter(value)}>
            <SelectPrimitive.Trigger className="w-full md:w-auto bg-purple-900 border-purple-700 text-white">
              <SelectPrimitive.Value placeholder="All Levels" />
            </SelectPrimitive.Trigger>
            <SelectPrimitive.Content className="bg-purple-900 border-purple-700 text-white">
              <SelectPrimitive.Item value="All">All Levels</SelectPrimitive.Item>
              <SelectPrimitive.Item value="Beginner">Beginner</SelectPrimitive.Item>
              <SelectPrimitive.Item value="Intermediate">Intermediate</SelectPrimitive.Item>
              <SelectPrimitive.Item value="Advanced">Advanced</SelectPrimitive.Item>
            </SelectPrimitive.Content>
          </Select>
        </div>
        <AnimatePresence>
          {isLoading ? (
            <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-64"
          >
            <UpdateIcon className="w-12 h-12 text-purple-300 animate-spin" />
          </motion.div>
        ) : filteredCourses.length > 0 ? (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map(course => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </motion.div>
         ) : (
            <NoCoursesFound key="no-results" />
          )}
        </AnimatePresence>
        {filteredCourses.length < courses.length && filteredCourses.length > 0 && (
          <div className="mt-8 text-center">
            <Button onClick={loadMore} className="bg-purple-600 text-white hover:bg-purple-500">
              Load More Courses
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CoursePreviews