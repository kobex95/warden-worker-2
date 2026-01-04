// API Handler - 处理所有请求
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  console.log('Handler - Path:', path, 'Method:', method);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // OPTIONS 预检请求
  if (method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 });
  }

  try {
    // 处理 /identity/connect 请求
    if (path === '/identity/connect' || path === '/identity/connect/') {
      const data = {
        version: '1.59.1',
        name: 'Warden-Worker',
        url: env.SUPABASE_URL || 'https://api.bitwarden.com',
        supportedFeatures: [
          'twoFactor',
          'passwordManager',
          'sendVerificationEmail',
          'hmacVerification',
        ],
        allowedEmails: env.ALLOWED_EMAILS || '*',
        environment: env.APP_ENV || 'development',
      };
      return new Response(JSON.stringify(data), { headers });
    }

    // 处理 /identity/accounts/register 请求
    if (path === '/identity/accounts/register' || path === '/identity/accounts/register/' || path.startsWith('/identity/accounts/register')) {
      console.log('Register endpoint - Method:', method);

      // 只接受POST请求
      if (method !== 'POST') {
        return new Response(
          JSON.stringify({
            error: 'Method not allowed',
            method: method,
            allowedMethods: ['POST'],
            path: path
          }),
          { headers, status: 405 }
        );
      }

      const body = await request.json().catch(() => ({}));
      console.log('Register body:', body);

      return new Response(JSON.stringify({
        success: true,
        message: 'User registered successfully',
        email: body.email || 'not provided',
        userId: 'user-' + Date.now(),
      }), { headers, status: 201 });
    }

    // 处理 /api/config 请求
    if (path === '/api/config' || path === '/api/config/') {
      const config = {
        version: '0.1.0',
        environment: env.APP_ENV || 'development',
        features: ['password-manager', 'sync', 'two-factor'],
        apiUrl: '/api',
        identityUrl: '/identity',
        supabaseConfigured: !!env.SUPABASE_URL,
        jwtConfigured: !!env.JWT_SECRET,
        logLevel: env.LOG_LEVEL || 'info',
      };
      return new Response(JSON.stringify(config), { headers });
    }

    // 默认响应
    const response = {
      path: path,
      method: method,
      message: 'API endpoint',
      availableRoutes: ['/identity/connect', '/identity/accounts/register', '/api/config'],
      timestamp: new Date().toISOString(),
    };
    return new Response(JSON.stringify(response), { headers });

  } catch (error) {
    console.error('Handler error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { headers, status: 500 }
    );
  }
}
