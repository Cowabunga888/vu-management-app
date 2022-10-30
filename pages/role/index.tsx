import React from 'react';
import Head from 'next/head';
import Admin from '../../admin/index';
import Role from './role';

function Roles() {
    return (
        <>
            <Head>
                <title>Roles management</title>
            </Head>

            <Admin sidebar='role'>
                <Role/>
            </Admin>
        </>
    )
}

export default Roles