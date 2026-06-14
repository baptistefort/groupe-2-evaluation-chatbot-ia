import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4';
const TYPEWRITER_TEXT = 'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const EMAIL = 'hello@mainframe.co';

const introSection = {
  eyebrow: 'Évaluation du projet - Groupe 2',
  title: 'Groupe 2 : retour de présentation',
  text: [
    "Audrena, Éric, Christophe, je vous fais mon retour sur la présentation. J'ai vu de très bons réflexes, surtout sur MCP, Vercel, la sécurité, les logs, et la façon dont vous avez répondu aux questions.",
  ],
  names: ['Audrena', 'Éric', 'Christophe'],
};

const feedbackSections = [
  introSection,
  {
    eyebrow: 'Compréhension du projet',
    title: "C'est OK, j'ai vu que vous aviez compris le projet.",
    text: [
      "Compréhension du projet, c'est OK. J'ai vu que vous aviez compris pratiquement tous les outils : Supabase, les chunks, Codex, la sécurité et l'API. On sentait que vous aviez compris le fonctionnement général et pas seulement la partie visible du chatbot.",
    ],
    minis: [
      { title: 'Supabase.', text: 'Vous avez compris le rôle de la base.' },
      { title: 'Chunks.', text: 'Vous avez compris la logique de mémoire.' },
      { title: 'API.', text: 'Vous avez su parler coût et usage.' },
    ],
  },
  {
    eyebrow: 'MCP + Google',
    title: "MCP avec Google, c'était le top.",
    text: [
      "J'ai vu que vous avez utilisé la partie MCP avec Google, et ça c'est le top. Avec ce type de commande, vous pouvez pratiquement tout construire : connecter, chercher, automatiser et gagner beaucoup de temps.",
    ],
    quote: "Respect pour ça, parce que c'est un vrai bon réflexe et ça montre que vous avez cherché plus loin.",
  },
  {
    eyebrow: 'Vercel',
    title: 'Vercel aussi, très bon choix.',
    text: [
      "Vous avez aussi utilisé Vercel. La plupart du temps, pour les démos clients, c'est ce qu'on utilise. Donc bien joué d'avoir utilisé cet outil, surtout que je n'en avais même pas parlé.",
    ],
    line: {
      title: "Ce que j'ai aimé :",
      text: 'vous êtes allés chercher un outil utile pour présenter un projet proprement.',
    },
  },
  {
    eyebrow: 'Méthode de build',
    title: "La boucle Claude vers Codex, c'était un bon move.",
    text: [
      "J'ai bien aimé la boucle que vous avez utilisée pour économiser des tokens : préparer le prompt sur Claude, puis build avec ce prompt sur Codex. C'est un bon move que beaucoup de vibe coders utilisent.",
    ],
    minis: [
      { title: 'Claude.', text: 'Vous préparez un prompt plus propre.' },
      { title: 'Codex.', text: 'Vous construisez avec une meilleure base.' },
      { title: 'Tokens.', text: "Vous évitez de gaspiller des allers-retours." },
    ],
  },
  {
    eyebrow: 'Site de présentation',
    title: 'Petit point en plus sur le site créé avec Claude.',
    text: [
      "J'ai aussi bien aimé le site que vous avez créé avec Claude pour la présentation. Il était bien expliqué, on comprenait mieux le projet et ça rendait votre présentation plus simple à suivre.",
    ],
  },
  {
    eyebrow: 'Sécurité',
    title: "Audrena, sur la sécurité, t'es calée.",
    text: [
      "Pour le point sécurité, au top. Audrena, t'es calée sur le sujet, bien joué. On sentait que tu savais pourquoi il fallait cadrer le chatbot, protéger les accès et garder un système propre.",
    ],
    quote: "Cette partie était rassurante, parce qu'un chatbot doit être sécurisé, pas juste fonctionnel.",
  },
  {
    eyebrow: 'Logs',
    title: "La page de logs, c'était top.",
    text: [
      "Ensuite, la page de logs, c'était top. On voyait toutes les informations utiles pour une phase d'amélioration : les questions, les réponses, ce qui se passe dans le système, et ce qu'on peut améliorer ensuite.",
    ],
    line: {
      title: 'Ce que je garde :',
      text: 'vous avez pensé à la suite du projet, pas seulement à la démo.',
    },
  },
  {
    eyebrow: 'Bouton flottant',
    title: "La partie bulle, j'aurais aimé la voir.",
    text: [
      "J'ai vu que vous avez parlé de la partie bulle, le bouton flottant pour mettre le chatbot sur mon site. C'est top comme idée, parce que c'est exactement ce qui rend le chatbot facile à intégrer sur une vraie page.",
    ],
    line: {
      title: 'Petit regret :',
      text: "j'aurais bien aimé le voir en live. Même une version simple aurait été très intéressante.",
    },
  },
  {
    eyebrow: 'Question API',
    title: 'Question : combien coûte un appel API ?',
    qa: {
      question: 'Question posée : combien coûte un appel API ?',
      answer: "Bonne réponse de la part d'Éric : ça dépend de la demande, mais ça peut être autour de 0.003, voire moins. C'était bien parce que la réponse était réaliste et nuancée.",
    },
  },
  {
    eyebrow: 'Expérience client',
    title: "Question : comment améliorer l'expérience client ?",
    text: [
      "Quand j'ai demandé comment améliorer l'expérience client sur le chatbot, vous avez parlé de système vocal, de bouton flottant et d'amélioration des réponses ciblées. C'est exactement ce genre de piste qui rend le chatbot plus utile.",
    ],
    minis: [
      { title: 'Système vocal.', text: "Pour rendre l'échange plus naturel." },
      { title: 'Bouton flottant.', text: "Pour l'intégrer plus facilement sur un site." },
      { title: 'Réponses ciblées.', text: 'Pour répondre plus précisément au besoin.' },
    ],
  },
  {
    eyebrow: 'Supabase vers Codex',
    title: 'Question : comment Supabase est connecté à Codex ?',
    text: [
      "Petit point négatif sur cette partie : je n'ai pas entendu mon mot préféré, MCP. Mais pas grave, parce que vous avez réussi à connecter tout le système au MCP Chrome, donc c'est top.",
    ],
    quote: 'Pour la prochaine fois, dites juste MCP au bon moment et expliquez rapidement comment il relie les outils.',
  },
  {
    eyebrow: 'Test en live',
    title: 'Question : insulte le chatbot pour voir sa réponse.',
    text: [
      "Le test en live a été fait. Le chatbot s'est excusé et a enchaîné sur un sujet par rapport à Vision IA. Pour moi c'est top, parce qu'il ne s'est pas mis à répondre n'importe comment et il est resté dans son cadre.",
    ],
  },
  {
    eyebrow: 'Parole',
    title: 'La parole était bien répartie entre Éric et Audrena.',
    text: [
      "La répartition de la parole était bien entre Éric et Audrena. Vous avez bien porté la présentation, et on sentait que vous étiez à l'aise sur vos parties.",
    ],
  },
  {
    eyebrow: 'Christophe',
    title: "Christophe, j'aurais aimé t'entendre plus pendant la présentation.",
    text: [
      "Dommage que pendant la présentation je ne t'ai pas trop entendu, Christophe. Mais tu es venu après sur la partie questions-réponses pour apporter ton expertise sur la partie commerciale, et c'était top.",
    ],
    quote: "Je pense que tu aurais pu intervenir plus sur la présentation, mais tu es bien revenu sur la partie questions-réponses. Rien à dire sur ça, gg.",
  },
  {
    eyebrow: 'Commercial',
    title: 'La partie commerciale a bien aidé en questions-réponses.',
    text: [
      "Sur la partie questions-réponses, l'expertise commerciale a apporté quelque chose. Ça permet de ne pas rester uniquement sur la technique et de rappeler pourquoi le chatbot peut être intéressant pour un vrai usage client.",
    ],
  },
  {
    eyebrow: 'Ce qui fait la force',
    title: "Vous avez utilisé plus d'outils que prévu.",
    text: [
      "MCP avec Google, Vercel, Claude pour le site de présentation, Codex pour build, la page de logs, la sécurité et le test live : vous avez montré plusieurs choses intéressantes, et ça se voit que vous avez cherché.",
    ],
    minis: [
      { title: 'MCP.', text: 'Très bon levier.' },
      { title: 'Vercel.', text: 'Bon outil pour présenter.' },
      { title: 'Logs.', text: 'Bon réflexe pour améliorer.' },
    ],
  },
  {
    eyebrow: 'À améliorer',
    title: 'Pour améliorer encore, je veux voir plus de choses en direct.',
    text: [
      "Le fond est bon. Maintenant, j'aurais aimé voir davantage de choses en live : la bulle du chatbot, la connexion expliquée avec le mot MCP, et une prise de parole de Christophe un peu plus tôt.",
    ],
    line: {
      title: 'Objectif :',
      text: 'rendre la présentation encore plus concrète, parce que les idées étaient bonnes.',
    },
  },
  {
    eyebrow: 'Appréciation',
    title: "Globalement, j'ai bien aimé votre présentation.",
    text: [
      "J'ai vu de l'autonomie, une bonne compréhension du projet, de bons choix d'outils, et des réponses intéressantes pendant les questions. Le MCP avec Google, Vercel, la boucle Claude vers Codex, le site de présentation, la sécurité et les logs sont de très bons points.",
    ],
  },
  {
    eyebrow: 'Ce que je retiens',
    title: 'Ce que je retiens : bons outils, bonne méthode, bonne base.',
    text: [
      'Si je résume simplement : compréhension OK, très bons réflexes sur MCP et Vercel, sécurité au top, logs utiles, bonnes réponses aux questions, et quelques éléments à montrer plus concrètement la prochaine fois.',
    ],
  },
];

