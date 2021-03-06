import App, { Container } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store/store';

class TGO extends App {

    static async getInitialProps ({ Component, ctx }) {

        let pageProps = {};

        if (Component.getInitialProps) {

            pageProps = await Component.getInitialProps({ ctx });

        }

        return { pageProps };

    }

    render () {

        const {
            Component,
            pageProps,
            store,
            router
        } = this.props;

        return (
            <Container>
                <Provider store={store}>
                    <Component
                        {...pageProps}
                        url={router}
                    />
                </Provider>
            </Container>
        );

    }

}

export default withRedux(createStore)(withReduxSaga(TGO));
