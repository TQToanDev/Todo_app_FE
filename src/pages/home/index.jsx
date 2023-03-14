import { useEffect, useRef, useState } from "react";
import TodoList from "./components/TodoList";

function Home() {
  const inputValue = useRef(null);
  const [todoCurrent, setTodoCurrent] = useState([]);

  useEffect( ()=>{
    fetch(
      'http://192.168.1.3:3000/api/todo/',
    )
    .then((response) => response.json())
    .then((data) => setTodoCurrent([...data]));
  },[])
 
  const handleSubmit = (e) => {
      if (
        inputValue.current.value &&
        !todoCurrent.some((todo) => todo.todo === inputValue.current.value)
      ) {
        e.preventDefault();
        fetch(
          'http://192.168.1.3:3000/api/todo/create',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              {
                todo: inputValue.current.value,
                status: 'pending'
              },
            )
          }
        ).then((response) => response.json())
        .then((data) => {
          setTodoCurrent([...todoCurrent, data]);
        });
      }

    inputValue.current.value = "";
  };

  const handleEdit = (_id,value) => {
    const newList = todoCurrent.map((todo) => {
      if (todo._id === _id) {
        todo.todo = value
      }
      return todo
    });
    setTodoCurrent(newList)
  };

  const handleRemove = (value) => {
    fetch(
      `http://192.168.1.3:3000/api/todo/${value._id}`,
      {
        method : 'DELETE'
      }
    )
    .then((response) => response.json())
    .then((data)=>{
      if(data === 'delete success'){
        setTodoCurrent(todoCurrent.filter(item=>item._id!==value._id))
      }
      else{
        console.log("loi");
      }
    })
    
  };
  
  const handleStatus = (value) => {
    const newTodoList = todoCurrent.map(todo =>{
        if(todo._id === value._id){
          todo.status = todo.status === 'pending' ? 'complete' : 'pending'
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
                    todo: todo.todo,
                    status: todo.status,
                },
                )
            }
        )
        }
        return todo
    })
    setTodoCurrent(newTodoList)
  };
  return (
    <div className="w-screen min-h-screen flex flex-col items-center pt-11 border border-black">
      <form
        onSubmit={handleSubmit}
        action="#"
        className="w-full flex justify-center"
      >
        <div className="border w-[40%] h-fit flex justify-center rounded-2xl border-black">
          <input
            ref={inputValue}
            className="w-full outline-none text-2xl p-4 rounded-2xl"
            type="text"
            maxLength={50}
          />
          <button className="px-3 border-l border-black  font-semibold">
            Submit
          </button>
        </div>
      </form>
      <div className="w-[40%] mt-7 outline-none">
        {todoCurrent && (
          <TodoList
            todoCurrent={todoCurrent}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            handleStatus={handleStatus}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
