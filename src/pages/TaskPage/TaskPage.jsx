import { constans } from "../../constans/constans";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  setTaskDone,
  removeTask,
  updateTask,
} from "../../components/wrapperSlice";
import useAuth from "../../hooks/auth.hook";

const TaskPage = () => {
  const { tasks } = useSelector(state => state.allTasks);
  const { activeDate } = useSelector(state => state.calendarSlice);
  const { userId } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const editRef = useRef("");
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (
      tasks?.[activeDate]?.[id] !== undefined &&
      tasks?.[activeDate]?.[id] !== null
    ) {
      setTitle(tasks[activeDate][id].title);
      setDescription(tasks[activeDate][id].description);
      setDone(tasks?.[activeDate]?.[id]?.done)
    }
  }, [tasks]);

  useEffect(() => {
    if (editMode) {
      editRef.current.focus();
    }
  }, [editMode]);

  const deleteTask = () => {
    dispatch(removeTask({ userId, activeDate, id }));
    navigate(`/day/${activeDate}`);
  };

  const changeTask = () => {
    if (!editMode) {
      setEditMode(true);
    } else {
      dispatch(updateTask({ userId, activeDate, id, title, description }));
      setEditMode(false);
    }
  };

  const cancelChanges = () => {
    setTitle(tasks[activeDate][id].title);
    setDescription(tasks[activeDate][id].description);
    setEditMode(false);
  };

  const changeTaskStatus = () => {
    dispatch(setTaskDone({ activeDate, id, userId, done }));
  };

  return (
    <>
      <div className="wrapper">
        {editMode ? <h1>Edit task</h1> : null}
        {editMode ? null : (
          <>
            <div className="task-title">
              <h1>{title}</h1>
            </div>
            <div className="task-description-full">{description}</div>
          </>
        )}
        <div className="edit-area">
        {editMode ? (
          <textarea
            ref={editRef}
            value={title}
            className='edit-title'
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : null}
        {editMode ? (
          <textarea
            value={description}
            className='edit-description'
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : null}
        </div>
       
      </div>
      <div className="foot">
        <div className="task-controls">
          <div className="task-check">
            <input
              type="checkbox"
              id="taskdone"
              className="done-checkbox"
              checked={done}
              onChange={changeTaskStatus}
            />
            <label htmlFor="taskdone">Done</label>
          </div>
          

          <div className="task-edit">
            {editMode ? null : (
              <button
                type="button"
                className="btn-stand edit-mode"
                onClick={deleteTask}
              >
                {constans.delete}
              </button>
            )}
            <button
              type="button"
              className="btn-stand edit-mode"
              onClick={changeTask}
            >
              {editMode ? "Save" : "Edit"}
            </button>
            {editMode ? (
              <button
                type="button"
                className="btn-stand edit-mode"
                onClick={cancelChanges}
              >
                {constans.cancel}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
