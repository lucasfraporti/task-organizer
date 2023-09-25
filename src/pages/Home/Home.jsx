import styles from "./Home.module.css";

// import { useState, useEffect, useContext } from "react";
import { useState, useEffect } from "react";

import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import Tasks from "../../components/Tasks/Tasks";

// import { TodoContext } from "../../context/TodoContext";

import { useTodoContext } from "../../hooks/useTodoContext";

const Home = () => {
  const [loading, setLoading] = useState(true);
  // const { setTodos } = useContext(TodoContext);
  const { setTodos } = useTodoContext();

  // Carregando no carregamento da página
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/todos`)
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.log(error));
      setLoading(false);
      setTodos(res);
    };
    loadData();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.todo_homepage}>
      <Header />
      <Form />
      <Tasks />
    </div>
  );
};

export default Home;
