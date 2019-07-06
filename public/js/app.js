const weatherForm = document.querySelector('form')
const input = document.querySelector('input');
const wD = document.querySelector('.weatherDisplay');
const wL = document.querySelector('.weatherLocation');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  wL.textContent = ''
  wD.textContent = 'Loading...'
  fetch(`http://localhost:3000/weather?address=${input.value}`).then((response) => {
    response.json().then(data => {
      if(data.err) {
        wD.textContent = `${data.err}`
        wL.textContent = ''
      } else {
        wL.textContent = `${data.location}`
        wD.textContent = `${data.forecast}`
      }
    })
  })
})