import { Difficulty, Question } from "../types";

export const QUESTION_BANK: Question[] = [
  // ================= UPSC CSE =================
  {
    id: "upsc-1",
    exam_category_id: "upsc-cse",
    subject: "Indian Polity",
    difficulty: "Medium",
    question_text:
      "Which Article of the Indian Constitution empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights?",
    options: ["Article 226", "Article 32", "Article 136", "Article 143"],
    correct_answer_index: 1,
    explanation:
      "Article 32 confers the right to constitutional remedies and empowers the Supreme Court to issue writs (Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari). Article 226 applies to High Courts.",
  },
  {
    id: "upsc-2",
    exam_category_id: "upsc-cse",
    subject: "Indian Polity",
    difficulty: "Hard",
    question_text:
      "Under the Constitution of India, a Money Bill can be introduced in which House and with whose prior recommendation?",
    options: [
      "Either House, with the Prime Minister's recommendation",
      "Lok Sabha only, with the President's prior recommendation",
      "Rajya Sabha only, with the Finance Minister's recommendation",
      "Lok Sabha only, with the Speaker's prior approval",
    ],
    correct_answer_index: 1,
    explanation:
      "Under Article 117(1) and Article 110, a Money Bill can only be introduced in the Lok Sabha and only with the prior recommendation of the President of India.",
  },
  {
    id: "upsc-3",
    exam_category_id: "upsc-cse",
    subject: "Economy",
    difficulty: "Medium",
    question_text:
      "When the Reserve Bank of India increases the Repo Rate, what is the most immediate expected macroeconomic effect?",
    options: [
      "Commercial bank borrowing becomes cheaper, expanding liquidity",
      "Borrowing costs rise, helping curb inflationary demand",
      "Government fiscal deficit automatically declines",
      "Statutory Liquidity Ratio (SLR) drops to zero",
    ],
    correct_answer_index: 1,
    explanation:
      "Repo rate is the rate at which the RBI lends short-term funds to commercial banks. Raising it makes credit costlier, tightening money supply and moderating inflation.",
  },
  {
    id: "upsc-4",
    exam_category_id: "upsc-cse",
    subject: "Modern History",
    difficulty: "Easy",
    question_text:
      "The Non-Cooperation Movement was formally withdrawn by Mahatma Gandhi in February 1922 following which incident?",
    options: [
      "Jallianwala Bagh Massacre",
      "Chauri Chaura incident",
      "Kakori Train Conspiracy",
      "Partition of Bengal",
    ],
    correct_answer_index: 1,
    explanation:
      "Following the violent clash at Chauri Chaura in Gorakhpur district in February 1922 where a police station was set ablaze, Mahatma Gandhi suspended the Non-Cooperation Movement.",
  },
  {
    id: "upsc-5",
    exam_category_id: "upsc-cse",
    subject: "Geography",
    difficulty: "Medium",
    question_text:
      "Which of the following Indian rivers flows westward into the Arabian Sea through a rift valley?",
    options: ["Godavari", "Krishna", "Narmada", "Mahanadi"],
    correct_answer_index: 2,
    explanation:
      "The Narmada (along with the Tapi) flows westward through a rift valley between the Vindhya and Satpura ranges and drains into the Arabian Sea.",
  },
  {
    id: "upsc-6",
    exam_category_id: "upsc-cse",
    subject: "Environment",
    difficulty: "Medium",
    question_text:
      "The Montreux Record is a register maintained under which international environmental convention?",
    options: [
      "Basel Convention on Hazardous Wastes",
      "Ramsar Convention on Wetlands",
      "Stockholm Convention on POPs",
      "Convention on Migratory Species",
    ],
    correct_answer_index: 1,
    explanation:
      "The Montreux Record is a register of wetland sites on the List of Wetlands of International Importance under the Ramsar Convention where changes in ecological character have occurred or are likely to occur.",
  },

  // ================= JEE MAIN & ADV =================
  {
    id: "jee-1",
    exam_category_id: "jee-main",
    subject: "Physics",
    difficulty: "Medium",
    question_text:
      "A projectile is launched with speed u at an angle θ above the horizontal. Neglecting air resistance, what is the radius of curvature at the highest point of its trajectory?",
    options: [
      "u² / g",
      "(u² cos²θ) / g",
      "(u² sin²θ) / g",
      "(u² cosθ) / g",
    ],
    correct_answer_index: 1,
    explanation:
      "At the highest point, velocity is purely horizontal with magnitude v = u cosθ, and normal acceleration is g. Thus radius of curvature R = v² / g = (u² cos²θ) / g.",
  },
  {
    id: "jee-2",
    exam_category_id: "jee-main",
    subject: "Physics",
    difficulty: "Hard",
    question_text:
      "Two identical thin convex lenses each of focal length f are placed coaxially in contact. An object is placed at distance f from the combination. Where is the image formed?",
    options: ["At infinity", "At distance f", "At distance f/2", "At distance 2f"],
    correct_answer_index: 1,
    explanation:
      "Combined focal length F = f/2. Using 1/v - 1/u = 1/F with u = -f: 1/v = 2/f - 1/f = 1/f, so v = +f on the opposite side.",
  },
  {
    id: "jee-3",
    exam_category_id: "jee-main",
    subject: "Chemistry",
    difficulty: "Medium",
    question_text:
      "Which of the following species has a square planar molecular geometry according to VSEPR theory?",
    options: ["SF₄", "XeF₄", "CH₄", "BF₄⁻"],
    correct_answer_index: 1,
    explanation:
      "XeF₄ has 4 bond pairs and 2 lone pairs around Xe (steric number 6, octahedral electron geometry). The two lone pairs occupy opposite axial positions, leaving a square planar shape.",
  },
  {
    id: "jee-4",
    exam_category_id: "jee-main",
    subject: "Mathematics",
    difficulty: "Medium",
    question_text:
      "What is the value of the definite integral ∫₀^(π/2) [sin(x) / (sin(x) + cos(x))] dx?",
    options: ["π / 2", "π / 4", "π / 8", "1"],
    correct_answer_index: 1,
    explanation:
      "Using King's property I = ∫₀^(π/2) f(π/2 - x) dx, I = ∫₀^(π/2) [cos(x)/(sin(x)+cos(x))] dx. Adding gives 2I = ∫₀^(π/2) 1 dx = π/2, hence I = π/4.",
  },
  {
    id: "jee-5",
    exam_category_id: "jee-main",
    subject: "Mathematics",
    difficulty: "Easy",
    question_text:
      "If the roots of x² - 5x + k = 0 differ by 1, what is the value of k?",
    options: ["4", "6", "5", "8"],
    correct_answer_index: 1,
    explanation:
      "Let roots be α and β. α + β = 5 and |α - β| = 1. Since (α - β)² = (α + β)² - 4αβ, we get 1 = 25 - 4k, so 4k = 24 and k = 6.",
  },

  // ================= NEET UG =================
  {
    id: "neet-1",
    exam_category_id: "neet-ug",
    subject: "Biology",
    difficulty: "Easy",
    question_text:
      "Which cell organelle is directly responsible for the synthesis of ATP via oxidative phosphorylation in eukaryotic cells?",
    options: ["Golgi apparatus", "Mitochondria", "Lysosome", "Peroxisome"],
    correct_answer_index: 1,
    explanation:
      "Mitochondria generate most of the cell's ATP through the electron transport chain and chemiosmotic oxidative phosphorylation on the inner mitochondrial membrane.",
  },
  {
    id: "neet-2",
    exam_category_id: "neet-ug",
    subject: "Biology",
    difficulty: "Medium",
    question_text:
      "During DNA replication, the enzyme that synthesizes short RNA primers required for DNA polymerase III to initiate strand elongation is:",
    options: ["DNA helicase", "DNA primase", "DNA ligase", "Topoisomerase"],
    correct_answer_index: 1,
    explanation:
      "DNA polymerases cannot initiate synthesis de novo and require a free 3'-OH group provided by a short RNA primer synthesized by DNA primase (RNA polymerase).",
  },
  {
    id: "neet-3",
    exam_category_id: "neet-ug",
    subject: "Chemistry",
    difficulty: "Medium",
    question_text:
      "Which of the following is the most acidic compound among the given options?",
    options: ["Ethanol", "Phenol", "p-Nitrophenol", "p-Cresol"],
    correct_answer_index: 2,
    explanation:
      "The nitro group (-NO₂) at the para position exerts strong -I and -M (resonance) electron-withdrawing effects, stabilizing the phenoxide ion and increasing acidity.",
  },
  {
    id: "neet-4",
    exam_category_id: "neet-ug",
    subject: "Physics",
    difficulty: "Easy",
    question_text:
      "What is the dimensional formula of Planck's constant h?",
    options: ["[M L² T⁻¹]", "[M L² T⁻²]", "[M L T⁻²]", "[M L⁻¹ T⁻¹]"],
    correct_answer_index: 0,
    explanation:
      "From E = hν, h = Energy / Frequency = [M L² T⁻²] / [T⁻¹] = [M L² T⁻¹], which is the same as angular momentum.",
  },

  // ================= GATE CS & IT =================
  {
    id: "gate-1",
    exam_category_id: "gate-cs",
    subject: "Algorithms",
    difficulty: "Medium",
    question_text:
      "What is the tight worst-case time complexity of building a binary heap from an unsorted array of n elements using Floyd's bottom-up algorithm?",
    options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
    correct_answer_index: 1,
    explanation:
      "Floyd's bottom-up heapify runs in O(n) worst-case time because most nodes are near the bottom of the heap and sift down only a small constant number of levels on average.",
  },
  {
    id: "gate-2",
    exam_category_id: "gate-cs",
    subject: "Operating Systems",
    difficulty: "Medium",
    question_text:
      "Which page replacement algorithm can suffer from Belady's Anomaly (more page faults when allocated more frames)?",
    options: ["LRU", "Optimal", "FIFO", "LFU with stack property"],
    correct_answer_index: 2,
    explanation:
      "FIFO is not a stack algorithm, so increasing the number of physical memory frames can paradoxically increase the number of page faults (Belady's Anomaly).",
  },
  {
    id: "gate-3",
    exam_category_id: "gate-cs",
    subject: "DBMS",
    difficulty: "Hard",
    question_text:
      "Every relation schema in Boyce-Codd Normal Form (BCNF) is guaranteed to be:",
    options: [
      "Free of all join dependencies",
      "In Third Normal Form (3NF) as well",
      "Dependency-preserving for every functional dependency",
      "Guaranteed to have only a single candidate key",
    ],
    correct_answer_index: 1,
    explanation:
      "BCNF is strictly stronger than 3NF, so every BCNF relation is also in 3NF. However, BCNF decomposition is not always dependency-preserving.",
  },
  {
    id: "gate-4",
    exam_category_id: "gate-cs",
    subject: "Computer Networks",
    difficulty: "Easy",
    question_text:
      "In the OSI model, which layer is primarily responsible for end-to-end reliability, flow control, and port-based multiplexing?",
    options: [
      "Network Layer",
      "Transport Layer",
      "Data Link Layer",
      "Session Layer",
    ],
    correct_answer_index: 1,
    explanation:
      "The Transport Layer (e.g., TCP and UDP) handles process-to-process delivery via port numbers, and TCP provides reliability and flow/congestion control.",
  },
  {
    id: "gate-5",
    exam_category_id: "gate-cs",
    subject: "Engineering Math",
    difficulty: "Medium",
    question_text:
      "For an undirected simple graph with n vertices and e edges, what is the sum of the degrees of all vertices?",
    options: ["e", "2e", "n + e", "e(e - 1)"],
    correct_answer_index: 1,
    explanation:
      "By the Handshaking Lemma, each edge contributes 1 to the degree of each of its two endpoints, so the sum of degrees equals 2e.",
  },

  // ================= CAT MBA =================
  {
    id: "cat-1",
    exam_category_id: "cat-mba",
    subject: "Quantitative Aptitude",
    difficulty: "Medium",
    question_text:
      "A trader marks his goods 40% above cost price and allows a 20% discount on the marked price. What is his net profit percentage?",
    options: ["10%", "12%", "15%", "20%"],
    correct_answer_index: 1,
    explanation:
      "Let CP = 100. Marked price = 140. After 20% discount, SP = 140 × 0.8 = 112. Thus profit = 12%.",
  },
  {
    id: "cat-2",
    exam_category_id: "cat-mba",
    subject: "Data Interpretation",
    difficulty: "Medium",
    question_text:
      "A company's revenue grew from ₹250 crore in 2023 to ₹330 crore in 2025. What is the approximate compound annual growth rate (CAGR) over the 2-year period?",
    options: ["12.4%", "14.9%", "16.0%", "32.0%"],
    correct_answer_index: 1,
    explanation:
      "CAGR = (330 / 250)^(1/2) - 1 = (1.32)^0.5 - 1 ≈ 1.1489 - 1 = 14.89% ≈ 14.9%.",
  },
  {
    id: "cat-3",
    exam_category_id: "cat-mba",
    subject: "Verbal Ability",
    difficulty: "Medium",
    question_text:
      "Identify the option that best summarizes: 'While automation displaces routine tasks, historical transitions show that complementary roles often expand overall employment.'",
    options: [
      "Automation permanently destroys more jobs than it creates.",
      "New complementary roles historically offset job displacement from automation.",
      "Routine tasks are immune to technological disruption.",
      "Governments should halt automation to protect routine workers.",
    ],
    correct_answer_index: 1,
    explanation:
      "The passage contrasts displacement of routine tasks with the historical expansion of complementary roles, directly matching the second choice.",
  },

  // ================= SSC CGL =================
  {
    id: "ssc-1",
    exam_category_id: "ssc-cgl",
    subject: "Quantitative Aptitude",
    difficulty: "Easy",
    question_text:
      "If A can complete a piece of work in 12 days and B can complete it in 18 days, in how many days will they complete it working together?",
    options: ["6.5 days", "7.2 days", "8.0 days", "9.0 days"],
    correct_answer_index: 1,
    explanation:
      "Combined rate = 1/12 + 1/18 = (3 + 2)/36 = 5/36 per day. Total time = 36/5 = 7.2 days.",
  },
  {
    id: "ssc-2",
    exam_category_id: "ssc-cgl",
    subject: "General Intelligence",
    difficulty: "Easy",
    question_text:
      "Find the missing number in the series: 3, 7, 15, 31, 63, ?",
    options: ["125", "127", "129", "131"],
    correct_answer_index: 1,
    explanation:
      "Each term follows the pattern 2 × previous + 1 (or +4, +8, +16, +32, +64). So 63 × 2 + 1 = 127.",
  },
  {
    id: "ssc-3",
    exam_category_id: "ssc-cgl",
    subject: "English",
    difficulty: "Easy",
    question_text:
      "Select the most appropriate synonym of the word 'EPHEMERAL':",
    options: ["Eternal", "Transitory", "Rigid", "Abundant"],
    correct_answer_index: 1,
    explanation:
      "'Ephemeral' means lasting for a very short time, which is synonymous with 'transitory'.",
  },
  {
    id: "ssc-4",
    exam_category_id: "ssc-cgl",
    subject: "General Awareness",
    difficulty: "Easy",
    question_text:
      "Which vitamin is chemically known as Ascorbic Acid?",
    options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
    correct_answer_index: 2,
    explanation:
      "Vitamin C is ascorbic acid, an essential water-soluble vitamin important for collagen synthesis and immune health.",
  },

  // ================= BANKING PO =================
  {
    id: "bank-1",
    exam_category_id: "banking-po",
    subject: "Banking Awareness",
    difficulty: "Medium",
    question_text:
      "In Indian banking terminology, what does 'NPAs' stand for?",
    options: [
      "National Payment Accounts",
      "Non-Performing Assets",
      "Net Profit Adjustments",
      "New Priority Advances",
    ],
    correct_answer_index: 1,
    explanation:
      "NPA stands for Non-Performing Asset — a loan or advance for which principal or interest payment remained overdue for a period of 90 days.",
  },
  {
    id: "bank-2",
    exam_category_id: "banking-po",
    subject: "Reasoning Ability",
    difficulty: "Medium",
    question_text:
      "Statements: All laptops are devices. Some devices are tablets. Conclusions: I. Some laptops are tablets. II. Some devices are laptops.",
    options: [
      "Only Conclusion I follows",
      "Only Conclusion II follows",
      "Both I and II follow",
      "Neither I nor II follows",
    ],
    correct_answer_index: 1,
    explanation:
      "Since all laptops are devices, it necessarily follows that some devices are laptops (Conclusion II). Laptops and tablets need not overlap (I does not definitely follow).",
  },
  {
    id: "bank-3",
    exam_category_id: "banking-po",
    subject: "Quantitative Aptitude",
    difficulty: "Medium",
    question_text:
      "A sum of ₹10,000 is invested at 10% p.a. compound interest compounded annually. What is the interest earned in 2 years?",
    options: ["₹2,000", "₹2,100", "₹2,200", "₹1,900"],
    correct_answer_index: 1,
    explanation:
      "Amount = 10000 × (1.1)² = 12,100. Compound interest = 12,100 - 10,000 = ₹2,100.",
  },

  // ================= GRE GENERAL =================
  {
    id: "gre-1",
    exam_category_id: "gre-general",
    subject: "Verbal Reasoning",
    difficulty: "Medium",
    question_text:
      "Although the physicist's latest hypothesis was initially dismissed as ______, subsequent experimental data proved her conclusions remarkably prescient.",
    options: ["empirical", "specious", "rigorous", "unassailable"],
    correct_answer_index: 1,
    explanation:
      "'Although' signals contrast with 'remarkably prescient' (insightful/accurate). 'Specious' means superficially plausible but actually wrong/flawed, fitting the initial dismissal.",
  },
  {
    id: "gre-2",
    exam_category_id: "gre-general",
    subject: "Verbal Reasoning",
    difficulty: "Hard",
    question_text:
      "The curator's monograph was praised for its ______ treatment of Renaissance bronzes, leaving virtually no archival stone unturned.",
    options: ["cursory", "exhaustive", "desultory", "ephemeral"],
    correct_answer_index: 1,
    explanation:
      "'Leaving virtually no archival stone unturned' indicates thoroughness, matching 'exhaustive'. 'Cursory' and 'desultory' mean superficial or unfocused.",
  },
  {
    id: "gre-3",
    exam_category_id: "gre-general",
    subject: "Quantitative Reasoning",
    difficulty: "Medium",
    question_text:
      "If x and y are positive integers such that 3x + 5y = 43, what is the largest possible value of x?",
    options: ["11", "12", "13", "14"],
    correct_answer_index: 0,
    explanation:
      "To maximize x, minimize positive integer y. Testing y = 1 gives 3x = 38 (not divisible by 3). Testing y = 2 gives 3x = 33 ⇒ x = 11.",
  },
  {
    id: "gre-4",
    exam_category_id: "gre-general",
    subject: "Data Analysis",
    difficulty: "Easy",
    question_text:
      "The average (arithmetic mean) of five numbers is 24. If one of the numbers is removed, the average of the remaining four numbers becomes 21. What number was removed?",
    options: ["32", "36", "38", "40"],
    correct_answer_index: 1,
    explanation:
      "Sum of 5 numbers = 5 × 24 = 120. Sum of remaining 4 = 4 × 21 = 84. Removed number = 120 - 84 = 36.",
  },

  // ================= GMAT FOCUS =================
  {
    id: "gmat-1",
    exam_category_id: "gmat-focus",
    subject: "Quantitative Reasoning",
    difficulty: "Medium",
    question_text:
      "At a conference, 60% of attendees are engineers and 30% of the engineers hold a PhD. If 42 attendees are engineers without a PhD, how many total attendees are at the conference?",
    options: ["80", "90", "100", "120"],
    correct_answer_index: 2,
    explanation:
      "Engineers without a PhD represent (1 - 0.30) × 60% = 42% of all attendees. Since 42% of N = 42, total attendees N = 100.",
  },
  {
    id: "gmat-2",
    exam_category_id: "gmat-focus",
    subject: "Verbal Reasoning",
    difficulty: "Hard",
    question_text:
      "City X installed smart traffic signals to cut commute times, yet average commute duration rose by 8% over the year. Which of the following, if true, best resolves the paradox?",
    options: [
      "The signals used LED bulbs that consumed less electricity.",
      "Improved traffic flow attracted 25% more suburban drivers onto City X's roads.",
      "Neighboring City Y did not install smart traffic signals.",
      "Smart signals require quarterly software updates.",
    ],
    correct_answer_index: 1,
    explanation:
      "Induced demand — more drivers choosing those roads because of expected faster flow — explains why total congestion and commute duration increased despite smarter signaling.",
  },
  {
    id: "gmat-3",
    exam_category_id: "gmat-focus",
    subject: "Data Insights",
    difficulty: "Medium",
    question_text:
      "A SaaS team processes 1,200 support tickets per month with 80% automated resolution and 20% human escalation. If automated resolution improves to 85% while ticket volume grows by 25%, how many tickets are escalated to humans?",
    options: ["200", "225", "240", "255"],
    correct_answer_index: 1,
    explanation:
      "New volume = 1200 × 1.25 = 1,500 tickets. Human escalation rate = 15%. Escalated tickets = 1,500 × 0.15 = 225.",
  },

  // ================= DIGITAL SAT =================
  {
    id: "sat-1",
    exam_category_id: "digital-sat",
    subject: "Reading & Writing",
    difficulty: "Easy",
    question_text:
      "Choose the sentence with correct punctuation and parallel structure:",
    options: [
      "The fellowship values applicants who lead workshops, mentor peers, and publishing original research.",
      "The fellowship values applicants who lead workshops, mentor peers, and publish original research.",
      "The fellowship values applicants who leading workshops, mentoring peers, and publish original research.",
      "The fellowship values applicants; who lead workshops, mentor peers, and publish original research.",
    ],
    correct_answer_index: 1,
    explanation:
      "Parallel verbs 'lead', 'mentor', and 'publish' match grammatically inside the relative clause 'who ...'.",
  },
  {
    id: "sat-2",
    exam_category_id: "digital-sat",
    subject: "Math",
    difficulty: "Easy",
    question_text:
      "In the xy-plane, a line passes through (0, 4) and has a slope of -2. What is its x-intercept?",
    options: ["(2, 0)", "(-2, 0)", "(4, 0)", "(8, 0)"],
    correct_answer_index: 0,
    explanation:
      "Line equation is y = -2x + 4. Setting y = 0 gives 2x = 4, so x = 2. Thus the x-intercept is (2, 0).",
  },
  {
    id: "sat-3",
    exam_category_id: "digital-sat",
    subject: "Math",
    difficulty: "Medium",
    question_text:
      "If 2(x - 3) + 4 = 3x - 7, what is the value of 5x?",
    options: ["5", "15", "25", "35"],
    correct_answer_index: 2,
    explanation:
      "Expanding gives 2x - 6 + 4 = 3x - 7 ⇒ 2x - 2 = 3x - 7 ⇒ x = 5. Therefore 5x = 25.",
  },

  // ================= IELTS ACADEMIC =================
  {
    id: "ielts-1",
    exam_category_id: "ielts-academic",
    subject: "Grammar & Usage",
    difficulty: "Medium",
    question_text:
      "Complete the sentence accurately for Academic Writing Task 1: 'Between 2015 and 2020, solar power output ______ dramatically before plateauing.'",
    options: ["has risen", "rose", "was rising had", "will have risen"],
    correct_answer_index: 1,
    explanation:
      "A finished time range in the past ('Between 2015 and 2020') requires the simple past tense ('rose').",
  },
  {
    id: "ielts-2",
    exam_category_id: "ielts-academic",
    subject: "Academic Vocabulary",
    difficulty: "Medium",
    question_text:
      "Which academic collocation best fits: 'The longitudinal study yielded ______ evidence linking sleep quality to memory consolidation.'",
    options: ["compelling", "loud", "tall", "fragile"],
    correct_answer_index: 0,
    explanation:
      "'Compelling evidence' is the standard, high-band academic collocation meaning persuasive and strongly supported evidence.",
  },
  {
    id: "ielts-3",
    exam_category_id: "ielts-academic",
    subject: "Academic Reading",
    difficulty: "Easy",
    question_text:
      "In IELTS Reading True/False/Not Given questions, when should you choose 'NOT GIVEN'?",
    options: [
      "When the passage directly contradicts the statement",
      "When you personally disagree with the statement",
      "When the passage provides insufficient information to verify or contradict the statement",
      "When a synonym appears in the text",
    ],
    correct_answer_index: 2,
    explanation:
      "'FALSE' means the text directly contradicts the claim; 'NOT GIVEN' means the text neither confirms nor contradicts it.",
  },

  // ================= TOEFL iBT =================
  {
    id: "toefl-1",
    exam_category_id: "toefl-ibt",
    subject: "Academic Vocabulary",
    difficulty: "Medium",
    question_text:
      "In an academic lecture on urban ecology, the word 'mitigate' is closest in meaning to:",
    options: ["Intensify", "Alleviate", "Postpone", "Fabricate"],
    correct_answer_index: 1,
    explanation:
      "'Mitigate' means to make less severe, serious, or painful — synonymous with 'alleviate'.",
  },
  {
    id: "toefl-2",
    exam_category_id: "toefl-ibt",
    subject: "Grammar & Structure",
    difficulty: "Medium",
    question_text:
      "Not only ______ the archival manuscripts, but the team also digitized every illustration.",
    options: [
      "they restored",
      "did they restore",
      "they did restore",
      "restored they",
    ],
    correct_answer_index: 1,
    explanation:
      "When a negative or restrictive adverbial like 'Not only' begins a sentence, subject-auxiliary inversion is required: 'Not only did they restore...'.",
  },
  {
    id: "toefl-3",
    exam_category_id: "toefl-ibt",
    subject: "Reading Comprehension",
    difficulty: "Easy",
    question_text:
      "When a TOEFL Reading question asks for the author's primary purpose in a paragraph, the strongest strategy is to:",
    options: [
      "Pick the answer with the longest vocabulary words",
      "Match the main claim and how it relates to the surrounding paragraphs",
      "Choose a minor detail mentioned in the last sentence",
      "Focus solely on proper nouns",
    ],
    correct_answer_index: 1,
    explanation:
      "Rhetorical purpose questions assess how an entire paragraph or example supports the passage's overarching thesis.",
  },
];

export function selectQuestionsFromBank(
  examId: string,
  subject: string,
  difficulty: Difficulty,
  count: number
): Question[] {
  const byExam = QUESTION_BANK.filter((q) => q.exam_category_id === examId);
  const bySubject =
    subject === "all" ? byExam : byExam.filter((q) => q.subject === subject);
  const byDiff =
    difficulty === "Mixed"
      ? bySubject
      : bySubject.filter((q) => q.difficulty === difficulty);

  // Build priority pool: exact match -> same exam -> broader bank
  const seen = new Set<string>();
  const ordered: Question[] = [];
  const pushUnique = (list: Question[]) => {
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    for (const q of shuffled) {
      if (!seen.has(q.id)) {
        seen.add(q.id);
        ordered.push(q);
      }
    }
  };

  pushUnique(byDiff);
  pushUnique(bySubject);
  pushUnique(byExam);
  pushUnique(QUESTION_BANK);

  return ordered.slice(0, count).map((q, idx) => ({
    ...q,
    id: `q_${idx}_${q.id}`,
  }));
}
