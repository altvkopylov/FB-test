window.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('user_id');

    document.title = userId;

    getUserInfo(userId)
        .then(userInfo => {
            console.log(userInfo); // Используем полученные данные
        })
        .catch(error => {
            console.error(error);
        });    
});