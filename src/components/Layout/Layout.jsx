import React from 'react';
import Aux from '../../HOC/Aux';
import styles from './Layout.module.css';
import Toolbar from '../Toolbar/Toolbar';

const Layout = (props) => (
    <Aux>
        <Toolbar />
        <main className={styles.Content}>
            {props.children}
        </main>
    </Aux>
)

export default Layout;