// supabaseConfig.js

// 使用你的 Supabase 项目的 URL 和 API 密钥替换以下内容
const SUPABASE_URL = "https://ebcslqzdvqicnooeeljp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3NscXpkdnFpY25vb2VlbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3Njc4NzYsImV4cCI6MjA1NzM0Mzg3Nn0.Z6n7UTkhzDEJYyeIzf5h89cmqon3upDeYvJE_xGW7PU";

// 初始化 Supabase 客户端
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
