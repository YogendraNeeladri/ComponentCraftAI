# **App Name**: ComponentCraft AI

## Core Features:

- User Authentication: Signup/Login using email+password.
- Session Persistence: Load previous sessions, including chat transcript, generated code, and UI-editor state.
- New Session Initialization: Create a new, empty session.
- AI-Powered Code Generation: A side panel provides conversational prompts, generating component code (JSX/TSX + CSS).  AI responds with component code (JSX/TSX + CSS). Models like llama3/4, Gemma, Gemini 2.0 Flash lite, gpt4o-mini may be useful as tools to fulfil prompts.
- Live Preview: Live render the generated component in a central micro-frontend viewport.
- Code Inspection: Display JSX/TSX and CSS code in separate, syntax-highlighted tabs.
- Code Export: Provide Copy and Download (.zip) buttons for the entire code (TSX/JSX + CSS).

## Style Guidelines:

- Primary color: Soft lavender (#D0BFFF) to create a calming yet creative atmosphere.
- Background color: Very light desaturated lavender (#F5F3FF) provides a subtle backdrop that does not distract from the code and UI elements.
- Accent color: Pale rose (#FFD8E8) is used to highlight interactive elements and important actions.
- Body and headline font: 'Inter', a sans-serif font with a modern, machined, objective, neutral look; suitable for both headlines and body text.
- Code font: 'Source Code Pro', a monospaced font for displaying code snippets.
- Use minimalist icons that clearly represent actions and component types.
- Emphasize a clear separation between the chat panel, code editor, and live preview.