import styles from "./Tasks.module.css";

// import { useContext } from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

// import { TodoContext } from "../../context/TodoContext";

import { useTodoContext } from "../../hooks/useTodoContext";

const Tasks = () => {
  // const { todos, setTodos } = useContext(TodoContext);
  const { todos, setTodos } = useTodoContext();

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  };

  const handleEdit = async (todo) => {
    todo.done = !todo.done;

    const data = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    setTodos((prevState) =>
      prevState.map((todo) => (todo.id === data.id ? (todo = data) : todo)),
    );
  };

  return (
    <>
      <div className={styles.list_todo}>
        <h2>Lista de tarefas</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>}
        {todos.map((todo) => (
          <div className={styles.todo_tasks} key={todo.id}>
            <h3 className={todo.done ? "todo_done" : ""}>{todo.title}</h3>

            <p>Duração: {todo.time} hora(s)</p>

            <div className="actions">
              <span onClick={() => handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;
