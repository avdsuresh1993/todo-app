import './App.css'
import {useState} from 'react'

export const Todo=_=>{
const [isEdit,isSetEdit] = useState(0)
const [todos,setTodos] = useState([{id:1,task:'attend standup call'}])
const [todo,setTodo] = useState('')

const onSubmitHandler=e=>{
    e.preventDefault();
    console.log(todos) 
}
const onTodoHandler=e=>{
setTodo(e.target.value)
}

const addORUpdateTask=()=>{
    if(isEdit){
     const result=todos.filter(elt=>{
        if(elt.id===isEdit){
            elt.task=todo
        }
        return elt
     })
     setTodos([...result])
     isSetEdit(0)
    }else{
        setTodos(prev=>([...prev,{id:todos.length+1,task:todo}]))
    }
    setTodo('')
}

const onDeleteHandler=id=>{
const result=todos.filter(elt=>elt.id!==id)
setTodos([...result])
}

const onEditHandler=id=>{
    isSetEdit(id)
    const todo=todos.find(elt=>elt.id===id);
    const {task} = todo
    setTodo(task)
}
    return(
        <>
        <form onSubmit={onSubmitHandler}>
        <input type="text" 
        name="todo" 
        onChange={onTodoHandler}
        placeholder='Enter task' 
        value={todo}/>
        <button type="input" value="submit" onClick={addORUpdateTask}>{isEdit?"update":"add"}</button>
        </form>
        {
            todos.length>0 && todos.map(elt=>{
                const {id,task}=elt
                return (
                    <>
                    <div syle={{display:"flex"}}>
                       <input type="text" name="task" value={task} readOnly={true}/>
                        <button onClick={()=>{onEditHandler(id)}}>edit</button>
                        <button onClick={()=>{onDeleteHandler(id)}}>delete</button>
                    </div>
                    </>
                )
            })
        }
        </>
    )
}