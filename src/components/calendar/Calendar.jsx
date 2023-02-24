import "./calendar.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { setActiveDate, setDaysCount } from "./calendarSlice";
import { constants } from "../../constants/constants";

const Calendar = ({ additionalMonth }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nowDate = new Date();
  const currentYear = nowDate.getFullYear();
  const currentMonth = nowDate.getMonth();
  const currentDate = nowDate.getDate();
  console.log("rend", "render");

  
  useEffect(() => {
    console.log('useEffect', "useEffect")
    if (!id) {
      const dateFormat =
        "" +
        currentYear +
        (currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1) +
        (currentDate < 10 ? "0" + currentDate : currentDate);
      dispatch(setActiveDate(dateFormat));
      navigate(`${"day/" + dateFormat}`);
    }
  }, []);

  function createCalendar(additionalMonth) {
    const lastDayInMonth = new Date(currentYear, currentMonth + 1, 0);
    const nextMonthStart = new Date(currentYear, currentMonth + 1, 1);

    const nextMonthFinish = new Date(
      currentYear,
      nextMonthStart.getMonth() + additionalMonth,
      1
    );

    const additionalDaysToRender =
      additionalMonth > 0 &&
      (nextMonthFinish - nextMonthStart) / (1000 * 60 * 60 * 24);

    const daysForCalendar =
      lastDayInMonth.getDate() - currentDate + additionalDaysToRender;
    const activeCalendar = [];

    for (let i = 0; i <= daysForCalendar; i++) {
      const oneDay = new Date(currentYear, currentMonth, currentDate + i);
      activeCalendar.push({
        date: oneDay.getDate(),
        dayName: constants.daysName[oneDay.getDay()],
        month: oneDay.getMonth(),
        monthName: constants.monthsName[oneDay.getMonth()],
        year: oneDay.getFullYear(),
      });
    }

    dispatch(setDaysCount(activeCalendar.length));
    return activeCalendar;
  }

  const aaa = createCalendar(additionalMonth);

  const changeDate = (year, month, date) => {
    const dateFormat =
      "" +
      year +
      (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
      (date < 10 ? "0" + date : date);
      
    dispatch(setActiveDate(dateFormat));
    navigate(`${"day/" + dateFormat}`);
  };

  return (
    <>
      <div className="calendar">
        {aaa?.map((item) => {
          const dateFormat =
            "" +
            item.year +
            (item.month < 10 ? "0" + (item.month + 1) : item.month + 1) +
            (item.date < 10 ? "0" + item.date : item.date);
          return (
            <Link to={`/day/${dateFormat}`} key={nanoid()}>
              <div
                className={id === dateFormat ? `one-day active` : `one-day`}
                onClick={() => changeDate(item.year, item.month, item.date)}
              >
                <div className="month">{item.monthName}</div>
                <div className="date">{item.date}</div>
                <div className="day">{item.dayName}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
