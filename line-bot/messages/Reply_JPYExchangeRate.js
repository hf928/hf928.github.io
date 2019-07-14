const request = require('request');
const cheerio = require('cheerio');


let timer;
const delay = 30 * 60 * 1000;
let jpyExRate = 0;

const checkJapanExRate = () => {

    clearTimeout(timer);

    request({
        url: 'http://rate.bot.com.tw/Pages/Static/UIP003.zh-TW.htm',
        method: 'GET'
    }, (error, response, body) => {

        if (body && !error) {

            const querySelector = cheerio.load(body);
            const target = querySelector('.rate-content-sight.text-right.print_hide');
            jpyExRate = target[15].children[0].data;

            timer = setTimeout(checkJapanExRate, delay);
            
        }

    });

}

checkJapanExRate();
  
module.exports = (bot) => {

    bot.on('message', (evt) => {

        if (evt.message.type === 'text') {

            const msg = evt.message.text;
    
            if (msg.indexOf('匯率') !== -1) {

                let replyMsg = '機器人跑跑跑, 請喝口水再詢問';
    
                if (jpyExRate > 0) {

                    replyMsg = `日幣匯率 ${jpyExRate} 啦 (溫柔)
https://rate.bot.com.tw/xrt?Lang=zh-TW`;

                }

                evt.reply(replyMsg);

            }
            
    
        }
    
    });
    
}
