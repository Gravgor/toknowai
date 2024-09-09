import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserDashboard from "@/components/dashboard/user/user-dashboard";
import AdminDashboard from "@/components/dashboard/admin/admin-dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      enrollments: {
        include: {
          course: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    // Fetch admin statistics
    const totalUsers = await prisma.user.count();
    const totalCourses = await prisma.course.count();
    /*const totalEarnings = await prisma.enrollment.aggregate({
      _sum: {
        course: {
          select: {
            price: true,
          },
        },
      },*
    });*/
    

    // Mock monthly earnings data (replace with actual data in production)
    const monthlyEarnings = [
      { month: 'Jan', earnings: 1000 },
      { month: 'Feb', earnings: 1500 },
      { month: 'Mar', earnings: 2000 },
      { month: 'Apr', earnings: 2500 },
      { month: 'May', earnings: 3000 },
      { month: 'Jun', earnings: 3500 },
    ];

    const statistics = {
      totalUsers,
      totalCourses,
      totalEarnings: 0,
      monthlyEarnings,
    };

    return <AdminDashboard user={{
      name: user.name || '',
      email: user.email || '',
    }} statistics={statistics} />;
  }

  return <UserDashboard user={{
    name: user.name || '',
    email: user.email || '',
    enrollments: user.enrollments.map(enrollment => ({
      course: {
        id: enrollment.course.id,
        title: enrollment.course.title,
        description: enrollment.course.description,
      }
    }))
  }} />;
}