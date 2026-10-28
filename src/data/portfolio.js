// All the content of the site lives here. Edit this file, not the components.
// Replace every "#" link with the real URL.

export const profile = {
  name: "Sourabh Gorai",
  status: "Integration Development Trainee at Accenture",
  email: "sourabhgorai943@gmail.com",
  phone: "+91 73878 88483",
  phoneHref: "tel:+917387888483",
  location: "Jharkhand, India",
  github: "https://github.com/SourabhGorai",
  linkedin: "https://www.linkedin.com/in/sourabh-gorai/",
  resume: "https://drive.google.com/file/d/1htiAC63w9xHh-2fFCUtYzkrr5_2CHqii/view?usp=drive_link", // e.g. '/Sourabh_Gorai_Resume.pdf' after putting the PDF in /public
  photo: "/public/images/Sourabh Gorai.jpeg", // e.g. '/photo.jpg' after putting the image in /public
};

export const nav = [
  { label: "About", href: "#me" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#about" },
];

export const hero = {
  lead: "I’m a software engineer who works with Java, Spring Boot, Kafka and SAP BTP Integration Suite. I recently graduated in Information Technology with a 9.04 CGPA from Bharati Vidyapeeth College of Engineering, Pune.",
  flow: [
    { title: "Source", text: "SFTP, IDoc, SOAP" },
    { title: "Adapter", text: "REST, OData, RFC" },
    { title: "Mapping", text: "XSLT, XPath, XSD" },
    { title: "Event", text: "Kafka, AMQP" },
  ],
  caption:
    "A message’s journey through an integration flow. I’m learning to build these in SAP BTP CPI, and I build event-driven services with Spring Boot and Kafka.",
};

export const about = {
  intro:
    "I’m a recent Information Technology graduate from Pune who likes backend work where reliability matters.",
  body: "I enjoy building services that talk to each other securely, events that arrive on time, and access that stays locked down. I’m now learning enterprise integration at Accenture, on top of the Spring Boot and Kafka systems I build.",
  focusTitle: "What I’m focused on",
  focus:
    "Building reliable backend services with Spring Boot and Kafka, and growing into an enterprise integration engineer on SAP BTP.",
};

export const projects = [
  // Replace the existing { title: 'ClubHouse', ... } object in the `projects` array of portfolio.js with this one.
  // Replace the existing { title: 'ClubHouse', ... } object in the `projects` array of portfolio.js with this one.
  {
    title: "ClubHouse",
    what: "College club, event and placement platform",
    badge: "Final-year project",
    desc: "Our college clubs ran on WhatsApp groups, manual attendance and posters held up by hand, and students outside any club never heard about events. ClubHouse brings clubs, events, attendance and placement information into one platform.",
    chips: [
      "Spring Boot",
      "Microservices",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "Docker",
      "JWT",
      "React",
      "GitHub Actions",
      "Azure",
    ],
    links: [
      // { label: "View Demo", href: "#" },
      // When your demo video is ready, paste its Google Drive link below and remove the two slashes:
      { label: 'Watch demo video', href: 'https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing' },
    ],
    note: "It was deployed on Azure, but my student credits have ended, so it is no longer hosted. The screenshots and code show how it works.",
    bullets: [
      "Team project. I designed the full microservices architecture, built the backend and about half of the frontend.",
      "Secured every service with JWT and role-based access at two levels: global roles (user, faculty, super admin) and club roles (club admin, club member).",
      "Built attendance that checks three things together: a QR code that keeps refreshing, the student’s live location against a radius set by faculty, and a time window. Faculty or admins can start it manually, or it starts at the scheduled time.",
      "Made events visible to every student, including those who are not in any club, so organisers no longer have to promote them by hand.",
      "Added Redis caching, which made user listings noticeably faster, and paginated lists in the frontend to avoid unnecessary calls.",
      "Added a Training and Placement section showing how many students were placed this year, which companies visited (this year and all time), average packages and who was placed at what package.",
      "Packaged the services as Docker images and set up CI/CD with GitHub Actions for deployment on Azure.",
    ],
    arch: [
      "React app",
      "JWT-secured Spring Boot microservices",
      "Kafka events, Redis cache and PostgreSQL",
      "Docker images, CI/CD with GitHub Actions, for Azure",
    ],
  },
  // Replace the existing { title: 'Life Sync', ... } object in the `projects` array of portfolio.js with this one.
  {
    title: "Life Sync",
    what: "Daily spending tracker I use every day",
    badge: "Live",
    desc: "We spend small amounts all day and forget them by the weekend. Life Sync is where I log each spend as it happens, so I can see where my money goes every day and month. I built it for myself and rely on it daily, so it has to stay reliable.",
    chips: [
      "Java",
      "Spring Boot",
      "React",
      "Vite",
      "MongoDB Atlas",
      "JWT",
      "Gemini API",
      "Brevo",
      "Docker",
      "Render",
      "Cloudflare Pages",
    ],
    links: [
      { label: "Open live app", href: "https://lifesyncsg.pages.dev/login" },
      // { label: "View code", href: "#", ghost: true },
      // { label: "Earlier microservices version", href: "#", ghost: true },
    ],
    note: "I first built this as microservices with Keycloak and Kafka, but it couldn’t run on any free tier. I rebuilt it as a monolith with JWT and direct API calls, and have kept adding features since. The backend runs on Render’s free tier, so the first request after a quiet spell can be slow.",
    bullets: [
      "Log spending in five categories: Fresh Produce, Daily Essentials, Miscellaneous, Eat Out and Travel, with quick-add shortcuts on the dashboard.",
      "Insights show daily and monthly spending, with a calendar heatmap, monthly total, daily average and busiest day.",
      "Ask AI answers questions about my own records, such as when I last bought detergent, using the Gemini API.",
      "Emails a monthly summary automatically on the last day of the month, or any time on demand.",
      "Notes keep long shopping and item lists in one place.",
      "Login uses JWT, with OTP email verification and password reset sent through Brevo.",
      "Fully responsive, with a mobile layout and bottom navigation.",
    ],
    arch: [
      "React app on Cloudflare Pages",
      "Spring Boot monolith in Docker on Render",
      "MongoDB Atlas",
      "Gemini API and Brevo email",
    ],
  },
  {
    title: "TrackIT",
    what: "SLA and incident tracking platform",
    desc: "A microservices backend that tracks SLAs and incidents across client and provider organisations, and alerts people the moment an SLA is breached.",
    chips: ["Java", "Spring Boot", "Kafka", "JWT", "PostgreSQL"],
    links: [
      { label: "View code", href: "https://github.com/SourabhGorai/TrackIt" },
      // { label: "Live demo", href: "#", ghost: true },
    ],
    bullets: [
      "Designed the microservices architecture for multiple client and provider organisations.",
      "Secured communication between services with JWT-based authentication.",
      "Built an event-driven alerting system on Apache Kafka for real-time SLA breach notifications.",
    ],
    arch: [
      "Client and provider organisations",
      "JWT-secured microservices",
      "Kafka events",
      "SLA breach alerts",
    ],
  },
];

// Replace the `experience` export in portfolio.js with this one (newest first).
export const experience = [
  {
    when: "Aug 2026 to present",
    title: "SAP BTP Integration Development Trainee",
    org: "Accenture, Advanced Associate and Software Engineer (AASE)",
    bullets: [
      "Training to build integration flows (iFlows) in SAP BTP Integration Suite (CPI) with SOAP, REST/OData, RFC, SFTP and AMQP adapters.",
      "Using XML, XSD, XPath and XSLT for message mapping.",
      "Studying Cloud Connector, API Management and keystore and certificate management for secure cross-system connectivity.",
    ],
    case: {
      title: "Capstone project: Employee Data Synchronization",
      desc: "A training project in SAP Integration Suite. It reads employee records from SAP SuccessFactors, creates them in SAP S/4HANA, saves a payroll-ready CSV on an SFTP server, and emails an administrator if anything fails.",
      flows: [
        {
          title: "Main flow",
          steps: [
            "Timer",
            "SuccessFactors OData",
            "Splitter",
            "Groovy mapping",
            "S/4HANA create",
            "XSLT to CSV",
            "SFTP",
          ],
        },
        {
          title: "On failure",
          steps: ["Exception subprocess", "Email to administrator"],
        },
      ],
      solved: [
        "Fixed a multiplicity error by adding a General Splitter, so each employee reaches S/4HANA as its own message.",
        "Traced a vague 400 error to a duplicate composite key on a shared backend, and switched to a generated unique ID. The service metadata wrongly pointed to a permissions problem.",
        "Merged two integration flows into one when shared training-tenant load made each deploy take hours, and documented the trade-off.",
      ],
      links: [{ label: "Read the write-up", href: "#" }],
    },
  },
  {
    when: "Mar 2025 to Aug 2025",
    title: "Cyber Security Intern",
    org: "Centre for Development of Advanced Computing (C-DAC), Pune",
    bullets: [
      "Deployed and configured a Cowrie SSH honeypot on an Azure-hosted Ubuntu VM to capture and analyse real-world unauthorised access attempts.",
      "Extended Cowrie with custom commands, so attackers interacted with it more realistically and the logs captured more detail.",
      "Compared Zeek and Suricata for intrusion detection, weighing detection accuracy, performance trade-offs and how well each fits into an intrusion detection system.",
    ],
  },
];

export const skills = {
  strongest: [
    "Java",
    "Spring Boot",
    "Microservices",
    "Kafka",
    "JWT authentication",
    "PostgreSQL",
    "Docker",
    "SAP BTP Integration Suite (CPI)",
  ],
  groups: [
    {
      title: "Languages and frameworks",
      items: [
        "Java",
        "C",
        "SQL",
        "JavaScript",
        "Bash",
        "Spring Boot",
        "Microservices",
        "Kafka",
      ],
    },
    {
      title: "SAP BTP Integration Suite (currently learning)",
      items: [
        "CPI",
        "iFlow development",
        "XSLT",
        "XML, XSD, XPath",
        "SOAP, REST/OData",
        "IDoc, RFC, SFTP, AMQP",
        "Cloud Connector",
        "API Management",
      ],
    },
    {
      title: "Databases and authentication",
      items: ["PostgreSQL", "MySQL", "MongoDB", "JWT", "Keycloak"],
    },
    { title: "Cloud", items: ["AWS", "Azure", "Docker"] },
  ],
};

export const education = {
  score: "9.04",
  degree: "B.Tech, Information Technology",
  school:
    "Bharati Vidyapeeth (Deemed University) College of Engineering, Pune. August 2022 to July 2026. CGPA out of 10.",
  certifications: [
    "Database Management Systems, NPTEL",
    "Distributed Systems, NPTEL",
  ],
  activities: [
    "Coordinator, ITSA at BV(DU)COEP, planning technical and cultural events.",
    "Deloitte Australia Technology Job Simulation on Forage, including a dashboard proposal.",
  ],
};
