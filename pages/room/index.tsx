import React from 'react';
import Head from 'next/head';
import Admin from '../../admin/index';

function Rooms() {
    return (
        <>
            <Head>
                <title>Admin Room</title>
            </Head>
            <Admin sidebar='room'>
                <p>Rooms</p>
            </Admin>
        </>
    )
}

export default Rooms