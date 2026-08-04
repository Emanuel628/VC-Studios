import { useEffect, useRef, useState } from 'react';
import { fetchNotifications, markNotificationsRead, type NotificationsData } from '../../lib/dashboardClient';
import styles from '../../styles/Landing.module.css';

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<NotificationsData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNotifications()
      .then(setData)
      .catch(() => {
        // Leave the bell in its default, no-count state rather than showing an error
        // for a non-critical feature.
      });
  }, []);

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

  async function handleToggle() {
    const nextIsOpen = !isOpen;
    setIsOpen(nextIsOpen);

    if (nextIsOpen && data && data.unreadCount > 0) {
      try {
        await markNotificationsRead();
        setData((current) => (current ? { ...current, unreadCount: 0 } : current));
      } catch {
        // Non-critical - the unread count just won't clear until the next successful call.
      }
    }
  }

  return (
    <div className={styles.notificationBell} ref={containerRef}>
      <button
        type="button"
        className={styles.notificationBellTrigger}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={data && data.unreadCount > 0 ? `Notifications (${data.unreadCount} unread)` : 'Notifications'}
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4a5 5 0 0 0-5 5v3.2c0 .6-.2 1.2-.6 1.7L5 16h14l-1.4-2.1c-.4-.5-.6-1.1-.6-1.7V9a5 5 0 0 0-5-5Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        {data && data.unreadCount > 0 ? (
          <span className={styles.notificationBadge} aria-hidden="true">
            {data.unreadCount}
          </span>
        ) : null}
      </button>

      {isOpen ? (
        <div className={styles.notificationBellPanel} role="menu">
          {data && data.notifications.length > 0 ? (
            data.notifications.map((notification) => <p key={notification.id}>{notification.message}</p>)
          ) : (
            <p>No notifications yet.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
