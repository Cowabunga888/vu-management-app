import React, { useEffect } from 'react';
import { IconContext } from "react-icons";
import { HiUsers } from 'react-icons/hi';
import { AiFillBell } from "react-icons/ai";

function Header() {

    return (
        <>
            <div className="header-container container-fluid">
                <div className="header-admin-infor">
                    <IconContext.Provider value={{ className: "header-icons" }}>
                        <div className='header-icon'>
                            <HiUsers />
                        </div>

                        <div className='header-icon'>
                            <AiFillBell />
                        </div>
                    </IconContext.Provider>

                    <div className="admin-img">
                        <img src="https://material-kit-react.devias.io/static/images/avatars/avatar_2.png" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header