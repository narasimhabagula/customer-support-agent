export type Customer = { id: string; name: string; firstName: string };

const KNOWN: Record<string, Customer> = {
  priya: { id: "CUST-1024", name: "Priya Sharma", firstName: "Priya" },
  rahul: { id: "CUST-1025", name: "Rahul Sharma", firstName: "Rahul" },
  swami: { id: "CUST-1026", name: "Swami", firstName: "Swami" },
};

/** Maps an entered name to a stable customer profile. */
export function resolveCustomer(rawName: string): Customer {
  const name = rawName.trim() || "Guest";
  const first = name.split(/\s+/)[0]!.toLowerCase();
  const known = KNOWN[first];
  if (known) return known;
  let h = 0;
  for (const c of name.toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return {
    id: `CUST-${2000 + (h % 8000)}`,
    name,
    firstName: name.split(/\s+/)[0]!,
  };
}
