# WSI Learning: Netlify setup

This folder is the deployable site. Training data (modules, edits, roles, people, assignments, learner progress and quiz scores) and uploaded screenshots/PDFs are saved to **Netlify Blobs**, Netlify's built-in storage. There is no database to create or connect.

## What's in here

- the top level – the pages people use (this is what Netlify publishes)
- `netlify/functions/data.mjs` – saves and loads training data
- `netlify/functions/files.mjs` – saves and serves uploaded images and files
- `netlify/functions/email.mjs` – sends overdue emails when someone clicks Remind
- `netlify/functions/overdue-reminders.mjs` – sends overdue emails automatically, weekdays at 9am Eastern
- `netlify/functions/ai-draft.mjs` – drafts module lessons from an SOP with AI
- `netlify.toml` – tells Netlify where everything is
- `package.json` – the libraries the functions need

## Deploy (one time, about 15 minutes)

Drag-and-drop deploys don't run functions, so use GitHub:

1. Create a free GitHub account if you don't have one, and a new **private** repository (e.g. `wsi-learning`).
2. Upload the **contents** of this folder to it (GitHub → Add file → Upload files). `netlify.toml` must be at the top level of the repo.
3. In Netlify: **Add new site → Import an existing project → GitHub**, pick the repo. Netlify reads `netlify.toml`; leave the build settings as they appear and click **Deploy**.
4. Open the site URL. The top bar should say **"progress saved to WSI"** in the learner view. If it says "saved in this browser", the functions didn't deploy; check **Site → Logs → Functions**.

After that, any change pushed to GitHub redeploys automatically.

## Check it's saving

1. Manager & admin view → **Continue as** the training manager → Modules → Edit a module → change a title → Save changes.
2. Open the site in a different browser or computer. The change should be there.
3. In Netlify: **Site → Blobs** shows the `wsi-data` and `wsi-files` stores.

## Turn on overdue emails (optional)

Emails are sent from Katelyn's Google account, with Katelyn cc'd. They only go to @wsitalent.com addresses.

1. Katelyn turns on 2-Step Verification on her Google account, then creates an **app password** (Google Account → Security → App passwords). If that option is missing, your Google Workspace admin has app passwords switched off and needs to allow them.
2. In Netlify: **Site configuration → Environment variables**, add `GMAIL_USER` = `katelyn.drummond@wsitalent.com` and `GMAIL_APP_PASSWORD` = the 16-character app password.
3. Redeploy. **Remind** buttons now send real emails, and the automatic daily email follows the on/off switch and repeat setting on the Assignments tab.

If IT would rather not use an app password, the same functions can send through a Google Workspace service account or an email service such as SendGrid. Only the two email files change.

## Turn on AI drafting (optional)

1. Create an API key at console.anthropic.com and add a payment method. A module draft typically costs a few cents.
2. In Netlify environment variables, add `ANTHROPIC_API_KEY`. Optionally set `ANTHROPIC_MODEL` (default `claude-haiku-4-5`, which is fast; a Sonnet model writes better drafts but can take longer).
3. Redeploy. In Add module, tick **Draft lessons with AI**, then paste the SOP text or attach a PDF under 4 MB.

## Before real use

- **Sample data:** open `wsi-store.js` and change `var SAMPLE_DATA = true;` to `false` to start without the sample people and assignments.
- **Completion form:** submissions appear under **Site → Forms → training-completion**. Turn on email notifications there if you want them.
- **No sign-in yet:** anyone with the link can open the manager view and change data. Keep the URL internal until Google sign-in is added. As a stopgap, Netlify's site password (Site configuration → Access & security, on paid plans) puts one shared password on the whole site.

## Limits to know

- Uploaded images, PDFs and videos: **5.5 MB per file** (a Netlify function limit). Use YouTube (unlisted), Vimeo or Google Drive links for longer videos.
- Saves are "last one wins". If two admins edit the same module at the same moment, the later save overwrites the earlier one.
- Week-by-week unlocking is a display rule. A learner who changes the date on their computer could open a locked week early. Real enforcement comes with Google sign-in.
- Learner progress is matched to people in the People list by full name. Associates without a WSI account are saved by the name they type.
