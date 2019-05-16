import React from 'react';
import Link from 'next/link';

import styles from "./index.scss";


import qaimg from '../static/images/Q&A.png';

const Home = () => {


    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                background: '#ff52bb',
                color: '#fff'
            }}>
                <div>
                    <img src={qaimg} className={styles.brightness}></img>
                </div>
            </div>
        </>
    )
}

export default Home
