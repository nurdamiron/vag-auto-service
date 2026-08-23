export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (counterId: number, action: string, ...rest: unknown[]) => void;
  }
}
