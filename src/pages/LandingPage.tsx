import { PublicPageShell } from '../components/layout/PublicPageShell';
import { FinalCta } from '../components/landing/FinalCta';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LearningPaths } from '../components/landing/LearningPaths';
import { WhoWhat } from '../components/landing/WhoWhat';

export function LandingPage() {
  return (
    <PublicPageShell>
      <Hero />
      <WhoWhat />
      <HowItWorks />
      <LearningPaths />
      <FinalCta />
    </PublicPageShell>
  );
}
