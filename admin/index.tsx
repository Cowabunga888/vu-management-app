import Head from 'next/head';
import React from 'react';
import Header from './header';
import Sidebar from './sidebar';

type AdminLayout = {
    children: React.ReactNode;
    sidebar: string;
}

export default function Admin(props: AdminLayout) {
    const {children} = props;
    const {sidebar} = props;
    return (
        <>

            <div className="admin-container container-fluid">
                <div className="row">
                    <div className="col-1 p-0">
                        <Sidebar active={sidebar}/>
                    </div>

                    <div className="col-11 p-0">

                        <div className="row m-0">
                            <div className="col-12 p-0">
                                <Header />
                            </div>
                        </div>

                        <div className="row m-0">
                            <div className="col-12 content-container">
                                {children}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
