import styles from "./Home.module.css";

import { useState, useEffect, useContext } from "react";

import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import Tasks from "../../components/Tasks/Tasks";

import { TodoContext } from "../../context/TodoContext";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const { setTodos } = useContext(TodoContext);

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
