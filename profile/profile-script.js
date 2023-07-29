const Name = document.getElementById('name');
const email = document.getElementById('email');
const token = document.getElementById('token');
const password = document.getElementById('password');
const logout = document.getElementById('logout');
let count = 0;

let users = JSON.parse(localStorage.getItem('users'));
console.log(users.length)
count = users.length-1;

Name.innerText = users[count].fullName;
email.innerText = users[count].email;
token.innerText = users[count].tokenId;
password.innerText = users[count].password;

logout.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.removeItem('users');
    window.location.href = '../index.html';
})