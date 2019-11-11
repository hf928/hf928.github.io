import React, { useState, useRef, useCallback } from 'react';
import './App.css';

import Add from './components/head/Add';
import Search from './components/head/Search';

import List from './components/list/List';

const App = (props) => {

    const inputRef = useRef();
    const AddRef = useRef();

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
    // const [list, setList] = useState([
    //     'Sophia',
    //     'Terry',
    //     'Betty',
    //     'Jason',
    //     'Odin',
    // ]);


    const [list, setList] = useState([]);

    // 等同於 componentDidMount
    // useEffect(() => {

    //     async function getMembers () {

    //         const res = await axios.get('http://localhost:8080/api/members');

    //         const resList = res.data;

    //         setList(resList);

    //     } 

    //     getMembers();

    // }, []);
    

    const setListWithLog = useCallback((newList) => {

        console.log(newList);
        
        setList(newList);

    }, []);


    const handleQueryUpdate = useCallback((e) => {

        setQuery(e.target.value);

    }, []);

    
    const handleListUpdate = () => {

        if (query !== '') {

            const newList = [...list, query];

            setListWithLog(newList);
            setQuery('');

            console.log(inputRef);
            console.log(AddRef);

            inputRef.current.focus();
            // AddRef.current.alert();
        }

    }

    return (
        <div className="App">
            <Add
                query={query}
                handleQueryUpdate={handleQueryUpdate}
                handleListUpdate={handleListUpdate}
                inputRef={inputRef}
                ref={AddRef}
            />
            <hr/>
            <Search
                setList={setListWithLog}
            />
            <hr/>
            <List
                data={list}
            />
        </div>
    );
    

}

export default App;
