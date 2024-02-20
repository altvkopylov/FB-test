getAllData('fb_db', 'suspicious_stakes')
    .then(userInfo => {
        const forkTable = document.querySelector('.fork-table');
        const forkMarkup = userInfo.map(([partner_id, type_bet, user_id, card_id, currency, cashdesk, dt, coef, is_risk, outcome, tournament_id, tournament_name, category_name, event_name, event_id, result, service, sport, card_sum_in, card_profit, sum_in, profit, coupon_odds, num_of_events, dt_done, is_cashout, market, dparam1, dparam2, fc_live, fc_prebet, gc_live, gc_prebet], index) => {

            const originalDate = new Date(dt);
            const formattedDate = `${originalDate.getDate().toString().padStart(2, '0')}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getFullYear()} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;

            sum_in = ('' + sum_in).replace('.', ',');
            
            let bg_color = "";
            if (fc_live === "VIP Silver1") {
                bg_color = 'silver';                
            } else if (fc_live === "VIP Platinum1") {
                bg_color = 'platinum';
            } else {
                bg_color = '';
            }
            
            return `<tr class="${bg_color}">
            <td>${index + 1}</td>
            <td>${formattedDate}</td>
            <td>${partner_id}</td>
            <td><a href="./user.html?user_id=${user_id}">${user_id}</a></td>
            <td>${gc_live}</td>
            <td>${gc_prebet}</td>
            <td>${fc_live}</td>
            <td>${fc_prebet}</td>
            <td>${outcome}</td>
            <td>${sum_in}</td>
            <td>${currency}</td>
            <td>${coef}</td>
        </tr>`}).join('');
        
        forkTable.insertAdjacentHTML("beforeend", forkMarkup);
    })
    .catch(error => {
        console.error(error);
    }); 