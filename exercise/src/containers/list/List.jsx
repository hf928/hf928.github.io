import React, { PureComponent } from 'react';

const lis = (data) => data.map((text, idx) => <li key={`${text}${idx}`}>{text}</li>);


class List extends PureComponent {


    render () {

        // const lis = this.props.data.map((text, idx) => <li key={`${text}${idx}`}>{text}</li>);

        return (

            <ul>
                {lis(this.props.data)}
            </ul>

        );

    }


}


export default List;