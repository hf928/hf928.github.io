import React, { Component } from 'react';

import Head from '../components/head';

// Default SEO Config
import SEO from '../next-seo.config';

class Error extends Component {

    static getInitialProps ({ res, err }) {

        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    
    }

    componentDidMount () {

        console.log(this.props.statusCode);

    }

    render () {

        return (
            <div>
                <Head
                    seoConfig={{
                        ...SEO,
                        openGraph: {
                            ...SEO,
                        }
                    }}
                />
            </div>
        );
    
    }

}

export default Error;
