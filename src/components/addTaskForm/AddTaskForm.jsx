import useAuth from "../../hooks/auth.hook"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { fetchSaveTask } from "./addTaskFormSlice";
import { useNavigate } from "react-router-dom";
import "./addtaskform.css"
import { constants } from "../../constants/constants";

const AddTaskForm = () => {

    const { userId } = useAuth();
    const { activeDate } = useSelector(state => state.calendarSlice)
    const { loading } = useSelector(state => state.addTaskFormSlice)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const saveTask = (e) => {
        e.preventDefault()
        dispatch(fetchSaveTask({userId, title, description, activeDate}))
        navigate(`/day/${activeDate}`)
    }

    if (loading === 'error') {
        return <p>{constants.wentWrong}</p>
    }

    return (
        <>
            <form onSubmit={saveTask} className='new-task-form'>
                <textarea name="title" className="title-text" minLength={3} maxLength={100} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required/>
                <textarea name="description" className="description-text" maxLength={1000} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="btn-stand">{constants.save}</button>
            </form>
        </>
    )
}

export default AddTaskForm