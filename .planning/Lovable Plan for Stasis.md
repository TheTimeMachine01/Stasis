

\# Project Stasis — Full MVP Plan

\#\# Design System  
\- \*\*Dark theme\*\* throughout — deep navy/black backgrounds with cyan/electric blue accents  
\- \*\*Fonts:\*\* Syne (bold headings), JetBrains Mono (data/metrics), Geist Sans (UI text)  
\- \*\*Shadows & depth\*\* per design brief — no flat borders, layered shadows  
\- \*\*Mobile-first\*\* with bottom tab nav on mobile, sidebar on desktop  
\- \*\*Motion:\*\* Framer Motion with Out-Quart easing, 200ms transitions

\#\# Pages to Build

\#\#\# 1\. Vanguard Hero (Landing Page — \`/\`)  
\- Full-screen dark hero with interactive 3D globe using \`react-globe.gl\`  
\- Animated threat arcs pulsing from random global IPs to a central "Stasis Core"  
\- Sensing ring animation pulsing from user's approximate location  
\- Bold "Unbreakable Equilibrium" headline in Syne font  
\- "Join the Equilibrium" CTA button with glow effect  
\- Stats bar (threats blocked, uptime, nodes protected) with counting animations  
\- Lazy-loaded globe to keep initial load fast

\#\#\# 2\. Nexus (Dashboard Home — \`/nexus\`)  
\- "God View" layout with bento-grid cards showing:  
  \- Active alerts count, system health score, threats blocked today  
  \- Minimized globe showing real-time threat activity  
  \- Recent activity feed with color-coded severity  
\- All data is mock/simulated with realistic randomized values  
\- Skeleton loading states matching final layout

\#\#\# 3\. Vigil (Monitoring — \`/vigil\`)  
\- Real-time resource metrics cards: CPU, Memory, Network, Disk  
\- Animated "pulse" progress bars and sparkline charts  
\- System status indicators with green/amber/red states  
\- Mock WebSocket-style updating values (setInterval)

\#\#\# 4\. The Archive (Logs — \`/archive\`)  
\- High-density log table with monospace font (JetBrains Mono)  
\- Search bar \+ filters (severity, date range, type)  
\- Color-coded log levels (INFO/WARN/ERROR/CRITICAL)  
\- Virtual scrolling feel with paginated mock data

\#\#\# 5\. Aegis (Security Policies — \`/aegis\`)  
\- Toggle switches for firewall rules, encryption levels, protocols  
\- Policy cards with status indicators  
\- Visual grouping: Network, Access Control, Encryption sections

\#\#\# 6\. Pulse (Analytics — \`/pulse\`)  
\- Line/area charts for historical threat trends (using Recharts)  
\- Summary stat cards with period comparisons  
\- Mock "AI Threat Forecast" section

\#\#\# 7\. Identity (Profile — \`/identity\`)  
\- User info card, API key display (masked), session list  
\- Settings toggles for notifications, theme preferences

\#\# Navigation  
\- \*\*Desktop:\*\* Collapsible sidebar with icon \+ label for each page, Stasis logo at top  
\- \*\*Mobile:\*\* Bottom tab bar with 5 primary tabs (Nexus, Vigil, Archive, Aegis, Pulse) \+ hamburger for Identity

\#\# Technical Approach  
\- \`react-globe.gl\` for the 3D globe (lazy-loaded via \`React.lazy\`)  
\- Framer Motion for page transitions and micro-interactions  
\- Recharts for analytics charts  
\- All mock data with realistic simulated values  
\- Responsive grid: 4-col mobile → 12-col desktop  
\- Skeleton/shimmer loading states for all data sections

