const button = document.getElementById(dark-mode);


function isLocalStorageAvailable() {
  try {
    const testKey = 'test';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
}

if (isLocalStorageAvailable()) {
  const prefersDarkMode = localStorage.getItem('darkMode') === 'true';
  document.documentElement.classList.toggle('dark-mode', prefersDarkMode);
}


function darkmode() {
  document.documentElement.classList.toggle('dark-mode');
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  button.textContent = "Light Mode";
}
