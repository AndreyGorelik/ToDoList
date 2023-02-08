import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import AllTasksPage from '../pages/AllTasksPage/AllTasksPage';
import ResetPasswordPage from '../pages/ResetPasswordPage/ResetPasswordPage';
import PrivateRoute from './privateRoute/PrivateRoute';
import AddTaskPage from '../pages/AddTaskPage/AddTaskPage';
import TaskPage from '../pages/TaskPage/TaskPage';

const Wrapper = ({theme}) => {

    document.documentElement.setAttribute( "data-theme", theme === "dark" ? "dark" : "light")

    return (
        <Routes>
            <Route path="/" element={<PrivateRoute page={<AllTasksPage />} />} />
            <Route path="/day/:id" element={<PrivateRoute page={<AllTasksPage />} />} />
            <Route path="/tasks/:id" element={<PrivateRoute page={<TaskPage />} />} />
            <Route path="/add" element={<PrivateRoute page={<AddTaskPage />} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/reset" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    )
}

export default Wrapper;
