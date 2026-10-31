const store={get:k=>JSON.parse(localStorage.getItem(k)||'null'),set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const currentUser=()=>store.get('wyc_session');

// Show login/logout in the header
const authLink=document.getElementById('authLink');
if(authLink&&currentUser()){
  authLink.textContent='Hi, '+currentUser().name+' · Logout';
  authLink.href='#';
  authLink.onclick=e=>{e.preventDefault();localStorage.removeItem('wyc_session');location.reload()};
}

// Login page logic
const loginForm=document.getElementById('loginForm');
if(loginForm){
  const signupForm=document.getElementById('signupForm'),msg=document.getElementById('msg');
  const next='index.html';
  const lEmail=document.getElementById('lEmail'),lPass=document.getElementById('lPass');
  const sName=document.getElementById('sName'),sEmail=document.getElementById('sEmail'),sPass=document.getElementById('sPass');
  document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('[data-t]').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',String(x===b))});
    loginForm.hidden=b.dataset.t!=='login';signupForm.hidden=b.dataset.t!=='signup';msg.textContent='';
  });
  signupForm.onsubmit=e=>{
    e.preventDefault();
    const users=store.get('wyc_users')||[],email=sEmail.value.trim().toLowerCase();
    const name=sName.value.trim();
    if(!name){msg.textContent='Please enter your name.';sName.focus();return}
    if(users.some(u=>u.email===email)){msg.textContent='This email already has an account. Try logging in.';return}
    const u={name,email,pass:sPass.value};
    users.push(u);store.set('wyc_users',users);
    store.set('wyc_session',{name:u.name,email});location.href=next;
  };
  loginForm.onsubmit=e=>{
    e.preventDefault();
    const u=(store.get('wyc_users')||[]).find(u=>u.email===lEmail.value.trim().toLowerCase()&&u.pass===lPass.value);
    if(!u){msg.textContent='Email or password is wrong. Check both and try again.';return}
    store.set('wyc_session',{name:u.name,email:u.email});location.href=next;
  };
}
