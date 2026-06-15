import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { faqs } from "./schema";

const seedFAQs = [
  {
    question: "How do I create a new workspace?",
    answer:
      "After logging in, click the 'Create Workspace' button on your dashboard. Enter a workspace name, description, and invite team members if needed. Your workspace will be created instantly.",
    category: "Workspace",
    tags: ["workspace", "create", "team", "project"],
  },
  {
    question: "How can I invite team members?",
    answer:
      "Navigate to Workspace Settings > Members > Invite Member. Enter the user's email address and assign a role such as Admin, Manager, or Member. An invitation email will be sent automatically.",
    category: "Team",
    tags: ["invite", "members", "team", "roles"],
  },
  {
    question: "How do I reset my password?",
    answer:
      "Click 'Forgot Password' on the login page, enter your registered email address, and follow the reset link sent to your inbox. The reset link expires after 24 hours.",
    category: "Account",
    tags: ["password", "reset", "login", "account"],
  },
  {
    question: "Can I change my email address?",
    answer:
      "Yes. Go to Account Settings > Profile and update your email address. You'll receive a verification email before the change becomes active.",
    category: "Account",
    tags: ["email", "profile", "account", "settings"],
  },
  {
    question: "How do I create a new project?",
    answer:
      "Inside your workspace, click 'New Project', provide a project name, select visibility settings, and optionally assign team members. The project will be available immediately.",
    category: "Projects",
    tags: ["project", "create", "workspace"],
  },
  {
    question: "Can I assign tasks to multiple users?",
    answer:
      "Yes. Open the task details, select 'Assignees', and choose one or more team members. Everyone assigned will receive notifications and updates.",
    category: "Tasks",
    tags: ["tasks", "assign", "team", "collaboration"],
  },
  {
    question: "How do notifications work?",
    answer:
      "You'll receive notifications for task assignments, comments, mentions, project updates, and deadlines. Notification preferences can be customized in Account Settings.",
    category: "Notifications",
    tags: ["notifications", "alerts", "mentions"],
  },
  {
    question: "Does the platform support file uploads?",
    answer:
      "Yes. You can upload documents, images, PDFs, and spreadsheets up to 100MB per file. Files are securely stored and accessible from the related task or project.",
    category: "Files",
    tags: ["upload", "attachments", "documents", "files"],
  },
  {
    question: "Can I recover deleted tasks?",
    answer:
      "Deleted tasks are moved to the recycle bin for 30 days. During this period, workspace administrators can restore them. After 30 days, they are permanently deleted.",
    category: "Tasks",
    tags: ["delete", "restore", "recycle", "tasks"],
  },
  {
    question: "How do I integrate GitHub with my workspace?",
    answer:
      "Go to Integrations > GitHub, authorize your GitHub account, and select the repositories you want to connect. Commits and pull requests can then be linked to tasks automatically.",
    category: "Integrations",
    tags: ["github", "integration", "repository", "devops"],
  },
  {
    question: "Is my project data secure?",
    answer:
      "Yes. All data is encrypted in transit and at rest using industry-standard encryption. We perform regular security audits, maintain backups, and follow strict access controls.",
    category: "Security",
    tags: ["security", "privacy", "encryption", "backup"],
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team through live chat, email at support@example.com, or submit a support ticket from the Help Center. Premium customers receive priority assistance.",
    category: "Support",
    tags: ["support", "help", "contact", "ticket"],
  },
];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : false,
});

const db = drizzle(pool, { schema: { faqs } });

async function seed() {
  console.log(" Seeding database...");
  try {
    await db.delete(faqs);
    await db.insert(faqs).values(seedFAQs);
    console.log(` Seeded ${seedFAQs.length} FAQs`);
  } catch (error) {
    console.error(" Seed error:", error);
    throw error;
  } finally {
    await pool.end();
  }
}

seed()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));