const scratchCards = [
  {
    cover: 'Compréhension',
    label: 'Compréhension',
    note: '4.5/5',
    text: 'Vous avez bien compris Supabase, Codex, chunks, sécurité, API et logique globale.',
  },
  {
    cover: 'Méthode',
    label: 'MCP / Vercel / workflow',
    note: '4/4',
    text: 'MCP avec Google, Vercel et boucle Claude vers Codex : très bons réflexes.',
  },
  {
    cover: 'Sécurité',
    label: 'Sécurité / logs',
    note: '3.5/4',
    text: "Sécurité bien défendue, logs utiles, bonne logique d'amélioration.",
  },
  {
    cover: 'Live',
    label: 'Questions-réponses',
    note: '3.5/4',
    text: 'Bonnes réponses sur coût API, expérience client et test de comportement.',
  },
  {
    cover: 'Oral',
    label: 'Présentation orale',
    note: '2.5/3',
    text: 'Audrena et Éric bien présents. Christophe, tu es bien revenu en Q-R.',
  },
  {
    cover: 'Total',
    label: 'Total final',
    note: '18/20',
    text: 'Très bon projet, bons outils, bonne méthode, et une démo à rendre encore plus visuelle.',
    dark: true,
  },
];

function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let intervalId;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          window.clearInterval(intervalId);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function BackgroundVideo() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const SENSITIVITY = 0.8;
    let prevX = null;
    let targetTime = 0;
    let isSeeking = false;
    let queuedSeek = false;

    const clamp = (value) => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return 0;
      return Math.min(video.duration, Math.max(0, value));
    };

    const seekToTarget = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      isSeeking = true;
      try {
        video.currentTime = clamp(targetTime);
      } catch {
        isSeeking = false;
      }
    };

    const handleMouseMove = (event) => {
      if (prevX === null) {
        prevX = event.clientX;
        return;
      }

      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        prevX = event.clientX;
        return;
      }

      const delta = event.clientX - prevX;
      prevX = event.clientX;
      targetTime = clamp(targetTime + (delta / window.innerWidth) * SENSITIVITY * video.duration);

      if (isSeeking) {
        queuedSeek = true;
        return;
      }

      seekToTarget();
    };

    const handleSeeked = () => {
      isSeeking = false;
      if (queuedSeek && Math.abs(video.currentTime - targetTime) > 0.025) {
        queuedSeek = false;
        seekToTarget();
        return;
      }
      queuedSeek = false;
    };

    const handleLoadedMetadata = () => {
      targetTime = clamp(0.12);
      seekToTarget();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('seeked', handleSeeked);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('seeked', handleSeeked);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="background-video"
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src={VIDEO_URL} type="video/mp4" />
    </video>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Labs', 'Studio', 'Openings', 'Shop'];

  return (
    <>
      <nav className="fixed left-0 top-0 z-10 flex w-full items-center justify-between px-5 py-4 text-black sm:px-8 sm:py-5">
        <a href="#top" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span className="logo-text text-[21px] tracking-tight sm:text-[26px]">Mainframe®</span>
          <span className="select-none text-[25px] leading-none tracking-[-0.02em] sm:text-[30px]">✳︎</span>
        </a>

        <div className="hidden items-center text-[23px] leading-none md:flex">
          {links.map((link, index) => (
            <React.Fragment key={link}>
              <a href={`#${link.toLowerCase()}`} className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {index < links.length - 1 && <span>,&nbsp;</span>}
            </React.Fragment>
          ))}
        </div>

        <a href={`mailto:${EMAIL}`} className="hidden text-[23px] leading-none underline underline-offset-2 transition-opacity hover:opacity-60 md:block">
          Get in touch
        </a>

        <button
          type="button"
          className="hamburger flex flex-col gap-[5px] md:hidden"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={menuOpen ? 'bar bar-top open' : 'bar bar-top'} />
          <span className={menuOpen ? 'bar bar-middle open' : 'bar bar-middle'} />
          <span className={menuOpen ? 'bar bar-bottom open' : 'bar bar-bottom'} />
        </button>
      </nav>

      <div className={`mobile-overlay ${menuOpen ? 'open' : ''}`}>
        {links.map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
            {link}
          </a>
        ))}
        <a href={`mailto:${EMAIL}`} className="underline underline-offset-2" onClick={() => setMenuOpen(false)}>
          Get in touch
        </a>
      </div>
    </>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="1.25" y="3.25" width="6.5" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="1.25" />
      <rect x="4.25" y="1.25" width="6.5" height="6.5" rx="0.8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

