import React from 'react';
import Head from 'next/head';
import Admin from '../../admin/index';
import Room from './room';

function Rooms() {
    return (
        <>
            <Head>
                <title>User management</title>
            </Head>

            <Admin sidebar='room'>
                <Room/>
            </Admin>
        </>
    )
}

export default Rooms