'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GeneratedCode } from '@/app/page';

interface PreviewPanelProps extends GeneratedCode {}

const getComponentName = (code: string): string => {
  const match = code.match(/const\s+([A-Z]\w*)\s*=/);
  if (match) return match[1];
  const defaultExportMatch = code.match(/export\s+default\s+([A-Z]\w*);/);
  if (defaultExportMatch) return defaultExportMatch[1];
  const functionMatch = code.match(/function\s+([A-Z]\w*)\s*\(/);
  if (functionMatch) return functionMatch[1];
  return 'Component';
};


export default function PreviewPanel({ tsxCode, cssCode }: PreviewPanelProps) {
  const { toast } = useToast();
  const [iframeKey, setIframeKey] = React.useState(Date.now());

  const componentName = React.useMemo(() => getComponentName(tsxCode), [tsxCode]);

  const srcDoc = `
    <html>
      <head>
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js" crossorigin></script>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --background: 250 100% 98%;
            --foreground: 240 10% 3.9%;
            --card: 250 100% 98%;
            --card-foreground: 240 10% 3.9%;
            --popover: 250 100% 98%;
            --popover-foreground: 240 10% 3.9%;
            --primary: 262 84% 60%;
            --primary-foreground: 0 0% 98%;
            --secondary: 255 100% 95%;
            --secondary-foreground: 262 84% 30%;
            --muted: 240 5% 96%;
            --muted-foreground: 240 4% 46%;
            --accent: 338 100% 92.4%;
            --accent-foreground: 338 80% 40%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 0 0% 98%;
            --border: 255 100% 92%;
            --input: 255 100% 92%;
            --ring: 262 84% 60%;
          }
          body { 
            font-family: 'Inter', sans-serif;
            background-color: transparent;
            padding: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            margin: 0;
            overflow: auto;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script type="text/babel">
          try {
            ${tsxCode.replace(/export default \w+;/, '')}
            const Component = ${componentName};
            const container = document.getElementById('root');
            const root = ReactDOM.createRoot(container);
            root.render(<Component />);
          } catch(e) {
            console.error(e);
            const container = document.getElementById('root');
            container.innerHTML = '<div style="color: red; text-align: center;">Error rendering component: ' + e.message + '</div>';
          }
        </script>
      </body>
    </html>
  `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${tsxCode}\n\n<style>\n${cssCode}\n</style>`);
      toast({
        title: 'Code Copied!',
        description: 'TSX and CSS have been copied to your clipboard.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Could not copy code to clipboard.',
      });
    }
  };

  const handleDownload = () => {
    try {
      const componentNameToUse = getComponentName(tsxCode) || 'Component';
      
      // Create a blob for the TSX file
      const tsxBlob = new Blob([tsxCode], { type: 'text/typescript-jsx' });
      const tsxUrl = URL.createObjectURL(tsxBlob);
      const tsxLink = document.createElement('a');
      tsxLink.href = tsxUrl;
      tsxLink.download = `${componentNameToUse}.tsx`;
      document.body.appendChild(tsxLink);
      tsxLink.click();
      document.body.removeChild(tsxLink);
      URL.revokeObjectURL(tsxUrl);
      
      // Create a blob for the CSS file
      const cssBlob = new Blob([cssCode], { type: 'text/css' });
      const cssUrl = URL.createObjectURL(cssBlob);
      const cssLink = document.createElement('a');
      cssLink.href = cssUrl;
      cssLink.download = `${componentNameToUse}.css`;
      document.body.appendChild(cssLink);
      cssLink.click();
      document.body.removeChild(cssLink);
      URL.revokeObjectURL(cssUrl);

      toast({
        title: 'Download Started',
        description: `Downloading ${componentNameToUse}.tsx and ${componentNameToUse}.css`,
      });
    } catch (error) {
        console.error("Download Error:", error);
        toast({
            variant: 'destructive',
            title: 'Download Failed',
            description: 'Could not download files.',
        });
    }
  };

  React.useEffect(() => {
    setIframeKey(Date.now());
  }, [tsxCode, cssCode]);

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between py-3">
        <CardTitle className="text-lg">Live Preview</CardTitle>
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={() => setIframeKey(Date.now())}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" onClick={handleCopy}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Code
          </Button>
          <Button size="lg" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <iframe
          key={iframeKey}
          srcDoc={srcDoc}
          title="Component Preview"
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full border-0"
        />
      </CardContent>
    </Card>
  );
}
