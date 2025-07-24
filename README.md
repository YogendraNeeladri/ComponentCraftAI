# ComoponentCraft AI

A stateful, AI-driven micro-frontend playground where users can generate, preview, refine, and export React components (or pages). Designed with full persistence, conversational UI, and live component rendering—all powered by LLMs.

>  Live Demo: https://forge-ai-2h53.vercel.app/  

---

## 🛠 Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Frontend** | React + Next.js |
| **Backend**  | Node.js + Express *(or NestJS)* |
| **Database** | MongoDB *(or PostgreSQL)* |
| **AI Models**| OpenRouter (LLaMA, GPT4-o-mini, Gemini 2.0, etc.) |
| **State**    | Zustand / Context API + Redis for session caching |
| **Hosting**  | Vercel / Render / AWS |
| **Storage**  | Cloudinary / Supabase / S3 (optional for file storage) |

---

## Authentication & Persistence

- User registration + login via email/password (JWT-secured sessions)
- Users can:
  - Create new sessions
  - View history of past sessions
  - Resume saved work (code, chat, preview state)

---

##  Conversational UI

- Side-panel chat interface powered by LLM APIs
- Accepts both **text** and **image inputs**
- Returns JSX/TSX + CSS code
- Live renders previewed component in a central iframe-based sandbox

---

##  Code Viewer & Export Tools

- Toggle between JSX/TSX and CSS tabs
- Copy-to-clipboard and full project `.zip` export
- Code syntax highlighting

---

##  Iterative Refinement *(Optional but Implemented)*

- Update components with further prompts:
  - “Make the button red”
  - “Add a hover effect”
- Patch previous code, re-render seamlessly

---

##  Statefulness & Auto-Save *(Optional but Implemented)*

- Zustand/Context keeps in-memory state
- All sessions auto-save after every prompt
- Reloading or login retrieves full state: chat, code, preview

---

##  Bonus Features *(Optional)*

###  Interactive Property Editor

- Select an element → floating UI panel
  - Change text, colors, padding, radius, shadows
  - Two-way binding updates the JSX + CSS in real-time

###  Chat-Driven Overrides

- Select element → prompt AI to edit it
  - e.g., “Make this button 24px tall with a blue gradient and bold uppercase text”
  - Only patches relevant code block

---

##  Architecture Diagram

```txt
+-------------+       +---------------------+        +---------------------+
|  React App  | <---> |  Express/Nest Backend| <---> |    LLM API (OpenRouter) |
| (Next.js)   |       |  Auth + Session Mgmt |        +---------------------+
+-------------+       |  MongoDB / Postgres |
       |              +----------+----------+
       |                         |
       |                         v
       |                    Redis Cache
       |
       v
  <iframe Sandbox>
  Renders micro-frontend securely
git clone 
cd
npm install
# or
yarn install
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
AI_API_KEY=openrouter_key_or_equivalent
npm run dev

Evaluation Checklist (Self-Marked)
| Feature                        | Status  |
| ------------------------------ | ------- |
| Email/Password Auth            | ✅ Done  |
| Create/Load/Resume Sessions    | ✅ Done  |
| Chat-to-Code with AI           | ✅ Done  |
| Preview Generated Component    | ✅ Done  |
| Code Tabs + Export             | ✅ Done  |
| Iterative Chat Updates         | ✅ Done  |
| Auto-Save & Full State Resume  | ✅ Done  |
| Interactive Property Panel     | ✅ Bonus |
| Chat-Driven Code Delta Updates | ✅ Bonus |

📬 Contact
Made by [Neeladri Yogendra]
📧 Email: yogiyadav1970@email.com
🌐 Portfolio: yourportfolio.dev

