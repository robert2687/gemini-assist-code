import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { startFlowServer } from '@genkit-ai/express';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Environment variable validation
const requiredEnvVars = ['GOOGLE_GENAI_API_KEY'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(envVar => console.error(`   - ${envVar}`));
  console.error('Please check your .env file and ensure all required variables are set.');
  process.exit(1);
}

// Environment configuration
const config = {
  port: parseInt(process.env.PORT || '3400', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  corsCredentials: process.env.CORS_CREDENTIALS === 'true',
  logLevel: process.env.LOG_LEVEL || 'info',
};

console.log('🚀 Starting Genkit server...');
console.log(`📍 Environment: ${config.nodeEnv}`);
console.log(`🔑 API Key configured: ${process.env.GOOGLE_GENAI_API_KEY ? '✅' : '❌'}`);

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'),
});

const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.object({ name: z.string() }),
    outputSchema: z.object({ greeting: z.string() }),
  },
  async (input) => {
    const { text } = await ai.generate(`Say hello to ${input.name}`);
    return { greeting: text };
  },
);

startFlowServer({
  flows: [helloFlow],
  port: config.port,
  cors: {
    origin: config.corsOrigin === '*' ? true : config.corsOrigin,
    credentials: config.corsCredentials,
  },
}
)