import type { Metadata } from "next";
import { ProspeccaoExperience } from "@/components/prospeccao/prospeccao-experience";

export const metadata: Metadata = {
  title: "Prospecção de Parceiros | Pascoal Bombas",
  description: "Área restrita de prospecção de oficinas parceiras.",
};

export default function ProspeccaoPage() {
  return <ProspeccaoExperience />;
}
