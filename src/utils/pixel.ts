declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    ttq?: {
      track: (eventName: string, params?: Record<string, any>) => void;
      page: () => void;
      identify: (params?: Record<string, any>) => void;
      [key: string]: any;
    };
  }
}

export const META_PIXEL_ID = '1671854964445336';
export const PIXEL_ID = META_PIXEL_ID;
export const TIKTOK_PIXEL_ID = 'DB4S7GJC77U074LG1SV0';

/**
 * Track TikTok Pixel events
 */
export function trackTikTokEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.ttq && typeof window.ttq.track === 'function') {
    try {
      if (params) {
        window.ttq.track(eventName, params);
      } else {
        window.ttq.track(eventName);
      }
    } catch (e) {
      console.warn('TikTok Pixel tracking error:', e);
    }
  }
}

/**
 * Track standard events across both Meta and TikTok Pixels
 */
export function trackPixelEvent(
  eventName: 'PageView' | 'Lead' | 'Contact' | 'CompleteRegistration' | 'InitiateCheckout' | 'ViewContent',
  params?: Record<string, any>
) {
  // 1. Meta Pixel
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    } catch (e) {
      console.warn('Meta Pixel tracking error:', e);
    }
  }

  // 2. TikTok Pixel mapping
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      if (eventName === 'PageView' && typeof window.ttq.page === 'function') {
        window.ttq.page();
      } else if (eventName === 'CompleteRegistration') {
        trackTikTokEvent('CompleteRegistration', params);
      } else if (eventName === 'Contact') {
        trackTikTokEvent('Contact', params);
      } else if (eventName === 'Lead') {
        trackTikTokEvent('SubmitForm', params);
      } else if (eventName === 'ViewContent') {
        trackTikTokEvent('ViewContent', params);
      } else if (eventName === 'InitiateCheckout') {
        trackTikTokEvent('InitiateCheckout', params);
      }
    } catch (e) {
      console.warn('TikTok event mapping error:', e);
    }
  }
}

/**
 * Track custom Meta Pixel events
 */
export function trackCustomPixelEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (params) {
        window.fbq('trackCustom', eventName, params);
      } else {
        window.fbq('trackCustom', eventName);
      }
    } catch (e) {
      console.warn('Meta custom event tracking error:', e);
    }
  }
}

/**
 * Standard trigger when a user clicks on any Telegram CTA / channel link.
 * Fires events to both Meta and TikTok Pixels simultaneously.
 */
export function trackTelegramClick(sourceName: string = 'Telegram Link') {
  // Meta Pixel Events
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

  // TikTok Pixel Events
  trackTikTokEvent('Contact', {
    content_name: sourceName,
    content_category: 'Telegram Conversion',
    destination: 'https://t.me/BOAInternational',
  });
  trackTikTokEvent('ClickButton', {
    content_name: sourceName,
    button_name: sourceName,
  });
}
