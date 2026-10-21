"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ────────────────────────── DATA ────────────────────────── */

const NICKNAMES = [
  { name: "Bongu", emoji: "🐣" },
  { name: "Chuimui", emoji: "🌸" },
  { name: "Bail", emoji: "🐂" },
  { name: "Chotu", emoji: "🧸" },
  { name: "Cutie", emoji: "🥰" },
  { name: "Bacha", emoji: "👶" },
  { name: "Baby", emoji: "💗" },
  { name: "Asteroid Destroyer", emoji: "😈" },
  { name: "Kumbhkaran", emoji: "😴" },
  { name: "Bhondu Kumar", emoji: "🤭" },
];

const TWENTY_ONE_NOTES = [
  { title: "Your Smile", text: "The way your smile lights up an entire room — it's my favorite thing in the whole universe. Never stop smiling, Seja. ✨", emoji: "😊" },
  { title: "Your Courage", text: "From that day you gathered the courage to confess on 28th August, you've shown me what bravery really looks like. 💪", emoji: "🦋" },
  { title: "Our Chai Nashta", text: "Every morning chai and nashta with you feels like a warm hug. Those early morning walks are my therapy. ☕", emoji: "🍵" },
  { title: "Your Growth & UI/UX", text: "From having no idea of anything to achieving everything — watching your hunger and passion for UI/UX grow makes me the proudest. You'll conquer it all! 🎨", emoji: "🌟" },
  { title: "Our 5 AM to 7 PM", text: "Subah 5 baje se shyam ke 7 tak — every minute with you is worth living for. Time stops when I'm with you. ⏰", emoji: "🕐" },
  { title: "Chocolate Shake Hunt", text: "Remember when we were searching for chocolate shake in the gully? Those silly little adventures make us, US. 🍫", emoji: "🧋" },
  { title: "The Bottle Incident", text: "You wrote 'chumui' on the bottle instead of 'chhuimui'! 🤣 That day I knew your adorable side has no limits.", emoji: "📝" },
  { title: "My First Birthday", text: "You celebrated my first birthday EVER. Nobody had done that before. You gave me a memory I'll cherish forever. 🎂", emoji: "🎉" },
  { title: "Your Determination", text: "We came so close to falling apart so many times, but you always fought for us. Your love is unbreakable. 💎", emoji: "💪" },
  { title: "Chennai Express", text: "Watching Chennai Express together — we HAVE to do it one more time! Our movie dates are the best. 🎬", emoji: "🎥" },
  { title: "Class Ka Natak", text: "Sitting in class, pretending to study while stealing glances at each other. Best acting career ever! 📚", emoji: "🎭" },
  { title: "Your Adorable Side", text: "The way you try to hold my hand, your shy little gestures — you're the most adorable human to exist. 🥺", emoji: "🤗" },
  { title: "IT vs CS Drama", text: "I literally chose IT instead of Computer Science for you. We didn't even get classes together! But worth every second. 💻", emoji: "😭" },
  { title: "Your Strength", text: "You managed to fix everything — from anger to every other aspect. You're so much stronger than you know. 🔥", emoji: "💫" },
  { title: "4 Years of College", text: "4 saal of college together — we're so lucky! Most couples don't get this, and we didn't waste a single day. 🎓", emoji: "🏫" },
  { title: "Your Freaky Side", text: "From shy to… well, let's just say you've changed a LOT 🤭 And I love every version of you! 😈", emoji: "🔥" },
  { title: "Our Survival", text: "We survived every storm, every fight, every moment that tried to break us. Together, we're invincible. 🛡️", emoji: "⚔️" },
  { title: "Your Beauty", text: "Tera jaisa beauty mujhe kahi nahi milega — inside and out, you're the most beautiful soul I know. 🌹", emoji: "👸" },
  { title: "28th August", text: "The day everything changed. 28th August 2022 — our beginning. The best day of both our lives. 📅", emoji: "💝" },
  { title: "Your Hamesha", text: "I'll be there with you hamesha, on every step. Don't ever hesitate to ask — I'll do it before you even say it. 🤝", emoji: "🫂" },
  { title: "Turning 21!", text: "21 saal ki ho gayi meri girl! From being my chuimui to becoming the most amazing woman — Happy 21st Birthday Seja! 🎂🎀", emoji: "👑" },
];

