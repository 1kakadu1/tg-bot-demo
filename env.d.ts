declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TG_BOT_API_KEY: string;
      WEBHOOK_DOMAIN: string;
      WEBHOOK_PATH: string;
      KEY_API_AI: string;
    }
  }
}

export {};