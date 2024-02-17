// function getUserId() {
//     window.addEventListener('DOMContentLoaded', function() {
//         const queryString = window.location.search;
//         const urlParams = new URLSearchParams(queryString);
//         const userId = urlParams.get('user_id');
//         return userId;
//     });
// }

// const userId = getUserId();
// console.log(getUserId())

// getUserInfo(userId);

function getUserId() {
    return new Promise((resolve, reject) => {
        window.addEventListener('DOMContentLoaded', function() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const userId = urlParams.get('user_id');
            resolve(userId);
        });
    });
}

getUserId()
    .then(userId => {
        console.log(userId); // В этом месте вы можете использовать userId
        getUserInfo(userId);
    })
    .catch(error => {
        console.error(error);
    });