'use server';

/**
 * @fileOverview An AI agent to generate React component code (JSX/TSX + CSS) based on user prompts.
 *
 * - generateComponentCode - A function that handles the component generation process.
 * - GenerateComponentCodeInput - The input type for the generateComponentCode function.
 * - GenerateComponentCodeOutput - The return type for the generateComponentCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateComponentCodeInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the desired React component.'),
});
export type GenerateComponentCodeInput = z.infer<typeof GenerateComponentCodeInputSchema>;

const GenerateComponentCodeOutputSchema = z.object({
  jsxTsxCode: z.string().describe('The generated JSX/TSX code for the React component.'),
  cssCode: z.string().describe('The generated CSS code for the React component.'),
});
export type GenerateComponentCodeOutput = z.infer<typeof GenerateComponentCodeOutputSchema>;

export async function generateComponentCode(input: GenerateComponentCodeInput): Promise<GenerateComponentCodeOutput> {
  return generateComponentCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateComponentCodePrompt',
  input: {schema: GenerateComponentCodeInputSchema},
  output: {schema: GenerateComponentCodeOutputSchema},
  prompt: `You are a React code generation expert. Generate JSX/TSX and CSS code based on the user prompt.

  Prompt: {{{prompt}}}

  Ensure that the response contains both JSX/TSX and CSS code blocks.
  The code should be well formatted and easy to understand.
  Separate the JSX/TSX code from the CSS code with clear delimiters.
  `,
});

const generateComponentCodeFlow = ai.defineFlow(
  {
    name: 'generateComponentCodeFlow',
    inputSchema: GenerateComponentCodeInputSchema,
    outputSchema: GenerateComponentCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
