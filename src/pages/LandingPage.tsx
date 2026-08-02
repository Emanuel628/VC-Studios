import { FinalCta } from '../components/landing/FinalCta';
import { Footer } from '../components/landing/Footer';
import { Hero } from '../components/landing/Hero';
import { HowItWorks } from '../components/landing/HowItWorks';
import { LearningPaths } from '../components/landing/LearningPaths';
import { Nav } from '../components/landing/Nav';
import { WhoWhat } from '../components/landing/WhoWhat';
import styles from '../styles/Landing.module.css';

export function LandingPage() {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <WhoWhat />
        <HowItWorks />
        <LearningPaths />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
