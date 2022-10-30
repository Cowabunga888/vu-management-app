import React from 'react';
import Admin from '../../admin/index';
import Head from 'next/head';
import User from './user';
function Users() {
  return (
    <>
      <Head>
        <title>User management</title>
      </Head>

      <Admin sidebar='user'>
        <User/>
      </Admin>
    </>
  )
}

export default Users