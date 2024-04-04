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

window.addEventListener('scroll', onScroll);
