"use client";

import { useState } from "react";
import { ProjectMediaViewer } from "@/components/portfolio/ProjectMediaViewer";
import { MediaFile } from "@/types";

type Props = {
  beforeFiles: MediaFile[];
  afterFiles: MediaFile[];
};

export default function ProjectGallery({ beforeFiles, afterFiles }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="lg:grid lg:grid-cols-2 gap-10 lg:gap-12">
      <div>
        <p className="font-sans text-[10px] text-charcoal-muted uppercase tracking-[0.22em] mb-4">
          Before
        </p>

        <ProjectMediaViewer
          media={beforeFiles}
          activeIndex={Math.min(activeIndex, beforeFiles.length - 1)}
          onActiveChange={setActiveIndex}
        />
      </div>

      <div>
        <p className="font-sans text-[10px] text-brand-600 uppercase tracking-[0.22em] mb-4">
          After
        </p>

        <ProjectMediaViewer
          media={afterFiles}
          activeIndex={Math.min(activeIndex, afterFiles.length - 1)}
          onActiveChange={setActiveIndex}
        />
      </div>
    </div>
  );
}
