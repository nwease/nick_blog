import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const Header = () => {
    return (
        <Layout>
            <h2>
                HEADER
            </h2>

            <Link href='/signup'>
                <a>
                    Signup
                </a>
            </Link>
        </Layout>
    );
};

export default Header;
