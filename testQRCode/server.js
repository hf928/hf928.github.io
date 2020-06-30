const express = require('express');
const app = express();

const AwesomeQR = require('./awesome-qr-node-fork');
const Canvas = require('canvas');

const getQRCode = async (req, res) => {

    // 取 ?src= 的值
    const imgSrc = req.query.src;

    if (imgSrc) {

        const backgroundImage = await Canvas.loadImage(imgSrc);

        new AwesomeQR().create({
            text: '123456',
            size: 500,
            backgroundImage,
            autoColor: true,
            callback: (data) => {
        
                if (data === undefined) {

                    res.send('Something went wrong...');

                }
                else {

                    res.set('Content-Type', 'image/png')
                    res.send(data);

                }

                res.end();

            }
        });

    }
    else {

        res.send('No src param.');
        res.end();

    }

}


app.get('/qrcode', getQRCode);
app.listen(process.env.PORT || 8080, () => {

    console.log('Now listening...');
    
});
