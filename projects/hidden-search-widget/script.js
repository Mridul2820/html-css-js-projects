const searh = document.querySelector('.search');
const btn = document.querySelector('.search');
const input = document.querySelector('.input');

btn.addEventListener('click', () => {
    searh.classList.toggle('active');
    input.focus();
})