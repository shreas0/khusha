import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Cake.css";

const CANDLES = [
  { x: 72, delay: 0 },
  { x: 50, delay: 0.15 },
  { x: 28, delay: 0.3 },
];



const SPRINKLE_COLORS = ["#ff4081", "#40c4ff", "#69f0ae", "#ffea00", "#ea80fc", "#ff6d00", "#00e5ff"];
const CONFETTI_COLORS = ["#ff6ec4", "#7873f5", "#4adede", "#ffea00", "#ff4081", "#69f0ae", "#ff6d00"];

const BLOW_THRESHOLD = 6;
const BLOW_DECAY = 800;
const TAP_WINDOW = 400;

function CandleFlame({ isLit, flickerDelay, flickerSpeed, windPulse }) {
  return (
    <div className="flame-container">
      {isLit && (
        <div
          className={`flame${windPulse ? " wind" : ""}`}
          style={{
            "--flicker-delay": `${flickerDelay}s`,
            "--flicker-speed": `${flickerSpeed}s`,
          }}
        />
      )}
      {!isLit && <div className="smoke active" />}
    </div>
  );
}

export default function BirthdayCake() {
  const navigate = useNavigate();
  const [flames, setFlames] = useState([true, true, true]);
  const [blowPower, setBlowPower] = useState(0);
  const [windPulse, setWindPulse] = useState(false);
  const [showCelebrate, setShowCelebrate] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [isDone, setIsDone] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const powerRef = useRef(0);
  const lastTapRef = useRef(0);
  const decayTimer = useRef(null);
  const windTimer = useRef(null);
  const allBlownOut = flames.every(f => !f);


  const startDecay = useCallback(() => {
    clearInterval(decayTimer.current);
    decayTimer.current = setInterval(() => {
      powerRef.current = Math.max(0, powerRef.current - 0.5);
      setBlowPower(powerRef.current);
      if (powerRef.current <= 0) clearInterval(decayTimer.current);
    }, 80);
  }, []);

  const triggerWind = useCallback(() => {
    setWindPulse(true);
    clearTimeout(windTimer.current);
    windTimer.current = setTimeout(() => setWindPulse(false), 220);
  }, []);

  // ── launch confetti ──
  const launchConfetti = useCallback(() => {
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      dur: `${1.5 + Math.random() * 2}s`,
      delay: `${Math.random() * 0.8}s`,
      rot: `${Math.random() * 360}deg`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 4000);
  }, []);
  const handleBlow = useCallback(() => {
    if (isDone) return;
    const now = Date.now();
    const timeSinceLast = now - lastTapRef.current;
    lastTapRef.current = now;

    if (timeSinceLast > TAP_WINDOW && powerRef.current < 1) return;

    startDecay();
    triggerWind();

    const increment = timeSinceLast < TAP_WINDOW ? 1.4 : 0.5;
    powerRef.current = Math.min(BLOW_THRESHOLD, powerRef.current + increment);
    setBlowPower(powerRef.current);

    if (powerRef.current >= BLOW_THRESHOLD * 0.45) {
      setFlames(prev => {
        const next = [...prev];
        const litIndexes = next.map((v, i) => v ? i : -1).filter(i => i >= 0);
        if (litIndexes.length === 0) return prev;
        const toKill = Math.min(
          litIndexes.length,
          Math.floor((powerRef.current / BLOW_THRESHOLD) * 3 + 0.3)
        );
        for (let k = 0; k < toKill; k++) {
          next[litIndexes[k]] = false;
        }
        if (next.every(f => !f)) {
          setTimeout(() => {
            setShowCelebrate(true);
            launchConfetti();
            setIsDone(true);
          }, 300);
          setTimeout(() => setShowCelebrate(false), 3200);
          // Show loading screen after celebration
          setTimeout(() => {
            setShowLoading(true);
          }, 2500);
          // Navigate after loading completes
          setTimeout(() => {
            navigate("/secret");
          }, 5800); // 2.5s delay + 3.3s loading = 5.8s total

        }
        return next;
      });
    }
  }, [isDone, startDecay, triggerWind, launchConfetti]);

  const handleReset = useCallback(() => {
    setFlames([true, true, true]);
    setBlowPower(0);
    powerRef.current = 0;
    setIsDone(false);
    setShowCelebrate(false);
    setWindPulse(false);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(decayTimer.current);
      clearTimeout(windTimer.current);
    };
  }, []);

  const progressPct = Math.min(100, (blowPower / BLOW_THRESHOLD) * 100);
  const litCount = flames.filter(Boolean).length;

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${(i * 37.3) % 100}%`,
    top: `${(i * 53.7) % 100}%`,
    dur: `${2 + (i % 4)}s`,
    delay: `${(i * 0.15) % 2}s`,
  }));

  const sprinkleData = [
    { l: "18%", t: "18px", r: "-20deg", c: "#ff4081" },
    { l: "40%", t: "22px", r: "30deg", c: "#40c4ff" },
    { l: "62%", t: "15px", r: "-40deg", c: "#69f0ae" },
    { l: "80%", t: "24px", r: "15deg", c: "#ffea00" },
    { l: "30%", t: "38px", r: "60deg", c: "#ea80fc" },
    { l: "70%", t: "36px", r: "-55deg", c: "#ff6d00" },
    { l: "52%", t: "42px", r: "45deg", c: "#00e5ff" },
  ];

  const frostingPositions = [10, 38, 66, 94, 122, 150, 178, 206];

  const loadingSparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 40}%`,
    dur: `${2 + Math.random() * 2}s`,
    delay: `${Math.random() * 2}s`,
  }));

  return (
    <>
      {/* Loading Overlay */}
      <div className={`loading-overlay${showLoading ? " active" : ""}`}>
        <div className="loading-sparkles">
          {loadingSparkles.map(s => (
            <div
              key={s.id}
              className="loading-sparkle"
              style={{
                left: s.left,
                bottom: s.bottom,
                "--sparkle-dur": s.dur,
                "--sparkle-delay": s.delay,
              }}
            />
          ))}
        </div>
        <div className="loading-content">
          <div className="loading-emoji">🎁</div>
          <div className="loading-text">Opening your surprise...</div>
          <div className="loading-bar-container">
            <div className="loading-bar-fill"></div>
          </div>
        </div>
      </div>

      {confetti.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            "--fall-x": p.x,
            "--fall-dur": p.dur,
            "--fall-delay": p.delay,
            "--rot": p.rot,
            "--color": p.color,
          }}
        />
      ))}
      <div className={`celebrate-msg${showCelebrate ? " show" : ""}`}>
        🎂 Happy Birthday! 🎂
      </div>

      <div className="scene">
        {/* stars */}
        <div className="stars">
          {stars.map(s => (
            <div
              key={s.id}
              className="star"
              style={{ left: s.left, top: s.top, "--d": s.dur, "--delay": s.delay }}
            />
          ))}
        </div>
        <div className="content">
          <div className="title">Make a Wish! ✨</div>

          <div className="cake-wrapper">
            {litCount > 0 && (
              <div className="cake-glow" style={{ opacity: litCount / 3 }} />
            )}

            <div className="candles-row">
              {CANDLES.map((c, i) => (
                <div className="candle-group" key={i}>
                  <CandleFlame
                    isLit={flames[i]}
                    flickerDelay={c.delay}
                    flickerSpeed={1.1 + i * 0.12}
                    windPulse={windPulse && flames[i]}
                  />
                  <div className="wick" />
                  <div className="candle-body" style={{ height: 44 + i * 4 }}>
                    <div className="wax-drip" />
                  </div>
                </div>
              ))}
            </div>

            {/* top layer */}
            <div className="cake-top-layer">
              {frostingPositions.map((pos, i) => (
                <div key={i} className="frosting-blob" style={{ left: pos }} />
              ))}
              {sprinkleData.map((s, i) => (
                <div
                  key={i}
                  className="sprinkle"
                  style={{ left: s.l, top: s.t, "--rot": s.r, background: s.c }}
                />
              ))}
              {[70, 130, 190].map((l, i) => (
                <div key={i} className="decoration-cherry" style={{ left: l }} />
              ))}
            </div>

            {/* middle layer */}
            <div className="cake-middle-layer">
              {[30, 80, 130, 180, 230].map((x, i) => (
                <div key={i} className="stripe" style={{ left: x }} />
              ))}
              <div className="filling-peek" />
              <div className="filling-line" />
            </div>

            {/* bottom layer */}
            <div className="cake-bottom-layer">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="bottom-polka"
                  style={{
                    width: 10 + (i % 3) * 6,
                    height: 10 + (i % 3) * 6,
                    left: `${(i * 23 + 5) % 90}%`,
                    top: `${15 + (i % 4) * 15}px`,
                  }}
                />
              ))}
            </div>

            <div className="cake-plate" />
          </div>

          <div className="blow-section">
            {!isDone ? (
              <>
                <div className="tap-hint">
                  {litCount === 3
                    ? "Jaldi Jaldi Fook 🤭"
                    : litCount > 0
                      ? `${litCount} flame${litCount > 1 ? "s" : ""} bachi hai sirf — fookti reh!`
                      : "Bss ho hi gya..."}
                </div>

                <div className="blow-progress-track">
                  <div
                    className="blow-progress-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>

                <button
                  className="blow-btn"
                  onMouseDown={handleBlow}
                  onTouchStart={e => { e.preventDefault(); handleBlow(); }}
                  disabled={allBlownOut}
                >
                  Blow!
                </button>
              </>
            ) : (
              <div className="tap-hint" style={{ opacity: 1, color: "#ffd700", fontSize: "1.1rem" }}>
                🎉 BOHOT ACCHE ! LE ASHIRVAD ✋
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}