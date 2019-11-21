import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Input from '../Input';

// fetch '/api/members'
async function getMembers (name = '') {

    const res = await axios.get('http://localhost:8080/api/members/' + name);

    const resList = res.data;

    return resList;

};

const Search = (props) => {

    const { setList } = props;
    const searchInputRef = useRef();

    const [searchQuery, setSearchQuery] = useState('');

    // 等同於 componentDidMount + componentDidUpdate
    useEffect(() => {

        const timer = setTimeout(async () => {
            
            if (searchQuery === searchInputRef.current.value) {

                const memberList = await getMembers(searchQuery);

                setList(memberList);

            }

        }, 500);

        // 等同於 componentWillUnmount
        return () => clearTimeout(timer);
        
    }, [searchQuery, setList]);

    
    const handleSearchQueryUpdate = (e) => {

        setSearchQuery(e.target.value);

    }


    return (

        <div>
            <Input
                inputRef={searchInputRef}
                value={searchQuery}
                onChange={handleSearchQueryUpdate}
            />
        </div>

    );

};

Search.propTypes = {
    setList: PropTypes.func.isRequired
}

export default React.memo(Search);
