export type MemoryCategory = "World Facts" | "Experience" | "Observations";

export type MemoryItem = {
  id: string;
  index: string;
  title: string;
  text: string;
  category: MemoryCategory;
  date: string;
  source: string;
  lastUsed: string;
};

export const customer = {
  name: "Priya Sharma",
  firstName: "Priya",
  id: "CUST-1024",
  location: "Hyderabad, India",
  preferredChannel: "Email",
  recentIssues: ["Order delivery", "Payment", "Account"],
};

export const memories: MemoryItem[] = [
  {
    id: "m1",
    index: "01",
    title: "Previous Order Issue",
    text: "Priya's order #456, placed on August 26, 2026, has not arrived yet.",
    category: "Experience",
    date: "Aug 26, 2026",
    source: "Support chat",
    lastUsed: "Today",
  },
  {
    id: "m2",
    index: "02",
    title: "Recent Context",
    text: "Priya reported that her order #456 has not arrived yet.",
    category: "Observations",
    date: "Sep 12, 2026",
    source: "Support chat",
    lastUsed: "Today",
  },
  {
    id: "m3",
    index: "03",
    title: "Customer Context",
    text: "Priya is based in Hyderabad and prefers to receive order status updates via email.",
    category: "World Facts",
    date: "Jul 04, 2026",
    source: "Customer profile",
    lastUsed: "2 days ago",
  },
  {
    id: "m4",
    index: "04",
    title: "Preference",
    text: "Priya prefers to receive order status updates via email.",
    category: "Observations",
    date: "Jul 04, 2026",
    source: "Account settings",
    lastUsed: "Today",
  },
];

export type ChatMessageItem = {
  id: string;
  role: "customer" | "ai";
  text?: string;
  greeting?: string;
  intro?: string;
  listTitle?: string;
  list?: string[];
  outro?: string[];
  signature?: string[];
  memoryUsed?: { label: string; detail: string };
  pending?: boolean;
  error?: boolean;
};

export const exampleConversation: ChatMessageItem[] = [
  {
    id: "c1",
    role: "customer",
    text: "My order #436 has not arrived yet.",
  },
  {
    id: "c2",
    role: "ai",
    greeting: "Hi Priya,",
    intro:
      "I'm sorry to hear that your order #436 hasn't arrived yet. I don't see a record for that order at the moment, so I'll need a few more details to locate it and investigate the delivery status for you.",
    listTitle: "Could you share:",
    list: ["Order date", "Shipping address", "Reference number or receipt"],
    outro: [
      "Once I have this information, I'll open a ticket with our logistics team and keep you updated.",
      "As you prefer to receive updates via email, I'll send you a status report within the next 24 hours.",
      "Thank you for your patience.",
    ],
    signature: ["Best regards,", "HelpMind AI Customer Support"],
    memoryUsed: {
      label: "Memory used",
      detail: "Customer preference — Email updates",
    },
  },
];

export const suggestedPrompts = ["Order issue", "Payment issue", "Account help"];

export const dashboardStats = [
  { label: "Active Conversations", value: "18", delta: "+3 today", tone: "primary" as const },
  { label: "Customers Helped", value: "1,284", delta: "+64 this week", tone: "primary" as const },
  { label: "Memories Stored", value: "9,412", delta: "+218 this week", tone: "memory" as const },
  {
    label: "Memory-Assisted Resolutions",
    value: "73%",
    delta: "+6% vs last month",
    tone: "success" as const,
  },
];

export const recentActivity = [
  { customer: "Priya Sharma", issue: "Order #436 not delivered", time: "2 min ago", status: "Open" },
  { customer: "Arjun Mehta", issue: "Refund not received", time: "24 min ago", status: "Resolved" },
  { customer: "Lena Fischer", issue: "Login verification loop", time: "1 hr ago", status: "Resolved" },
  { customer: "Tomás Rivera", issue: "Duplicate payment charge", time: "3 hrs ago", status: "Open" },
];

export const memoryResolutions = [
  {
    customer: "Priya Sharma",
    memory: "Prefers email updates",
    outcome: "Status report scheduled instead of a call-back",
  },
  {
    customer: "Arjun Mehta",
    memory: "Refund raised on Sep 02",
    outcome: "Agent skipped re-verification, resolved in 2 messages",
  },
  {
    customer: "Lena Fischer",
    memory: "Uses a corporate SSO account",
    outcome: "Routed straight to the SSO reset flow",
  },
];

export const conversationHistory = [
  {
    id: "h1",
    customer: "Priya Sharma",
    issue: "Order #436 not delivered",
    date: "Sep 27, 2026",
    resolution: "Ticket opened with logistics",
    memoryUsed: "Email update preference",
  },
  {
    id: "h2",
    customer: "Priya Sharma",
    issue: "Order #456 delayed",
    date: "Aug 26, 2026",
    resolution: "Replacement dispatched",
    memoryUsed: "Hyderabad delivery zone",
  },
  {
    id: "h3",
    customer: "Arjun Mehta",
    issue: "Refund not received",
    date: "Sep 18, 2026",
    resolution: "Refund re-initiated",
    memoryUsed: "Previous refund request",
  },
  {
    id: "h4",
    customer: "Lena Fischer",
    issue: "Login verification loop",
    date: "Sep 14, 2026",
    resolution: "SSO reset link sent",
    memoryUsed: "Corporate SSO account",
  },
  {
    id: "h5",
    customer: "Tomás Rivera",
    issue: "Duplicate payment charge",
    date: "Sep 09, 2026",
    resolution: "Duplicate charge reversed",
    memoryUsed: "—",
  },
];
