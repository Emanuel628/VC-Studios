import type { PropsWithChildren } from 'react';
import { Footer } from '../landing/Footer';
import { Nav } from '../landing/Nav';
import styles from '../../styles/Landing.module.css';

export function PublicPageShell({ children }: PropsWithChildren) {
  return (
    <>
      <a className={styles.skipLink} href="#main-content">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
