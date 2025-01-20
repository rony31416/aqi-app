import React from 'react'
import Button from '@mui/material/Button';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul>
            <li>
            <Button className='w-100'>
                <span className='icon'>
                    <RxDashboard /> 
                </span>
                Dashboard
                <span className='arrow'>
                    <MdOutlineKeyboardArrowRight /> 
                </span>
            </Button>
            </li>
        </ul>

    </div>
  )
}

export default Sidebar