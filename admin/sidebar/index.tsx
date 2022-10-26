import React, { useEffect } from 'react';
import Link from 'next/link';
import { IconContext } from "react-icons";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { IoChatbubblesOutline, IoBarChartOutline } from "react-icons/io5";
import { FaUserShield } from "react-icons/fa";

type SidebarLayout = {
    active: string;
}

function Sidebar(props: SidebarLayout) {

    const {active} = props;    
    useEffect(() => {
        const sidevbar_item = document.getElementById(`sidebar-${active}`);
        sidevbar_item?.classList.add('sidebar-icon-active');
    }, []);

    return (
        <>
            <div className="sidebar-container container-fluid">


                <div className="sub-img">
                    <div className="chat-logo"></div>
                </div>

                <div className="icon-container">

                    <IconContext.Provider value={{ className: "sidebar-icons" }}>

                        <div id='sidebar-chart' className='sidebar-icon'>
                            <Link href="/chart">
                                <a><IoBarChartOutline /></a>
                            </Link>
                        </div>

                        <div id='sidebar-user' className='sidebar-icon '>
                            <Link href="/user">
                                <a><HiOutlineUsers /></a>
                            </Link>
                        </div>

                        <div id='sidebar-room' className='sidebar-icon '>
                            <Link href='/room'>
                                <a><IoChatbubblesOutline /></a>
                            </Link>
                        </div>

                        <div id='sidebar-role' className='sidebar-icon '>
                            <Link href='/role'>
                                <a><FaUserShield /></a>
                            </Link>
                        </div>

                    </IconContext.Provider>

                </div>

            </div>
        </>
    )
}

export default Sidebar