import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Input';
import Button from '../../components/Button';
import wrapper from '../../hoc/wrapper.js';

class Head extends PureComponent {

    alert = () => {

        alert('terry');

    }


    render () {

        return (

            <>
                <Input
                    value={this.props.query}
                    onChange={this.props.handleQueryUpdate}
                    inputRef={this.props.inputRef}
                />
                <Button
                    onClick={this.props.handleListUpdate}
                />
            </>

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