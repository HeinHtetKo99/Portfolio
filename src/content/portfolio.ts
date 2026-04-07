export type PortfolioProject = {
  title: string;
  description: string;
  demoUrl: string;
  tags: string[];
  imageSrc: string;
};

export type Certificate = {
  title: string;
  imageSrc: string;
  issuer?: string;
  date?: string;
  verifyUrl?: string;
};

export const portfolio = {
  profile: {
    name: "Hein Htet Ko",
    title: "Full Stack Web Developer",
    headline: "Full‑Stack / Frontend Developer",
    tagline:
      "I build modern, scalable web applications with clean architecture, strong UX, and production-ready workflows.",
    lookingFor: [
      "Frontend or full‑stack role (junior to mid)",
      "Teams that care about clean UX + performance",
      "Product work with maintainable code structure",
    ],
  },
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "Vercel",
    "jQuery",
    "Laravel",
    "PHP",
    "MySQL",
    "MongoDB",
    "Firebase",
    "Railway",
  ],
  skillGroups: [
    {
      name: "Frontend",
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Vercel", "jQuery"],
    },
    {
      name: "Backend",
      skills: ["PHP", "Laravel"],
    },
    {
      name: "Database",
      skills: ["MySQL", "MongoDB", "Firebase"],
    },
    {
      name: "Tools & Deploy",
      skills: ["Vercel", "Railway"],
    },
  ],
  projects: [
    {
      title: "GymFlow SaaS Management",
      description:
        "A production-ready gym management dashboard with role-based access, multi-gym isolation via gym code, member lifecycle tracking, attendance check-ins, and payment + receipt workflows.",
      demoUrl: "https://gym-flow-smoky.vercel.app/",
      tags: ["SaaS", "RBAC", "Payments", "Attendance"],
      imageSrc: "/projects/GymFlow-SaaS-Management.png",
    },
    {
      title: "Coders Community Forum",
      description:
        "A developer Q&A platform with authentication, threads, tags, answers, and voting — built with a production-style structure focused on clean UX and scalable content flow.",
      demoUrl: "https://coders-community-dun.vercel.app/",
      tags: ["Forum", "Auth", "Dynamic Content", "UI"],
      imageSrc: "/projects/coders-community.png",
    },
    {
      title: "TaskFlow Workspace App",
      description:
        "A role-based task management workspace with permissions and Firestore-backed data, designed for clear collaboration flows and fast day-to-day task handling.",
      demoUrl: "https://taskflow-five-gules.vercel.app/",
      tags: ["Tasks", "Roles", "Firestore", "Productivity"],
      imageSrc: "/projects/Task-flow.png",
    },
    {
      title: "Book Library App",
      description:
        "A React + Firebase CRUD app with authentication, search, and notes — designed as a clean library experience with fast browsing and simple content management.",
      demoUrl: "https://book-store-52e12.web.app/",
      tags: ["React", "Firebase", "CRUD", "Search"],
      imageSrc: "/projects/BookStore.png",
    },
  ] satisfies PortfolioProject[],
  links: {
    email: "heinhtetko69@gmail.com",
    linkedin: "https://www.linkedin.com/in/hein-htet-ko-997a03148/",
    github: "https://github.com/HeinHtetKo99",
    resume: "/resume.pdf",
  },
  certificates: [
    {
      title: "Frontend Developer Course",
      imageSrc: "/certificates/[FRONTEND DEVELOPER COURSE] Certificate (1).png",
    },
    {
      title: "React + Firebase",
      imageSrc: "/certificates/React+Firebase.png",
    },
    {
      title: "Next.js",
      imageSrc: "/certificates/next.js.png",
    },
    {
      title: "JavaScript DOM",
      imageSrc: "/certificates/Javascript-Dom.png",
    },
    {
      title: "Git & GitHub",
      imageSrc: "/certificates/git&github.png",
    },
  ] satisfies Certificate[],
} as const;
