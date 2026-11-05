# Portfolio design benchmark and recommendation

Researched 5 November 2026 for Aditya Santosh Naik.

## Recommendation

Use a bold editorial portfolio tailored to an early-career software and applied-AI developer: charcoal, warm orange, oversized personal typography, a small original interactive artwork, substantial project evidence, and direct access to the resume and contact information.

This is a qualitative design benchmark of five personal sites and one portfolio gallery, not a statistical market study. “Best” here is a design recommendation for Aditya's content and goals. No conversion, recruitment, or performance advantage has been measured.

## Reference comparison

| Reference | Observed approach | What the redesign takes from it |
|---|---|---|
| [Brittany Chiang](https://brittanychiang.com/) | Name, engineering role, section navigation, experience, project descriptions, and resume access form a clear professional narrative. | Make identity, role, project context, technology, and resume easy to find. |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | Large personal typography, a dominant hero image, an edited work selection, and a clear contact destination. | Strong personal identity, generous composition, larger project visuals, and an expressive closing section. |
| [Bruno Simon](https://bruno-simon.com/) | The portfolio is an interactive 3D environment with driving controls, quality settings, and a behind-the-scenes explanation. | Give the site one original computational visual; keep Aditya's actual projects and links accessible through conventional navigation. |
| [Rauno Freiberg](https://rauno.me/) | A compact introduction leads to craft, projects, notes, social links, and an email-copy action. | Edit the copy carefully and add useful, restrained interaction details. |
| [Lee Robinson](https://leerob.com/) | A concise engineer/writer bio leads into personal notes and articles, with a choice of bio length. | Keep positioning direct and let deeper information be optional. |
| [Awwwards portfolio collection](https://www.awwwards.com/websites/portfolio/) | A broad curated gallery spanning typography, interaction, and visual approaches. | Treat visual distinction as one design input; choose a coherent direction for this person's work. |

Dennis Snellenberg, Brittany Chiang, and Rauno Freiberg were also opened in the browser to inspect their current page structure and presentation. The remaining references were inspected through retrieved page content. This review does not establish award status for an individual site.

## Why this fits Aditya

- His name should be the central identity, supported by a concrete software-development role.
- EduGenie provides a strong lead story: local AI, retrieval, voice interaction, and model-memory coordination.
- IntelliCredit adds a distinct financial-document and machine-learning example with an actual interface screenshot.
- Codesy Platform demonstrates full-stack coding education through seven technology tracks, gamified lessons, engineering deep dives, and capstone projects. It replaces TravelGo at the user’s request; its description and screenshot come from the [Codesy README](https://github.com/Aditya-santosh-Naik/codesy-platform/blob/main/README.md).
- The supplied resume supports education, CGPA, hackathons, AWS, and ServiceNow credentials. These strengthen the narrative without inventing employers, client logos, or usage metrics.
- A light biography section gives long-page rhythm; the warm orange contact section gives the page a clear destination.

## Implemented design decisions

1. Oversized name and short role description in the opening screen.
2. Original canvas point-cloud knot, with pause/resume, reduced-motion handling, off-screen suspension, and an SVG fallback.
3. Distinct project palettes and expandable technical notes.
4. Clear resume download, working mobile navigation, active-section feedback, and copy-email status.
5. A static HTML/CSS/JS implementation with no framework installation or build step required.

Project diagrams are illustrative architecture studies, not screenshots or working AI demonstrations. The IntelliCredit and Codesy images are actual screenshots from their respective repositories.

## Animations

Added staggered hero entrances, one-time section/card reveals, short detail entrances, restrained hover lifts and arrow movement, plus a scroll progress line. Entrances use opacity and translate, following the emphasis on opacity and transform in [web.dev's animation guide](https://web.dev/articles/animations-guide). [MDN's reduced-motion guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) informs the motion opt-out. Source content is visible by default, so animation failures do not hide it.

## Resume date mapping

| Entry | Date from the supplied resume | Website treatment |
|---|---|---|
| B.E. Computer Science and Engineering | 2023–2027 | Education card and hero education line |
| EduGenie | 2025–2026 | Project metadata and illustration footer |
| IntelliCredit Hub | 2026 | Project metadata |
| Codesy Platform | Not listed in the resume | No date added |
| AWS, CSA, CAD | No dates listed in the resume | No date added |

## Review limits

The study did not include recruiter interviews, analytics, user testing, a device lab, or a production Lighthouse audit. Content is grounded in the supplied resume, original portfolio, and the project READMEs inspected earlier in this chat. The redesign is a local review build; no GitHub push or Vercel deployment is included.
