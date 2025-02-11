import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoContainer from "./TodoContainer";
import TodoAddModal from "./TodoAddModal";

import { db } from "../../config/fbconfig";
import { setTodos, setSelectedTodo } from "./redux/TodoSlice";
import TodoDetailsModal from "./TodoDetailsModal";

import "./TodoList.css";

function TodoList(props) {
  const { openAddModal, setOpenAddModal, handleClose } = props;

  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const [openDetailsModal, setOpenDetailsModal] = React.useState(false);

  const selectedTodo = useSelector((state) => state.todos.selectedTodo);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "todos"), orderBy("createdDate", "desc")),
      (snapshot) => {
        const records = [];
        snapshot.docs.forEach((doc) => {
          records.push({
            ...doc.data(),
            todoId: doc.id,
            createdDate: doc.data().createdDate.toDate().toISOString(),
            lastUpdatedDate: doc.data().lastUpdatedDate?.toDate().toISOString(),
          });
        });
        dispatch(setTodos(records));
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  const handleOpenTodoDetails = (todo) => {
    dispatch(setSelectedTodo(todo));
    setOpenDetailsModal(true);
  };

  const handleCloseTodoDetails = () => {
    dispatch(setSelectedTodo(null));
    setOpenDetailsModal(false);
  };

  const handleUpdateTodoDetails = (todo) => {
    dispatch(setSelectedTodo(todo));
    setOpenAddModal(true);
  };

  return (
    <>
      {todos &&
        todos.map((todo) => (
          <TodoContainer
            todo={todo}
            key={todo.todoId}
            handleOpenTodoDetails={handleOpenTodoDetails}
            handleUpdateTodoDetails={handleUpdateTodoDetails}
          />
        ))}
      <TodoAddModal open={openAddModal} handleClose={handleClose} />
      <TodoDetailsModal
        open={openDetailsModal}
        todoId={selectedTodo?.todoId}
        handleClose={handleCloseTodoDetails}
      />
    </>
  );
}

export default TodoList;
