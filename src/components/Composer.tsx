"use client";

import { useRef, useState } from "react";
import { me } from "@/lib/citizens";
import { actAsync, newActionId } from "@/lib/actionClient";
import { onUserPost } from "@/ai/engine";

const MAX = 280;

// THE PUBLIC SQUARE — post to the nation. Posting a banger mints +50 MMC.
export default function Composer({ refresh, text, setText }: { refresh: () => void; text: string; setText: (text: string) => void }) {
  const pending = useRef<{ id: string; text: string; image: string | null } | null>(null);
  const [posting, setPosting] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const viewer = me();

  const remaining = MAX - text.length;
  const canPost = !!viewer && !posting && (!!text.trim() || !!image);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const post = async () => {
    if (!canPost || !viewer) return;

    // The id is minted here so the optimistic post and the one the server commits
    // are the same row.
    const body = text.trim();
    if (!pending.current || pending.current.text !== body || pending.current.image !== image) {
      pending.current = { id: newActionId("post"), text: body, image };
    }
    const id = pending.current.id;
    setPosting(true);
    const res = await actAsync("post.create", { id, text: text.trim(), image });
    setPosting(false);
    if (!res.ok) {
      setFlash(`🚫 ${res.reason}`);
      setTimeout(() => setFlash(null), 4000);
      return;
    }

    pending.current = null;
    setText("");
    setImage(null);
    if (fileRef.current) fileRef.current.value = "";
    const change = typeof res.data?.mmcChange === "number" ? res.data.mmcChange : null;
    setFlash(change === null ? "✓ Post confirmed by the nation." : `✓ Post confirmed. ${change >= 0 ? "+" : ""}${change} MMC.`);
    setTimeout(() => setFlash(null), 3000);
    refresh();
    onUserPost(id, refresh);
  };

  return (
    <div className="paper taped">
      <span className="card-title">🪧 THE PUBLIC SQUARE</span>
      <textarea
        id="square-composer"
        aria-label="Your post to the Public Square"
        rows={3}
        value={text}
        maxLength={280}
        placeholder="Introduce yourself, pitch a bad idea, or try today’s challenge…"
        onChange={(e) => setText(e.target.value)}
        style={{ resize: "vertical" }}
      />
      <p className="hand" style={{ fontSize: 14 }}>Rewards vary with your city, the economy and your daily mint limit. Tiny text-only posts can incur spam tax. Your confirmed result appears after posting.</p>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="preview"
          style={{ marginTop: 8, maxHeight: 180, borderRadius: 4, border: "var(--b)" }}
        />
      )}
      {flash && (
        <div role="status" className="sticker s-lime" style={{ display: "block", marginTop: 10, fontSize: 13 }}>
          {flash}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <label className="btn ghost" style={{ display: "inline-flex", alignItems: "center" }}>
          🖼️ Image
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            className="mono"
            style={{ fontSize: 11, color: remaining <= 20 ? "var(--bad)" : "var(--ink-soft)" }}
          >
            {remaining}
          </span>
          <button className="btn lime" onClick={post} disabled={!canPost}>
            {posting ? "Confirming…" : "Post to the square 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}
