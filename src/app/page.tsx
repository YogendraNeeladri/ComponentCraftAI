'use client';

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import SessionSidebar from '@/components/app/session-sidebar';
import ChatPanel from '@/components/app/chat-panel';
import PreviewPanel from '@/components/app/preview-panel';
import CodePanel from '@/components/app/code-panel';
import {
  generateComponentCode,
  type GenerateComponentCodeOutput,
} from '@/ai/flows/generate-component-code';
import {
  refineComponentCode,
} from '@/ai/flows/refine-component-code';
import { useToast } from '@/hooks/use-toast';

export type GeneratedCode = {
  jsx: string;
  css: string;
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const initialCode: GeneratedCode = {
  tsx: `import React from 'react';

const WelcomePlaceholder = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to ComponentCraft AI</h1>
      <p className="welcome-message">
        Start by describing the component you want to build in the chat on the right.
      </p>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Generate</h3>
          <p>Describe UI in plain English.</p>
        </div>
        <div className="feature-card">
          <h3>Refine</h3>
          <p>Iterate with feedback.</p>
        </div>
        <div className="feature-card">
          <h3>Export</h3>
          <p>Copy or download your code.</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePlaceholder;
`,
  css: `
.welcome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(145deg, hsl(var(--background) / 0.9), hsl(var(--secondary) / 0.9));
  border-radius: 0.5rem;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: hsl(var(--primary));
  margin-bottom: 0.5rem;
}

.welcome-message {
  font-size: 1.125rem;
  color: hsl(var(--muted-foreground));
  max-width: 500px;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
}

.feature-card {
  background-color: hsl(var(--card));
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid hsl(var(--border));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 1rem;
  color: hsl(var(--muted-foreground));
}
`,
};

export default function Home() {
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([]);
  const [generatedCode, setGeneratedCode] =
    React.useState<GeneratedCode>(initialCode);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleNewSession = () => {
    setChatHistory([]);
    setGeneratedCode(initialCode);
    toast({
      title: 'New Session Started',
      description: 'You can now start generating a new component.',
    });
  }

  const handleSendMessage = async (message: string) => {
    const newHistory = [...chatHistory, { role: 'user', content: message }];
    setChatHistory(newHistory);
    setIsLoading(true);

    try {
      let response: GenerateComponentCodeOutput;
      if (chatHistory.length === 0) {
        // First message, generate new component
        const result = await generateComponentCode({ prompt: message });
        response = {
            jsxTsxCode: result.jsxTsxCode,
            cssCode: result.cssCode,
        };
      } else {
        // Subsequent message, refine existing component
        const result = await refineComponentCode({
          existingCode: generatedCode.tsx,
          refinementPrompt: message,
        });
        response = {
            jsxTsxCode: result.refinedCode,
            cssCode: generatedCode.css, // For now, CSS is not refined.
        }
      }

      setGeneratedCode({ tsx: response.jsxTsxCode, css: response.cssCode });
      setChatHistory(prev => [...prev, { role: 'assistant', content: "Here is the component you requested."}])
    } catch (error) {
      console.error('AI Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Code',
        description: 'Something went wrong. Please try again.',
      });
      // remove the user message from history if it failed
      setChatHistory(chatHistory);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar>
          <SessionSidebar onNewSession={handleNewSession} />
        </Sidebar>

        <SidebarInset className="flex-1 !m-0 !rounded-none !shadow-none">
          <div className="flex h-full w-full">
            <div className="flex flex-col flex-1 w-0 h-full">
              <header className="flex items-center gap-2 p-2 border-b h-14">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-lg font-semibold">Workspace</h1>
              </header>
              <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
                <div className="flex-1 min-h-0">
                  <PreviewPanel
                    tsxCode={generatedCode.tsx}
                    cssCode={generatedCode.css}
                  />
                </div>
                <div className="h-1/3 min-h-[200px] flex flex-col">
                  <CodePanel
                    tsxCode={generatedCode.tsx}
                    cssCode={generatedCode.css}
                  />
                </div>
              </div>
            </div>
            <aside className="w-[380px] h-full border-l">
              <ChatPanel
                chatHistory={chatHistory as any}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </aside>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
