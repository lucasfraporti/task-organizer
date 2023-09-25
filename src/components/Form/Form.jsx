import styles from "./Form.module.css";

import { useState, useContext } from "react";

import { TodoContext } from "../../context/TodoContext";

const Form = () => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const { setTodos } = useContext(TodoContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      id: Math.floor(Math.random() * 10000),
      title: title,
      time: time,
      done: false,
    };

    await fetch(`http://localhost:3000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    setTodos((prevState) => [...prevState, todo]);

    setTitle("");
    setTime("");
  };

  return (
    <>
      <div className={styles.form_todo}>
        <h2>Adicione a sua tarefa</h2>

        <form className={styles.form_control} onSubmit={handleSubmit}>
          <label>
            <span>Título da tarefa</span>
            <input
              type="text"
              name="title"
              placeholder="Título da tarefa"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          <label>
            <span>Duração da tarefa</span>
            <input
              type="number"
              name="time"
              placeholder="Duração da tarefa em horas"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              required
            />
          </label>

          <input type="submit" value="Adicionar" />
        </form>
      </div>
    </>
  );
};

export default Form;
