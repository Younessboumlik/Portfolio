// const { name } = require("ejs");

function onScroll() {
  const infoElement = document.getElementsByClassName('info')[0];
  const commitElement = document.getElementsByClassName('commitments')[0];
  const offersElement = document.getElementsByClassName('theoffers')[0];
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > infoElement.offsetTop-500) {
    infoElement.style.opacity = 1;
  } else {
    infoElement.style.opacity = 0;
  }


if (scrollPosition > commitElement.offsetTop-500) {
  commitElement.style.opacity = 1;
} else {
  commitElement.style.opacity = 0;
}


if (scrollPosition > offersElement.offsetTop-500) {
  offersElement.style.opacity = 1;
} else {
  offersElement.style.opacity = 0;
}
}
const submit = document.getElementById("submit");
 const email = document.getElementById("email");
 const Name = document.getElementById("name");
const texterea = document.getElementById("texterea")
console.log("sdddddddddddddddddddd")
function send_about (){
  
    Email.send({
        
        Host: "smtp.elasticemail.com",
        Username: "boulidamabdellah8@gmail.com",
        Password: "2D1FD71013A1879345965F0A0A31F96B386B",
        To: `boulidamabdellah8@gmail.com`,
        From: `${email.value}`,
        Subject: `message for contact` ,
        Body: `${texterea.value}`}).then(function(){
          Swal.fire({
            icon: "success",
            title: "the message has been sent with success .",
            showConfirmButton: true,
            
             })
        })

}
submit.onclick = function(){
  console.log(Name.value,email.value)
  send_about()
}



window.addEventListener('scroll', onScroll);
