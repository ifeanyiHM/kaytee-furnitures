export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatCompletionParams {
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface ChatCompletionResult {
  content: string;
  provider: string;
  model: string;
}

export interface AIProvider {
  /** Machine-readable id — matches the AI_PROVIDER env value */
  id: string;
  /** Non-streaming chat completion */
  chat(params: ChatCompletionParams): Promise<ChatCompletionResult>;
  /** Streaming chat completion — yields text chunks as they arrive */
  chatStream(params: ChatCompletionParams): AsyncGenerator<string>;
}
