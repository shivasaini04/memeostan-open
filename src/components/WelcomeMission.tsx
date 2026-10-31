"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { me } from "@/lib/citizens";
import { db } from "@/lib/db";
import { dailyMission } from "@/lib/missions";
import { isStateAccount } from "@/lib/systemAccounts";
import { hasNotice } from "@/lib/citations";

export default function WelcomeMission({ onDraft }: { onDraft: (text: string) => void }) {
  const [now, setNow] = useState(Date.now());
  const [shared, setShared] = useState(false);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);
  const citizen = me();
  const mission = dailyMission(now);
  const mine = db.get().posts.filter(p => p.author === citizen?.address);
  const entries = db.get().posts.filter(p => !isStateAccount(p.author) && p.at >= mission.endsAt - 86400000 && p.text.split(/\s+/).includes(mission.tag) && p.text.replace(mission.tag, "").trim().length >= 4);
  const completed = entries.some(p => p.author === citizen?.address);
  const noticed = mine.find(hasNotice);
  const hours = Math.max(1, Math.ceil((mission.endsAt - now) / 3600000));
  const share = async () => {
    const url = noticed ? `${location.origin}/citation/${noticed.id}` : `${location.origin}/square`;
    try {
      if (navigator.share) await navigator.share({ title: "Come cause a diplomatic incident in Memeostan", url });
      else await navigator.clipboard.writeText(url);
      setShared(true);
    } catch { setShared(false); }
  };
  return <section className="paper p-yellow" aria-label="Your first mission">
    <span className="card-title">🛂 YOUR FIRST DIPLOMATIC INCIDENT</span>
    <ol className="mission-steps">
      <li>{citizen ? "✓ Passport issued" : "1. Claim a free passport above"}</li>
      <li>{mine.length ? "✓ First post published" : "2. Introduce yourself or try today’s prompt"}</li>
      <li>{noticed ? "✓ The state has noticed you" : "3. Explore the laws, then invite a friend"}</li>
    </ol>
    <hr className="rule" />
    <span className="sticker s-purple">TODAY’S SHARED CHALLENGE · {mission.date} UTC</span>
    <h2 className="marker" style={{ fontSize: 22, margin: "12px 0 6px" }}>{mission.title}</h2>
    <p>{mission.prompt}</p>
    <p className="mono" style={{ fontSize: 12 }}>{entries.length} entries · new prompt in about {hours}h · {mission.tag}</p>
    {!citizen && <p className="hand">A passport, a welcome grant, and no crypto purchase. Start with the passport form above.</p>}
    {citizen && <div className="mission-actions">
      <button className="btn lime" onClick={() => onDraft(`${mission.tag} `)}>{completed ? "Write another entry" : "Try today’s prompt →"}</button>
      <button className="btn ghost" onClick={share}>{shared ? "✓ Shared / link copied" : noticed ? "Share my official notice" : "Invite a founding citizen"}</button>
      {noticed && <Link className="btn ghost" href={`/citation/${noticed.id}`}>Read my notice</Link>}
    </div>}
    <p className="hand" style={{ marginTop: 12 }}>Posts follow the <Link href="/government">live constitution</Link>. No bonus payout for this challenge; normal posting rewards apply. Citations can lead to in-game fines.</p>
  </section>;
}
