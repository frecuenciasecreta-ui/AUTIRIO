'use client';

import { useEffect, useState } from 'react';
import { fetchApi } from '@/lib/api';
import { TrackingScriptConfig } from '@/lib/types';

export default function DynamicScriptInjector() {
  const [scripts, setScripts] = useState<TrackingScriptConfig[]>([]);

  useEffect(() => {
    fetchApi<TrackingScriptConfig[]>('/tracking/public/active')
      .then((res) => setScripts(res || []))
      .catch(() => setScripts([]));
  }, []);

  useEffect(() => {
    const injectScripts = () => {
      const consent = localStorage.getItem('autirio_cookie_consent');
      if (consent !== 'accepted') return; // GDPR block

      scripts.forEach((script) => {
      if (script.provider === 'GA4' && script.trackingId) {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${script.trackingId}`;
        document.head.appendChild(gaScript);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${script.trackingId}');
        `;
        document.head.appendChild(inlineScript);
      }

      if (script.provider === 'META_PIXEL' && script.trackingId) {
        const metaScript = document.createElement('script');
        metaScript.innerHTML = `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${script.trackingId}');
          fbq('track', 'PageView');
        `;
        document.head.appendChild(metaScript);
      }

      if (script.customScriptHtml) {
        const customDiv = document.createElement('div');
        customDiv.innerHTML = script.customScriptHtml;
        document.body.appendChild(customDiv);
      }
    });
  };

  // Try to inject on mount
  injectScripts();

  // Also inject if user accepts cookies during the session
  window.addEventListener('cookiesAccepted', injectScripts);
  return () => window.removeEventListener('cookiesAccepted', injectScripts);

  }, [scripts]);

  return null;
}
