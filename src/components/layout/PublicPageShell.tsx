import type { PropsWithChildren } from 'react';
import { Footer } from '../landing/Footer';
import { Nav } from '../landing/Nav';
import styles from '../../styles/Landing.module.css';

type PublicPageShellProps = PropsWithChildren<{
  mainId?: string;
}>;

export function PublicPageShell({ mainId = 'main-content', children }: PublicPageShellProps) {
  return (
    <>
      <a className={styles.skipLink} href={`#${mainId}`}>
        Skip to main content
      </a>
      <Nav />
      <main id={mainId}>{children}</main>
      <Footer />
    </>
  );
}
