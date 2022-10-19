import React from 'react';
import Head from 'next/head';
import Admin from '../../admin/index';
function Chart() {
  return (
    <>
      <Head>
        <title>Admin Chart</title>
      </Head>
      <Admin sidebar='chart'>
        <p>Chart</p>
      </Admin>
    </>
  )
}

export default Chart