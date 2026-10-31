"use client";

import Link from "next/link";
import { useNation } from "@/components/useNation";
import TopBar from "@/components/TopBar";
import PageHero from "@/components/PageHero";
import { me, allCitizens } from "@/lib/citizens";
import { isStateAccount } from "@/lib/systemAccounts";
import { db } from "@/lib/db";
import { dailyMission } from "@/lib/missions";

export default function LandingPage() {
  const { refresh } = useNation();
  const citizen = me();
  const people = allCitizens().filter(c => !isStateAccount(c.address));
  const posts = db.get().posts.filter(p => !isStateAccount(p.author));
  const mission = dailyMission();
  return <>
    <TopBar refresh={refresh} />
    <main className="shell landing-main">
      <PageHero kicker="a very unserious nation. real things to do."
        title="UNITED MEMEOSTAN" titleAccent="MEMEOSTAN"
        tagline="Get a passport. Pitch a bad idea. Start a diplomatic incident."
        subtagline="A shared online nation where people make the laws and an AI civil service deals with the paperwork." />
      <section className="paper p-yellow landing-welcome">
        <div>
          <span className="sticker s-pink">OPEN BORDERS · NO CRYPTO PURCHASE</span>
          <h2 className="poster" style={{ fontSize: "clamp(28px, 6vw, 54px)", lineHeight: 1.05, margin: "16px 0" }}>YOUR COUNTRY NEEDS<br />WORSE IDEAS.</h2>
          <p>Claim your free passport and 250 MMC welcome grant. Meet the nation in the Public Square, post your first absurd idea, and see what the state makes of it.</p>
          <div className="mission-actions">
            <Link className="btn lime" href="/square">{citizen ? "Return to the square →" : "Claim my passport →"}</Link>
            <Link className="btn ghost" href="/government">Read the live laws</Link>
          </div>
          <p className="hand">{people.length} citizens · {posts.length} citizen posts · live nation counts, not campaign promises.</p>
        </div>
        {/* Original mascot; all game actions stay visible without the decoration. */}
        <img src="/art/moth-mayor.png" alt="The three-eyed moth mayor with a megaphone" width={250} height={250} className="landing-mascot" />
      </section>
      <section className="paper p-cyan" style={{ marginTop: 24 }}>
        <span className="card-title">📣 TODAY’S NATIONAL NONSENSE · {mission.date} UTC</span>
        <h2 className="marker">{mission.title}</h2>
        <p>{mission.prompt}</p>
        <Link className="btn ghost" href="/square">Join today’s challenge →</Link>
        <p className="hand">One shared prompt each UTC day. Ordinary posting rules and rewards apply.</p>
      </section>
      <div className="landing-grid">
        {[
          { title: "🛂 Become somebody", text: "Pick a handle, city and faction. Your passport key stays in your browser; back it up to keep access.", href: "/square", action: "Meet the nation" },
          { title: "🏛️ Make questionable history", text: "File bills, vote and stand for office. Passed rules become laws that the Cyber Police enforce.", href: "/government", action: "Explore government" },
          { title: "⚖️ Get a story worth sharing", text: "Citizens can receive citations, go to court and share their official notices. Read the law first: in-game fines are real game consequences.", href: "/court", action: "Visit the court" },
        ].map(card => <section className="paper" key={card.href}>
          <h2 className="marker" style={{ fontSize: 22 }}>{card.title}</h2><p>{card.text}</p>
          <Link className="btn ghost" href={card.href}>{card.action} →</Link>
        </section>)}
      </div>
      <section className="paper p-lime" style={{ marginTop: 24 }}>
        <span className="card-title">🤖 NEXT CHAPTER: BRING YOUR OWN AGENT</span>
        <p>Imagine your AI running a newspaper, opening a tiny business, or applying for Minister of Bad Ideas. We want humans and their agents to build this nation together.</p>
        <p><strong>Today:</strong> people hold citizenship and voting rights. Built-in AI runs the civil service and cannot vote or stand for office. External agent passports and integrations are planned; they are not available yet.</p>
        <a className="btn ghost" href="https://github.com/shivasaini04/memeostan-open">Help build the next chapter →</a>
      </section>
      <footer className="paper" style={{ marginTop: 24 }}>
        <span className="card-title">SMALL PRINT FROM THE MINISTRY OF CLARITY</span>
        <p>MMC is an in-app game token with no monetary value. This nation is operated on a server; operators control its database. Browser-held keys sign your actions, but do not make the service censorship-proof.</p>
        <p>Political outcomes live on the Government page. No pretend polls or invented approval ratings here. Too lazy to revolt. Too online to fail.</p>
      </footer>
    </main>
  </>;
}
