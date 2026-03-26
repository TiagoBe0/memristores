import { useState, useEffect } from "react";

const papers = [
  { id: "P1", author: "Chua", year: 1971, shortRef: "Chua 1971 (via Chua 2015)", file: "15_02_0319_0368.pdf", title: "Everything You Wish to Know About Memristors But Are Afraid to Ask", claim: "Classifies memristors into Ideal, Generic, and Extended types, rigorously defining fingerprints, non-volatile memory concepts, and DC V-I plots with a novel parametric approach.", type: "Theory/Tutorial", methodology: "Theoretical/Mathematical Analysis", pages: 50 },
  { id: "P2", author: "Chua", year: 2011, shortRef: "Chua 2011", file: "s0033901162649.pdf", title: "Resistance Switching Memories Are Memristors", claim: "All 2-terminal non-volatile resistance switching devices are memristors, regardless of material or mechanism, unified by the pinched hysteresis loop fingerprint.", type: "Theory/Unification", methodology: "Theoretical Analysis + Literature Survey", pages: 19 },
  { id: "P3", author: "Prodromakis, Toumazou & Chua", year: 2012, shortRef: "Prodromakis et al. 2012", file: "Two_centuries_of_memristors.pdf", title: "Two Centuries of Memristors", claim: "Memristive behavior has been experimentally documented for over 200 years across diverse physical systems—from arc discharges to biological ion channels.", type: "Historical Review", methodology: "Historical/Literature Analysis", pages: 4 },
  { id: "P4", author: "Mazumder, Kang & Waser", year: 2012, shortRef: "Mazumder et al. 2012", file: "Memristors_Devices_Models_and_Applicatio.pdf", title: "Memristors: Devices, Models, and Applications (Special Issue Overview)", claim: "Memristor technology spans five domains: theory, device engineering, circuit modeling, digital/analog systems, and neuromorphic systems, with potential to displace CMOS in certain applications.", type: "Survey/Editorial", methodology: "Meta-review of 13 papers", pages: 9 },
  { id: "P5", author: "Di Ventra, Pershin & Chua", year: 2009, shortRef: "Di Ventra et al. 2009", file: "0901_3682v1.pdf", title: "Circuit Elements with Memory: Memristors, Memcapacitors, and Meminductors", claim: "The memory concept extends beyond resistance to capacitance and inductance, defining memcapacitors and meminductors as new circuit elements ubiquitous at the nanoscale.", type: "Theory Extension", methodology: "Theoretical/Mathematical Analysis", pages: 6 },
  { id: "P6", author: "Zidan, Fahmy, Hussain & Salama", year: 2013, shortRef: "Zidan et al. 2013", file: "j_mejo_2012_10_001.pdf", title: "Memristor-Based Memory: The Sneak Paths Problem and Solutions", claim: "The sneak paths problem is the main circuit-level challenge for crossbar memristor memories; a new three-terminal memistor gating technique can solve it.", type: "Circuit Architecture", methodology: "Simulation + Circuit Analysis", pages: 8 },
  { id: "P7", author: "Jeong, Kim, Kim, Choi & Hwang", year: 2016, shortRef: "Jeong et al. 2016", file: "jeong2016.pdf", title: "Memristors for Energy-Efficient New Computing Paradigms", claim: "Memristors enable two energy-saving computing paradigms: stateful logic (merging logic+memory) and neuromorphic computing, potentially closing the 10⁸× energy gap with the brain.", type: "Review", methodology: "Comprehensive Literature Review", pages: 27 },
  { id: "P8", author: "Wang, Cai, Pan et al.", year: 2018, shortRef: "Wang et al. 2018", file: "1801_00530v1.pdf", title: "Robust Memristors Based on Layered Two-Dimensional Materials", claim: "Van der Waals heterostructure memristors (graphene/MoS₂₋ₓOₓ/graphene) achieve record thermal stability up to 340°C and 10⁷ endurance cycles via atomically sharp interfaces.", type: "Experimental", methodology: "Device Fabrication + TEM/STEM Characterization", pages: 31 },
  { id: "P9", author: "Sun, Chen & Yan", year: 2020, shortRef: "Sun et al. 2020", file: "sun2020.pdf", title: "The Future of Memristors: Materials Engineering and Neural Networks", claim: "Memristor-based neural networks are the most promising path beyond von Neumann bottlenecks, but material variability and large-scale integration remain unsolved.", type: "Review", methodology: "Comprehensive Literature Review", pages: 33 },
  { id: "P10", author: "Kvatinsky, Ramadan, Friedman & Kolodny", year: 2014, shortRef: "Kvatinsky et al. 2014", file: "publication_8561.pdf", title: "VTEAM — A General Model for Voltage Controlled Memristors", claim: "The VTEAM model accurately describes voltage-controlled memristors with threshold behavior, achieving <1.5% error while being computationally efficient for SPICE simulations.", type: "Modeling", methodology: "Mathematical Modeling + SPICE Simulation", pages: 6 },
  { id: "P11", author: "Grande de Miguel", year: "~2020", shortRef: "Grande de Miguel (thesis)", file: "document.pdf", title: "Memristor: Funcionamiento y Aplicaciones (Thesis, U. Valladolid)", claim: "Comprehensive undergraduate thesis covering memristor fundamentals, TiO₂ models, HP device, applications in cybersecurity (chaotic circuits), neural networks, and non-volatile memories.", type: "Thesis/Survey", methodology: "Literature Review + Simulation (Simulink/LabView)", pages: 74 },
];

