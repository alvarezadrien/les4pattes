import helmet from 'helmet';

export default [
  helmet({ // Useful when the server returns HTML, false here
    contentSecurityPolicy: false,
    frameguard: false,
    crossOriginEmbedderPolicy: false,
  }),
  helmet.noSniff(), // Prevent browsers from loading content with a bad MIME type
  helmet.hsts({ // Force the HTTPS
    maxAge: 63072000,
    includeSubDomains: true,
    preload: true
  }),
  helmet.referrerPolicy({ policy: 'no-referrer' }), // Protect sensitive information
  helmet.hidePoweredBy({ setTo: 'PHP 8.1.0' }) // Remove the server signature
];