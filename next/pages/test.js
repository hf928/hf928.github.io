import React from 'react';
import Link from 'next/link';
import NextSeo from 'next-seo';

// Default SEO Config
import SEO from '../next-seo.config';

const Test = () => {


    return (
        <>
            <NextSeo
                config={{
                    ...SEO,
                    title: 'Test',
                    openGraph: {
                        ...SEO,
                        title: 'Test',
                    }
                }}
            />
            <div>
                <Link href="/">
                    <a>home</a>
                </Link>
            </div>
        </>
    )
}

export default Test
