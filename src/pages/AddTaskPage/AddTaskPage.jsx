import AddTaskForm from '../../components/addTaskForm/AddTaskForm';
import { constans } from '../../constans/constans';
const AddTaskPage = () => {
  return (
    <div className='wrapper'>
      <h1>{constans.addNewTask}</h1>
      <AddTaskForm/>
    </div>
  )
}

export default AddTaskPage;