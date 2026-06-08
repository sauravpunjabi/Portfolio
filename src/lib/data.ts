export type Project = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  github: string;
  demo: string | null;
  featured: boolean;
  accentColor: string;
  problem: string;
  solution: string;
  architecture: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    id: "jarvis",
    title: "J.A.R.V.I.S",
    subtitle: "AI Voice Assistant",
    year: "2025",
    category: "AI / Machine Learning",
    description:
      "A fully local, Iron Man-inspired AI voice assistant with wake word detection, deep PC integration, and zero cloud dependency.",
    longDescription:
      "J.A.R.V.I.S is a locally-running AI assistant that combines wake word detection, speech-to-text, a Gemini-powered conversational brain, and neural text-to-speech into a seamless, always-on desktop experience — built from scratch with privacy as a first principle.",
    tags: ["Python", "Gemini 2.5 Flash", "OpenAI Whisper", "PyQt6", "Edge TTS", "openWakeWord"],
    github: "https://github.com/sauravpunjabi/Jarvis",
    demo: null,
    featured: true,
    accentColor: "rgba(96, 165, 250, 0.12)",
    problem:
      "Existing voice assistants are cloud-dependent, privacy-invasive, and lack deep desktop integration. They're designed for smart speakers, not power users who want a truly intelligent PC companion.",
    solution:
      "A modular, locally-run voice pipeline: wake word detection → Whisper speech-to-text → Gemini 2.5 Flash reasoning → Edge TTS output, packaged in a polished PyQt6 desktop GUI with persistent memory across sessions.",
    architecture: [
      {
        title: "Wake Word Detection",
        description: "openWakeWord listens continuously for the trigger phrase with minimal CPU overhead, activating the pipeline only when needed.",
      },
      {
        title: "Speech-to-Text",
        description: "OpenAI Whisper processes audio locally, providing accurate transcription without sending data to any external server.",
      },
      {
        title: "AI Brain",
        description: "Gemini 2.5 Flash acts as the reasoning engine with a custom JARVIS personality, persistent memory, and context awareness.",
      },
      {
        title: "Neural TTS",
        description: "Edge TTS synthesizes natural-sounding voice responses, completing the conversational loop in under 2 seconds end-to-end.",
      },
    ],
    challenges: [
      {
        title: "Latency Optimization",
        description: "Achieving sub-2s response times required careful pipeline orchestration — streaming audio capture, parallel processing, and pre-buffering TTS output.",
      },
      {
        title: "Persistent Memory",
        description: "Designing a memory system that persists conversation context across sessions without bloating the prompt required a structured summarization strategy.",
      },
      {
        title: "Modular Skill System",
        description: "Building a plugin-like skill system where each capability (PC control, web search, weather) is independently extensible without modifying the core pipeline.",
      },
    ],
    outcomes: [
      "Sub-2 second end-to-end voice response latency",
      "15+ modular skills including PC control, web search, and media playback",
      "Zero cloud dependency — all processing runs locally",
      "Persistent personality and conversation memory across sessions",
    ],
  },
  {
    id: "autoserve",
    title: "AutoServe",
    subtitle: "Vehicle Service SaaS",
    year: "2025",
    category: "SaaS / Fullstack",
    description:
      "A multi-tenant SaaS platform that digitizes the entire automobile service workflow — from booking to billing — with role-based access for customers, mechanics, and admins.",
    longDescription:
      "AutoServe replaces the paper-and-Excel chaos of auto service shops with a structured, multi-tenant platform. It handles service bookings, job card management, inventory tracking, invoice generation, and role-based access — all built on a normalized PostgreSQL schema with JWT authentication.",
    tags: ["React 18", "TypeScript", "Node.js", "PostgreSQL", "JWT", "Express.js"],
    github: "https://github.com/sauravpunjabi/AutoServe",
    demo: "https://autoserve-three.vercel.app",
    featured: true,
    accentColor: "rgba(52, 211, 153, 0.08)",
    problem:
      "Auto service shops operate with paper job cards, manual billing, and zero visibility into inventory. There's no central system connecting customers, mechanics, and managers — leading to miscommunication, lost records, and revenue leakage.",
    solution:
      "A subscription-based, multi-tenant SaaS that gives each service center its own isolated workspace with role-aware dashboards for customers (booking & tracking), mechanics (job cards & updates), and admins (full operational control).",
    architecture: [
      {
        title: "Multi-Tenancy Model",
        description: "Each service center operates in an isolated tenant namespace. Row-level security in PostgreSQL ensures complete data separation between accounts.",
      },
      {
        title: "Authentication & RBAC",
        description: "JWT-based auth with three distinct roles (customer, mechanic, admin) — each with scoped API access and UI tailored to their workflow.",
      },
      {
        title: "Relational Data Model",
        description: "A normalized PostgreSQL schema maps vehicles → service jobs → job cards → inventory items → invoices with referential integrity throughout.",
      },
      {
        title: "Business Logic Layer",
        description: "Node.js/Express handles service booking scheduling, job card lifecycle management, real-time inventory deduction, and automated invoice generation.",
      },
    ],
    challenges: [
      {
        title: "Multi-Tenant Isolation",
        description: "Ensuring one tenant's data is never accessible to another required careful middleware design and consistent tenant-scoped query patterns.",
      },
      {
        title: "Complex State Management",
        description: "A service job moves through multiple states (booked → in-progress → completed → invoiced) with different actors responsible at each stage.",
      },
      {
        title: "Schema Design",
        description: "Modeling the relationships between vehicles, jobs, inventory, and billing required multiple iterations to get right — balancing normalization with query performance.",
      },
    ],
    outcomes: [
      "End-to-end service workflow management for multiple service centers",
      "Role-based dashboards for 3 distinct user types",
      "Automated invoice generation tied to job card completion",
      "Subscription-based multi-tenancy supporting independent service center accounts",
    ],
  },
  {
    id: "questro",
    title: "Questro",
    subtitle: "AI Interview Prep Bot",
    year: "2025",
    category: "AI / EdTech",
    description:
      "A conversational AI platform that simulates real technical and behavioral interviews, delivering structured performance feedback powered by Gemini API.",
    longDescription:
      "Questro transforms passive interview prep into an active, personalized experience. Users configure their target role, stack, difficulty level, and question count — then enter a simulated interview session. Responses are analyzed by Gemini API and stored in Firebase for longitudinal progress tracking.",
    tags: ["Next.js", "TypeScript", "Firebase", "Gemini API", "Tailwind CSS"],
    github: "https://github.com/sauravpunjabi/Questro",
    demo: null,
    featured: true,
    accentColor: "rgba(167, 139, 250, 0.08)",
    problem:
      "Interview prep is either passive (reading articles, watching videos) or prohibitively expensive (paid mock interview services). There's no accessible, intelligent tool that simulates the actual pressure and flow of a real interview.",
    solution:
      "An AI-powered conversational simulator where users configure session parameters upfront, then engage in a realistic question-response loop. Gemini API evaluates each answer and returns structured feedback — covering correctness, depth, and communication quality.",
    architecture: [
      {
        title: "Session Configuration",
        description: "Users define role, tech stack, interview type (technical/behavioral), difficulty, and question count before each session — creating a personalized experience.",
      },
      {
        title: "Conversational Flow",
        description: "Next.js streams questions one at a time, mimicking the pacing of a real interview. User responses are captured and sent to the Gemini API endpoint.",
      },
      {
        title: "AI Feedback Engine",
        description: "Gemini API evaluates responses against expected criteria and returns structured JSON feedback: score, strengths, gaps, and improvement suggestions.",
      },
      {
        title: "Session Storage",
        description: "Full session transcripts and feedback are stored in Firebase Firestore, enabling users to review past sessions and track improvement over time.",
      },
    ],
    challenges: [
      {
        title: "Natural Interview Flow",
        description: "Designing a question flow that feels like a real interview — not a quiz — required careful prompt engineering and state management across the session.",
      },
      {
        title: "Structured Feedback Extraction",
        description: "Getting Gemini API to return consistent, structured JSON feedback (not free-form text) required a well-engineered system prompt with output schema enforcement.",
      },
      {
        title: "Session Management",
        description: "Maintaining conversation context, tracking which questions have been asked, and handling session completion gracefully added significant state complexity.",
      },
    ],
    outcomes: [
      "Configurable sessions across 10+ tech stacks and 3 difficulty levels",
      "Structured feedback with scores, strengths, and improvement areas per answer",
      "Full session history with longitudinal progress tracking via Firebase",
      "Role-specific question banks for technical and behavioral scenarios",
    ],
  },
];

