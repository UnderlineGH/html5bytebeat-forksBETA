// blocker.js
(function() {
  // Lista de domínios bloqueados
  const blockedDomains = ['greggman.com'];
  
  // Override do fetch
  const originalFetch = window.fetch;
  window.fetch = function(...args) {
    const url = args[0];
    if (blockedDomains.some(domain => url.includes(domain))) {
      console.warn('Blocked request to:', url);
      return Promise.reject(new Error('Domain blocked'));
    }
    return originalFetch.apply(this, args);
  };
  
  // Override do XMLHttpRequest
  const originalOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (blockedDomains.some(domain => url.includes(domain))) {
      console.warn('Blocked XHR to:', url);
      throw new Error('Domain blocked');
    }
    return originalOpen.apply(this, [method, url, ...rest]);
  };
})();