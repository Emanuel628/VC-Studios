import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/Landing.module.css';

// No notification system exists yet - this is an honest empty state, not a stub for a
// fake unread count. Wire this up to real events when one does.
export function NotificationBell() {
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
    <div className={styles.notificationBell} ref={containerRef}>
      <button
        type="button"
        className={styles.notificationBellTrigger}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Notifications"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4a5 5 0 0 0-5 5v3.2c0 .6-.2 1.2-.6 1.7L5 16h14l-1.4-2.1c-.4-.5-.6-1.1-.6-1.7V9a5 5 0 0 0-5-5Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      </button>

      {isOpen ? (
        <div className={styles.notificationBellPanel} role="menu">
          <p>No notifications yet.</p>
        </div>
      ) : null}
    </div>
  );
}
