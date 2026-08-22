document.querySelector('.nav-toggle')?.addEventListener('click',()=>document.querySelector('.nav')?.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav')?.classList.remove('open')));
document.querySelectorAll('#year').forEach(e=>e.textContent=new Date().getFullYear());
