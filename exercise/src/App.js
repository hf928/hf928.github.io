import React, { useState, useRef, useCallback, useReducer, useMemo } from 'react';
import './App.css';

import Add from './components/head/Add';
import Search from './components/head/Search';

import List from './components/list/List';

const initState = {
    list: [],
    query: ''
};

const stateReducer = (state, action) => {

    const newState = { ...state };

    switch (action.type) {

        case 'UPDATE_QUERY':

            newState.query = action.query;

            break;

        case 'UPDATE_LIST_BY_QUERY':

            newState.list = [...newState.list, newState.query];
            newState.query = '';

            break;

        case 'UPDATE_LIST':

            newState.list = action.list;

            break;

        default:
            
            throw new Error('Something went wrong.');

    }

    return newState;

};

const App = (props) => {

    const inputRef = useRef();
    // const AddRef = useRef();

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

    const [state, dispatch] = useReducer(stateReducer, initState);

    // const [query, setQuery] = useState('8889999');
    // const [list, setList] = useState([
    //     'Sophia',
    //     'Terry',
    //     'Betty',
    //     'Jason',
    //     'Odin',
    // ]);


    // const [list, setList] = useState([]);

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
        
        // setList(newList);
        
        dispatch({ type: 'UPDATE_LIST', list: newList });

    }, []);


    const handleQueryUpdate = useCallback((newQuery) => {

        // setQuery(newQuery);
        dispatch({ type: 'UPDATE_QUERY', query: newQuery });

    }, []);

    
    const handleListUpdate = useCallback(() => {

        if (state.query !== '') {

            // const newList = [...list, state.query];

            // setList(newList);
            // setQuery('');
            
            dispatch({ type: 'UPDATE_LIST_BY_QUERY' });

            console.log(inputRef);
            // console.log(AddRef);

            inputRef.current.focus();
            // AddRef.current.alert();

        }

    }, [inputRef, state.query]);


    return (
        <div className="App">
            <Add
                query={state.query}
                handleQueryUpdate={handleQueryUpdate}
                handleListUpdate={handleListUpdate}
                inputRef={inputRef}
                // ref={AddRef}
            />
            <hr/>
            <Search
                setList={setListWithLog}
            />
            <hr/>
            <List
                data={state.list}
            />
        </div>
    );
    

}

export default App;