const assumptionSets = [
  { name: "Chua's Theoretical Framework", papers: ["P1", "P2", "P3", "P4", "P5"], desc: "Accept the memristor as a fundamental circuit element defined by pinched hysteresis and charge-flux constitutive relations." },
  { name: "HP TiO₂ as Reference Implementation", papers: ["P4", "P6", "P10", "P11"], desc: "Use the HP Labs 2008 TiO₂ device as the canonical physical memristor for modeling and simulation benchmarks." },
  { name: "Neuromorphic Computing Promise", papers: ["P4", "P7", "P9", "P11"], desc: "Memristors are the most viable hardware substrate for brain-inspired computing, capable of acting as artificial synapses." },
  { name: "Crossbar Architecture Viability", papers: ["P6", "P7", "P9", "P11"], desc: "High-density crossbar arrays are the default architecture for memristor-based memory and computing systems." },
];

const contradictions = [
  { topic: "Is the memristor truly a 'fundamental' circuit element?", side1: { papers: ["P1", "P2", "P5"], position: "Yes — the memristor completes a symmetry in circuit theory (charge-flux relation). Chua and Di Ventra extend this to memcapacitors and meminductors." }, side2: { papers: ["P4", "P7"], position: "Debatable — Mazumder and Jeong acknowledge that some researchers view it as a special case of a nonlinear resistor, not a truly independent element. The HP device is better described as a memristive system." }, reason: "Definitional scope: Chua uses a mathematical symmetry argument; engineers focus on physical realizability and whether the ideal memristor (charge-controlled) exists in nature." },
  { topic: "What is the dominant switching mechanism?", side1: { papers: ["P8", "P9"], position: "Oxygen vacancy/ion migration in oxide layers is the primary mechanism, with conductive filament formation being a key structural feature." }, side2: { papers: ["P2", "P3"], position: "The mechanism is irrelevant to the memristor identity — pinched hysteresis is the only required fingerprint. Multiple mechanisms (filaments, phase change, spin-transfer) all qualify." }, reason: "Theory vs. engineering: Chua defines memristors by behavior (black-box), while experimentalists need mechanism understanding for device optimization." },
  { topic: "Can memristors replace CMOS?", side1: { papers: ["P4", "P7"], position: "Memristors could eventually replace CMOS in memory and certain logic applications, especially through stateful logic and in-memory computing." }, side2: { papers: ["P6", "P9", "P11"], position: "Practical challenges (sneak paths, variability, endurance, yield) mean memristors will complement CMOS rather than replace it in the foreseeable future." }, reason: "Timeframe and scope: optimistic projections vs. engineering reality of manufacturing at scale." },
  { topic: "Thermal stability and reliability", side1: { papers: ["P8"], position: "2D material-based memristors achieve record thermal stability (340°C) and 10⁷ endurance, solving traditional reliability problems." }, side2: { papers: ["P9", "P11"], position: "Material variability, cycle-to-cycle variation, and long-term retention remain unsolved for most memristor technologies, including conventional oxides." }, reason: "Material specificity: Wang et al. demonstrate a novel 2D heterostructure solution, but it hasn't been validated at manufacturing scale or with other materials." },
];

