export const sslConfig = {
  store_id: process.env.SSL_STORE_ID!,
  store_pass: process.env.SSL_STORE_PASSWORD!,
  backend_url: process.env.BACKEND_URL!,
  frontend_url: process.env.FRONTEND_URL!,
  is_live: false, // false = sandbox
};
