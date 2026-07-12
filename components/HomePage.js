"use client";

import { useMemo, useState } from "react";
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

export default function HomePage({ data }) {
  const {
    hero = {},
    contact = {},
    map = {},
    schools = [],
    calendar = [],
    yks = null,
    reviews = { students: [], graduates: [] },
  } = data || {};

  const [selectedSchoolId, setSelectedSchoolId] = useState(null);

  const selectedSchool = useMemo(
    () => schools.find((s) => s.id === selectedSchoolId) || null,
    [schools, selectedSchoolId]
  );

  return (
    <>
      <HeroSection hero={hero} />
      <SchoolSelectionSection />
      <PreferenceMistakesSection />
      <QualifiedSchoolsSection
        schools={schools}
        onSchoolClick={setSelectedSchoolId}
      />
      <SchoolsMapSection
        schools={schools}
        mapSettings={map}
        onSchoolClick={setSelectedSchoolId}
      />
      <PreferenceRobotSection
        schools={schools}
        onSchoolClick={setSelectedSchoolId}
      />
      <PreferenceCalendarSection items={calendar} />
      <YKSSuccessSection yks={yks} />
      <StudentReviewsSection reviews={reviews} />
      <ProcessSupportSection />
      <ContactSection contact={contact} mapSettings={map} />

      {selectedSchool && (
        <SchoolDetailModal
          school={selectedSchool}
          onClose={() => setSelectedSchoolId(null)}
        />
      )}
    </>
  );
}
