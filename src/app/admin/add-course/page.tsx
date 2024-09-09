import { getServerAuthSession } from "@/lib/server/auth";
import { redirect } from "next/navigation";
import AddCourseForm from "@/components/dashboard/admin/add-course-form";

export default async function AddCoursePage() {
  const session = await getServerAuthSession();
  console.log(session)
  if (!session || !session.user || (session.user as any).role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-purple-950 text-white pt-24 pb-8 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Add New Course</h1>
        <AddCourseForm />
      </div>
    </div>
  );
}