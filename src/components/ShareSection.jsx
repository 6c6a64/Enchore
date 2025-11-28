import { useState } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { buildShareUrl } from '../utils/shareHelpers';

export default function ShareSection({ results }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof window === 'undefined') return;
    const shareUrl = buildShareUrl(results);
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Enchore results',
          text: 'Here is how the load is distributed in our household.',
          url: buildShareUrl(results),
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">Share the story</p>
          <h3 className="text-xl font-semibold">Export a branded summary card</h3>
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-full bg-brand-teal px-4 py-2 text-sm font-semibold text-white"
        >
          <Share2 className="h-4 w-4" />
          Share results
        </button>
      </div>
      <p className="mt-2 text-sm text-slate-400">
        Generates a URL embedding the key numbers so you can revisit or share with others instantly.
      </p>
      <button
        type="button"
        onClick={handleCopy}
        className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
        {copied ? 'Copied!' : 'Copy shareable link'}
      </button>
    </div>
  );
}
