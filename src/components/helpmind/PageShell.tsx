import type { ReactNode } from "react";
import { Header } from "./Header";
import { useCustomerName } from "@/lib/use-customer-name";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const { name } = useCustomerName();

  return (
    <div className="min-h-screen bg-background">
      <Header customerName={name} />
      <main className="mx-auto w-full max-w-[1400px] px-4 py-8 sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
        {description ? <p className="mt-1.5 text-sm text-muted-foreground">{description}</p> : null}
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
