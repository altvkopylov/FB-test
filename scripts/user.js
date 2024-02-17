window.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('user_id');

    document.title = userId;

    const partner_id = this.document.querySelector('.partner_id span');
    const user_id = this.document.querySelector('.user_id span');
    const rmt_link = this.document.querySelector('.rmt_link');
    const accounting_link = this.document.querySelector('.accounting_link');

    getUserInfo(userId)
        .then(userInfo => {
            console.log(userInfo); // Используем полученные данные
            partner_id.textContent = userInfo[0][0];
            user_id.textContent = userInfo[0][2];
            rmt_link.href = `http://office.ua11.favorit/rmt_analytic/show_user/1/${userInfo[0][2]}`;
            accounting_link.href = `http://account.ua11.favorit/Users/Update/${userInfo[0][2]}`;
        })
        .catch(error => {
            console.error(error);
        });    
});