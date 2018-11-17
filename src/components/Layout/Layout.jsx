import React from 'react';
import Aux from '../../HOC/Aux';

const Layout = (props) => (
    <Aux>
        <div>Toolbar, Backdrop, </div>
        <main>
            {props.children}
        </main>
    </Aux>
)

export default Layout;