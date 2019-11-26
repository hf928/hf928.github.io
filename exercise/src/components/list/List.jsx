import React, { Component } from 'react';
import Li from '../Li';

const lis = (data) => data.map((text, idx) => (
    <Li key={`${text}${idx}`} >{text}</Li>
));


const List = (props) => {

    console.log('[LIST] render');
    
    return (
        <ul>
            {lis(props.data)}
        </ul>
    );

}

export default List;