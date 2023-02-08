import "./calendar.css";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import { setActiveDate, setDaysCount } from "./calendarSlice";
import { constans } from "../../constans/constans";

const Calendar = ({ nextMonthPlus }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nowDate = new Date();
  const currentYear = nowDate.getFullYear();
  const currentMonth = nowDate.getMonth();
  const currentDate = nowDate.getDate();

  const [activeCalendar, setActiveCalendar] = useState([]);
  const [nextMonth, setNextMonth] = useState(0);

  useEffect(() => {
    setNextMonth(nextMonthPlus);
  }, [nextMonthPlus]);

  useEffect(() => {
    dispatch(setActiveDate(id));
    if (!id) {
      const dateFormat =
        "" +
        currentYear +
        (currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1) +
        (currentDate < 10 ? "0" + currentDate : currentDate);
      navigate(`${"day/" + dateFormat}`);
    }
  }, [id]);

  useEffect(() => {
    dispatch(setDaysCount(activeCalendar.length));
  }, [activeCalendar]);

  useEffect(() => {
    createCalendar();
    dispatch(setDaysCount(activeCalendar.length));
  }, [nextMonth]);

  function createCalendar() {
    const lastDayInMonth = new Date(currentYear, currentMonth + 1, 0);
    const nextMonthStart = new Date(currentYear, currentMonth + 1, 1);
    const nextMonthFinish = new Date(
      currentYear,
      nextMonthStart.getMonth() + nextMonth,
      1
    );
    const days =
      nextMonth > 0
        ? (nextMonthFinish - nextMonthStart) / (1000 * 60 * 60 * 24)
        : 0;

    const daysForCalendar = lastDayInMonth.getDate() - currentDate + days;
    const activeCalendar = [];

    for (let i = 0; i <= daysForCalendar; i++) {
      const oneDay = new Date(currentYear, currentMonth, currentDate + i);
      activeCalendar.push({
        date: oneDay.getDate(),
        dayName: constans.daysName[oneDay.getDay()],
        month: oneDay.getMonth(),
        monthName: constans.monthsName[oneDay.getMonth()],
        year: oneDay.getFullYear(),
      });
    }

    setActiveCalendar(activeCalendar);
  }

  const changeDate = (year, month, date) => {
    dispatch(
      setActiveDate(
        "" +
          year +
          (month + 1 < 10 ? "0" + (month + 1) : month + 1) +
          (date < 10 ? "0" + date : date)
      )
    );
  };

  return (
    <>
      <div className="calendar">
        {activeCalendar.map((item) => {
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
