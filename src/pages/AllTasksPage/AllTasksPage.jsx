import "./alltaskspage.css"
import Calendar from "../../components/calendar/Calendar";
import TaskList from "../../components/taskList/TaskList";
import StatusBar from "../../components/statusBar/StatusBar";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { constants } from "../../constants/constants";
const AllTasksPage = () => {
  const [month, setMonth] = useState(0);

  const containerRef = useRef(null);

  const scrollContainerButtons = (distance) => {
    const { scrollLeft, scrollWidth, clientWidth } = containerRef?.current;

    if (scrollLeft + distance + clientWidth >= scrollWidth) {
      if (month <= 5) {
        setMonth(month + 1);
      }
    }

    containerRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  // const scrollContainerScroll = () => {
  //   const { scrollLeft, scrollWidth, clientWidth } = containerRef?.current;

  //   if (Math.round(scrollLeft + clientWidth) >= scrollWidth) {
  //     if (month <= 5) {
  //       setMonth(month + 1);
  //     }
  //   }
  // };

  return (
    <>
      <div className="wrapper">
        <div className="calendar-main">
          <button
            type="button"
            className="arrow left"
            onClick={() => scrollContainerButtons(-400)}
          ></button>
          <div
            className="calendar-dot"
            ref={containerRef}
            // onScroll={scrollContainerScroll}
          >
            <Calendar additionalMonth={month} />
            <StatusBar />
          </div>
          <button
            type="button"
            className="arrow right"
            onClick={() => scrollContainerButtons(400)}
          ></button>
        </div>
        <TaskList />
      </div>
      <div className="foot">
        <Link to="/add">
          <button className="btn-stand mt-30">{constants.addNewTask}</button>
        </Link>
      </div>
    </>
  );
};

export default AllTasksPage;
