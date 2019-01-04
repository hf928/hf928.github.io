import React, { Component } from 'react';
import './App.css';

import Head from './containers/head/Head';
import List from './containers/list/List';

class App extends Component {

    constructor (props) {

        super(props);

        this.state = {

            query: '888',
            list: [
                'Sophia',
                'Terry',
                'Betty',
                'Jason',
            ]

        };

        this.inputRef = React.createRef();
        this.headRef = React.createRef();

    }

    handleQueryUpdate = (e) => {

        this.setState({
            query: e.target.value
        });

    }

    handleListUpdate = () => {

        if (this.state.query !== '') {

            const list = [...this.state.list, this.state.query];

            this.setState({
                list,
                query: ''
            });

            console.log(this.inputRef);
            console.log(this.headRef);

            this.inputRef.current.focus();
            // this.headRef.current.alert();
        }

    }

    render () {
        return (
            <div className="App">
                <Head
                    query={this.state.query}
                    handleQueryUpdate={this.handleQueryUpdate}
                    handleListUpdate={this.handleListUpdate}
                    inputRef={this.inputRef}
                    ref={this.headRef}
                />
                <List
                    data={this.state.list}
                />
            </div>
        );
    }

}

export default App;
