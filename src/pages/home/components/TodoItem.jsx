import { useRef, useState } from "react";

function TodoItem({todo, handleEdit,handleRemove, handleStatus}) {

    const [isEdit, setIsEdit] = useState(false)

    const todoRef = useRef(null)

    const edit = ()=>{
       
        setIsEdit(true)
    }
    const handleDoneEdit = ()=>{
        const valueUpdate = todoRef.current.value;
        fetch(
            'http://192.168.1.3:3000/api/todo/update',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(
                {
                    _id : todo._id,
                    todo: valueUpdate,
                    status: todo.status,
                },
                )
            }
        )
        handleEdit(todo._id, valueUpdate);
        setIsEdit(false)
    }
    const remove = ()=>{
        handleRemove(todo);
    }
    const status = ()=>{
        handleStatus(todo);
    }
    return ( 
        <div className="w-full my-2 bg-gray-200 flex items-center justify-between px-8 py-3 rounded-2xl">
            {!isEdit&&<span className="text-left text-xl w-[55%]">{todo.todo}</span>}
            {isEdit&&<input defaultValue={todo.todo} ref={todoRef} className="text-left text-xl w-[55%]"/>}

            <div className="w-[40%] flex justify-between">
            {!isEdit&&<button className="text-white bg-blue-600 p-2 rounded-lg" onClick={edit}>Edit</button>}
               {isEdit&& <button className="text-white bg-blue-600 p-2 rounded-lg" onClick={handleDoneEdit}>Done</button>}
                {todo.status === 'pending' ? <button className="text-white bg-yellow-600 p-2 rounded-lg" onClick={status}>Pending</button>
                        : <button className="text-white bg-green-600 p-2 rounded-lg" onClick={status}>Complete</button>
                }
                <button className="text-white bg-red-600 p-2 rounded-lg" onClick={remove}>Delete</button>
            </div>
        </div>
     );
}

export default TodoItem;