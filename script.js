// ฐานข้อมูลจำลอง (ในโปรดักชันต้องใช้ server จริง)
let database = JSON.parse(localStorage.getItem("lomnaoDB")) || {};

function saveDB() {
  localStorage.setItem("lomnaoDB", JSON.stringify(database));
}

// ---------- ฝั่งลูกค้า ----------
function checkPoints() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) return alert("กรุณากรอกชื่อผู้ใช้");

  if (!database[userId]) {
    database[userId] = 0;
    saveDB();
  }

  document.getElementById("points").innerText = database[userId];
}

function randomAccount() {
  const userId = document.getElementById("userId").value.trim();
  if (!userId) return alert("กรุณากรอกชื่อผู้ใช้ก่อน");

  if (!database[userId] || database[userId] < 39) {
    return alert("พ้อยไม่พอ กรุณาทักแอดมินเพื่อเติมพ้อย");
  }

  database[userId] -= 39;
  saveDB();
  document.getElementById("points").innerText = database[userId];
  alert("🎉 สุ่มสำเร็จ! กรุณาติดต่อแอดมินเพื่อรับไอดี");
}

// ---------- ฝั่งแอดมิน ----------
const ADMIN_USER = "admin";
const ADMIN_PASS = "1234"; // เปลี่ยนรหัสจริงนะ!

function login() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    document.getElementById("adminPanel").style.display = "block";
    loadUsers();
  } else {
    alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
  }
}

function addUserPoints() {
  const userId = document.getElementById("targetUser").value.trim();
  const points = parseInt(document.getElementById("addPoints").value);

  if (!userId || isNaN(points) || points <= 0) {
    return alert("กรุณากรอกข้อมูลให้ถูกต้อง");
  }

  if (!database[userId]) {
    database[userId] = 0;
  }

  database[userId] += points;
  saveDB();
  alert("เติมพ้อยสำเร็จให้ " + userId);
  loadUsers();
}

function loadUsers() {
  document.getElementById("userList").innerText = JSON.stringify(database, null, 2);
}