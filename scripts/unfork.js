// getSuspiciousUsers()
//     .then(userInfo => {
//         const forkTable = document.querySelector('.fork-table');
//         const forkMarkup = userInfo.map(([partner_id, type_bet, user_id, card_id, currency, cashdesk, dt, coef, is_risk, outcome, tournament_id, tournament_name, category_name, event_name, event_id, result, service, sport, card_sum_in, card_profit, sum_in, profit, coupon_odds, num_of_events, dt_done, is_cashout, market, dparam1, dparam2, fc_live, fc_prebet, gc_live, gc_prebet], index) =>
//             `<tr>
//         <td>${index + 1}</td>
//         <td><a href="./user.html?user_id=${user_id}">${user_id}</a></td>
//         <td>${gc_live}</td>
//         <td>${outcome}</td>
//         <td>${dt}</td>
//     </tr>`).join('');
        
//         forkTable.insertAdjacentHTML("beforeend", forkMarkup);
//     })
//     .catch(error => {
//         console.error(error);
//     });

// getSuspiciousUsers()
//     .then(userInfo => {
//         //console.log(userInfo)
//     })
//     .catch(error => {
//         console.error(error);
//     });

getAllData('fb_db', 'suspicious_stakes')
    .then(userInfo => {
        const forkTable = document.querySelector('.fork-table');
        const forkMarkup = userInfo.map(([partner_id, type_bet, user_id, card_id, currency, cashdesk, dt, coef, is_risk, outcome, tournament_id, tournament_name, category_name, event_name, event_id, result, service, sport, card_sum_in, card_profit, sum_in, profit, coupon_odds, num_of_events, dt_done, is_cashout, market, dparam1, dparam2, fc_live, fc_prebet, gc_live, gc_prebet], index) =>
            `<tr>
        <td>${index + 1}</td>
        <td><a href="./user.html?user_id=${user_id}">${user_id}</a></td>
        <td>${gc_live}</td>
        <td>${outcome}</td>
        <td>${dt}</td>
    </tr>`).join('');
        
        forkTable.insertAdjacentHTML("beforeend", forkMarkup);
    })
    .catch(error => {
        console.error(error);
    }); 