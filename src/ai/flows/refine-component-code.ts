'use server';
/**
 * @fileOverview A flow for refining existing component code based on iterative prompts.
 *
 * - refineComponentCode - A function that takes an existing component code and a refinement prompt and returns the refined component code.
 * - RefineComponentCodeInput - The input type for the refineComponentCode function.
 * - RefineComponentCodeOutput - The return type for the refineComponentCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineComponentCodeInputSchema = z.object({
  existingCode: z
    .string()
    .describe('The existing component code to be refined.'),
  refinementPrompt: z
    .string()
    .describe('The prompt describing the desired refinements.'),
});
export type RefineComponentCodeInput = z.infer<typeof RefineComponentCodeInputSchema>;

const RefineComponentCodeOutputSchema = z.object({
  refinedCode: z.string().describe('The refined component code.'),
});
export type RefineComponentCodeOutput = z.infer<typeof RefineComponentCodeOutputSchema>;

export async function refineComponentCode(input: RefineComponentCodeInput): Promise<RefineComponentCodeOutput> {
  return refineComponentCodeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineComponentCodePrompt',
  input: {schema: RefineComponentCodeInputSchema},
  output: {schema: RefineComponentCodeOutputSchema},
  prompt: `You are a code refinement expert. You will receive existing component code and a refinement prompt. Your task is to refine the existing code based on the prompt and return the refined code.

Existing Code:
{{{existingCode}}}

Refinement Prompt:
{{{refinementPrompt}}}

Refined Code:`,
});

const refineComponentCodeFlow = ai.defineFlow(
  {
    name: 'refineComponentCodeFlow',
    inputSchema: RefineComponentCodeInputSchema,
    outputSchema: RefineComponentCodeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
