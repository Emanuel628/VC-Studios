import styles from '../../styles/Landing.module.css';

const audienceItems = [
  'You have a website idea but do not know where to begin.',
  'You have limited coding experience and want to understand what AI is building.',
  'You feel overwhelmed by tools and want a clear process you can follow.',
  'You have started website projects before but struggled to finish them.',
];

const outcomeItems = [
  'Turn a website idea into a realistic first-version plan.',
  'Choose appropriate tools without adding unnecessary complexity.',
  'Direct AI one page, component, or correction at a time.',
  'Organize the website into clear, maintainable files.',
  'Test, correct, save, recover, and publish your work.',
];

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li key={item}>
          <span aria-hidden="true">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function WhoWhat() {
  return (
    <section className={`${styles.page} ${styles.whoWhat}`} id="about-course" aria-label="About Website Foundations">
      <div>
        <h2>Who this is for</h2>
        <CheckList items={audienceItems} />
      </div>

      <div className={styles.whoWhatDivider}>
        <h2>What you will actually learn</h2>
        <CheckList items={outcomeItems} />
      </div>
    </section>
  );
}
