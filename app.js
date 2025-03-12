// 初始化 Supabase
const { createClient } = supabase;
const supabaseUrl = 'https://ebcslqzdvqicnooeeljp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3NscXpkdnFpY25vb2VlbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3Njc4NzYsImV4cCI6MjA1NzM0Mzg3Nn0.Z6n7UTkhzDEJYyeIzf5h89cmqon3upDeYvJE_xGW7PU';
const supabase = createClient(supabaseUrl, supabaseKey);

// 1️⃣ 检查用户是否已登录
async function checkUser() {
    const { data, error } = await supabase.auth.getUser();
    if (!data.user) {
        window.location.href = "auth.html"; // 未登录则跳转到登录页
    }
}

checkUser(); // 页面加载时执行

// 2️⃣ 处理首页 `index.html` 的逻辑
if (document.getElementById("steps-list")) {
    const stepsList = document.getElementById("steps-list");
    const addStepBtn = document.getElementById("add-step-btn");

    // 获取验收步骤
    async function fetchSteps() {
        const { data, error } = await supabase.from("steps").select("*");
        if (error) {
            console.error("获取验收步骤失败", error);
            return;
        }

        stepsList.innerHTML = ""; // 清空列表
        data.forEach(step => {
            const li = document.createElement("li");
            li.textContent = step.name;
            li.onclick = () => window.location.href = `verify.html?id=${step.id}`;
            stepsList.appendChild(li);
        });
    }

    fetchSteps(); // 页面加载时获取验收步骤

    // 添加新验收步骤
    addStepBtn.addEventListener("click", async () => {
        const stepName = prompt("请输入新的验收步骤名称");
        if (stepName) {
            const { error } = await supabase.from("steps").insert([{ name: stepName }]);
            if (error) {
                alert("添加失败：" + error.message);
            } else {
                fetchSteps(); // 重新获取列表
            }
        }
    });
}

// 3️⃣ 处理验收详情页 `verify.html`
if (document.getElementById("step-name")) {
    const stepNameElement = document.getElementById("step-name");
    const stepResultInput = document.getElementById("step-result");
    const imageUpload = document.getElementById("image-upload");
    const submitBtn = document.getElementById("submit-btn");

    // 获取 URL 参数中的 `id`
    const urlParams = new URLSearchParams(window.location.search);
    const stepId = urlParams.get("id");

    if (stepId) {
        // 获取当前验收步骤
        async function fetchStepDetail() {
            const { data, error } = await supabase.from("steps").select("*").eq("id", stepId).single();
            if (error) {
                alert("获取验收步骤失败");
                return;
            }
            stepNameElement.textContent = data.name;
        }

        fetchStepDetail(); // 页面加载时执行
    }

    // 提交验收结果
    submitBtn.addEventListener("click", async () => {
        const resultText = stepResultInput.value;
        let mediaUrl = "";

        if (imageUpload.files.length > 0) {
            const file = imageUpload.files[0];
            const fileExt = file.name.split('.').pop();
            const filePath = `uploads/${Date.now()}.${fileExt}`;

            // 上传文件到 Supabase Storage
            const { data, error } = await supabase.storage.from('uploads').upload(filePath, file);

            if (error) {
                alert("文件上传失败: " + error.message);
                return;
            }
            mediaUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`;
        }

        // 存储验收结果
        const { error } = await supabase.from("results").insert([{ step_id: stepId, result: resultText, media_url: mediaUrl }]);
        if (error) {
            alert("提交失败：" + error.message);
        } else {
            alert("验收结果提交成功！");
            window.location.href = "index.html";
        }
    });
}

// 4️⃣ 处理验收结果页 `result.html`
if (document.getElementById("result-list")) {
    const resultList = document.getElementById("result-list");

    async function fetchResults() {
        const { data, error } = await supabase.from("results").select("*");
        if (error) {
            console.error("获取验收结果失败", error);
            return;
        }

        resultList.innerHTML = ""; // 清空列表
        data.forEach(result => {
            const li = document.createElement("li");
            li.innerHTML = `
                <p><strong>验收内容:</strong> ${result.result}</p>
                ${result.media_url ? `<img src="${result.media_url}" width="100">` : ""}
            `;
            resultList.appendChild(li);
        });
    }

    fetchResults(); // 页面加载时获取验收结果
}

// 5️⃣ 退出登录
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        await supabase.auth.signOut();
        window.location.href = "auth.html"; // 退出后跳转到登录页
    });
}
