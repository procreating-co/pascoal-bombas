"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, Home } from "lucide-react";
import { LockScreen } from "@/components/gallery/lock-screen";
import type { GalleryFolder } from "@/lib/gallery";

const PhotoLightbox = dynamic(() => import("@/components/gallery/photo-lightbox").then((mod) => mod.PhotoLightbox));

const COVER_PHOTO_LIMIT = 6;

function shuffle<T>(items: T[]) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const HINT_TEXT = "Acessar Galeria Completa";
const HINT_TYPE_MS = 45;
const HINT_NOTIFY_DELAY_MS = 10000;
const HINT_NOTIFY_DURATION_MS = 900;
const DRIVE_URL = "https://drive.google.com/drive/folders/1hTbUV_w31ZOZzDRf7hERf2UL_6BrQWyZ?usp=sharing";

/** Digita "Acessar Galeria Completa" e, 10s depois de terminar, pulsa uma vez para lembrar que está ali. */
function GalleryHintLink() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeouts.push(setTimeout(() => !cancelled && fn(), delay));
    };

    let i = 0;
    const type = () => {
      if (cancelled) return;
      setTyped(HINT_TEXT.slice(0, i));
      if (i >= HINT_TEXT.length) {
        setDone(true);
        schedule(() => {
          setNotify(true);
          schedule(() => setNotify(false), HINT_NOTIFY_DURATION_MS);
        }, HINT_NOTIFY_DELAY_MS);
        return;
      }
      i++;
      schedule(type, HINT_TYPE_MS);
    };
    type();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <a
      href={DRIVE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-wide text-muted-foreground transition-colors hover:text-[var(--client-accent)] sm:text-sm ${
        notify ? "animate-[hint-pulse_900ms_ease-in-out]" : ""
      }`}
    >
      <span>
        {typed}
        {!done && <span className="animate-pulse">|</span>}
      </span>
      <ArrowRight className="size-4 shrink-0 sm:size-5" />
    </a>
  );
}

function AnimatedHeading({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {text.split("").map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden="true"
          className="inline-block animate-[name-reveal_700ms_ease-out_both] motion-reduce:animate-none"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          {character}
        </span>
      ))}
    </span>
  );
}

function FolderCover({ folder }: { folder: GalleryFolder }) {
  const [coverPhotos] = useState(() => shuffle(folder.photos).slice(0, COVER_PHOTO_LIMIT));
  const [rotationMs] = useState(() => 3000 + Math.random() * 3000);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (coverPhotos.length <= 1) return;
    const interval = setInterval(() => setActiveIndex((current) => (current + 1) % coverPhotos.length), rotationMs);
    return () => clearInterval(interval);
  }, [coverPhotos.length, rotationMs]);

  if (coverPhotos.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-background">
        <span className="font-mono text-xs uppercase tracking-wide text-white/30">Em breve</span>
      </div>
    );
  }

  return (
    <>
      {coverPhotos.map((photo, photoIndex) => (
        <Image
          key={photo.src}
          src={photo.src}
          alt={folder.label}
          fill
          sizes="(min-width: 1024px) 31vw, (min-width: 640px) 55vw, 78vw"
          loading="lazy"
          className={`object-cover transition-all duration-700 group-hover:scale-105 ${
            photoIndex === activeIndex ? "translate-x-0 opacity-80 group-hover:opacity-100" : "translate-x-6 opacity-0"
          }`}
        />
      ))}
    </>
  );
}

export function GalleryExperience({ folders }: { folders: GalleryFolder[] }) {
  const [unlocked, setUnlocked] = useState(false);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!unlocked) {
    return <LockScreen onUnlock={() => setUnlocked(true)} />;
  }

  const activeFolder = folders.find((folder) => folder.id === activeFolderId) ?? null;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {!activeFolder && (
        <a
          href="/"
          aria-label="Voltar para a página inicial"
          className="fixed left-3 top-6 z-50 flex size-12 items-center justify-center text-foreground/70 transition-colors hover:text-[var(--client-accent)] lg:left-9 lg:top-8"
        >
          <Home className="size-6" />
        </a>
      )}

      <section className="relative pb-14 pt-24 lg:pb-20 lg:pt-28">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {!activeFolder ? (
            <>
              <header className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
                <h1 className="text-balance font-display text-3xl leading-[0.95] tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
                  <AnimatedHeading text="Galeria" />
                </h1>
                <GalleryHintLink />
              </header>

              <div
                onWheel={(event) => {
                  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                    event.currentTarget.scrollBy({ left: event.deltaY, behavior: "smooth" });
                  }
                }}
                className="flex w-full cursor-grab touch-pan-x snap-x snap-mandatory gap-5 overflow-x-scroll scroll-smooth pb-2 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    type="button"
                    onClick={() => setActiveFolderId(folder.id)}
                    className="group relative aspect-[4/5] w-[78vw] max-w-[320px] shrink-0 snap-start overflow-hidden border border-white/15 bg-background text-left transition-colors hover:border-[var(--client-accent)]/70 sm:w-[55%] sm:max-w-none lg:w-[31%]"
                  >
                    <FolderCover folder={folder} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <span className="block text-balance font-display text-2xl leading-tight text-white">{folder.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setActiveFolderId(null)}
                className="mb-8 inline-flex items-center font-mono text-sm text-muted-foreground transition-colors hover:text-foreground lg:mb-10"
              >
                Voltar para Galeria
              </button>

              <header className="mb-8 flex flex-wrap items-end justify-between gap-4 lg:mb-10">
                <h2 className="text-balance font-display text-3xl leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
                  <AnimatedHeading key={activeFolder.id} text={activeFolder.label} />
                </h2>
                <GalleryHintLink />
              </header>

              {activeFolder.photos.length === 0 ? (
                <p className="border border-white/10 bg-background px-6 py-10 text-center text-muted-foreground">Nenhuma foto nesta pasta ainda.</p>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {activeFolder.photos.map((photo, index) => (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="group relative overflow-hidden border border-white/10 bg-background transition-colors hover:border-[var(--client-accent)]/70"
                    >
                      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {activeFolder && lightboxIndex !== null && activeFolder.photos[lightboxIndex] && (
        <PhotoLightbox
          photo={activeFolder.photos[lightboxIndex]}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < activeFolder.photos.length - 1}
          onPrev={() => setLightboxIndex((current) => (current !== null ? current - 1 : current))}
          onNext={() => setLightboxIndex((current) => (current !== null ? current + 1 : current))}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </main>
  );
}
