import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import MyVerticallyCenteredModal from './updateTask';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromServer, getTaskFromServer, removeTask, selectedInTask } from '../slices/taskSlice';

const TaskList = () => {

    const dispatch = useDispatch()

    const { tasksList } = useSelector((state) => state.tasks)
    const [modalShow, setModalShow] = useState(false)

    const updateTask = (task) => {
        console.log("update task")
        setModalShow(true);
        dispatch(selectedInTask(task))
    }
    const deleteTask = (task) => {
        alert("Are Sure want to delete?")
        dispatch(deleteFromServer(task))

            .unwrap()
            .then(() => {
                dispatch(removeTask(task))
            })
    }

    useEffect(() => {
        dispatch(getTaskFromServer())
    }, [dispatch])
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <th>#</th>
                        <th>Title</th>
                        <th>Descripition</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksList && tasksList.map((task, index) => (
                        <tr className='text-center' key={task.id}>
                            <td>{index + 1}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>
                                <Button variant="primary" className='mx-3' onClick={() => updateTask(task)}>
                                    <i className="bi bi-pencil-square"></i>
                                </Button>{' '}
                                <Button variant="danger" onClick={() => deleteTask(task)}>
                                    <i className="bi bi-trash3"></i>
                                </Button>{' '}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>


            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}

            />
        </>
    )
}

export default TaskList