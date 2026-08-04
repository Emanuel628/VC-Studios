// From the approved module map (docs/website-foundations-high-level-module-map.md).
// No chapters or lessons exist yet - this is structure only, reused by the dashboard
// preview, the full Roadmap page, and the module page so none of them can drift apart.
// `description` is each module's "Cumulative capability" line from that same approved
// document, quoted verbatim - not invented copy.
export type WebsiteFoundationsModule = {
  title: string;
  description: string;
  checkpoint: string | null;
};

export const WEBSITE_FOUNDATIONS_MODULES: WebsiteFoundationsModule[] = [
  {
    title: 'Program Orientation, Path Selection, and the First Plan Entry',
    description:
      'Understand exactly what Website Foundations does and does not teach, choose Guided Build-Along or Coursework-Only, and open the first Build Plan or Learning Plan entry.',
    checkpoint: null,
  },
  {
    title: 'Planning Before Prompting',
    description: 'Turn a website idea into a realistic, bounded first-version plan before any building or prompting begins.',
    checkpoint: 'Plan or blueprint approval',
  },
  {
    title: 'Tool Selection and Directing AI With Control',
    description:
      'Choose tools appropriate to a basic website, and give AI a focused, controlled instruction rather than accepting its first answer.',
    checkpoint: null,
  },
  {
    title: 'Architecture and the Shared Foundation',
    description:
      'Establish a modular project structure - one page per file, shared design tokens, clear route ownership - before the project grows to many pages.',
    checkpoint: 'Architecture or file-map checkpoint',
  },
  {
    title: 'Building Pages With Purpose',
    description:
      'Apply the approved foundation to build out the required pages by reusing shared patterns, rejecting scope creep, and correcting AI when it duplicates instead of reusing.',
    checkpoint: null,
  },
  {
    title: 'Responsive, Accessible, and Working',
    description:
      'Make the website work correctly across desktop, tablet, and mobile, with accessible labels, headings, focus states, and contrast.',
    checkpoint: null,
  },
  {
    title: 'Testing, Defects, and Recovery',
    description:
      'Run a real testing pass that finds and fixes at least one defect, and demonstrate - not just describe - recovering from a broken change using GitHub.',
    checkpoint: null,
  },
  {
    title: 'Publishing the Website',
    description:
      'Take the finished project to a successful production build and a public deployment, then compare the result against the original plan.',
    checkpoint: null,
  },
  {
    title: 'Structured Explanation and Final Completion Review',
    description:
      "Explain the finished project's decisions in the student's own words, and pass the Final Completion Review against every required item.",
    checkpoint: 'Final completion review',
  },
];
