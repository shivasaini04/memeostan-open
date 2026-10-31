// A shared UTC prompt; entries are ordinary signed posts, with no extra mint path.
const PROMPTS = [
  { title: "Ministry of Bad Ideas", prompt: "Pitch a useless ministry and its first national project." },
  { title: "The Great Nap Treaty", prompt: "Offer a ridiculous peace treaty to a rival city." },
  { title: "National Job Board", prompt: "Invent a job that only a meme nation would pay someone to do." },
  { title: "Passport Lore Day", prompt: "Introduce your citizen and the absurd reason they moved here." },
  { title: "Emergency Cabinet Meeting", prompt: "The national raccoon ate the budget. Pitch a rescue plan." },
  { title: "Tourism Disaster", prompt: "Write a one-line tourist slogan for your city." },
  { title: "National Treasure Hunt", prompt: "Nominate an everyday object as our next national treasure." },
];
export function dailyMission(now = Date.now()) {
  const day = Math.floor(now / 86_400_000);
  const date = new Date(now).toISOString().slice(0, 10);
  return { ...PROMPTS[((day % PROMPTS.length) + PROMPTS.length) % PROMPTS.length],
    tag: `#Memeostan${date.replaceAll("-", "")}`, date, endsAt: (day + 1) * 86_400_000 };
}
