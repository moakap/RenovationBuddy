// 初始化 Supabase
const { createClient } = supabase;
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// 获取 HTML 元素
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const messageBox = document.getElementById("message");

// 注册功能
signupBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { user, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        messageBox.textContent = "注册失败: " + error.message;
    } else {
        messageBox.textContent = "注册成功，请检查您的邮箱进行验证。";
    }
});

// 登录功能
loginBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        messageBox.textContent = "登录失败: " + error.message;
    } else {
        window.location.href = "index.html"; // 登录成功跳转首页
    }
});
