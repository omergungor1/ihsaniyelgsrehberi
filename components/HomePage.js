"use client";

import { useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import SchoolSelectionSection from "@/components/sections/SchoolSelectionSection";
import PreferenceMistakesSection from "@/components/sections/PreferenceMistakesSection";
import QualifiedSchoolsSection from "@/components/sections/QualifiedSchoolsSection";
import SchoolsMapSection from "@/components/sections/SchoolsMapSection";
import PreferenceRobotSection from "@/components/sections/PreferenceRobotSection";
import PreferenceCalendarSection from "@/components/sections/PreferenceCalendarSection";
import YKSSuccessSection from "@/components/sections/YKSSuccessSection";
import StudentReviewsSection from "@/components/sections/StudentReviewsSection";
import ProcessSupportSection from "@/components/sections/ProcessSupportSection";
import ContactSection from "@/components/sections/ContactSection";
import SchoolDetailModal from "@/components/school/SchoolDetailModal";
import { getSchoolById } from "@/lib/data/schools";

export default function HomePage() {
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const selectedSchool = selectedSchoolId ? getSchoolById(selectedSchoolId) : null;

  return (
    <>
      <HeroSection />
      <SchoolSelectionSection />
      <PreferenceMistakesSection />
      <QualifiedSchoolsSection onSchoolClick={setSelectedSchoolId} />
      <SchoolsMapSection onSchoolClick={setSelectedSchoolId} />
      <PreferenceRobotSection onSchoolClick={setSelectedSchoolId} />
      <PreferenceCalendarSection />
      <YKSSuccessSection />
      <StudentReviewsSection />
      <ProcessSupportSection />
      <ContactSection />

      {selectedSchool && (
        <SchoolDetailModal
          school={selectedSchool}
          onClose={() => setSelectedSchoolId(null)}
        />
      )}
    </>
  );
}
