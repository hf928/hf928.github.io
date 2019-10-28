import React, { PureComponent } from 'react';
import Li from '../Li';

const lis = (data) => data.map((text, idx) => (
    <Li key={`${text}${idx}`} >{text}</Li>
));


class List extends PureComponent {

    constructor (props) {

        super(props);

        console.log('[List] constructor');
        
    }

    componentWillMount () {

        console.log('[List] componentWillMount');
        
    }

    componentDidMount () {

        console.log('[List] componentDidMount');
        
    }

    componentWillUpdate (nextProps, nextState) {

        console.log('[List] componentWillUpdate');
        
    }

    componentDidUpdate (prevProps, prevState) {

        console.log('[List] componentDidUpdate');
        
    }
    
    render () {
        
        console.log('[List] render');

        // const lis = this.props.data.map((text, idx) => <li key={`${text}${idx}`}>{text}</li>);

        return (

            <ul>
                {lis(this.props.data)}
            </ul>

        );

    }


}


export default List;