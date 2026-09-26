import {
  Database,
  Cloud,
  Layers,
  Smartphone,
  Wrench,
  Server,
  Bot
} from "lucide-react";

export const personalInfo = {
  name: "Ajay Padilam",
  role: "Senior Android Developer",
  experience: "4.8 years",
  education: "B.Tech in Computer Science, graduated in 2021",
  focus: "Native Android development, Jetpack Compose, and POS hardware integrations.",
  about: "I am a seasoned Senior Android Developer with 4.8 years of experience building high-performance mobile applications using Kotlin, Jetpack Compose, and MVVM/MVI architectures. I specialize in architecting offline-first Android solutions, integrating payment terminal SDKs, and setting up POS printers (Bluetooth, USB, Ethernet) using ESC commands. I possess extensive expertise in designing complex workflow-driven apps, robust background syncing mechanisms, and hardware-enabled features—making me a strong fit for Android POS development and cashier-focused MVP solutions.",
  email: "ajaypadilam1999@gmail.com",
  github: "https://github.com/ajaypadilam", // Example placeholder
  linkedin: "https://www.linkedin.com/in/ajay-padilam-985174311",
  resume: "/resume/Ajay-Padilam-Resume.pdf"
};

export const skills = [
  {
    category: "Android Development",
    icon: Smartphone,
    items: [
      "Kotlin",
      "Java",
      "Jetpack Compose",
      "Android SDK",
      "Material 3",
      "XML UI"
    ]
  },
  {
    category: "Architecture",
    icon: Layers,
    items: [
      "Offline-first Syncing",
      "MVVM & MVI Architecture",
      "Clean Architecture",
      "Coroutines & Flow",
      "WorkManager"
    ]
  },
  {
    category: "Database",
    icon: Database,
    items: [
      "Room Database",
      "SQLite",
      "Offline Caching Layers"
    ]
  },
  {
    category: "Backend & Cloud",
    icon: Cloud,
    items: [
      "Firebase Firestore",
      "REST APIs",
      "Retrofit"
    ]
  },
  {
    category: "POS & Hardware",
    icon: Server,
    items: [
      "POS Printers (Bluetooth, USB, Ethernet via ESC/POS)",
      "Payment Terminal SDKs",
      "Cash Drawer Integration",
      "Dual Screen Setup",
      "Offline-first Architecture"
    ]
  },
  {
    category: "Tools & Platforms",
    icon: Wrench,
    items: [
      "Git",
      "Firebase",
      "Play Console",
      "Google Cloud Console",
      "Google Maps",
      "Figma"
    ]
  },
  {
    category: "AI Assistant Tools",
    icon: Bot,
    items: [
      "Claude Code",
      "ChatGPT",
      "Gemini",
      "Claude",
      "Antigravity"
    ]
  }
];

export const experience = [
  {
    title: "Senior Android Developer & Team Lead",
    company: "Krify Software Solutions",
    date: "Dec 2024 - Present",
    description: "Leading Android development efforts, specializing in complex POS systems and offline-first architectures.",
    responsibilities: [
      "Architected Android POS workflows and offline-first architectures using Room DB and WorkManager.",
      "Integrated hardware SDKs (payment terminals, Bluetooth printers, cash drawers, dual screens) and built secure PCI-compliant transaction flows.",
      "Implemented high-performance Jetpack Compose UIs optimized for POS devices.",
      "Collaborated with backend teams to align sync logic and multi-branch/shop architecture.",
      "Mentored junior developers and led architectural decisions and optimization strategies."
    ]
  },
  {
    title: "Android Developer",
    company: "Krify Software Solutions",
    date: "Dec 2022 - Dec 2024",
    description: "Developed and maintained core features for enterprise Android applications.",
    responsibilities: [
      "Built offline data handling for remote apps with limited connectivity, prioritizing reliable local storage.",
      "Developed modular UI components for complex booking flows and tracking apps using MVVM.",
      "Integrated Firebase services (Firestore, Crashlytics, Cloud Messaging) for real-time app features."
    ]
  },
  {
    title: "Junior Android Developer",
    company: "Krify Software Solutions",
    date: "Dec 2021 - Dec 2022",
    description: "Supported the mobile team by building UI layouts, fixing bugs, and writing unit tests.",
    responsibilities: [
      "Assisted in migrating legacy Java code to Kotlin.",
      "Implemented responsive XML layouts and ensured compatibility across multiple screen sizes.",
      "Worked closely with QA teams to identify and resolve critical bugs before production releases."
    ]
  }
];

