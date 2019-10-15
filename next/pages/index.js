import React from 'react';
import Link from 'next/link';
import NextSeo from 'next-seo';

// Default SEO Config
import SEO from '../next-seo.config';

import styles from "./index.scss";


import qaimg from '../static/images/Q&A.png';

const Home = () => {


    return (
        <>
            <NextSeo
                config={{
                    ...SEO,
                    title: 'Home',
                    openGraph: {
                        ...SEO,
                        title: 'Home',
                    }
                }}
            />
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                background: '#ff52bb',
                color: '#fff'
            }}>
                <div>
                    <img src={qaimg} className={styles.brightness}></img>
                    <Link href="/test">
                        <a>test</a>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Home;
