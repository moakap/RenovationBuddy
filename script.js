// script.js
document.getElementById('login-btn').addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then(result => {
    const user = result.user;
    document.getElementById('user-name').textContent = user.displayName;
    document.getElementById('auth-container').innerHTML = `
      <div id="user-info">
        <p>欢迎，${user.displayName}</p>
        <button id="logout-btn">登出</button>
      </div>
    `;
    document.getElementById('logout-btn').style.display = 'block';
  });
});

document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut();
  document.getElementById('auth-container').innerHTML = `
    <button id="login-btn">登录</button>
  `;
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const stepsContainer = document.getElementById('verification-steps');
  
    // 从Firebase获取验收项目
    db.collection('steps').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const step = doc.data();
        const stepElement = document.createElement('div');
        stepElement.classList.add('step');
        stepElement.innerHTML = `
          <h3>${step.name}</h3>
          <p>验收标准: ${step.standard}</p>
          <input type="file" accept="image/*,video/*" onchange="uploadFile(event, '${doc.id}')">
          <button onclick="submitVerification('${doc.id}')">提交验收结果</button>
        `;
        stepsContainer.appendChild(stepElement);
      });
    });
  
    // 添加新验收步骤
    document.getElementById('add-step-btn').addEventListener('click', () => {
      const stepName = prompt("请输入步骤名称:");
      const stepStandard = prompt("请输入验收标准:");
      
      db.collection('steps').add({
        name: stepName,
        standard: stepStandard
      }).then(docRef => {
        console.log("步骤已添加:", docRef.id);
        window.location.reload();  // 刷新页面以加载新步骤
      });
    });
  });
  
  function uploadFile(event, stepId) {
    const file = event.target.files[0];
    if (file) {
      const storageRef = storage.ref('uploads/' + stepId + '/' + file.name);
      storageRef.put(file).then(snapshot => {
        console.log("文件上传成功:", snapshot);
      });
    }
  }
  
  function submitVerification(stepId) {
    const verificationStatus = prompt("请输入验收结果 (通过/不通过):");
    
    db.collection('steps').doc(stepId).update({
      status: verificationStatus,
      verifiedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert("验收结果已提交！");
    });
  }
  