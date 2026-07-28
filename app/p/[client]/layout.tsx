import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClientConfig, getRegisteredClientSlugs } from "@/lib/clients";

export function generateStaticParams() {
  return getRegisteredClientSlugs().map((client) => ({ client }));
}

export async function generateMetadata({ params }: { params: Promise<{ client: string }> }): Promise<Metadata> {
  const { client } = await params;
  const config = getClientConfig(client);
  if (!config) return {};
  return { title: config.metadata.title, description: config.metadata.description };
}

export default async function ClientLayout({ children, params }: { children: ReactNode; params: Promise<{ client: string }> }) {
  const { client } = await params;
  const config = getClientConfig(client);
  if (!config) notFound();

  return <div style={{ "--client-accent": config.theme.accentColor } as CSSProperties}>{children}</div>;
}
