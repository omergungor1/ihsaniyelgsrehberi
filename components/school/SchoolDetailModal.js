"use client";

import SchoolHeader from "./SchoolHeader";
import SchoolBadges from "./SchoolBadges";
import SchoolMediaSection from "./SchoolMediaSection";
import SchoolInfoGrid from "./SchoolInfoGrid";
import SchoolCharts from "./SchoolCharts";
import SchoolTransport from "./SchoolTransport";
import SchoolAbout from "./SchoolAbout";
import SchoolProgram from "./SchoolProgram";
import SchoolAchievements from "./SchoolAchievements";
import SchoolContactBar from "./SchoolContactBar";

export default function SchoolDetailModal({ school, onClose }) {
  if (!school) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-8 pb-8 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${school.name} detay`}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-[#f3f4f6] shadow-2xl lg:max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white transition-colors hover:bg-white/40"
          aria-label="Kapat"
        >
          <span className="text-xl leading-none font-bold">×</span>
        </button>

        <div className="flex-1 overflow-y-auto scroll-smooth pb-24">
          <div className="bg-gradient-to-b from-[#1a7a4a] to-[#1b6e3f] px-6 pt-6 pb-5">
            <SchoolHeader school={school} />
            <SchoolBadges badges={school.badges} />
          </div>

          <div className="space-y-4 px-5 py-5">
            <SchoolMediaSection
              imageSrc={school.imageSrc}
              imageAlt={school.name}
              address={school.address}
              distance={school.distance}
            />
            <SchoolInfoGrid info={school.info} />
            <SchoolCharts data={school.chartData} />
            <SchoolTransport transport={school.transport} />
            <SchoolAbout description={school.description} />
            <SchoolProgram program={school.program} />
            <SchoolAchievements achievements={school.achievements} />
          </div>
        </div>

        <SchoolContactBar
          whatsappNumber={school.whatsappNumber}
          phoneNumber={school.phoneNumber}
        />
      </div>
    </div>
  );
}