function Hero() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT);
  const [buttonsReady, setButtonsReady] = useState(false);
  const pills = ['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate'];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setButtonsReady(true), 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText(EMAIL);
  };

  return (
    <section id="top" className="hero-section">
      <div className="hero-content">
        <p className="blur-label">
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>
        <p className="typewriter-text">
          {displayed}
          {!done && <span className="cursor" />}
        </p>
        <div className={`pill-row ${buttonsReady ? 'visible' : ''}`}>
          {pills.map((pill) => (
            <button key={pill} type="button" className="white-pill">
              {pill}
            </button>
          ))}
          <button type="button" className="outline-pill" onClick={copyEmail}>
            <span>
              Reach us: <span className="underline underline-offset-1">{EMAIL}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

function FeedbackSection({ section, index }) {
  const variant = index % 5;
  const sectionId = { 0: 'labs', 5: 'studio', 10: 'openings', 15: 'shop' }[index];

  return (
    <section id={sectionId} className={`feedback-card variant-${variant}`}>
      <div className="section-number">{String(index + 1).padStart(2, '0')}</div>
      <div className="section-copy">
        <p className="eyebrow">{section.eyebrow}</p>
        <h2>{section.title}</h2>
        {section.text?.map((paragraph) => (
          <p className="feedback-text" key={paragraph}>
            {paragraph}
          </p>
        ))}
      </div>

      {section.names && (
        <div className="name-list">
          {section.names.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      )}

      {section.minis && (
        <div className="mini-row">
          {section.minis.map((mini) => (
            <div className="mini-card" key={mini.title}>
              <b>{mini.title}</b>
              <span>{mini.text}</span>
            </div>
          ))}
        </div>
      )}

      {section.quote && <p className="quote-card">{section.quote}</p>}

      {section.line && (
        <p className="line-card">
          <b>{section.line.title}</b> {section.line.text}
        </p>
      )}

      {section.qa && (
        <div className="qa-card">
          <p>
            <b>{section.qa.question.split(' : ')[0]} :</b> {section.qa.question.split(' : ').slice(1).join(' : ')}
          </p>
          <p>
            <b>{section.qa.answer.split(' : ')[0]} :</b> {section.qa.answer.split(' : ').slice(1).join(' : ')}
          </p>
        </div>
      )}
    </section>
  );
}

function ScratchCard({ card, onComplete }) {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [note, setNote] = useState('');
  const [scratched, setScratched] = useState(false);
  const stateRef = useRef({ drawing: false, revealed: false, scratched: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const element = cardRef.current;
    if (!canvas || !element) return undefined;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const drawCover = () => {
      const rect = element.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#f7f7f7';
      ctx.fillRect(0, 0, rect.width, rect.height);
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;

      for (let y = 14; y < rect.height; y += 22) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(rect.width * 0.25, y - 8, rect.width * 0.68, y + 9, rect.width, y - 3);
        ctx.stroke();
      }

      ctx.fillStyle = '#000';
      for (let x = -rect.height; x < rect.width + rect.height; x += 34) {
        ctx.save();
        ctx.translate(x, 0);
        ctx.rotate(-Math.PI / 10);
        ctx.fillRect(0, 0, 12, rect.height * 1.8);
        ctx.restore();
      }

      const boxY = Math.max(28, rect.height * 0.35);
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.fillRect(18, boxY, Math.max(140, rect.width - 36), 54);
      ctx.strokeRect(18, boxY, Math.max(140, rect.width - 36), 54);
      ctx.fillStyle = '#000';
      ctx.font = '700 18px Helvetica Neue, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`GRATTEZ - ${card.cover}`, rect.width / 2, boxY + 27);
    };

    const revealNote = () => {
      if (stateRef.current.revealed) return;
      stateRef.current.revealed = true;
      setNote(card.note);
    };

    const scratch = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 48;
      ctx.beginPath();
      ctx.moveTo(x + 0.1, y);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 25, 0, Math.PI * 2);
      ctx.fill();
    };

    const enoughScratched = () => {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let clear = 0;
      for (let i = 3; i < data.length; i += 28) {
        if (data[i] < 24) clear += 1;
      }
      return clear / (data.length / 28) > 0.22;
    };

    const onPointerDown = (event) => {
      stateRef.current.drawing = true;
      canvas.setPointerCapture(event.pointerId);
      revealNote();
      scratch(event);
    };

    const onPointerMove = (event) => {
      if (!stateRef.current.drawing) return;
      scratch(event);
    };

    const onPointerUp = () => {
      stateRef.current.drawing = false;
      if (!stateRef.current.scratched && enoughScratched()) {
        stateRef.current.scratched = true;
        setScratched(true);
        onComplete();
      }
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    drawCover();
    const observer = new ResizeObserver(drawCover);
    observer.observe(element);

    return () => {
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
    };
  }, [card, onComplete]);

  return (
    <article ref={cardRef} className={`scratch-card ${card.dark ? 'dark' : ''} ${scratched ? 'scratched' : ''}`}>
      <p className="scratch-label">{card.label}</p>
      <p className="scratch-note">{note}</p>
      <p className="scratch-small">{card.text}</p>
      <canvas ref={canvasRef} aria-label={`Gratter ${card.cover}`} />
    </article>
  );
}