export const experience = [
  {
    id: "siddesh",
    company: "Siddesh Technologies",
    role: "Frontend-Focused Fullstack Developer Intern",
    period: "Feb 2026 – Present",
    location: "Pune, India",
    type: "Full-time Internship",
    current: true,
    bullets: [
      "Owned end-to-end UI development for a client-facing web project, building and iterating on components from scratch",
      "Diagnosed and resolved frontend bugs across the application, improving stability and visual consistency",
      "Collaborated with the team to translate requirements into functional, clean interfaces",
      "Consistently met project submission deadlines in an agile team environment",
    ],
  },
];

export const education = [
  {
    degree: "Master in Computer Applications",
    school: "MIT-WPU",
    location: "Pune, India",
    period: "2024 – 2026",
    current: true,
  },
  {
    degree: "Bachelor in Computer Applications",
    school: "Jai Hind's Zulal Bhilajirao Patil College",
    location: "Pune, India",
    period: "2021 – 2024",
    current: false,
  },
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "GSAP", "HTML", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs", "JWT Auth"],
  },
  {
    category: "AI & ML",
    items: ["Gemini API", "OpenAI Whisper", "openWakeWord", "Edge TTS", "Python"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "VS Code", "Figma"],
  },
];

export const contact = {
  phone: "+91-9511865602",
  email: "sauravpunjabi123@gmail.com",
  github: "https://github.com/sauravpunjabi",
  linkedin: "https://www.linkedin.com/in/sauravpunjabi/",
};
