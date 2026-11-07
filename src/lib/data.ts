// Single source of truth for portfolio content.
// Everything here comes from B_T_Senthan_Amuthan_Resume.pdf (Nov 2026 revision).

export const profile = {
  name: 'B T Senthan Amuthan',
  first: 'Senthan',
  last: 'Amuthan',
  role: 'Backend Engineer',
  location: 'Chennai, India',
  coords: '12.83° N · 80.05° E',
  email: 'senthanbalu@gmail.com',
  resume: '/B_T_Senthan_Amuthan_Resume.pdf',
  summary:
    'Computer Science undergraduate who builds production backend systems and full-stack applications. Comfortable inside large codebases. Writes the tests, joins the code reviews, ships with the team.',
}

export const links = [
  { label: 'GitHub', href: 'https://github.com/senthan-07' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/b-t-senthan-amuthan-17006827b/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Senthan_official/' },
  { label: 'Resume', href: '/B_T_Senthan_Amuthan_Resume.pdf' },
]

export const education = {
  school: 'Shiv Nadar University Chennai',
  degree: 'B.Tech in Computer Science (Cyber Security)',
  cgpa: '9.26',
  period: 'Aug 2023 – Aug 2027',
  place: 'Kalavakkam, India',
}

export const sections = [
  { id: 'origin', index: '01', label: 'Origin' },
  { id: 'layers', index: '02', label: 'Layers' },
  { id: 'scale', index: '03', label: 'Scale' },
  { id: 'archive', index: '04', label: 'Archive' },
  { id: 'process', index: '05', label: 'Process' },
  { id: 'contact', index: '06', label: 'Contact' },
] as const

/** Section 02 — the four layers of a backend, each tied to real work. */
export const layers = [
  {
    index: '01',
    name: 'Interface',
    headline: 'Every request starts at a contract.',
    body: 'REST APIs, database schemas and migration workflows for an internal enterprise platform — the backend foundation other teams build on.',
    get: 'APIs that behave the same on day 300 as on day one.',
    proof: 'REST · Schema design · Migrations',
  },
  {
    index: '02',
    name: 'Guard',
    headline: 'Nothing gets in without a name.',
    body: 'Authentication middleware with authorization, structured logging and request tracing. When something breaks, the trail is already there.',
    get: 'Every protected route covered. Every failure traceable.',
    proof: '100% of protected APIs secured',
  },
  {
    index: '03',
    name: 'Data',
    headline: 'Schemas change. Data stays safe.',
    body: 'Versioned schemas and migration workflows that move forward without breaking what is already there.',
    get: 'Migrations you can run on a Friday.',
    proof: 'Schema design · Versioned migrations',
  },
  {
    index: '04',
    name: 'Pipeline',
    headline: 'Green builds are not luck.',
    body: 'Traced recurring CI/CD failures back through logs and monitoring. Rebuilt the test setup on isolated test databases: 250+ automated tests, full coverage, ten times faster.',
    get: 'A pipeline the team trusts again.',
    proof: '100% pipeline reliability · 10× faster tests',
  },
] as const

/**
 * Section 03 — the lifecycle of a system, from one server to many.
 * Follows the standard progression (single server → separate database →
 * load balancer → cache → queue → replication). Chips list only skills
 * from the resume.
 */
export const scaleSteps = [
  {
    index: '01',
    name: 'Traffic',
    headline: 'One server meets a thousand users.',
    body: 'Everything on one machine works — until it doesn’t. Requests queue up, latency climbs, the box runs hot.',
    work: 'Before scaling, find the limit. I trace failures back through logs and monitoring before changing anything.',
    chips: ['Monitoring', 'Logs', 'Linux'],
  },
  {
    index: '02',
    name: 'Data',
    headline: 'Give the data its own home.',
    body: 'The data layer moves off the app server, so each side can scale and fail on its own terms.',
    work: 'I’ve designed production database schemas and versioned migration workflows in an enterprise codebase.',
    chips: ['PostgreSQL', 'Schema design', 'Migrations'],
  },
  {
    index: '03',
    name: 'Balance',
    headline: 'Many servers. One front door.',
    body: 'A load balancer spreads traffic across stateless replicas. Lose one and nobody notices.',
    work: 'Stateless services packaged with Docker — any replica can answer any request.',
    chips: ['Docker', 'Kubernetes', 'Microservices'],
  },
  {
    index: '04',
    name: 'Cache',
    headline: 'Answer the same question once.',
    body: 'Hot reads are served from memory before they ever reach the database.',
    work: 'Fewer trips to the database means faster answers and a primary that stays calm under load.',
    chips: ['REST APIs', 'Async', 'System Design'],
  },
  {
    index: '05',
    name: 'Queue',
    headline: 'Slow work leaves the request path.',
    body: 'Uploads, reports and emails go to a queue. Workers handle them in the background; the user gets an answer now.',
    work: 'In AstraStore, a background scanner finds under-replicated chunks and repairs them — off the write path.',
    chips: ['Background jobs', 'Async', 'Java'],
  },
  {
    index: '06',
    name: 'Replicate',
    headline: 'Reads scale out. Writes stay safe.',
    body: 'Read replicas take load off the primary. Migrations keep every copy in step.',
    work: 'AstraStore replicates chunks peer-to-peer with exponential backoff — degraded recovery 65% faster.',
    chips: ['Replication', 'Java', 'gRPC'],
  },
] as const

/** Section 03 (spec sheet) — capabilities, as listed on the resume. */
export const stack = [
  { group: 'Languages', items: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Rust', 'C'] },
  { group: 'Backend', items: ['FastAPI', 'Node.js', 'Express.js', 'REST APIs', 'Microservices', 'WebSockets', 'Async'] },
  { group: 'Databases', items: ['PostgreSQL', 'MongoDB', 'SQLite', 'SQL', 'Prisma', 'Liquibase'] },
  { group: 'DevOps', items: ['Git', 'Docker', 'Kubernetes', 'OpenShift', 'CI/CD', 'IBM S3', 'Linux', 'SonarQube', 'Grafana'] },
  { group: 'Engineering', items: ['DSA', 'OOP', 'SDLC', 'System Design', 'Unit Testing', 'Code Reviews'] },
] as const

export type ArchiveEntry = {
  kind: 'Experience' | 'Project' | 'Open source'
  title: string
  role: string
  period: string
  stack: string
  points: string[]
  href?: string
  hrefLabel?: string
  repo?: string
}

/** Section 04 — experience and projects. */
export const archive: ArchiveEntry[] = [
  {
    kind: 'Experience',
    title: 'Citi',
    role: 'Summer Analyst Intern · Software Engineering',
    period: 'Jun – Jul 2026',
    stack: 'Backend · APIs · Auth · CI/CD · Testing',
    points: [
      'Built the backend foundation of an internal enterprise platform: REST APIs, database schemas and migration workflows.',
      'Implemented authentication middleware with structured logging, request tracing and authorization across 100% of protected APIs.',
      'Restored pipeline reliability to 100%, reached a 99% quality-gate pass rate and cut test time 10× with 250+ automated tests at full coverage.',
      'Ramped up fast on a large enterprise codebase; delivered 4 production stories and 6+ pull requests with zero production defects.',
    ],
  },
  {
    kind: 'Experience',
    title: 'Dexio Designs',
    role: 'Software Development Engineer Intern',
    period: 'Jun – Aug 2025',
    stack: 'Full-stack · REST · Component systems',
    points: [
      'Wrote the HLD and LLD for full-stack features before writing code, working with Product Owners from design to deployment.',
      'Built reusable UI components and REST integrations that cut QA revisions by 50%.',
    ],
    href: 'https://www.dexiodesigns.com/',
    hrefLabel: 'dexiodesigns.com',
  },
  {
    kind: 'Project',
    title: 'AstraStore',
    role: 'Distributed storage engine',
    period: 'Build',
    stack: 'Java · Linux · Streaming I/O · REST/gRPC · Docker',
    points: [
      'Storage node agent with a zero-memory streaming chunker (dual SHA-256 digests) and atomic, fsync-validated writes — 100% data integrity through node failures.',
      'Background self-healing scanner and peer-to-peer replication with exponential backoff, cutting degraded-chunk recovery time by 65%.',
    ],
    repo: 'https://github.com/Gokul-Nishandh/AstraStore',
  },
  {
    kind: 'Project',
    title: 'QEMU Lab Orchestrator',
    role: 'Virtualization platform',
    period: 'Build',
    stack: 'QEMU · Express.js · Docker · Guacamole · Next.js',
    points: [
      'Orchestrates isolated QEMU virtual machines through REST APIs, with Dockerized Apache Guacamole for browser access under 50 ms latency.',
      'Automated end-to-end VM lifecycle and persistent state tracking, cutting provisioning time by 80% across multi-tenant lab topologies.',
    ],
    repo: 'https://github.com/senthan-07/Minimal-Network-Lab',
  },
  {
    kind: 'Open source',
    title: 'Bento Slides',
    role: 'Ghost Cut support · merged upstream',
    period: 'PR #679',
    stack: 'Open source · Editor interactions · Undo',
    points: [
      'Ghost Cut for slide elements: move selections across slides by keyboard and clipboard, with cancel, restore and single-step undo.',
      'Ghost rendering with model-derived opacity and browser-local preferences; validated through builds, translation checks and interaction testing before merge.',
    ],
    href: 'https://github.com/nyblnet/bento/pull/679',
    hrefLabel: 'Merged PR #679',
  },
]

/** Section 05 — how the work actually gets done. */
export const process = [
  {
    index: '01',
    phase: 'Design',
    does: 'High-level and low-level design first. Agree on the shape with the people who own the problem.',
    get: 'No surprises halfway through the build.',
    proof: 'HLD + LLD for every feature at Dexio',
  },
  {
    index: '02',
    phase: 'Build',
    does: 'Small, reusable pieces. Clear contracts between services. Code that reads well at 2 a.m.',
    get: 'Fewer revisions. Faster delivery.',
    proof: '50% fewer QA revisions',
  },
  {
    index: '03',
    phase: 'Verify',
    does: 'Tests that run in isolation and finish fast enough that people actually run them.',
    get: 'Confidence before merge, not after.',
    proof: '250+ tests · 100% coverage · 10× faster',
  },
  {
    index: '04',
    phase: 'Ship',
    does: 'Code review in both directions. Logs and traces in place before the first deploy.',
    get: 'Releases that stay released.',
    proof: '6+ PRs · zero production defects',
  },
] as const

export const achievements = [
  { value: '400+', label: 'LeetCode problems solved' },
  { value: 'Finalist', label: 'Envithon hackathon' },
  { value: 'SIH', label: 'Smart India Hackathon 2023 & 2024' },
  { value: 'SNUHacks', label: 'Hackathon participant' },
  { value: 'DevSecOps', label: 'Workshops on secure CI/CD' },
] as const

export const intents = ['Full-time Role', 'Internship', 'Freelance Build', 'Just Saying Hi'] as const
export const areas = ['Backend / APIs', 'Full-Stack App', 'AI Workflow', 'Infra & CI/CD'] as const
