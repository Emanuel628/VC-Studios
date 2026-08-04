import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { PublicPageShell } from '../../components/layout/PublicPageShell';
import { fetchModuleNote, saveModuleNote } from '../../lib/dashboardClient';
import { WEBSITE_FOUNDATIONS_MODULES } from '../../lib/moduleMap';
import styles from '../../styles/Module.module.css';

export function ModulePage() {
  const { moduleIndex: moduleIndexParam } = useParams();
  const navigate = useNavigate();
  const moduleIndex = Number(moduleIndexParam);
  const module = WEBSITE_FOUNDATIONS_MODULES[moduleIndex];

  const [notes, setNotes] = useState('');
  const [noteStatus, setNoteStatus] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  useEffect(() => {
    if (!module) return;
    setNotes('');
    setNoteStatus('');
    fetchModuleNote(moduleIndex)
      .then(setNotes)
      .catch(() => setNoteStatus('Could not load your notes.'));
  }, [moduleIndex, module]);

  if (!module) {
    return (
      <PublicPageShell>
        <div className={styles.page}>
          <p>That module doesn't exist.</p>
          <Link to="/roadmap">Back to the roadmap</Link>
        </div>
      </PublicPageShell>
    );
  }

  async function handleSaveNotes() {
    setIsSavingNotes(true);
    setNoteStatus('');
    try {
      await saveModuleNote(moduleIndex, notes);
      setNoteStatus('Saved.');
    } catch {
      setNoteStatus('Could not save your notes. Try again.');
    } finally {
      setIsSavingNotes(false);
    }
  }

  const previousModule = moduleIndex > 0 ? WEBSITE_FOUNDATIONS_MODULES[moduleIndex - 1] : null;
  const nextModule =
    moduleIndex < WEBSITE_FOUNDATIONS_MODULES.length - 1 ? WEBSITE_FOUNDATIONS_MODULES[moduleIndex + 1] : null;

  return (
    <PublicPageShell>
      <div className={styles.page}>
        <div className={styles.breadcrumbRow}>
          <p className={styles.breadcrumb}>
            <Link to="/roadmap">Website Foundations</Link>
            <span aria-hidden="true"> / </span>
            {`Module ${moduleIndex + 1}: ${module.title}`}
          </p>

          <div className={styles.breadcrumbNav}>
            <button
              type="button"
              aria-label="Previous module"
              disabled={!previousModule}
              onClick={() => previousModule && navigate(`/roadmap/${moduleIndex - 1}`)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Next module"
              disabled={!nextModule}
              onClick={() => nextModule && navigate(`/roadmap/${moduleIndex + 1}`)}
            >
              →
            </button>
          </div>
        </div>

        <div className={styles.layout}>
          <div className={styles.main}>
            <div className={styles.mediaPlaceholder}>
              <p className={styles.mediaEyebrow}>Module {moduleIndex + 1}</p>
              <p className={styles.mediaMessage}>Lesson content for this module hasn't been written yet.</p>
            </div>

            <h1>{module.title}</h1>
            {module.checkpoint ? <span className={styles.checkpointBadge}>Checkpoint: {module.checkpoint}</span> : null}
            <p className={styles.description}>{module.description}</p>

            <section className={styles.card} aria-labelledby="resources-title">
              <h2 id="resources-title">Lesson Resources</h2>
              <p className={styles.subtitle}>No resources published yet.</p>
            </section>

            <section className={styles.card} aria-labelledby="notes-title">
              <h2 id="notes-title">Notes</h2>
              <textarea
                className={styles.notesTextarea}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Write your own notes for this module. Only you can see them."
                rows={6}
              />
              <div className={styles.notesActions}>
                <button type="button" className={styles.saveButton} onClick={handleSaveNotes} disabled={isSavingNotes}>
                  {isSavingNotes ? 'Saving…' : 'Save notes'}
                </button>
                {noteStatus ? (
                  <span className={styles.notesStatus} role="status">
                    {noteStatus}
                  </span>
                ) : null}
              </div>
            </section>
          </div>

          <aside className={styles.sidebar} aria-label="Program modules">
            <h2 className={styles.sidebarTitle}>Website Foundations</h2>
            <ol className={styles.sidebarList}>
              {WEBSITE_FOUNDATIONS_MODULES.map((item, index) => (
                <li key={item.title}>
                  <Link
                    to={`/roadmap/${index}`}
                    className={index === moduleIndex ? styles.sidebarItemActive : styles.sidebarItem}
                  >
                    <span className={styles.sidebarNumber}>{index + 1}</span>
                    <span className={styles.sidebarItemTitle}>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div className={styles.footerNav}>
          {previousModule ? (
            <Link to={`/roadmap/${moduleIndex - 1}`} className={styles.footerNavLink}>
              ← Previous module
              <span>{previousModule.title}</span>
            </Link>
          ) : (
            <span />
          )}

          <Link to="/roadmap" className={styles.footerNavCenter}>
            Back to roadmap
          </Link>

          {nextModule ? (
            <Link to={`/roadmap/${moduleIndex + 1}`} className={styles.footerNavLink}>
              Next module →<span>{nextModule.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </PublicPageShell>
  );
}
