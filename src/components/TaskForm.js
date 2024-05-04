const TaskForm = ({createTask,name,handleInputChange,isEditing, updateTask}) =>{
    const design = (
       <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
        <input type="text" placeholder="Add a Task" name="name" value={name} onChange={handleInputChange} />
        <button type="submit">{isEditing ? "Edit" : "ADD"}</button>
       </form>
    );
    return design;
};

export default TaskForm;