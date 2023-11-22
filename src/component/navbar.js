import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const { tasksList } = useSelector((state) => state.tasks)
    return (
        <div>
            <h1 className='text-center text-primary'>Project Management</h1>
            <p className='text-center'>{`Currently ${tasksList.length} task(s) pending`}</p>
        </div>
    )
}

export default Navbar