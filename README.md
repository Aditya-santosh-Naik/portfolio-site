# Aditya Santosh Naik — Portfolio redesign

A static, responsive portfolio based on the original `portfolio-site` repository and the supplied resume. This second design follows a qualitative benchmark of Brittany Chiang, Dennis Snellenberg, Bruno Simon, Rauno Freiberg, Lee Robinson, and the Awwwards portfolio collection. The full comparison is delivered separately as `portfolio-research.md`. No installation or build step is required.

## Preview

Open `index.html` directly, or serve this folder with a static HTTP server. For example: `python -m http.server 4173 --bind 127.0.0.1`.

## Vercel

Use this folder as the project root. Choose the **Other** framework preset, leave the build command unset, and serve the root directory. Alternatively, replace the contents of the existing Vercel-connected repository with these files when the design is approved.

## Included

- Charcoal-and-orange visual identity, oversized personal typography, a light biography section, and an expressive contact section.
- An original animated canvas point-cloud knot with pause/resume, reduced-motion handling, an SVG fallback, and off-screen suspension.
- Responsive desktop and mobile layouts, mobile navigation, and keyboard focus styles.
- Staggered hero entrances, one-time scroll reveals, project and link hover animations, animated project details, and a scroll progress line. Content stays visible without JavaScript. Reduced-motion settings skip entrances and hover motion.
- Resume dates: education 2023–2027, EduGenie 2025–2026, IntelliCredit 2026. Codesy and certification dates are omitted because they are not listed in the supplied resume.
- EduGenie, IntelliCredit Hub, and Codesy Platform project sections, expandable technical details, and original repository links.
- Education, technical skills, certifications with both the original Credly badges and additional Google Drive certificate links, and hackathon achievements.
- Downloadable original resume, email links, and email copy with a fallback message.
- Local SVG illustrations and actual IntelliCredit and Codesy project screenshots.

Google Fonts is the only external visual dependency. System fonts remain available when offline. Project diagrams illustrate architecture and are not product screenshots.

## Sources

- Original: https://github.com/Aditya-santosh-Naik/portfolio-site/blob/master/index.html
- Supplied Aditya_Santosh_Naik_Resume.pdf
- Project documentation: EduGenie, intellicredit-hub, and codesy-platform GitHub repositories
- Codesy screenshot: `assets/Screenshot 2026-04-10 110200.png` from its repository
- IntelliCredit screenshot: `docs/images/dashboard.png` from its repository
