import React, { PureComponent } from 'react';

class Input extends PureComponent {

    render () {

        return (

            <input
                type="text"
                value={this.props.value}
                onChange={this.props.onChange}
                ref={this.props.inputRef}
            />

        );

    }

}

export default Input;