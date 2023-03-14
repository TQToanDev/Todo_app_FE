import TodoItem from "./TodoItem";

function TodoList({todoCurrent, handleEdit, handleRemove, handleStatus}) {
    return ( 
        todoCurrent.map((todo)=>{
            return  <div  key={todo._id} className="w-full flex flex-col">
                        <TodoItem 
                            todo = {todo}
                            handleEdit = {handleEdit}
                            handleRemove = {handleRemove}
                            handleStatus= {handleStatus}
                        />
                    </div>
        })
     );
}

export default TodoList;