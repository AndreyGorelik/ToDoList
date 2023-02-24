import "./statusbar.css"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { nanoid } from "nanoid"
const StatusBar = () => {
    const { tasks } = useSelector(state => state.allTasks)
    const { daysCount } = useSelector(state => state.calendarSlice)
    const [statusBar, setStatusBar] = useState([])

    useEffect(() => {
        if (tasks !== 'undefined' && tasks !== null) {
            const tempStatusBar = []

            const nowDate = new Date();
            const currentYear = nowDate.getFullYear();
            const currentMonth = nowDate.getMonth();
            const currentDate = nowDate.getDate();

            for (let i = 0; i < daysCount; i++) {
                const oneDay = new Date(currentYear, currentMonth, currentDate + i);
                const dateFormat = '' + 
                    oneDay.getFullYear() + 
                    (oneDay.getMonth() < 10 ? '0' + (oneDay.getMonth() + 1) : oneDay.getMonth() + 1 ) +
                    (oneDay.getDate() < 10 ? '0' + (oneDay.getDate()) : oneDay.getDate())

                if (tasks?.[dateFormat]) {
                    const doneOrNot = [false, false]
                    Object.values(tasks[dateFormat]).forEach(item => {
                        if (item.done) {
                            doneOrNot[0] = true
                        } else {
                            doneOrNot[1] = true
                        }
                    })
                    tempStatusBar.push(doneOrNot)
                } else {
                    tempStatusBar.push(null)
                }
            }
            setStatusBar(tempStatusBar)
        }
    }, [tasks, daysCount])

    return (
        <div className='status-bar'>
            {
                statusBar.map(item => {
                    if (item !== null) {
                        return <div className="dots-status" key={nanoid()}>
                            {item[1] ? <div className="undone" ></div> : null}
                            {item[0] ? <div className="done"></div> : null}
                        </div>;
                    } else {
                        return <div className="dots-status" key={nanoid()}></div>;
                    }
                })
            }
        </div>
    )
}

export default StatusBar