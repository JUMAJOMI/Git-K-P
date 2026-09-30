# AGENTS.md

## Project overview
- This is a static, multi-page website for K&P Colombia, written primarily in Spanish.
- Pages are standalone HTML files in the repository root. Shared styles are in `css/stylesheet.css`; page-specific styles may be in `css/style_inicio.css`; browser JavaScript and local media are in `js/` and `images/`.
- There is no package manifest or configured build/test runner. VS Code Live Server is configured to use port 5501.

## Working conventions
- Keep the existing vanilla HTML, CSS, and JavaScript approach. Do not add frameworks, dependencies, or build tooling unless the task requires them.
- Preserve Spanish-language content and the existing visual conventions unless a request calls for a change.
- Reuse the shared stylesheet and existing assets where appropriate. Verify image, stylesheet, script, and page-link paths against the actual filenames; preserve filename case and spaces exactly.
- Keep edits scoped to the requested page or shared behavior. Avoid unrelated cleanup of legacy or incomplete pages.
- Use semantic HTML and retain accessible labels and meaningful image alt text when changing UI markup.

## Verification
- For static-site changes, open the affected page through Live Server (configured port 5501) and check the browser console, layout, navigation, and any changed interactions.
- For JavaScript changes, exercise the affected interaction in the browser. There is no automated test command currently configured.
- When browser verification is unavailable, inspect changed references and report the limitation rather than claiming the site was tested.
