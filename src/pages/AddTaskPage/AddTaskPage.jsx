import AddTaskForm from '../../components/addTaskForm/AddTaskForm';
import { constants } from '../../constants/constants';
const AddTaskPage = () => {
  return (
    <div className='wrapper'>
      <h1>{constants.addNewTask}</h1>
      <AddTaskForm/>
    </div>
  )
}

export default AddTaskPage;