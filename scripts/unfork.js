getAllData('fb_db', 'suspicious_stakes')
    .then(userInfo => {
        const forkTable = document.querySelector('.fork-table');
        const forkMarkup = userInfo.map((item, index) => {
            const partner_id = item[0];
            const type_bet = item[1];
            const user_id = item[2];
            const card_id = item[3];
            const currency = item[4];
            const cashdesk = item[5];
            const dt = item[6];
            const coef = item[7];
            const is_risk = item[8];
            const outcome = item[9];
            const tournament_id = item[10];
            const tournament_name = item[11];
            const category_name = item[12];
            const event_name = item[13];
            const event_id = item[14];
            const result = item[15];
            const service = item[16];
            const sport = item[17];
            const card_sum_in = item[18];
            const card_profit = item[19];
            let sum_in = item[20];
            const profit = item[21];
            const coupon_odds = item[22];
            const num_of_events = item[23];
            const dt_done = item[24];
            const is_cashout = item[25];
            const market = item[26];
            const dparam1 = item[27];
            const dparam2 = item[28];
            const fc_live = item[29];
            const fc_prebet = item[30];
            const gc_live = item[31];
            const gc_prebet = item[32];

            const additionalValue = item.additionalValue;

            // ЛОГИКА

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
            <td>${additionalValue[31]}</td>
        </tr>`}).join('');
        
        forkTable.insertAdjacentHTML("beforeend", forkMarkup);
    })
        .catch(error => {
        console.error(error);
    }); 
        // const forkTable = document.querySelector('.fork-table');
        // const forkMarkup = userInfo.map(([partner_id, type_bet, user_id, card_id, currency, cashdesk, dt, coef, is_risk, outcome, tournament_id, tournament_name, category_name, event_name, event_id, result, service, sport, card_sum_in, card_profit, sum_in, profit, coupon_odds, num_of_events, dt_done, is_cashout, market, dparam1, dparam2, fc_live, fc_prebet, gc_live, gc_prebet], index) => {

        //     const originalDate = new Date(dt);
        //     const formattedDate = `${originalDate.getDate().toString().padStart(2, '0')}.${(originalDate.getMonth() + 1).toString().padStart(2, '0')}.${originalDate.getFullYear()} ${originalDate.getHours().toString().padStart(2, '0')}:${originalDate.getMinutes().toString().padStart(2, '0')}:${originalDate.getSeconds().toString().padStart(2, '0')}`;

        //     sum_in = ('' + sum_in).replace('.', ',');
            
        //     let bg_color = "";
        //     if (fc_live === "VIP Silver1") {
        //         bg_color = 'silver';                
        //     } else if (fc_live === "VIP Platinum1") {
        //         bg_color = 'platinum';
        //     } else {
        //         bg_color = '';
        //     }
            
        //     return `<tr class="${bg_color}">
        //     <td>${index + 1}</td>
        //     <td>${formattedDate}</td>
        //     <td>${partner_id}</td>
        //     <td><a href="./user.html?user_id=${user_id}">${user_id}</a></td>
        //     <td>${gc_live}</td>
        //     <td>${gc_prebet}</td>
        //     <td>${fc_live}</td>
        //     <td>${fc_prebet}</td>
        //     <td>${outcome}</td>
        //     <td>${sum_in}</td>
        //     <td>${currency}</td>
        //     <td>${coef}</td>
        // </tr>`}).join('');
        
        // forkTable.insertAdjacentHTML("beforeend", forkMarkup);
    // .catch(error => {
    //     console.error(error);
    // }); 