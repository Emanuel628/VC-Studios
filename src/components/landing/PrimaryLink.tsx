import type { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import styles from '../../styles/Landing.module.css';

type PrimaryLinkProps = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

export function PrimaryLink({ children, className = '', ...props }: PrimaryLinkProps) {
  const classes = [styles.primaryButton, className].filter(Boolean).join(' ');

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