const TIMELINE = [
  { date: "The Beginning", emoji: "🍫", text: "Gully me chocolate shake dhundh rahe the... that's where our story began — two clueless kids just vibing together" },
  { date: "Class Days", emoji: "📚", text: "Baithke padne ka natak karte the... while you tried to hold my hand 🤭 Those classroom moments were everything" },
  { date: "The Bottle", emoji: "✍️", text: "You wrote 'CHUMUI' instead of 'CHHUIMUI' on the bottle 🤣 I still won't forget that" },
  { date: "My First Birthday", emoji: "🎂", text: "You celebrated my first birthday ever. No one had done that before. That day changed everything ❤️" },
  { date: "Growing Closer", emoji: "💕", text: "Late nights, deep conversations, growing closer day by day... we became inseparable" },
  { date: "28th August 2022", emoji: "💝", text: "When you were about to give up, from somewhere you pulled out the courage to CONFESS 🤭 Best day ever!" },
  { date: "College Life Together", emoji: "🎓", text: "5 AM to 7 PM — chai, nashta, walks, everything. 4 saal of college together, growing ek sath" },
  { date: "Surviving Together", emoji: "💪", text: "We came close to breaking apart but we both fought through. Every storm made us stronger" },
  { date: "Today & Forever", emoji: "🌟", text: "4 years and counting. You've grown into the most amazing person. Here's to forever, my love ♥️" },
];

/* ────────────────────────── HELPERS ────────────────────────── */

function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartEmojis = ["💕", "💗", "💖", "🎀", "🌸", "✨", "💝", "🩷", "🫧", "⭐"];
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: heartEmojis[i % heartEmojis.length],
      left: Math.random() * 100,
      delay: Math.random() * 15,
      duration: 10 + Math.random() * 15,
      size: 0.7 + Math.random() * 0.8,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

function Confetti() {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const colors = ["#ff6fa6", "#ffd700", "#ff3d85", "#ffa2c9", "#ffb6c1", "#d4145a", "#ff85a2", "#fff"];
    const confetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
    }));
    setPieces(confetti);

    const timeout = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </>
  );
}

/* ────────────────────────── MAIN PAGE ────────────────────────── */

