import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { authClient } from '../../lib/authClient';
import styles from '../../styles/Landing.module.css';

type UserMenuProps = {
  firstName: string;
};

export function UserMenu({ firstName }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideEvent(event: MouseEvent | KeyboardEvent) {
      if (event instanceof KeyboardEvent) {
        if (event.key === 'Escape') setIsOpen(false);
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideEvent);
    document.addEventListener('keydown', handleOutsideEvent);
    return () => {
      document.removeEventListener('mousedown', handleOutsideEvent);
      document.removeEventListener('keydown', handleOutsideEvent);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu} ref={containerRef}>
      <button
        type="button"
        className={styles.userMenuTrigger}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.userMenuInitial} aria-hidden="true">
          {firstName.charAt(0).toUpperCase()}
        </span>
        {firstName}
      </button>

      {isOpen ? (
        <div className={styles.userMenuPanel} role="menu">
          <Link to="/account" role="menuitem" onClick={() => setIsOpen(false)}>
            Account settings
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setIsOpen(false);
              authClient.signOut();
            }}
          >
            Log out
          </button>
        </div>
      ) : null}
    </div>
  );
}
