
const getStartedLink = document.getElementById('get-started');

getStartedLink.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'calculator.html';
});
