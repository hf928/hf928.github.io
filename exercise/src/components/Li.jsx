import React, { PureComponent } from 'react';

class Li extends PureComponent {

    constructor (props) {

        super(props);

        console.log('[Li] constructor');
        
    }
    
    componentWillMount () {

        console.log('[Li] componentWillMount');
        
    }

    componentDidMount () {

        console.log('[Li] componentDidMount');
        
    }

    componentWillUpdate (nextProps, nextState) {

        console.log('[Li] componentWillUpdate');
        
    }

    componentDidUpdate (prevProps, prevState) {

        console.log('[Li] componentDidUpdate');
        
    }
    
    render () {
        
        console.log('[Li] render');

        return (
            <li>{this.props.children}</li>
        );

    }

}

export default Li;