const concepts = [
  { name: "Pinched Hysteresis Loop", introduced: "Chua 1971 (P1/P2)", questioned: "Some researchers argued non-crossing loops also qualify", refined: "Chua 2011 (P2) and 2015 (P1) rigorously defined the fingerprint as self-crossing, origin-passing, and frequency-dependent", consensus: "Widely accepted as THE diagnostic signature of a memristor" },
  { name: "Memristive Systems (Generalized Memristor)", introduced: "Chua & Kang 1976 (referenced in P1, P2, P4, P5)", questioned: "Whether ideal memristors exist physically or only generalized ones (P4, P7)", refined: "Di Ventra et al. 2009 (P5) extended to memcapacitors/meminductors; Kvatinsky 2014 (P10) formalized threshold behavior in models", consensus: "The generalized memristor (state-dependent resistance) is the practical definition; ideal memristors remain theoretical" },
  { name: "Neuromorphic / Synaptic Function", introduced: "Jo et al. 2010, referenced across P4, P7, P9", questioned: "Whether device variability allows reliable synaptic emulation at scale (P9)", refined: "Jeong 2016 (P7) framed memristors within STDP learning; Sun 2020 (P9) reviewed SNN implementations", consensus: "Promising but unproven at system scale — device-to-device variation is the main barrier" },
];

const gaps = [
  { question: "How to achieve reliable, large-scale manufacturing of memristor crossbar arrays?", why: "Too hard — requires simultaneous control of material uniformity, interface quality, and CMOS back-end compatibility at nanometer scale.", closest: "Wang et al. 2018 (P8) — demonstrated atomically sharp interfaces via 2D materials but only at lab scale.", method: "Wafer-scale 2D material transfer + statistical process control + accelerated lifetime testing on >10⁶ devices." },
  { question: "What is the fundamental physical limit of memristor endurance and retention?", why: "Overlooked — most papers report empirical numbers without theoretical models predicting ultimate limits.", closest: "Jeong et al. 2016 (P7) — discussed energy per switching event but not material degradation physics.", method: "Ab initio molecular dynamics of ion migration + accelerated stress testing correlated with atomic-scale imaging." },
  { question: "Can memristor-based neural networks match or exceed digital DNN accuracy?", why: "Too difficult — requires solving analog noise, weight precision, and programming variability simultaneously.", closest: "Sun et al. 2020 (P9) — reviewed existing demonstrations but all are small-scale proofs of concept.", method: "Co-design of noise-tolerant algorithms + statistical device models + fabrication of >10⁴ synapse arrays." },
  { question: "How do different switching mechanisms affect long-term reliability differently?", why: "Too niche — each group studies their own material system without cross-mechanism comparative studies.", closest: "Chua 2011 (P2) — catalogued mechanisms but didn't compare their reliability implications.", method: "Standardized reliability test protocol applied across filamentary, interface, and phase-change devices." },
  { question: "Is there a universal compact model that works across all memristor technologies?", why: "Overlooked — TEAM/VTEAM (P10) work well for specific devices but no single model captures all behaviors.", closest: "Kvatinsky et al. 2014 (P10) — VTEAM is the most general attempt but still requires per-device fitting.", method: "Physics-informed machine learning model trained on diverse experimental datasets." },
];

const methodAudit = {
  groups: [
    { name: "Theoretical / Mathematical Analysis", papers: ["P1", "P2", "P5"], note: "Dominant in foundational work. Chua's papers establish the field through circuit theory and symmetry arguments." },
    { name: "Literature Review / Survey", papers: ["P3", "P4", "P7", "P9", "P11"], note: "Most common methodology overall. Reviews synthesize across materials, devices, and applications." },
    { name: "Simulation / Modeling", papers: ["P6", "P10", "P11"], note: "SPICE and MATLAB simulations validate circuit models. Zidan uses simulation for sneak path analysis." },
    { name: "Experimental / Device Fabrication", papers: ["P8"], note: "Only Wang et al. 2018 presents original experimental device work with TEM/STEM characterization." },
    { name: "Meta-analysis / Editorial", papers: ["P4"], note: "Mazumder et al. provide a bird's-eye editorial overview of 13 contributed papers." },
  ],
  dominant: "Literature reviews and theoretical analyses dominate — reflecting a field still establishing its conceptual foundations.",
  underused: "Experimental comparative studies across different material systems and standardized benchmarking methodologies are notably absent.",
  weakest: "Grande de Miguel thesis (P11) — while comprehensive, it relies entirely on secondary sources and basic simulations (Simulink/LabView) without original experimental validation.",
};

