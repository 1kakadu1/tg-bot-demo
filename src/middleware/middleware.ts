import { Context } from "vm";

export const loggingMiddleware = async (ctx: Context, next: () => Promise<void>) => {
  console.log(`Received message: ${ctx.message?.text}`);
  await next();
};