const form = document.getElementById('inputs');
const Name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password');
const error = document.getElementById('error');
const passMatch = document.getElementById('pass-match');
let count = 0;
localStorage.setItem('count', JSON.stringify(count));

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    console.log(Name.value,email.value,password.value,confirmPassword.value);
    if(Name.value.trim() == '' ||
    email.value.trim() == '' || 
    password.value.trim() == '' || 
    confirmPassword.value.trim() == ''){
        error.id = "visible";
        passMatch.style.visibility = "hidden";
    }
    else{
        error.id = "error";
        if(password.value.trim() === confirmPassword.value.trim()){
            if(ifUserExist(email.value.trim())){
                passMatch.innerText = "This Email is Already Registered."
                passMatch.style.visibility = "visible";
            }
            else{
                passMatch.style.visibility = "hidden";
                let token = generateToken(16);
                users = JSON.parse(localStorage.getItem('users'));
                if(users === null){
                    saveUser(Name.value.trim(),email.value.trim(),password.value.trim(),token);
                }
                else{
                    saveUser(Name.value.trim(),email.value.trim(),password.value.trim(),token);
                }
                window.location.href='./profile/index.html';
            }
        }
        else{
            passMatch.style.visibility = "visible";
        }
    }
    form.reset();
})


// Saving User info in LOCALSTORAGE

function saveUser(Name,email,password,token){
    let userObj = {
        fullName : Name,
        email : email,
        password : password,
        tokenId : token
    }
    users = JSON.parse(localStorage.getItem('users'));
    if(users === null){
        users = [];
        users.push(userObj);
    }
    else{
        users.push(userObj);
    }
    localStorage.setItem("users",JSON.stringify(users));
}

// Checking if user Exists

function ifUserExist(email){
    let allUsers = JSON.parse(localStorage.getItem('users'));
    if(allUsers === null){
        return false
    }else{
        let user = allUsers.find(obj=>{
            return obj.email === email;
        })
        if(user) return true;
        else return false;
    }
}

// Token Generator

function generateToken(length){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  };