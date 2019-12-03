import React from 'react';
import NavBar from './NavBar';

const Layout = ({children}) => {
    return (
        <>
            <NavBar />

            {children}

            <p>
                FOOTER
            </p>
        </>
    );
};

export default Layout;