const assumptions = [
  { assumption: "The pinched hysteresis loop is both necessary AND sufficient to identify a memristor.", dependentPapers: ["P1", "P2"], consequence: "If some non-memristive devices also produce pinched hysteresis (e.g., certain diode-capacitor combinations), the entire classification framework collapses, and hundreds of 'memristor' papers would need reclassification." },
  { assumption: "Ion migration / oxygen vacancy movement is the universal mechanism in oxide memristors.", dependentPapers: ["P8", "P9"], consequence: "If electronic (not ionic) effects dominate in certain devices, the design rules for electrode selection, forming voltage, and thermal management would be fundamentally different." },
  { assumption: "Crossbar architecture is the optimal topology for memristor-based memory and computing.", dependentPapers: ["P6", "P7"], consequence: "If 3D architectures or non-crossbar topologies prove superior, the entire sneak-path literature (P6) and stateful logic framework (P7) would need rethinking." },
  { assumption: "Biological synapses are well-modeled by memristive behavior.", dependentPapers: ["P7", "P9"], consequence: "If synaptic plasticity involves mechanisms that memristors cannot replicate (e.g., complex biochemical cascades, 3D structural changes), the neuromorphic computing promise would be severely limited." },
  { assumption: "Scaling memristors to smaller dimensions will improve performance.", dependentPapers: ["P4", "P8"], consequence: "If quantum effects or surface states introduce new failure modes below ~5nm, the density advantage over CMOS vanishes." },
];

const tabs = [
  { id: "terrain", label: "1. Terrain Map", icon: "🗺️" },
  { id: "contradictions", label: "2. Contradictions", icon: "⚡" },
  { id: "lineage", label: "3. Idea Lineage", icon: "🌳" },
  { id: "gaps", label: "4. Research Gaps", icon: "🔍" },
  { id: "methods", label: "5. Method Audit", icon: "🔬" },
  { id: "synthesis", label: "6. Synthesis", icon: "🧬" },
  { id: "assumptions", label: "7. Assumptions", icon: "💣" },
  { id: "map", label: "8. Knowledge Map", icon: "🏗️" },
  { id: "soWhat", label: "9. So What?", icon: "🎯" },
];

const COLORS = {
  bg: "#0a0e17",
  card: "#111827",
  cardHover: "#1a2332",
  border: "#1e293b",
  accent: "#22d3ee",
  accentDim: "#0891b2",
  warn: "#f59e0b",
  danger: "#ef4444",
  success: "#10b981",
  text: "#e2e8f0",
  textDim: "#94a3b8",
  textMuted: "#64748b",
  purple: "#a78bfa",
  pink: "#f472b6",
};

const styles = {
  container: { fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", background: COLORS.bg, color: COLORS.text, minHeight: "100vh", padding: 0 },
  header: { padding: "28px 32px 0", borderBottom: `1px solid ${COLORS.border}` },
  title: { fontSize: "26px", fontWeight: 700, letterSpacing: "-0.5px", margin: 0, color: "#fff" },
  subtitle: { fontSize: "13px", color: COLORS.textDim, marginTop: 4, marginBottom: 16 },
  tabBar: { display: "flex", gap: 0, overflowX: "auto", paddingBottom: 0 },
  tab: (active) => ({ padding: "10px 16px", fontSize: "12px", fontWeight: active ? 600 : 400, color: active ? COLORS.accent : COLORS.textMuted, background: "transparent", border: "none", borderBottom: active ? `2px solid ${COLORS.accent}` : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }),
  content: { padding: "24px 32px" },
  card: { background: COLORS.card, borderRadius: 10, border: `1px solid ${COLORS.border}`, padding: "20px", marginBottom: 16 },
  badge: (color) => ({ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: "11px", fontWeight: 600, background: `${color}22`, color, marginRight: 6 }),
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  th: { textAlign: "left", padding: "10px 12px", borderBottom: `2px solid ${COLORS.border}`, color: COLORS.accent, fontWeight: 600, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px" },
  td: { padding: "10px 12px", borderBottom: `1px solid ${COLORS.border}`, verticalAlign: "top", lineHeight: 1.5 },
  sectionTitle: { fontSize: "18px", fontWeight: 700, marginBottom: 16, color: "#fff" },
  sectionDesc: { fontSize: "14px", color: COLORS.textDim, marginBottom: 20, lineHeight: 1.6 },
  tag: (color) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 12, fontSize: "11px", background: `${color}18`, color, border: `1px solid ${color}33`, marginRight: 4, marginBottom: 4 }),
};