export const projects = [
  {
    title: "ZPOS",
    description: "Next-generation Point of Sale System for Android inbuilt terminals and landscape POS devices.",
    technologies: ["Android", "Kotlin", "Jetpack Compose", "MVVM", "Room Database", "Hardware SDKs"],
    responsibilities: [
      "Completed Phase 1 development tailored for Android inbuilt payment terminals.",
      "Currently architecting and developing the landscape version optimized for dedicated dual-screen POS hardware.",
      "Integrated payment terminal SDKs, ESC/POS printers, and offline-first database structures."
    ],
    playStore: "",
    demo: ""
  },
  {
    title: "Refuelex",
    description: "Mobile Fuel Ordering & Delivery Suite (Customer, Employee & Agent Apps).",
    technologies: ["Android", "Kotlin", "Jetpack Compose", "MVVM", "WorkManager"],
    responsibilities: [
      "Built the entire app UI using Jetpack Compose for speed and responsiveness.",
      "Integrated GPS modules for location-based fuel delivery and live tracking.",
      "Developed push notifications, order alerts, and background status sync using WorkManager (Offline-First approach)."
    ],
    playStore: "https://play.google.com/store/apps/details?id=com.refuelexcustomer&hl=en_IN",
    demo: ""
  },
  {
    title: "Handdy",
    description: "Employee Monitoring & Productivity Tracking App supporting remote and field workforce.",
    technologies: ["Android", "Kotlin", "Room Database", "GPS", "Biometric API"],
    responsibilities: [
      "Implemented Room DB + WorkManager-based sync, ensuring all field activity works completely offline.",
      "Developed modules for time tracking, GPS monitoring, and productivity analytics.",
      "Integrated secure login via Biometric Authentication."
    ],
    playStore: "",
    demo: ""
  },
  {
    title: "Avfuel",
    description: "Aviation Fuel Dispensing & POS Invoice Management Tablet App.",
    technologies: ["Android", "Java/Kotlin", "Retrofit", "POS Printer Integration"],
    responsibilities: [
      "Built offline data handling for remote airfields with limited connectivity, prioritizing reliable local storage.",
      "Integrated signature capture, order summary, and fast invoice printing via connected POS printer SDKs.",
      "Implemented real-time sync and conflict resolution for multi-operator data entry."
    ],
    playStore: "",
    demo: ""
  },
  {
    title: "TuneConnect",
    description: "Music Discovery & Social Interaction Platform merging streaming with social networking.",
    technologies: ["Android", "Kotlin", "MVVM", "Firebase", "Firestore"],
    responsibilities: [
      "Integrated Firebase Firestore for real-time chat, comments, likes, and active listener tracking.",
      "Implemented offline caching for playlists and interactions to ensure smooth continuity during network drops."
    ],
    playStore: "",
    demo: ""
  },
  {
    title: "GoMyTrip",
    description: "All-in-One Travel Booking Platform for buses, trains, cabs, flights, and hotels.",
    technologies: ["Android", "Kotlin", "MVVM", "Firebase", "Retrofit"],
    responsibilities: [
      "Developed modular UI components for complex booking flows using MVVM.",
      "Built offline caching for trips, bookings, and itinerary management to support low-connectivity travel environments."
    ],
    playStore: "",
    demo: ""
  }
];

export const certifications = [
  {
    name: "Claude 101",
    issuer: "Anthropic",
    date: "2024",
    id: ""
  },
  {
    name: "AI Fluency for Small Businesses",
    issuer: "Anthropic & PayPal",
    date: "2024",
    id: ""
  },
  {
    name: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "2024",
    id: ""
  },
  {
    name: "AI Fluency: AI Capabilities & Limitations",
    issuer: "Anthropic",
    date: "2024",
    id: ""
  }
];
