import { AboutSection } from "@/components/public/about-section";
import { CredentialsSection } from "@/components/public/credentials-section";
import { ExperienceTimeline } from "@/components/public/experience-timeline";
import { TestimonialSection } from "@/components/public/testimonial-section";
import { getCertifications, getEducations, getExperiences, getProfile, getPublications, getSkills, getTestimonials } from "@/lib/data/public";

export const metadata = { title: "About", description: "About the developer: background, experience, education, certifications, and publications.", alternates: { canonical: "/about" } };

export default async function AboutPage() {
  const [profile, skills, experiences, educations, certifications, publications, testimonials] = await Promise.all([
    getProfile(),
    getSkills({ marquee: true }),
    getExperiences(),
    getEducations(),
    getCertifications(),
    getPublications(),
    getTestimonials()
  ]);
  return (
    <>
      <AboutSection profile={profile} marqueeSkills={skills} />
      <ExperienceTimeline experiences={experiences} educations={educations} />
      <CredentialsSection certifications={certifications} publications={publications} />
      <TestimonialSection testimonials={testimonials} />
    </>
  );
}