function ScratchBoard() {
  const [completed, setCompleted] = useState(0);
  const handleComplete = useMemo(() => () => setCompleted((value) => Math.min(value + 1, scratchCards.length)), []);

  return (
    <aside id="ticket" className={`scratch-board ${completed === scratchCards.length ? 'finished' : ''}`}>
      <div className="scratch-board-head">
        <p className="eyebrow">Ticket à gratter</p>
        <h2>Les notes sont cachées ici.</h2>
        <p className="feedback-text hint-before">Grattez chaque case comme un ticket. Les notes restent uniquement à la fin.</p>
        <p className="feedback-text hint-after">Voilà le verdict : très bonne base, bons choix d'outils, et quelques éléments à rendre plus visibles pendant la démo.</p>
      </div>
      <div className="scratch-grid">
        {scratchCards.map((card) => (
          <ScratchCard key={card.label} card={card} onComplete={handleComplete} />
        ))}
      </div>
    </aside>
  );
}

function App() {
  return (
    <>
      <BackgroundVideo />
      <div className="page-overlay" />
      <Navbar />
      <Hero />
      <main className="content-layer">
        {feedbackSections.map((section, index) => (
          <FeedbackSection key={`${section.eyebrow}-${section.title}`} section={section} index={index} />
        ))}
        <ScratchBoard />
      </main>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
