import type { Metadata } from "next";
import { getGalleryFolders } from "@/lib/gallery-server";
import { GalleryExperience } from "@/components/gallery/gallery-experience";

export const metadata: Metadata = {
  title: "Galeria de Conteúdos | Pascoal Bombas",
  description: "Acesse, visualize e baixe o material produzido para a Pascoal Bombas.",
};

export default async function GaleriaPage() {
  const folders = await getGalleryFolders();
  return <GalleryExperience folders={folders} />;
}
