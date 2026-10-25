export interface SwaggerUiResponse {
  url: string;
  ok: boolean;
  body: unknown;
}

export interface SwaggerUiGlobal {
  ui?: {
    preauthorizeApiKey: (schemeName: string, value: string) => void;
  };
}
