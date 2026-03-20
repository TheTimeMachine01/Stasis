As a CTO who’s seen dozens of MVPs scale from "garage projects" to Series C powerhouses, I love the pivot. **Stasis** is a strong, authoritative name, and "Unbreakable Equilibrium" suggests a level of security and uptime that enterprise clients will pay a premium for.

You’re moving from a standard dashboard to a high-end, immersive security platform. We aren't just building a "tool"; we're building a "command center."

---

## **PRD: Project Stasis (v1.0 MVP)**

**Vision:** To provide real-time, unbreakable equilibrium for digital infrastructure through immersive visualization and proactive defense.

## **1\. Core User Personas**

* **The Guardian (CISO/Security Lead):** Needs high-level visual proof of safety and rapid incident response.  
* **The Architect (DevOps/SRE):** Needs deep-dive logs, resource metrics, and policy enforcement.

## **2\. Functional Requirements**

#### **A. The "Vanguard" Hero (Non-Authenticated)**

* **The Stasis Globe:** A dark-themed, interactive 3D globe (using the existing Three.js/Globe package).  
* **Live Attack Simulation:** Randomized "arcs" representing blocked threats from global IPs to the "Stasis Core." This creates immediate "Proof of Value" for visitors.  
* **Value Prop:** Bold typography overlaying the globe with a "Join the Equilibrium" CTA.

#### **B. The Command Center (Authenticated Dashboard)**

* **Real-time Telemetry:** WebSocket-driven data feeds for system health.  
* **Policy Engine:** UI to toggle security protocols (The "Equilibrium" settings).  
* **Global Threat Map:** An expanded version of the hero globe with actual logged data points.

## **3\. Technical Constraints (The "Stitch" Workflow)**

* **Frontend:** Next.js (App Router), Tailwind CSS, Framer Motion for high-end transitions.  
* **Visuals:** react-globe.gl or Three.js.  
* **State Management:** High-frequency updates handled via TanStack Query or dedicated WebSockets.

---

## **Dashboard Architecture & Sitemap**

For a startup aiming for "Large Scale," the navigation must be intuitive but feel "dense" with power.

| Page Name | Purpose |
| :---- | :---- |
| **Nexus (Home)** | The "God View." High-level stats, active alerts, and the minimized Global Threat Map. |
| **Vigil (Monitoring)** | Real-time resource metrics (CPU, Memory, Network) with "pulse" animations. |
| **The Archive (Logs)** | Searchable, filtered history of every event. Needs a "Matrix-style" high-density text feel. |
| **Aegis (Security/Policies)** | Where users toggle firewall rules, RBAC, and encryption levels. |
| **Pulse (Analytics)** | Historical trends and AI-driven threat forecasting. |
| **Identity (Profile)** | User settings, API keys, and session management. |

## **My Friend who is a "CTO"’s Advice for the Overhaul**

1. **The "Wow" Factor:** On the home screen globe, don't just show static dots. Animate the lines. Use a "Sensing" animation where a ring pulses outward from the user's current location. It makes the "Equilibrium" feel personal.  
2. **Performance is UX:** With a 3D globe, ensure you're lazy-loading the heavy JS assets. An "Unbreakable" product shouldn't lag on the first fold.  
3. **Typography:** Since the headline is "Unbreakable Equilibrium," use a wide, bold font (like *Syne* or *Clash Display*) for headings to feel "heavy" and "stable," and a mono font (like *JetBrains Mono*) for data to feel "technical."

