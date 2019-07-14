const request = require('request');
const cheerio = require('cheerio');

module.exports = (bot) => {

    let timer;
    const delay = 60 * 1000;
    const twicePushDelay = 10 * delay;

    const checkJapanExRate = () => {

        clearTimeout(timer);

        request({
            url: 'http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm',
            method: 'GET'
        }, (error, response, body) => {

            if (body && !error) {

                let curDelay = delay;

                const querySelector = cheerio.load(body);
                const target = querySelector('.rate-content-sight.text-right.print_hide');
                const jpyExRate = target[15].children[0].data;
                
                const utcHour = new Date().getHours();

                // 台銀匯率低於目標匯率
                if (jpyExRate < +process.env.JPYBuyExRate
                    // +08:00時區, 8點後24點前, 才推送
                    && (utcHour > 0 && utcHour < 16)) {

                    bot.broadcast(`現在日幣匯率 ${jpyExRate}`);

                    curDelay += twicePushDelay;

                }

                timer = setTimeout(checkJapanExRate, curDelay);
                
            }

        });

    }

    checkJapanExRate();

}
