import * as React from 'react';
import Title from './Title';
import './Content.css';

const Content = (props) => {
    return (
      <div style={{display: "flex", flexDirection: 'column', marginLeft: 5, ...props.style}}>
          <Title/>
          {props.children}
      </div>
    );
}

export default Content;