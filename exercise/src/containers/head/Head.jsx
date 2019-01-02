import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Input from '../../components/Input';
import Button from '../../components/Button';

class Head extends PureComponent {


    render () {


        return (

            <>
                <Input
                    value={this.props.query}
                    onChange={this.props.handleQueryUpdate}
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


export default Head;