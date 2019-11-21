import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Input from '../Input';
import Button from '../Button';
import wrapper from '../../hoc/wrapper.js';

class Head extends PureComponent {

    alert = () => {

        alert('terry');

    }


    render () {

        return (

            <div style={{ backgroundColor: '#888' }}>
                <Input
                    value={this.props.query}
                    onChange={(e) => this.props.handleQueryUpdate(e.target.value)}
                    inputRef={this.props.inputRef}
                />
                <Button
                    onClick={this.props.handleListUpdate}
                />
            </div>

        );

    }


}

Head.propTypes = {
    query: PropTypes.string.isRequired,
    handleQueryUpdate: PropTypes.func.isRequired,
    handleListUpdate: PropTypes.func.isRequired
}

const classes = ['header1', 'mainheader888888', 'hello'].join(' ');

export default wrapper(Head, classes);