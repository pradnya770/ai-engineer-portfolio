# AI Engineer Portfolio

A responsive, dark purple/blue-gradient portfolio website built with plain HTML, CSS, and JavaScript. No build step or package installation is required.

## What's included

- Responsive landing page and mobile navigation
- Project showcase cards with category filters
- Skills, about, and contact sections
- Resume download links (add your own PDF)
- GitHub and LinkedIn link placeholders
- Custom CSS illustrations, so no project screenshots are falsely implied
- Accessible labels and reduced-motion support

## Run locally

**Option 1:** Open `index.html` in a browser.

**Option 2 (recommended):** From this folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Personalize before publishing

1. In `index.html`, replace `Your Name` in the title and hero with your preferred display name.
2. Replace `your.email@example.com` with your professional email.
3. Update the GitHub and LinkedIn URLs to your real profiles.
4. Put your current resume PDF at `resume/resume.pdf`. Keep the filename `resume.pdf`, or update both resume links in `index.html`.
5. For each project card, add a verified GitHub repository, demo URL, screenshots, and actual implementation details. Do not label a concept as production-ready unless it is.
6. Remove technologies you cannot confidently discuss in interviews and add only skills you have used.
7. Update the About section with verified work experience, education, and outcomes.

The current project cards are explicitly labeled as showcase drafts/concepts. They are based on AI project areas you have discussed; they do not assert that a public repo or live demo exists.

## Deploy on GitHub Pages

1. Create a GitHub repository, for example `ai-engineer-portfolio`.
2. Upload the contents of this folder to the repository root (make sure `index.html` is at the root).
3. In GitHub, open **Settings → Pages**.
4. Under the build/deployment section, choose **Deploy from a branch**.
5. Select your default branch (often `main`) and folder `/ (root)`, then save.
6. Wait for the Pages deployment to finish. GitHub will show the published URL in Settings → Pages.

## Deploy on Netlify

1. Sign in to Netlify and choose **Add new site / Deploy manually**.
2. Drag the project folder (or a ZIP of its contents) into the manual deploy area.
3. Confirm `index.html` is at the deployed site root.
4. Netlify will provide a public URL. Add a custom domain later if you want.

## Deploy on Vercel

For this static site, you can import the GitHub repository into Vercel. Configure it as a static site with no build command and the project root as the output directory. If Vercel prompts for a framework, choose **Other**.

## Suggested project case-study format

For every project, document:
- Problem and target users
- Your role and what you personally implemented
- Architecture and data flow
- Model/LLM and why it was chosen
- Evaluation method and actual results (avoid invented metrics)
- Edge cases, limitations, and security/privacy decisions
- Screenshots or a short demo
- Repository and live-demo links, if available

## Important

This is a static portfolio, not an AI application backend. It does not call an LLM, process resumes, or provide live chatbot/agent demos. Add those as separate deployed applications only when ready.
