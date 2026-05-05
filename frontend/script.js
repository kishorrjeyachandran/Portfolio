const form = document.querySelector(".contact-form");

if(form){
form.addEventListener("submit", async (e)=>{
e.preventDefault();

const btn = form.querySelector("button");
btn.innerText = "Sending...";
btn.disabled = true;

const name = form.querySelector('input[type="text"]').value.trim();
const email = form.querySelector('input[type="email"]').value.trim();
const message = form.querySelector("textarea").value.trim();

try{

const res = await fetch("https://portfolio-backend-7gr0.onrender.com/contact",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({name,email,message})
});

const data = await res.json();

if(data.success){
showPopup("Message Sent Successfully ✅");
form.reset();
}else{
showPopup("Failed to Send ❌");
}

}catch(err){
console.log(err);
showPopup("Server Error ❌");
}

btn.innerText = "Send Message";
btn.disabled = false;

});
}

function showPopup(msg){
const popup = document.createElement("div");
popup.className = "popup-success";
popup.innerText = msg;

document.body.appendChild(popup);

setTimeout(()=>{
popup.classList.add("show");
},100);

setTimeout(()=>{
popup.remove();
},3000);
}

const certCards = document.querySelectorAll(".cert-card");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

let start = 0;
const perPage = 4;

function showCertificates(){

certCards.forEach(card=>{
card.classList.remove("active");
});

for(let i=start; i<start + perPage && i<certCards.length; i++){
certCards[i].classList.add("active");
}

/* Button Visibility */

/* Hide left on first page */
if(start === 0){
prevBtn.style.visibility = "hidden";
}else{
prevBtn.style.visibility = "visible";
}

/* Hide right on last page */
if(start + perPage >= certCards.length){
nextBtn.style.visibility = "hidden";
}else{
nextBtn.style.visibility = "visible";
}

}

/* Next */
nextBtn.addEventListener("click", ()=>{

if(start + perPage < certCards.length){
start += perPage;
showCertificates();
}

});

/* Previous */
prevBtn.addEventListener("click", ()=>{

if(start - perPage >= 0){
start -= perPage;
showCertificates();
}

});

/* Initial Load */
showCertificates();

/* Scroll Reveal */

/* Scroll Reveal */

const reveals = document.querySelectorAll(
".hero, .skill-box, .project-card, .edu-card, .cert-card, .contact-form, .section-title, .section-desc"
);

reveals.forEach(el=>{
el.classList.add("reveal");
});

function revealOnScroll(){

reveals.forEach(el=>{

const windowHeight = window.innerHeight;
const top = el.getBoundingClientRect().top;

if(top < windowHeight - 80){
el.classList.add("show");
}

});

}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);