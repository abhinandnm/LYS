// LYS Frontend Configuration
// Replace 'YOUR_EC2_PUBLIC_IP' with the actual IP address from your AWS Console

const CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001'
};

export default CONFIG;
