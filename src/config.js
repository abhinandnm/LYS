// LYS Frontend Configuration
// Replace 'YOUR_EC2_PUBLIC_IP' with the actual IP address from your AWS Console

const CONFIG = {
  // If in production (Amplify), use relative path to seamlessly proxy through HTTPS
  // If in local development, connect directly to proxy off HTTP
  API_URL: import.meta.env.PROD ? '' : 'http://13.235.13.0:3001'
};

export default CONFIG;
