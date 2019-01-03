import React, { PureComponent } from 'react';

const wrapper = (Componet, classes) => {
    
    const NewComponet = class extends PureComponent {

        render () {

            return (
     
                <header className={classes}>
                    <Componet {...this.props} ref={this.props.forwardRef} />
                </header>

            );

        }
        
    }

    return React.forwardRef((props, ref) => (
        <NewComponet {...props} forwardRef={ref} />
    ));

};

export default wrapper;
