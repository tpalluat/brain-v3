import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PersonalityResponse {
  id: number;
  question: string;
  answer: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { responses } = await req.json();

    // Format responses for the prompt
    const formattedResponses = responses
      .map((r: PersonalityResponse) => `Question ${r.id}: ${r.question}\nRéponse: ${r.answer}`)
      .join('\n\n');

    const prompt = `Voici les réponses d'un utilisateur à un test de personnalité libre:\n\n${formattedResponses}\n\nAnalyse ces réponses pour identifier son profil psychologique : ses traits dominants, ses forces, ses faiblesses, ses valeurs, sa manière d'interagir avec les autres et avec le travail. Donne un nom à ce profil et résume-le en 5 à 6 phrases, dans un style clair et accessible.`;

    const openAiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Tu es un expert en analyse psychologique qui fournit des insights précis et bienveillants.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
      }),
    });

    const analysis = await openAiResponse.json();
    const analysisText = analysis.choices[0].message.content;

    return new Response(
      JSON.stringify({ analysis: analysisText }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      },
    );
  }
});