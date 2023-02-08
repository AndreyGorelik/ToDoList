import "./tasklist.css";
import { constans } from "../../constans/constans";
import useAuth from "../../hooks/auth.hook";
import { ReactComponent as Spinner } from "../../assets/images/spinner.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getAllTasks, setTaskDone } from "../wrapperSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const { tasks, loadingTasks } = useSelector((state) => state.allTasks);
  const { activeDate } = useSelector((state) => state.calendarSlice);

  const [formattedTasks, setFormattedTasks] = useState([]);

  useEffect(() => {
    dispatch(getAllTasks(userId));
  }, []);

  useEffect(() => {
    if (tasks?.[activeDate] !== undefined && tasks?.[activeDate] !== null) {
      setFormattedTasks(Object.values(tasks?.[activeDate]));
    } else {
      setFormattedTasks([]);
    }
  }, [tasks, activeDate]);

  const changeTaskStatus = (id) => {
    dispatch(setTaskDone({ activeDate, id, userId }));
  };

  if (loadingTasks === "loading") {
    return <div className="spinner"><Spinner /></div>;
  }

  return (
    <>
      <div className="tasks-count">
        {formattedTasks.length > 0 ? (
          <h1>{`${formattedTasks.length} ${constans.taskPlanned}`}</h1>
        ) : (
          <h1>{constans.noTasks}</h1>
        )}
      </div>
      <div className="tasks-list">
        {formattedTasks.length > 0
          ? formattedTasks
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((item) => {
                return (
                  <div className="task" key={item.id}>
                    <input
                      type="checkbox"
                      id={item.id}
                      className="done-checkbox"
                      checked={item.done}
                      onChange={() => changeTaskStatus(item.id)}
                    />
                    <label htmlFor={item.id}></label>
                    <Link to={`/tasks/${item.id}`}>
                      <h2>{item.title}</h2>
                    </Link>
                  </div>
                );
              })
          : null}
      </div>
    </>
  );
};

export default TaskList;
