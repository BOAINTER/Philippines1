declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const PIXEL_ID = '1671854964445336';

/**
 * Track standard Meta Pixel events
 */
export function trackPixelEvent(
  eventName: 'PageView' | 'Lead' | 'Contact' | 'CompleteRegistration' | 'InitiateCheckout' | 'ViewContent',
  params?: Record<string, any>
) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
  }
}

/**
 * Track custom Meta Pixel events
 */
export function trackCustomPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) {
      window.fbq('trackCustom', eventName, params);
    } else {
      window.fbq('trackCustom', eventName);
    }
  }
}

/**
 * Standard trigger when a user clicks on any Telegram CTA / channel link
 */
export function trackTelegramClick(sourceName: string = 'Telegram Link') {
  trackPixelEvent('Contact', {
    content_name: sourceName,
    content_category: 'Telegram Conversion',
    destination: 'https://t.me/BOAInternational',
  });
  trackPixelEvent('Lead', {
    content_name: sourceName,
    content_category: 'Trader Acquisition',
  });
  trackCustomPixelEvent('TelegramChannelClick', {
    source: sourceName,
    timestamp: new Date().toISOString(),
  });
}
