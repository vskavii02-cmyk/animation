import { useEffect, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

export type ActionPillTopic =
  | 'Pitch us an idea'
  | 'Come work here'
  | 'Send a brief hello'
  | 'See how we operate';

interface HeroProps {
  onSelectTopic: (topic: ActionPillTopic) => void;
}

const WHITE_PILLS: ActionPillTopic[] = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
];

const HERO_PROMPT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

export function Hero({ onSelectTopic }: HeroProps) {
  const { displayed, done } = useTypewriter(HERO_PROMPT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPillsVisible(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = async () => {
    const email = 'hello@mainframe.co';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        textarea.setAttribute('readonly', '');
        textarea.className = 'fixed opacity-0 pointer-events-none';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="top"
      className="h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden relative z-[1]"
    >
      <div className="max-w-xl relative z-10">
        {/* 1. Blurred intro label */}
        <p className="pointer-events-none select-none mb-5 sm:mb-6 text-[clamp(18px,4vw,26px)] leading-[1.3] font-normal text-black blur-[4px]">
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        {/* 2. Typewriter text */}
        <p className="text-black mb-5 sm:mb-6 text-[clamp(18px,4vw,26px)] leading-[1.35] font-normal min-h-[54px]">
          {displayed}
          {!done && (
            <span
              aria-hidden="true"
              className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink"
            />
          )}
        </p>

        {/* 3. Action pill buttons */}
        <div
          className={`flex flex-wrap gap-y-1 transition-[opacity,transform] duration-[400ms] ease-out ${
            pillsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }`}
        >
          {WHITE_PILLS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelectTopic(label)}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCopyEmail}
            aria-label="Copy hello@mainframe.co to clipboard"
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer"
          >
            <span>
              {copied ? 'Copied: ' : 'Reach us: '}
              <span className="underline underline-offset-1">
                hello@mainframe.co
              </span>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect
                x="4"
                y="4"
                width="6.5"
                height="6.5"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M8 4V2.5C8 1.94772 7.55228 1.5 7 1.5H2.5C1.94772 1.5 1.5 1.94772 1.5 2.5V7C1.5 7.55228 1.94772 8 2.5 8H4"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
