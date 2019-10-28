import React, { useState, useRef } from 'react';
import './App.css';

import Head from './components/head/Head';
import List from './components/list/List';

const App = (props) => {

    // const [appState, setAppState] = useState({

    //     query: '8889999',
    //     list: [
    //         'Sophia',
    //         'Terry',
    //         'Betty',
    //         'Jason',
    //         'Odin',
    //     ]

    // });

    const [query, setQuery] = useState('8889999');
    const [list, setList] = useState([
        'Sophia',
        'Terry',
        'Betty',
        'Jason',
        'Odin',
    ]);


    const inputRef = useRef(null);
    const headRef = useRef(null);

    const handleQueryUpdate = (e) => {

        setQuery(e.target.value);

    }

    const handleListUpdate = () => {

        if (query !== '') {

            const newList = [...list, query];

            setList(newList);
            setQuery('');

            console.log(inputRef);
            console.log(headRef);

            inputRef.current.focus();
            // headRef.current.alert();
        }

    }


    return (
        <div className="App">
            <Head
                query={query}
                handleQueryUpdate={handleQueryUpdate}
                handleListUpdate={handleListUpdate}
                inputRef={inputRef}
                ref={headRef}
            />
            <List
                data={list}
            />
        </div>
    );
    

}

export default App;
