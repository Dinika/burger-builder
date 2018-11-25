import React, {Component} from 'react';
import Aux from '../../HOC/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerOpened: false
    }

    onSideDrawerOpened() {
        this.setState({
            sideDrawerOpened: true
        })
    }

    onSideDrawerClosed() {
        this.setState({
            sideDrawerOpened: false
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar onSideDrawerOpened={this.onSideDrawerOpened.bind(this)} />
                <SideDrawer
                    sideDrawerOpened={this.state.sideDrawerOpened}
                    onSideDrawerClosed={this.onSideDrawerClosed.bind(this)} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;