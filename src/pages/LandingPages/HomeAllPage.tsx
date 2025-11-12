import React from 'react'
import Landing from '../Landing'
import HeroSection from './Hero'
import { Navigation } from 'lucide-react'
import FeaturesSection from './FeaturedSection'
import PreviewSection from './Preview'
import StatsSection from './Stats'
import CTASection from './Cta'
import AppFooter from './Footer'

const HomeAllPage = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      {/* <Navigation /> */}

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Preview Section */}
      <PreviewSection />

      {/* Stats Section */}
      <StatsSection />

      {/* CTA Section */}
      <CTASection />

      {/* <Landing /> */}
    </div>
  )
}

export default HomeAllPage
