import { FormEvent, useEffect, useState } from 'react';
import type { ActionPillTopic } from './Hero';
import type { NavSection } from './Navbar';

export type SheetSelection = NavSection | ActionPillTopic | null;

interface AgencySheetProps {
  selection: SheetSelection;
  onClose: () => void;
}

interface SheetContent {
  title: string;
  lead: string;
  details: Array<{ label: string; description: string }>;
  hasForm?: boolean;
  submitLabel?: string;
}

const CONTENT_MAP: Record<Exclude<SheetSelection, null>, SheetContent> = {
  Labs: {
    title: 'Mainframe Labs',
    lead: 'Experimental interfaces, kinetic typography systems, and spatial web prototypes built to test new interaction models before they become conventions.',
    details: [
      {
        label: '01. Spatial Motion Systems',
        description:
          'Frame-accurate video scrubbing, cursor-driven choreography, and low-latency WebGL environments.',
      },
      {
        label: '02. Adaptive Interfaces',
        description:
          'Conversational response agents and editorial layouts that shift cleanly across desktop and mobile.',
      },
      {
        label: '03. Brand Tooling',
        description:
          'Bespoke design systems, variable typography tools, and interactive campaign engines.',
      },
    ],
  },
  Studio: {
    title: 'Mainframe Studio',
    lead: 'An independent creative agency partnering with founders, cultural institutions, and product teams from zero-to-launch.',
    details: [
      {
        label: '01. Brand Direction',
        description:
          'Identity architecture, typographic systems, and visual worlds anchored in restraint.',
      },
      {
        label: '02. Digital Flagships',
        description:
          'Custom web experiences engineered for immediacy, clarity, and tactile responsiveness.',
      },
      {
        label: '03. Creative Engineering',
        description:
          'Full-stack production uniting editorial sensibility with disciplined frontend craft.',
      },
    ],
  },
  Openings: {
    title: 'Openings',
    lead: 'We work in small, senior multidisciplinary pods. Send a note with work you are proud of—even if your role is not listed.',
    details: [
      {
        label: 'Design Engineer',
        description:
          'Full-time · Remote / New York · React, TypeScript, motion choreography, and visual polish.',
      },
      {
        label: 'Senior Brand Designer',
        description:
          'Full-time · Remote / London · Editorial typography, art direction, and interactive identity systems.',
      },
      {
        label: 'Creative Technologist',
        description:
          'Contract / Full-time · WebGL, real-time media pipelines, and experimental UI prototyping.',
      },
    ],
    hasForm: true,
    submitLabel: 'Send portfolio link',
  },
  Shop: {
    title: 'Mainframe Editions',
    lead: 'Limited-run print monographs, studio utilities, and experimental digital tools released quarterly.',
    details: [
      {
        label: 'Edition 04 — Kinetic Type Specimen',
        description:
          '64-page Swiss-bound monograph documenting motion curves and typographic grids.',
      },
      {
        label: 'Edition 03 — Studio Utility Desk Mat',
        description:
          'Heavyweight woven wool mat in matte obsidian with minimal registration marks.',
      },
    ],
  },
  'Get in touch': {
    title: 'Get in touch',
    lead: 'Tell us what you are building, your timeline, and how we can help.',
    details: [
      {
        label: 'Direct Email',
        description: 'hello@mainframe.co · Typical response within one business day.',
      },
    ],
    hasForm: true,
    submitLabel: 'Send message',
  },
  'Pitch us an idea': {
    title: 'Pitch us an idea',
    lead: 'Have an ambitious product, launch, or experiment? Share the premise and we will respond directly.',
    details: [],
    hasForm: true,
    submitLabel: 'Submit pitch',
  },
  'Come work here': {
    title: 'Come work here',
    lead: 'We care deeply about craft, taste, and momentum. Share what you make and where we can see it.',
    details: [],
    hasForm: true,
    submitLabel: 'Submit note',
  },
  'Send a brief hello': {
    title: 'Send a brief hello',
    lead: 'Short notes are always welcome. Introduce yourself or share what caught your eye.',
    details: [],
    hasForm: true,
    submitLabel: 'Send hello',
  },
  'See how we operate': {
    title: 'How we operate',
    lead: 'Small senior teams, direct founder collaboration, and zero layers between thinking and shipping.',
    details: [
      {
        label: '01. Focused Sprints',
        description:
          'Two-week creative and engineering cycles with live prototypes in your browser from week one.',
      },
      {
        label: '02. One Integrated Team',
        description:
          'Brand designers and frontend engineers sit in the same room so intent never gets lost in handoff.',
      },
      {
        label: '03. Built to Last',
        description:
          'Clean, maintainable TypeScript codebases and accessible systems ready for your internal team.',
      },
    ],
  },
};

export function AgencySheet({ selection, onClose }: AgencySheetProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setName('');
    setEmail('');
    setMessage('');
    setError(null);
    setSubmitted(false);
  }, [selection]);

  useEffect(() => {
    if (!selection) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selection, onClose]);

  if (!selection) {
    return null;
  }

  const content = CONTENT_MAP[selection];

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!trimmedMessage) {
      setError('Please include a brief note.');
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="agency-sheet-title"
      className="fixed inset-0 z-30 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg bg-white text-black border border-black/10 rounded-t-2xl sm:rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-5">
          <h2
            id="agency-sheet-title"
            className="font-heading text-2xl sm:text-[28px] tracking-tight text-black"
          >
            {content.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="text-sm text-black/70 hover:text-black underline underline-offset-2 py-1 px-2 cursor-pointer whitespace-nowrap"
          >
            Close
          </button>
        </div>

        <p className="text-[16px] leading-relaxed text-black/80 mb-6">
          {content.lead}
        </p>

        {content.details.length > 0 && (
          <div className="divide-y divide-black/10 border-t border-b border-black/10 mb-6">
            {content.details.map((item) => (
              <div key={item.label} className="py-3.5">
                <div className="text-[15px] font-medium text-black mb-1">
                  {item.label}
                </div>
                <p className="text-[14px] leading-relaxed text-black/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {content.hasForm && (
          <div>
            {submitted ? (
              <div className="border border-black/15 rounded-xl p-5 bg-black/[0.03]">
                <p className="text-[16px] text-black mb-2">
                  Received, {name.trim()}.
                </p>
                <p className="text-[14px] text-black/70 mb-4">
                  A.R.I.A. has routed your note to our studio team at
                  hello@mainframe.co. We will follow up at {email.trim()}.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center bg-black text-white rounded-full text-[14px] px-5 py-2 hover:opacity-85 transition-opacity cursor-pointer"
                >
                  Return to Mainframe
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="sheet-name"
                    className="block text-[13px] text-black/70 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    id="sheet-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border border-black/20 rounded-lg px-3.5 py-2.5 text-[15px] text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sheet-email"
                    className="block text-[13px] text-black/70 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="sheet-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-black/20 rounded-lg px-3.5 py-2.5 text-[15px] text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sheet-message"
                    className="block text-[13px] text-black/70 mb-1.5"
                  >
                    Note
                  </label>
                  <textarea
                    id="sheet-message"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share context, links, or what we should build together..."
                    className="w-full border border-black/20 rounded-lg px-3.5 py-2.5 text-[15px] text-black placeholder:text-black/35 focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-[13px] text-red-700">
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center bg-black text-white rounded-full text-[14px] px-5 py-2.5 hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    {content.submitLabel ?? 'Send'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