function TerrainMap() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Paper Inventory — Author + Year + Main Claim</h2>
      <p style={styles.sectionDesc}>11 papers on memristor technology spanning 2009–2020, covering theory, materials, modeling, architecture, and applications.</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Reference</th>
              <th style={styles.th}>Main Claim</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Pages</th>
            </tr>
          </thead>
          <tbody>
            {papers.map(p => (
              <tr key={p.id} style={{ transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = COLORS.cardHover} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <td style={{ ...styles.td, fontWeight: 700, color: COLORS.accent, whiteSpace: "nowrap" }}>{p.id}</td>
                <td style={{ ...styles.td, whiteSpace: "nowrap" }}><strong>{p.author}</strong> ({p.year})</td>
                <td style={{ ...styles.td, fontSize: "12.5px", maxWidth: 500 }}>{p.claim}</td>
                <td style={styles.td}><span style={styles.tag(p.type.includes("Theory") ? COLORS.purple : p.type.includes("Review") || p.type.includes("Survey") ? COLORS.accent : p.type.includes("Experiment") ? COLORS.success : COLORS.warn)}>{p.type}</span></td>
                <td style={{ ...styles.td, textAlign: "center" }}>{p.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 style={{ ...styles.sectionTitle, fontSize: 16, marginTop: 28 }}>Shared Assumption Clusters</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        {assumptionSets.map((a, i) => (
          <div key={i} style={{ ...styles.card, borderLeft: `3px solid ${[COLORS.accent, COLORS.purple, COLORS.success, COLORS.warn][i]}` }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{a.name}</div>
            <div style={{ fontSize: 12, color: COLORS.textDim, marginBottom: 8 }}>{a.desc}</div>
            <div>{a.papers.map(p => <span key={p} style={styles.badge(COLORS.accent)}>{p}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Contradictions() {
  const [expanded, setExpanded] = useState(null);
  return (
    <div>
      <h2 style={styles.sectionTitle}>Direct Contradictions Across Papers</h2>
      <p style={styles.sectionDesc}>Points where two or more authors directly disagree — with likely reasons for the divergence.</p>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Contradiction</th>
              <th style={{ ...styles.th, color: COLORS.success }}>Position A</th>
              <th style={{ ...styles.th, color: COLORS.danger }}>Position B</th>
              <th style={styles.th}>Why They Diverge</th>
            </tr>
          </thead>
          <tbody>
            {contradictions.map((c, i) => (
              <tr key={i} style={{ cursor: "pointer", background: expanded === i ? COLORS.cardHover : "transparent" }} onClick={() => setExpanded(expanded === i ? null : i)}>
                <td style={{ ...styles.td, fontWeight: 600, color: COLORS.warn, minWidth: 180 }}>{c.topic}</td>
                <td style={{ ...styles.td, fontSize: "12px", maxWidth: 250 }}>
                  <div style={{ marginBottom: 4 }}>{c.side1.papers.map(p => <span key={p} style={styles.badge(COLORS.success)}>{p}</span>)}</div>
                  {c.side1.position}
                </td>
                <td style={{ ...styles.td, fontSize: "12px", maxWidth: 250 }}>
                  <div style={{ marginBottom: 4 }}>{c.side2.papers.map(p => <span key={p} style={styles.badge(COLORS.danger)}>{p}</span>)}</div>
                  {c.side2.position}
                </td>
                <td style={{ ...styles.td, fontSize: "12px", color: COLORS.textDim, fontStyle: "italic" }}>{c.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IdeaLineage() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Intellectual Lineage — Three Core Concepts</h2>
      <p style={styles.sectionDesc}>Who introduced it, who questioned it, who refined it, and where consensus stands today.</p>
      {concepts.map((c, i) => (
        <div key={i} style={{ ...styles.card, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: [COLORS.accent, COLORS.purple, COLORS.success][i] }} />
          <div style={{ paddingLeft: 12 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: [COLORS.accent, COLORS.purple, COLORS.success][i] }}>{c.name}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { label: "INTRODUCED BY", value: c.introduced, color: COLORS.accent },
                { label: "QUESTIONED BY", value: c.questioned, color: COLORS.warn },
                { label: "REFINED BY", value: c.refined, color: COLORS.purple },
                { label: "CURRENT CONSENSUS", value: c.consensus, color: COLORS.success },
              ].map((item, j) => (
                <div key={j}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: item.color, letterSpacing: "0.8px", marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResearchGaps() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>5 Unanswered Research Questions</h2>
      <p style={styles.sectionDesc}>The most important questions nobody in this literature has fully answered yet.</p>
      {gaps.map((g, i) => (
        <div key={i} style={{ ...styles.card, borderLeft: `3px solid ${COLORS.warn}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.warn, minWidth: 32 }}>#{i + 1}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, color: "#fff" }}>{g.question}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.danger, letterSpacing: "0.8px", marginBottom: 4 }}>WHY IT EXISTS</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDim, lineHeight: 1.5 }}>{g.why}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.8px", marginBottom: 4 }}>CLOSEST PAPER</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDim, lineHeight: 1.5 }}>{g.closest}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.success, letterSpacing: "0.8px", marginBottom: 4 }}>METHODOLOGY NEEDED</div>
                  <div style={{ fontSize: 12.5, color: COLORS.textDim, lineHeight: 1.5 }}>{g.method}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MethodAuditPanel() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Methodological Audit</h2>
      <p style={styles.sectionDesc}>How research methods distribute across this literature — and what's missing.</p>
      {methodAudit.groups.map((g, i) => (
        <div key={i} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ minWidth: 200 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{g.name}</div>
            <div style={{ marginTop: 6 }}>{g.papers.map(p => <span key={p} style={styles.badge(COLORS.accent)}>{p}</span>)}</div>
          </div>
          <div style={{ flex: 1, height: 8, background: COLORS.border, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${(g.papers.length / 11) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.purple})`, borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 12, color: COLORS.textDim, minWidth: 30, textAlign: "right" }}>{g.papers.length}/11</div>
        </div>
      ))}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 20 }}>
        <div style={{ ...styles.card, borderTop: `3px solid ${COLORS.accent}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.8px", marginBottom: 6 }}>DOMINANT METHOD</div>
          <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{methodAudit.dominant}</div>
        </div>
        <div style={{ ...styles.card, borderTop: `3px solid ${COLORS.warn}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.warn, letterSpacing: "0.8px", marginBottom: 6 }}>UNDERUSED METHOD</div>
          <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{methodAudit.underused}</div>
        </div>
        <div style={{ ...styles.card, borderTop: `3px solid ${COLORS.danger}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.danger, letterSpacing: "0.8px", marginBottom: 6 }}>WEAKEST METHODOLOGY</div>
          <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.5 }}>{methodAudit.weakest}</div>
        </div>
      </div>
    </div>
  );
}

function Synthesis() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Master Synthesis — 400 Words, No Filler</h2>
      <p style={styles.sectionDesc}>What this field collectively believes, disputes, has proven, and still cannot answer.</p>
      <div style={{ ...styles.card, lineHeight: 1.8, fontSize: 14 }}>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.success, letterSpacing: "0.8px" }}>WHAT THE FIELD COLLECTIVELY BELIEVES</span>
          <p style={{ color: COLORS.textDim, marginTop: 6 }}>
            The memristor is a legitimate circuit element whose defining signature — the pinched hysteresis loop — has been observed across dozens of material systems spanning two centuries. Since HP's 2008 TiO₂ demonstration, the community accepts that all two-terminal non-volatile resistance switching devices are memristive, regardless of material or mechanism. The field broadly agrees that memristors' most transformative potential lies in two directions: ultra-dense non-volatile memory and neuromorphic computing hardware that could close the enormous energy gap between silicon processors and biological brains. Crossbar arrays are the consensus architecture for both memory and computation applications.
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.warn, letterSpacing: "0.8px" }}>WHAT REMAINS IN DISPUTE</span>
          <p style={{ color: COLORS.textDim, marginTop: 6 }}>
            Whether the ideal memristor (Chua's charge-flux element) exists physically or whether all real devices are generalized memristive systems remains an active theoretical debate. The relative importance of different switching mechanisms — filamentary vs. interface-type vs. phase-change — for practical applications is unresolved. Whether memristors will complement or eventually displace CMOS is contentious: optimists envision stateful logic eliminating the von Neumann bottleneck entirely, while pragmatists point to unsolved manufacturing challenges. The neuromorphic promise is debated in terms of scalability — small demonstrations work, but nobody has shown system-level advantages over GPU-based deep learning.
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.8px" }}>PROVEN BEYOND REASONABLE DOUBT</span>
          <p style={{ color: COLORS.textDim, marginTop: 6 }}>
            The pinched hysteresis fingerprint is a robust, experimentally repeatable phenomenon. Nanoscale oxide-based devices can switch between resistance states with endurance up to 10⁷ cycles. The memory concept extends beyond resistance to capacitance and inductance. 2D material heterostructures can dramatically improve thermal stability compared to conventional oxide memristors. Compact models (TEAM/VTEAM) can accurately simulate device behavior in circuit-level tools.
          </p>
        </div>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.danger, letterSpacing: "0.8px" }}>THE MOST IMPORTANT UNANSWERED QUESTION</span>
          <p style={{ color: COLORS.textDim, marginTop: 6 }}>
            Can memristor-based neural network hardware actually outperform conventional digital accelerators (GPUs/TPUs) in real-world tasks when accounting for device variability, programming overhead, and manufacturing yield — or will the analog noise floor permanently cap their practical utility?
          </p>
        </div>
      </div>
    </div>
  );
}

function AssumptionKiller() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Hidden Assumptions — Never Proven, Widely Assumed</h2>
      <p style={styles.sectionDesc}>These are the beliefs most papers share but never explicitly justify. If any of them are wrong, the field shifts.</p>
      {assumptions.map((a, i) => (
        <div key={i} style={{ ...styles.card, borderLeft: `3px solid ${COLORS.danger}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 8 }}>"{a.assumption}"</div>
          <div style={{ marginBottom: 8 }}>{a.dependentPapers.map(p => <span key={p} style={styles.badge(COLORS.pink)}>{p}</span>)}</div>
          <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.6 }}>
            <span style={{ color: COLORS.danger, fontWeight: 600 }}>If wrong:</span> {a.consequence}
          </div>
        </div>
      ))}
    </div>
  );
}

function KnowledgeMap() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>Structured Knowledge Map</h2>
      <p style={styles.sectionDesc}>The architecture of this field in one view. Print this.</p>
      <div style={{ ...styles.card, padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ display: "inline-block", padding: "12px 28px", background: `${COLORS.accent}22`, border: `2px solid ${COLORS.accent}`, borderRadius: 8, fontSize: 16, fontWeight: 800, color: COLORS.accent }}>
            CENTRAL CLAIM: The memristor is a real, distinct circuit element with unique potential for memory and brain-like computing
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.success, letterSpacing: "0.8px", marginBottom: 10 }}>SUPPORTING PILLARS (Well-Established)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
          {["Pinched hysteresis is the universal memristor fingerprint (P1, P2, P3)", "Nanoscale oxide devices exhibit reliable resistive switching (P4, P8)", "Memory extends to capacitance & inductance — memcapacitors/meminductors (P5)", "Compact models (TEAM/VTEAM) enable accurate circuit simulation (P10)", "Crossbar architectures achieve ultra-high density (P6, P7)"].map((p, i) => (
            <div key={i} style={{ padding: "10px 14px", background: `${COLORS.success}12`, border: `1px solid ${COLORS.success}33`, borderRadius: 6, fontSize: 12.5, lineHeight: 1.5, color: COLORS.textDim }}>
              <span style={{ color: COLORS.success, fontWeight: 700 }}>✓</span> {p}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.warn, letterSpacing: "0.8px", marginBottom: 10 }}>DISPUTED ZONES (Active Debates)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 10, marginBottom: 20 }}>
          {["Ideal vs. generalized memristor: does the pure charge-flux element exist physically? (P1 vs P4, P7)", "CMOS replacement vs. complement: will memristors displace or augment transistors? (P4, P7 vs P6, P9)", "Mechanism relevance: does the switching physics matter for the memristor identity? (P2 vs P8, P9)"].map((d, i) => (
            <div key={i} style={{ padding: "10px 14px", background: `${COLORS.warn}12`, border: `1px solid ${COLORS.warn}33`, borderRadius: 6, fontSize: 12.5, lineHeight: 1.5, color: COLORS.textDim }}>
              <span style={{ color: COLORS.warn, fontWeight: 700 }}>⚡</span> {d}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.purple, letterSpacing: "0.8px", marginBottom: 10 }}>FRONTIER QUESTIONS (Nobody Has Solved)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 10, marginBottom: 24 }}>
          {["Can memristor neural networks outperform GPUs at real-world scale?", "What are the fundamental physical limits of memristor endurance and retention?"].map((q, i) => (
            <div key={i} style={{ padding: "10px 14px", background: `${COLORS.purple}12`, border: `1px solid ${COLORS.purple}33`, borderRadius: 6, fontSize: 12.5, lineHeight: 1.5, color: COLORS.textDim }}>
              <span style={{ color: COLORS.purple, fontWeight: 700 }}>?</span> {q}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.pink, letterSpacing: "0.8px", marginBottom: 10 }}>MUST-READ PAPERS FOR NEWCOMERS</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
          {[
            { ref: "Chua 2011 (P2)", why: "The definitive argument that all resistance switching = memristors. Establishes the fingerprint framework." },
            { ref: "Jeong et al. 2016 (P7)", why: "Best single-paper overview of memristors in both von Neumann and neuromorphic paradigms. Bridges theory to application." },
            { ref: "Sun et al. 2020 (P9)", why: "Most recent and comprehensive review of materials, mechanisms, and neural network applications. Covers the full state of the art." },
          ].map((r, i) => (
            <div key={i} style={{ padding: "12px 14px", background: `${COLORS.pink}12`, border: `1px solid ${COLORS.pink}33`, borderRadius: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.pink, marginBottom: 4 }}>{i + 1}. {r.ref}</div>
              <div style={{ fontSize: 12, color: COLORS.textDim, lineHeight: 1.5 }}>{r.why}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SoWhat() {
  return (
    <div>
      <h2 style={styles.sectionTitle}>The "So What?" Test</h2>
      <p style={styles.sectionDesc}>Explain this entire body of research to an intelligent non-expert in 5 minutes.</p>
      <div style={{ display: "grid", gap: 16 }}>
        <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.accent}`, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.8px", marginBottom: 8 }}>ONE-SENTENCE VERSION</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.5 }}>
            Scientists have discovered that certain nanoscale materials can "remember" the electrical signals that pass through them — and this property, predicted theoretically in 1971 and physically demonstrated in 2008, could fundamentally change how we build computer memory and create hardware that works like the human brain.
          </div>
        </div>
        <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.warn}`, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.warn, letterSpacing: "0.8px", marginBottom: 8 }}>HONEST ADMISSION</div>
          <div style={{ fontSize: 16, color: COLORS.textDim, lineHeight: 1.6 }}>
            We still don't know if memristor-based brain-like computers will actually work better than the powerful GPU chips already running today's AI. The devices are noisy, hard to manufacture consistently, and nobody has built a large enough system to prove the theoretical advantages hold in practice.
          </div>
        </div>
        <div style={{ ...styles.card, borderLeft: `4px solid ${COLORS.success}`, padding: 24 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.success, letterSpacing: "0.8px", marginBottom: 8 }}>THE ONE REAL-WORLD IMPLICATION THAT MATTERS MOST</div>
          <div style={{ fontSize: 16, color: COLORS.textDim, lineHeight: 1.6 }}>
            If memristor-based computing works at scale, it would slash the energy consumption of AI and data centers by orders of magnitude — addressing one of the most urgent technological challenges of our time: the unsustainable power demands of modern computation. The human brain does with 20 Watts what currently requires megawatts of silicon.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("terrain");

  const renderContent = () => {
    switch (activeTab) {
      case "terrain": return <TerrainMap />;
      case "contradictions": return <Contradictions />;
      case "lineage": return <IdeaLineage />;
      case "gaps": return <ResearchGaps />;
      case "methods": return <MethodAuditPanel />;
      case "synthesis": return <Synthesis />;
      case "assumptions": return <AssumptionKiller />;
      case "map": return <KnowledgeMap />;
      case "soWhat": return <SoWhat />;
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Memristor Literature Analysis Dashboard</h1>
        <p style={styles.subtitle}>Systematic analysis of 11 papers · Following 9-prompt deep analysis protocol · All content in English</p>
        <div style={styles.tabBar}>
          {tabs.map(t => (
            <button key={t.id} style={styles.tab(activeTab === t.id)} onClick={() => setActiveTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={styles.content}>
        {renderContent()}
      </div>
    </div>
  );
}
