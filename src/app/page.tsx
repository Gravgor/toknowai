import CoursePreview from "@/components/course-preview";
import CTA from "@/components/cta";
import Features from "@/components/features";
import Hero from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main>
    <Hero />
    <CoursePreview />
    <Features />
    <CTA />
    </main>
  );
}
