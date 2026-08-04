// From the approved module map (docs/website-foundations-high-level-module-map.md).
// No chapters or lessons exist yet - this is structure only, reused by both the
// dashboard preview and the full Roadmap page so the two can't drift apart.
export type WebsiteFoundationsModule = {
  title: string;
  checkpoint: string | null;
};

export const WEBSITE_FOUNDATIONS_MODULES: WebsiteFoundationsModule[] = [
  { title: 'Program Orientation, Path Selection, and the First Plan Entry', checkpoint: null },
  { title: 'Planning Before Prompting', checkpoint: 'Plan or blueprint approval' },
  { title: 'Tool Selection and Directing AI With Control', checkpoint: null },
  { title: 'Architecture and the Shared Foundation', checkpoint: 'Architecture or file-map checkpoint' },
  { title: 'Building Pages With Purpose', checkpoint: null },
  { title: 'Responsive, Accessible, and Working', checkpoint: null },
  { title: 'Testing, Defects, and Recovery', checkpoint: null },
  { title: 'Publishing the Website', checkpoint: null },
  { title: 'Structured Explanation and Final Completion Review', checkpoint: 'Final completion review' },
];
