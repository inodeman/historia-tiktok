import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Maximize,
  Minimize2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import {
  CHANNEL_NAME,
  CHANNEL_URL,
  captionLines,
  chapters,
} from "@/data/documentary";

function fmt(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Theater() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(false);
  const pendingRef = useRef(0);
  const durationsRef = useRef<number[]>(chapters.map(() => 0));

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [time, setTime] = useState(0);
  const [durations, setDurations] = useState<number[]>(chapters.map(() => 0));
  const [muted, setMuted] = useState(false);
  const [fs, setFs] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const chapter = chapters[index] ?? chapters[0];
  const lines = useMemo(() => captionLines(chapter.narration), [chapter]);

  useEffect(() => {
    durationsRef.current = durations;
  }, [durations]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const probes = chapters.map((ch, i) => {
      const probe = new Audio(`/narration/${ch.id}.mp3`);
      probe.preload = "metadata";
      const onMeta = () => {
        setDurations((prev) => {
          if (Math.abs(prev[i] - probe.duration) < 0.05) return prev;
          const next = prev.slice();
          next[i] = probe.duration;
          return next;
        });
      };
      probe.addEventListener("loadedmetadata", onMeta);
      return probe;
    });
    return () => {
      probes.forEach((probe) => {
        probe.pause();
        probe.src = "";
      });
    };
    // index is read only to flag the active file; probes load once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const src = `/narration/${chapter.id}.mp3`;
    audio.src = src;
    const arm = () => {
      const offset = pendingRef.current;
      pendingRef.current = 0;
      if (Number.isFinite(offset) && offset > 0) audio.currentTime = offset;
      if (playingRef.current) {
        void audio.play().catch(() => {
          playingRef.current = false;
          setPlaying(false);
        });
      }
    };
    if (audio.readyState >= 1) arm();
    else audio.addEventListener("loadedmetadata", arm, { once: true });
    setAudioError(false);
  }, [chapter]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const audio = audioRef.current;
      if (audio) setTime(audio.currentTime || 0);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, index]);

  useEffect(() => {
    const onFs = () => setFs(document.fullscreenElement === frameRef.current);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const total = durations.reduce((sum, n) => sum + (n || 0), 0);
  const offsetBefore = durations.slice(0, index).reduce((sum, n) => sum + (n || 0), 0);
  const globalTime = offsetBefore + time;
  const durationHere = durations[index] || 0;
  const lineIndex =
    lines.length === 0
      ? 0
      : Math.min(lines.length - 1, Math.floor((time / Math.max(durationHere, 0.01)) * lines.length));

  function go(nextIndex: number, offset = 0, autoplay = playingRef.current) {
    const clamped = Math.max(0, Math.min(chapters.length - 1, nextIndex));
    pendingRef.current = offset;
    playingRef.current = autoplay;
    setPlaying(autoplay);
    setEnded(false);
    setStarted(true);
    setTime(offset);
    if (clamped === index) {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = offset;
      if (autoplay) void audio.play().catch(() => setPlaying(false));
      return;
    }
    setIndex(clamped);
  }

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (!started) {
      playingRef.current = true;
      setStarted(true);
      setPlaying(true);
      setEnded(false);
      void audio.play().catch(() => {
        playingRef.current = false;
        setPlaying(false);
      });
      return;
    }
    if (playingRef.current) {
      audio.pause();
      playingRef.current = false;
      setPlaying(false);
      return;
    }
    playingRef.current = true;
    setPlaying(true);
    setEnded(false);
    void audio.play().catch(() => {
      playingRef.current = false;
      setPlaying(false);
    });
  }

  function seekGlobal(value: number) {
    let acc = 0;
    const safeTotal = Math.max(total, 0.1);
    const target = Math.min(Math.max(value, 0), safeTotal);
    for (let i = 0; i < chapters.length; i += 1) {
      const span = durations[i] || 0;
      if (i === chapters.length - 1 || target <= acc + span) {
        go(i, Math.max(0, target - acc), playingRef.current || started);
        return;
      }
      acc += span;
    }
  }

  function seekBy(delta: number) {
    seekGlobal(globalTime + delta);
  }

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = (event.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "A") return;
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        seekBy(10);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        seekBy(-10);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function onEnded() {
    if (index < chapters.length - 1) {
      pendingRef.current = 0;
      playingRef.current = true;
      setPlaying(true);
      setIndex(index + 1);
      setTime(0);
      return;
    }
    playingRef.current = false;
    setPlaying(false);
    setEnded(true);
  }

  async function toggleFs() {
    const node = frameRef.current;
    if (!node) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await node.requestFullscreen();
  }

  const ready = durations[0] > 0;
  const pct = total > 0 ? (globalTime / total) * 100 : 0;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-4 md:px-6 md:py-6">
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-2xl leading-none tracking-tight text-paper">PARA TI</p>
          <p className="mt-1 truncate text-sm text-steel">La historia de TikTok · {CHANNEL_NAME}</p>
        </div>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-punch px-4 text-sm font-medium text-paper"
        >
          <Bell className="size-4" aria-hidden="true" />
          Sígueme
        </a>
      </header>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <section
          ref={frameRef}
          className="relative -mx-4 overflow-hidden bg-ink md:mx-0 lg:rounded-xl"
        >
          <div className="relative aspect-video overflow-hidden bg-panel">
            {chapter.video && !reduced ? (
              <video
                key={chapter.video}
                className="absolute inset-0 h-full w-full object-cover"
                src={chapter.video}
                poster={chapter.still}
                muted
                loop
                autoPlay
                playsInline
              />
            ) : (
              <img
                key={chapter.still}
                src={chapter.still}
                alt=""
                className="kenburns absolute inset-0 h-full w-full object-cover"
              />
            )}
            <div className="grain absolute inset-0" />
            <div className="vignette absolute inset-0" />
            <p className="absolute left-3 top-3 text-xs font-medium tracking-widest text-paper">
              INODEAI
            </p>
            <p className="absolute right-3 top-3 text-xs text-steel">
              {chapter.id} / {String(chapters.length).padStart(2, "0")}
            </p>

            {started && !ended && (
              <div className="lower absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 md:px-6">
                <p className="text-xs font-medium uppercase tracking-widest text-cyan">
                  {chapter.kicker} · {chapter.year}
                </p>
                <h1 className="mt-1 font-serif text-2xl leading-none text-paper md:text-5xl">
                  {chapter.title}
                </h1>
                <p className="mt-2 line-clamp-3 max-w-3xl text-sm leading-snug text-paper">
                  {lines[lineIndex]}
                </p>
              </div>
            )}

            {!started && (
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-ink/50 p-4 md:p-8">
                <p className="text-xs font-medium uppercase tracking-widest text-cyan">
                  Documental · formato YouTube
                </p>
                <h1 className="mt-2 max-w-xl font-serif text-4xl leading-none text-paper md:text-7xl">
                  La historia de TikTok
                </h1>
                <p className="mt-3 max-w-md text-sm leading-snug text-paper">
                  Trece capítulos. De una servilleta en Pekín a la pantalla negra, y de ahí a la venta.
                  Narrado para quedarse hasta el último segundo.
                </p>
                <button
                  type="button"
                  onClick={toggle}
                  disabled={!ready && !audioError}
                  className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-paper px-5 text-sm font-medium text-ink disabled:opacity-60"
                >
                  <Play className="size-4" aria-hidden="true" />
                  {audioError ? "Reintentar" : ready ? "Reproducir" : "Preparando la voz…"}
                </button>
              </div>
            )}

            {ended && (
              <div className="absolute inset-0 flex flex-col items-start justify-end bg-ink/75 p-4 md:p-8">
                <p className="text-xs font-medium uppercase tracking-widest text-cyan">Cierre</p>
                <h2 className="mt-2 font-serif text-4xl leading-none text-paper md:text-6xl">
                  Si llegaste hasta aquí, sígueme.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-paper">
                  {CHANNEL_NAME}. La siguiente historia tampoco se va en el primer segundo.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={CHANNEL_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-punch px-5 text-sm font-medium text-paper"
                  >
                    <Bell className="size-4" aria-hidden="true" />
                    Seguir en YouTube
                  </a>
                  <button
                    type="button"
                    onClick={() => go(0, 0, true)}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-panel px-5 text-sm text-paper"
                  >
                    <Play className="size-4" aria-hidden="true" />
                    Ver otra vez
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-ink px-3 pb-3 pt-1 md:px-4">
            <label className="sr-only" htmlFor="seek">
              Posición del documental
            </label>
            <input
              id="seek"
              className="scrub"
              type="range"
              min={0}
              max={Math.max(total, 1)}
              step={0.1}
              value={Math.min(globalTime, Math.max(total, 1))}
              style={{ ["--pct" as string]: `${pct}%` }}
              onChange={(event) => seekGlobal(Number(event.target.value))}
            />
            <div className="flex items-center gap-1">
              <button type="button" className="grid size-11 place-items-center text-paper" onClick={toggle} aria-label={playing ? "Pausar" : "Reproducir"}>
                {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
              </button>
              <button type="button" className="grid size-11 place-items-center text-steel" onClick={() => seekBy(-10)} aria-label="Retroceder 10 segundos">
                <SkipBack className="size-5" />
              </button>
              <button type="button" className="grid size-11 place-items-center text-steel" onClick={() => seekBy(10)} aria-label="Adelantar 10 segundos">
                <SkipForward className="size-5" />
              </button>
              <p className="ml-1 tabular-nums text-xs text-steel">
                {fmt(globalTime)} / {total > 0 ? fmt(total) : "15:00"}
              </p>
              <span className="flex-1" />
              <button
                type="button"
                className="grid size-11 place-items-center text-steel"
                onClick={() => setMuted((value) => !value)}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
              >
                {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
              </button>
              <button type="button" className="grid size-11 place-items-center text-steel" onClick={() => void toggleFs()} aria-label="Pantalla completa">
                {fs ? <Minimize2 className="size-5" /> : <Maximize className="size-5" />}
              </button>
            </div>
            {audioError && (
              <p className="px-2 pb-2 text-sm text-punch">La narración no cargó. Recarga la sala.</p>
            )}
          </div>
        </section>

        <aside className="min-w-0 rounded-xl border border-line bg-panel">
          <div className="flex items-baseline justify-between px-4 py-3">
            <h2 className="text-sm font-medium text-paper">Capítulos</h2>
            <p className="text-xs text-steel">{chapters.length}</p>
          </div>
          <ol className="max-h-96 overflow-y-auto border-t border-line lg:max-h-dvh">
            {chapters.map((item, i) => {
              const start = durations.slice(0, i).reduce((sum, n) => sum + (n || 0), 0);
              const active = i === index && started;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(i, 0, true)}
                    className={`flex w-full items-start gap-3 border-b border-line px-4 py-3 text-left ${
                      active ? "bg-ink text-paper" : "text-steel"
                    }`}
                    aria-current={active ? "true" : undefined}
                  >
                    <span className={`mt-0.5 text-xs tabular-nums ${active ? "text-cyan" : "text-steel"}`}>
                      {item.id}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm text-paper">{item.title}</span>
                      <span className="mt-0.5 block text-xs text-steel">
                        {item.year}
                        {durations[i] > 0 ? ` · ${fmt(start)}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>
      </div>

      <footer className="mt-4 flex flex-col gap-1 text-xs leading-relaxed text-steel md:flex-row md:items-center md:justify-between">
        <p>Hechos públicos hasta octubre de 2026. Imagen 3D, formato 16:9.</p>
        <p>Un documental de {CHANNEL_NAME}.</p>
      </footer>

      <audio
        ref={audioRef}
        preload="auto"
        onEnded={onEnded}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onError={(event) => {
          if (event.currentTarget.currentSrc) setAudioError(true);
        }}
      />
    </main>
  );
}
