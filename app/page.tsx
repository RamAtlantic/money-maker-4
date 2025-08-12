"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { LeadFormModal } from "@/components/modal-lead";

declare global {
  interface Window {
    fbq: any;
  }
}

export default function Page() {
  const [showImages, setShowImages] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Min delay and initial width detection for loading
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [minDelayDone, setMinDelayDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowImages(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleButton = (button: string) => {
    if (button !== "1") {
      setOpenForm(true);
    } else {
      window.fbq("track", "StartTrial", {
        value: 0,
        currency: "USD",
      });
      window.location.href =
        "https://wa.me/573178520000?text=Hola, quiero saber mas de MoneyMaker";
    }
  };

  // Detect viewport to toggle between mobile and desktop
  useEffect(() => {
    const detect = () => setIsDesktop(window.innerWidth >= 1024);
    detect();
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Ensure at least 1000ms loading
  useEffect(() => {
    const t = setTimeout(() => setMinDelayDone(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const ready = isDesktop !== null && minDelayDone;

  // Loading: circular progress centered, black background
  if (!ready) {
    return (
      <main className="relative min-h-screen bg-black grid place-items-center">
        <div className="flex items-center justify-center">
          <Loader2
            className="h-10 w-10 text-white animate-spin"
            aria-hidden="true"
          />
          <span className="sr-only">{"Cargando..."}</span>
        </div>
      </main>
    );
  }

  // ----------------------------- Desktop Return -----------------------------
  if (isDesktop) {
    return (
      <main className="relative bg-black min-h-screen">
        {/* Video 1 (Desktop) */}
        <VideoSectionDesktop
          src="/landing-4-desktop.mp4"
          label="Video 1 Desktop"
          id="d1"
        />

        {/* Botón CTA (desktop) */}
        <div className="absolute top-[75%] pl-28 flex justify-start items-center w-full z-20 cursor-pointer">
              <button
                onClick={() => handleButton("1")}
                className="bg-transparent text-black py-2 rounded-md cursor-pointer group"
              >
                <img
                  src={`/button-desktop.png`}
                  alt="Botón principal"
                  width={560}
                  height={160}
                  className="object-contain pointer-events-none select-none transform transition-transform duration-200 ease-out will-change-transform origin-center lg:group-hover:scale-[1.2]"
                />
              </button>
            
        </div>


        {/* Modal Lead */}
        <LeadFormModal
          open={openForm}
          onOpenChange={setOpenForm}
          baseUrl="https://mooneymaker.co/home?ref=64349"
        />
      </main>
    );
  }

  // ----------------------------- Mobile Return -----------------------------
  return (
    <main className="relative bg-black min-h-screen">
      {/* Video 1 */}
      <VideoSection
        src="/landing-4.mp4"
        label="Video 1: Relámpagos y templo"
        id="1"
      />

      <div className="absolute top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full z-20">
        {showButton && !openForm && (
          <button
            id="cta-button"
            onClick={() => handleButton("1")}
            className="bg-transparent text-black py-2 rounded-md"
          >
            <img
              src={`/button-l4.png`}
              alt="Logo principal"
              width={360}
              height={100}
              className="object-contain pointer-events-none select-none"
            />
          </button>
        )}
      </div>




      <LeadFormModal
        open={openForm}
        onOpenChange={setOpenForm}
        baseUrl="https://mooneymaker.co/home?ref=64349"
      />

      {/* Estilo para giro lento (solo si usas animate-spin-slow) */}
      <style jsx global>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}

function VideoSection({
  src = "/landing-mobile4.mp4",
  label = "Sección de video",
  id,
}: {
  src?: string;
  label?: string;
  id?: string;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoClass = "w-full h-full object-cover";

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          id === "2" ? "w-full h-full" : "min-w-[95vw]"
        }`}
      >
        <video
          src={src}
          className={videoClass}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={label}
        />
      </div>

      {/* SOLO DIFUMINADOS LATERALES (no superior, no inferior) */}
      {/* Izquierda */}

    
    </section>
  );
}

/* ----------------------------- VideoSectionDesktop ----------------------------- */
function VideoSectionDesktop({
  src = "/landing-mobile4.mp4",
  label = "Sección de video",
  id,
}: {
  src?: string;
  label?: string;
  id?: string;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const videoClass = isDesktop
    ? "w-full h-full object-cover"
    : "w-auto h-auto max-w-full max-h-full object-contain";

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-black">
      <div
        className={`absolute inset-0 flex items-center justify-center ${
          id === "2" ? "w-full h-full" : "min-w-[95vw]"
        }`}
      >
        <video
          src={src}
          className={videoClass}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={label}
        />
      </div>
    </section>
  );
}