export default function BirthdayPage() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [togetherTime, setTogetherTime] = useState({ years: 0, months: 0, days: 0, hours: 0 });

  const notesRef = useRef(null);
  const timelineRef = useRef(null);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setShowConfetti(true);
        setShowContent(true);
      }, 300);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Together time calculator (from 28 Aug 2022)
  useEffect(() => {
    const startDate = new Date(2022, 7, 28); // 28th August 2022
    const update = () => {
      const now = new Date();
      const diff = now - startDate;
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const days = totalDays % 30;
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTogetherTime({ years, months, days, hours });
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  // Scroll-driven animations
  useEffect(() => {
    if (!showContent) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    // Observe note cards
    document.querySelectorAll(".note-card, .timeline-item").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [showContent]);

  // Sparkle cursor on touch/click
  useEffect(() => {
    const sparkles = ["✨", "💖", "🌟", "💕", "⭐"];
    const handleTouch = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const sparkle = document.createElement("span");
      sparkle.className = "sparkle";
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    };

    document.addEventListener("touchstart", handleTouch, { passive: true });
    document.addEventListener("click", handleTouch);
    return () => {
      document.removeEventListener("touchstart", handleTouch);
      document.removeEventListener("click", handleTouch);
    };
  }, []);

  const handleEnter = useCallback(() => {
    const notesSection = document.getElementById("notes-section");
    if (notesSection) {
      notesSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleLetterToggle = useCallback(() => {
    setLetterOpen((prev) => !prev);
    if (!letterOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [letterOpen]);

  if (!showContent && loading) {
    return (
      <div className={`loading-screen ${!loading ? "hidden" : ""}`}>
        <div className="loading-kitty">🎀</div>
        <div className="loading-text">Something Special...</div>
        <div className="loading-subtext">for someone special 💕</div>
        <div className="loading-dots">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Confetti Burst */}
      {showConfetti && <Confetti />}

      {/* ──────────── HERO SECTION ──────────── */}
      <section className="hero-section">
        <div className="hero-content">
          <Image
            src="/images/kitty_birthday_hero.jpg"
            alt="Happy Birthday Kitty"
            width={200}
            height={200}
            className="hero-kitty-img"
            priority
          />
          <div className="hero-badge">🎀 Happy Birthday 🎀</div>
          <h1 className="hero-title">Happy Birthday Seja!</h1>
          <p className="hero-subtitle">My adorable Chuimui turns...</p>
          <div className="hero-age">21</div>
          <p className="hero-tagline">🌸 The most beautiful soul in my universe 🌸</p>
          <button className="entrance-btn" onClick={handleEnter}>
            Open Your Surprise 🎁
          </button>
        </div>
        <button className="scroll-indicator" onClick={handleEnter} aria-label="Scroll down">
          ↓ 🎀 ↓
        </button>
      </section>

      {/* ──────────── NICKNAMES MARQUEE ──────────── */}
      <div className="nicknames-section">
        <div className="nicknames-title">🎀 All the names I call you 🎀</div>
        <div className="nicknames-track-wrapper">
          <div className="nicknames-track">
            {[...NICKNAMES, ...NICKNAMES].map((n, i) => (
              <span className="nickname-chip" key={i}>
                <span className="nickname-emoji">{n.emoji}</span>
                {n.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────── TOGETHER COUNTER ──────────── */}
      <section className="section countdown-section">
        <div className="section-divider">🎀</div>
        <h2 className="section-title">Together Since</h2>
        <p className="section-subtitle">28th August 2022 💕</p>
        <div className="countdown-grid">
          <div className="countdown-item">
            <span className="countdown-number">{togetherTime.years}</span>
            <span className="countdown-label">Years</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{togetherTime.months}</span>
            <span className="countdown-label">Months</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{togetherTime.days}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-number">{togetherTime.hours}</span>
            <span className="countdown-label">Hours</span>
          </div>
        </div>
      </section>

      <div className="bow-divider">🎀 ─── 🌸 ─── 🎀</div>

      {/* ──────────── 21 NOTES ──────────── */}
      <section id="notes-section" className="section notes-section" ref={notesRef}>
        <div className="section-divider">💝</div>
        <h2 className="section-title">21 Notes for 21 Years</h2>
        <p className="section-subtitle">One for each beautiful year of your life 🌸</p>
        <div className="notes-grid">
          {TWENTY_ONE_NOTES.map((note, i) => (
            <div className="note-card" key={i}>
              <div className="note-header">
                <span className="note-number">{i + 1}</span>
                <span className="note-title-text">{note.title}</span>
              </div>
              <p className="note-text">{note.text}</p>
              <span className="note-emoji">{note.emoji}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="bow-divider">🎀 ─── 💕 ─── 🎀</div>

      {/* ──────────── VIDEO SECTION ──────────── */}
      <section className="section video-section">
        <div className="section-divider">🎬</div>
        <h2 className="section-title">Our Edit ✨</h2>
        <p className="section-subtitle">A little something I made for us 🤭</p>
        <div className="video-wrapper">
          <span className="video-decoration top-left">🎀</span>
          <span className="video-decoration top-right">💖</span>
          <span className="video-decoration bottom-left">🌸</span>
          <span className="video-decoration bottom-right">✨</span>
          <video
            controls
            playsInline
            preload="metadata"
            poster="/images/kitty_birthday_hero.jpg"
          >
            <source src="/images/edit.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <div className="bow-divider">🎀 ─── 🌸 ─── 🎀</div>

      {/* ──────────── OUR STORY TIMELINE ──────────── */}
      <section className="section timeline-section" ref={timelineRef}>
        <div className="section-divider">📖</div>
        <h2 className="section-title">Our Story</h2>
        <p className="section-subtitle">From chocolate shakes to forever 💕</p>
        <div className="timeline">
          {TIMELINE.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">
                <span className="timeline-emoji">{item.emoji}</span>
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bow-divider">🎀 ─── 💌 ─── 🎀</div>

      {/* ──────────── LETTER SECTION ──────────── */}
      <section className="section letter-section">
        <div className="section-divider">💌</div>
        <h2 className="section-title">A Letter For You</h2>
        <p className="section-subtitle">Tap the envelope to read 💕</p>
        <div className="letter-container">
          <div
            className={`letter-envelope ${letterOpen ? "opened" : ""}`}
            onClick={handleLetterToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleLetterToggle()}
          >
            <Image
              src="/images/love_letter_bg.jpg"
              alt="Love Letter"
              width={300}
              height={200}
              className="letter-envelope-img"
            />
            {!letterOpen && <span className="tap-hint">💌 Tap to open 💌</span>}
          </div>

          <div className={`letter-paper ${letterOpen ? "open" : ""}`}>
            <div className="letter-greeting">Dear Seja, My Love... 💕</div>
            <div className="letter-body">
{`Happpiest Birthdayyyyyy meri sejaaaaaaaaa 😭❤️❤️ Happpy 21st Birthdayyyyyy my love!

When I met you you were 16. It's like I saw you grow 😭❤️❤️ from being a kid to officially an adult my love ❤️ I hope we will be together like this till we die, I love you soo much ❤️

I remember I didn't use to celebrate birthdays and all until I met you. You being the first person to celebrate my birthday — my god I'm genuinely so grateful to have met you and even lucky to call you mine. I love the fact that you are mine ❤️

I'm so grateful to your mom honestly, she gave birth to an adorable masterpiece to which I can adore 🤭🤭

Ik hamare jhagde huve h but I hope it doesn't affect the love we have for each other. I genuinely love you more than soo much ❤️

Happpppyyyyyyyyy Birthdayyyyyy my love!

I'm genuinely so proud of you, the person you are becoming with full passion for UI/UX! My god I can see the hunger in you, I genuinely believe that you will achieve everything you want in your life ❤️ I believe in you.

You are genuinely the kindest soul that I have ever met, thank you for loving me ❤️ I genuinely feel lucky to be loved by someone like you. When I say lucky, I mean it ❤️ Thank you for everything seja my love, I'm genuinely grateful to have you.

And for this Birthdayyyyyy of yours, I genuinely wish:
✨ Tera har sapna poora ho, aur itna bada ho ki tu khud bole "yaar maine ye kar liya"
✨ Tu hamesha khush rahe, bina kisi tension ke, never dulll
✨ Tere paas hamesha achhe log hon.
✨ And again and most importantly — meri seja khush rhni chahiye!

Happiest Birthdayyyyyy my love ❤️
I love you so much ❤️`}
            </div>
            <div className="letter-sign">
              Forever & Always Yours,
              <br />
              Appu 🤭❤️
            </div>
          </div>
        </div>
      </section>

      <div className="bow-divider">🎀 ─── ❤️ ─── 🎀</div>

      {/* ──────────── ANNIVERSARY MESSAGE ──────────── */}
      <section className="section anniversary-section">
        <div className="section-divider">💕</div>
        <h2 className="section-title">4 Years ❤️</h2>
        <p className="section-subtitle">Our anniversary message 🤭</p>
        <div className="anniversary-card">
          <div className="anniversary-quote">&ldquo;4 saal hogaya and it literally feels ki kal ki hj baat h&rdquo;</div>
          <div className="anniversary-text">
{`Happpppyyyyyyyyy 4 years my loveeee 😭❤️❤️❤️❤️

Its been four fucking years sejaaa and the fact that I cant ever get enough of loving you — like you are literally such a great adorable person that anyone will be lucky to have.

I'm genuinely so lucky to have you my love ❤️

4 saal hogaya and it literally feels ki kal ki hj baat h hum gully me chocolate shake dhund rhe the... Class me baithke padne ka natak karte the... And tu mera hath pakdne ko try karti thi 😆😆

I won't forget that tune bottle pe khudse "chumui" likha thi not chhuimui 🤣

Then mera birthday tune celebrate kiya tha — my god, my first birthday ever ♥️ I love you so much!

Then we got more close, then we started going ghar itne late tak... Then one day when you were about to give up 🤭 from somewhere you pulled out the courage to confess 🤭🤭🤭🤭

28th August 2022 → Today it's 28th August 2026 → 4 YEARS my love!

We are so lucky — apna 4 saal of college bhi sathme tha. The morning nashta walk, the chai, subah ka... everything is so perfectly aligned ✨

Fixing everything from anger to... getting freaky 🤭 everything! Abhi toh merese zyada aap freaky ho 🤭🤭 I love how you managed to fix it 🤭♥️

There were many situations that we have survived... we were so close to breaking apart but we both managed to survive it ❤️ Touch wood, let's be together always!

4 saal apna hogaya — we grew eksath. You having no idea of anything to achieving everything. You have grown a lot my girl and I'm very proud of it 🌟

Always know that I'll be there with you hamesha on every step. Don't ever hesitate to ask me for help — tere puchne se phele hi me kardunga 🤭♥️

Happy 4 years my love, I genuinely love you soo much and I want us to be together always 😭♥️♥️`}
          </div>
          <div className="anniversary-from">— From yours only, Appu 🤭❤️</div>
        </div>
      </section>

      {/* ──────────── FOOTER ──────────── */}
      <footer className="footer">
        <span className="footer-kitty">🎀</span>
        <div className="footer-text">Happy 21st Birthday, Seja!</div>
        <div className="footer-subtext">Made with all my love, just for you 💕</div>
        <div className="footer-hearts">💗 🎀 💕 🌸 💖 🎀 💗</div>
        <div className="footer-subtext" style={{ marginTop: "1rem", fontSize: "0.7rem" }}>
          From your Appu, with love 🤭❤️
        </div>
      </footer>
    </>
  );
}
