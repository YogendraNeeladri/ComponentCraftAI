'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GeneratedCode } from '@/app/page';

interface CodePanelProps extends GeneratedCode {}

const CodeBlock = ({ code }: { code: string }) => (
  <ScrollArea className="h-full w-full">
    <pre className="p-4 text-sm font-code h-full w-full">
      <code>{code}</code>
    </pre>
  </ScrollArea>
);

export default function CodePanel({ tsxCode, cssCode }: CodePanelProps) {
  return (
    <Tabs defaultValue="tsx" className="h-full w-full flex flex-col bg-card border rounded-lg">
      <TabsList className="m-2 self-start">
        <TabsTrigger value="tsx">JSX/TSX</TabsTrigger>
        <TabsTrigger value="css">CSS</TabsTrigger>
      </TabsList>
      <div className="flex-1 min-h-0">
        <TabsContent value="tsx" className="h-full m-0">
          <CodeBlock code={tsxCode} />
        </TabsContent>
        <TabsContent value="css" className="h-full m-0">
          <CodeBlock code={cssCode} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
