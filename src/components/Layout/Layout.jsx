import React from 'react';
import Aux from '../../HOC/Aux';
import styles from './Layout.module.css';

const Layout = (props) => (
    <Aux>
        <div>Toolbar, Backdrop, Sidebar </div>
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
)

export default Layout;