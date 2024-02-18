window.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('user_id');

    const partner_url = {
        '69': 'ua11',
        '58': '',
        '50': 'hr2',
        '88': 'ro2'
    }

    document.title = userId;

    const partner_id = this.document.querySelector('.partner_id span');
    const user_id = this.document.querySelector('.user_id span');
    const rmt_link = this.document.querySelector('.rmt_link');
    const accounting_link = this.document.querySelector('.accounting_link');
    const stake_count = this.document.querySelector('.stake_count span');
    const stake_fork_count = this.document.querySelector('.stake_fork_count span');
    const stake_percent = this.document.querySelector('.stake_percent span');
    const pul = this.document.querySelector('.pul span');
    const profit = this.document.querySelector('.profit span');
    const percent = this.document.querySelector('.percent span');

    getUserInfo('fb_db', 'stakes', userId)
        .then(userInfo => {
            //console.log(userInfo); // Используем полученные данные
            partner_id.textContent = userInfo[0][0];
            user_id.textContent = userInfo[0][2];
            rmt_link.href = `http://office.${partner_url[userInfo[0][0]]}.favorit/rmt_analytic/show_user/1/${userInfo[0][2]}`;
            accounting_link.href = `http://account.${partner_url[userInfo[0][0]]}.favorit/Users/Update/${userInfo[0][2]}`;

            stake_count.textContent = userInfo.length;

            // getSuspiciousUsers()
            //     .then(userInfo => {
            //         console.log(userInfo)
            //     })
            //     .catch(error => {
            //         console.error(error);
            //     });

            pul.textContent = userInfo.map(item => item[20]).reduce((acc, item) => acc + item);
            profit.textContent = userInfo.map(item => item[21]).reduce((acc, item) => acc + item);
            percent.textContent = `${((profit.textContent / pul.textContent) * 100).toFixed(2)}%`;
            
        })
        .catch(error => {
            console.error(error);
        });    
});