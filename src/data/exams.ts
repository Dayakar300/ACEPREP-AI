import { ExamCategory } from "../types";

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: "upsc-cse",
    name: "UPSC CSE",
    description:
      "Civil Services Examination covering Polity, Economy, History, Geography, Environment, and CSAT.",
    region: "India",
    icon: "landmark",
    subjects: [
      "Indian Polity",
      "Economy",
      "Modern History",
      "Geography",
      "Environment",
    ],
  },
  {
    id: "jee-main",
    name: "JEE Main & Adv",
    description:
      "Premier engineering entrance exam testing conceptual depth in Physics, Chemistry, and Mathematics.",
    region: "India",
    icon: "atom",
    subjects: ["Physics", "Chemistry", "Mathematics"],
  },
  {
    id: "neet-ug",
    name: "NEET UG",
    description:
      "National Eligibility cum Entrance Test for medical aspirants across Biology, Physics, and Chemistry.",
    region: "India",
    icon: "heart-pulse",
    subjects: ["Biology", "Physics", "Chemistry"],
  },
  {
    id: "gate-cs",
    name: "GATE CS & IT",
    description:
      "Graduate Aptitude Test in Engineering covering Algorithms, OS, DBMS, Networks, and Aptitude.",
    region: "India",
    icon: "cpu",
    subjects: [
      "Algorithms",
      "Operating Systems",
      "DBMS",
      "Computer Networks",
      "Engineering Math",
    ],
  },
  {
    id: "cat-mba",
    name: "CAT MBA",
    description:
      "Common Admission Test for top B-schools across Quantitative Aptitude, DILR, and VARC.",
    region: "India",
    icon: "trending-up",
    subjects: [
      "Quantitative Aptitude",
      "Data Interpretation",
      "Verbal Ability",
    ],
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    description:
      "Combined Graduate Level exam testing Reasoning, Quantitative Aptitude, English, and General Awareness.",
    region: "India",
    icon: "building-2",
    subjects: [
      "Quantitative Aptitude",
      "General Intelligence",
      "English",
      "General Awareness",
    ],
  },
  {
    id: "banking-po",
    name: "IBPS / SBI PO",
    description:
      "Probationary Officer exam for Banking & Financial Awareness, Quantitative Aptitude, and Reasoning.",
    region: "India",
    icon: "briefcase",
    subjects: [
      "Reasoning Ability",
      "Quantitative Aptitude",
      "English Language",
      "Banking Awareness",
    ],
  },
  {
    id: "gre-general",
    name: "GRE General",
    description:
      "Graduate Record Examination assessing Verbal Reasoning, Quantitative Reasoning, and Analytical Thinking.",
    region: "International",
    icon: "graduation-cap",
    subjects: ["Verbal Reasoning", "Quantitative Reasoning", "Data Analysis"],
  },
  {
    id: "gmat-focus",
    name: "GMAT Focus",
    description:
      "Global business school admissions exam testing Quantitative, Verbal, and Data Insights skills.",
    region: "International",
    icon: "bar-chart-3",
    subjects: ["Quantitative Reasoning", "Verbal Reasoning", "Data Insights"],
  },
  {
    id: "digital-sat",
    name: "Digital SAT",
    description:
      "Adaptive college entrance assessment focused on Reading & Writing and College Math.",
    region: "International",
    icon: "school",
    subjects: ["Reading & Writing", "Math"],
  },
  {
    id: "ielts-academic",
    name: "IELTS Academic",
    description:
      "International English Language Testing System for higher education and global migration.",
    region: "International",
    icon: "languages",
    subjects: ["Academic Reading", "Grammar & Usage", "Academic Vocabulary"],
  },
  {
    id: "toefl-ibt",
    name: "TOEFL iBT",
    description:
      "Academic English proficiency test evaluating reading comprehension, structure, and vocabulary.",
    region: "International",
    icon: "book-open",
    subjects: ["Reading Comprehension", "Academic Vocabulary", "Grammar & Structure"],
  },
];
