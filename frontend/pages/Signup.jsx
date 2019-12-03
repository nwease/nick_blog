import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            <h2>
                SIGNUP
            </h2>

            <Link href='/'>
                <a>
                    Home
                </a>
            </Link>
        </Layout>
    );
};

export default Signup;

