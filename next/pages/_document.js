import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

import { GTM_TRACKING_ID } from '../utility/gtag';

export default class MyDocument extends Document {

    static async getInitialProps (ctx) {

        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps };

    }

    render () {

        return (
            <html lang="zh-Hant-TW">
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <meta name="apple-itunes-app" content="app-id=123456" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <noscript>
                        <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_TRACKING_ID}`}
                            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}>
                        </iframe>
                    </noscript>
                </body>
            </html>
        );
    
    }

}
