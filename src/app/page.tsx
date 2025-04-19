"use client"

import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import FeaturesSection from "@/components/features-section"
import StatsSection from "@/components/stats-section"
import RoadmapSection from "@/components/roadmap-section"
import PageWrapper from "@/components/page-wrappper"
import { useEffect } from "react"
import { initAnimations } from "@/lib/animation"

export default function Home() {
  useEffect(() => {
    initAnimations()
  }, [])

  return (
    <PageWrapper>
      <div className="min-h-screen ">
      <div className="abstract-bg">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>



      </div>
        <HeroSection />
        <div className="abstract-bg">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>



      </div>
        <AboutSection />
        <div className="abstract-bg">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>



      </div>
        <FeaturesSection />
        <div className="abstract-bg">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>



      </div>
        <StatsSection />
        <div className="abstract-bg">
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>
        <div className="abstract-circle"></div>



      </div>
        <RoadmapSection />
      </div>
    </PageWrapper>
  )
}
