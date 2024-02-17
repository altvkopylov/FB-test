// const previousPage = document.referrer;
// console.log("Предыдущая страница: " + previousPage);

// document.getElementById('userLink').addEventListener('click', function(event) {
//     var sourceLink = this.getAttribute('href');
//     console.log("Ссылка, с которой пользователь перешел на эту страницу:", sourceLink);
// });

// window.addEventListener('DOMContentLoaded', (event) => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const source = urlParams.get('source');
//     console.log("Ссылка, с которой пользователь перешел на страницу пользователя:", source);
// });

// window.addEventListener('DOMContentLoaded', function() {
//     var referrerUrl = document.referrer;
//     var source = referrerUrl.split("/").pop(); // Получаем только последнюю часть URL-адреса, то есть название страницы
//     console.log("Ссылка, с которой пользователь перешел на страницу пользователя:", source);
// });

window.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('user_id');
    console.log("ID пользователя:", userId);
});