import "../Styling/Boards.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import {
  setAllTodo,
  setTotalOnGoingTodo,
  setTotalCompletedTodo,
  setTotalIncompleteTodo,
} from "../../Features/todosSlice";

export default function BoardsSection() {
  const [loading, setLoading] = useState(true);
  const taskRefers = useSelector((state) => state.setTodoData.taskRefers);
  const totalIncompleteTodos = useSelector(
    (state) => state.setTodoData.totalIncompleteTodos
  );
  const totalOnGoingTodos = useSelector(
    (state) => state.setTodoData.totalOnGoingTodos
  );
  const totalCompletedTodos = useSelector(
    (state) => state.setTodoData.totalCompleteTodos
  );
  const allTodos = useSelector((state) => state.setTodoData.allTodos);

  const dispatch = useDispatch();
  async function fetchAllTodos() {
    try {
      const response = await axios.get(
        "http://localhost:3000/user/getAllTodos",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const finalTodos = response.data.allTodos;
        dispatch(setAllTodo(finalTodos));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllTodos();
  }, [taskRefers]);

  useEffect(() => {
    if (!loading && allTodos.length > 0) {
      dispatch(
        setTotalIncompleteTodo(
          allTodos.filter((todos) => todos.status === "Incomplete")
        )
      );
      dispatch(
        setTotalOnGoingTodo(
          allTodos.filter((todos) => todos.status === "OnGoing")
        )
      );
      dispatch(
        setTotalCompletedTodo(
          allTodos.filter((todos) => todos.status === "Completed")
        )
      );
    }
  }, [allTodos]);

  useEffect(() => {
    if (
      totalIncompleteTodos !== undefined &&
      totalOnGoingTodos !== undefined &&
      totalCompletedTodos !== undefined
    ) {
      setLoading(false);
    }
  }, [totalIncompleteTodos, totalOnGoingTodos, totalCompletedTodos]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="boards-section">
      <div className="boards-content">
        <div className="InCompleted-section">
          <div className="header-content">
            <div className="IncompleteSection-heading">
              <ul className="board-ul">
                <li>InComplete</li>
              </ul>
            </div>
            <div className="IncompleteTask-Count">
              <p>{totalIncompleteTodos.length}</p>
            </div>
          </div>
          <div className="all-Incomplete-Todo">
            {totalIncompleteTodos.length === 0 ? (
              <p>No todos available</p>
            ) : (
              totalIncompleteTodos.map((todos) => (
                <div className="all-incomplete-todos" key={todos._id}>
                  <div className="incompleteTodo-category">
                    <div className="category-heading">
                      <p>{todos.category}</p>
                    </div>
                    <div className="otherOptions">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 96 96"
                          id="dots-horizontal"
                        >
                          <path
                            fill="#000"
                            d="M10 48.0005C10 51.2292 12.6174 53.8466 15.8462 53.8466 19.0749 53.8466 21.6923 51.2292 21.6923 48.0005 21.6923 44.7717 19.0749 42.1543 15.8462 42.1543 12.6174 42.1543 10 44.7717 10 48.0005zM42.1538 48.0005C42.1538 51.2292 44.7713 53.8466 48 53.8466 51.2287 53.8466 53.8462 51.2292 53.8462 48.0005 53.8462 44.7717 51.2287 42.1543 48 42.1543 44.7713 42.1543 42.1538 44.7717 42.1538 48.0005zM74.3077 48.0005C74.3077 51.2292 76.9251 53.8466 80.1538 53.8466 83.3826 53.8466 86 51.2292 86 48.0005 86 44.7717 83.3826 42.1543 80.1538 42.1543 76.9251 42.1543 74.3077 44.7717 74.3077 48.0005z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="incompleteTodo-titleAndDesc">
                    <div className="title-content">
                      <p>{todos.title}</p>
                    </div>
                    <div className="discription-content">
                      <p>{todos.description}</p>
                    </div>
                  </div>
                  <div className="startAndEnd-Date">
                    <p>Start Date: {todos.startDate}</p>
                    <p>End Date: {todos.endDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="OnGoing-section">
          <div className="header-content">
            <div className="Ongoing-header IncompleteSection-heading">
              <ul className="board-ul">
                <li>On Going</li>
              </ul>
            </div>
            <div className="IncompleteTask-Count">
              <p style={{ backgroundColor: "#f44819" }}>{totalOnGoingTodos.length}</p>
            </div>
          </div>
          <div className="all-Incomplete-Todo">
            {totalOnGoingTodos.length === 0 ? (
              <p style={{textAlign:"center"}}>No todos available</p>
            ) : (
              totalOnGoingTodos.map((todos) => (
                <div className="all-incomplete-todos" key={todos._id}>
                  <div className="incompleteTodo-category">
                    <div className="category-heading">
                      <p>{todos.category}</p>
                    </div>
                    <div className="otherOptions">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 96 96"
                          id="dots-horizontal"
                        >
                          <path
                            fill="#000"
                            d="M10 48.0005C10 51.2292 12.6174 53.8466 15.8462 53.8466 19.0749 53.8466 21.6923 51.2292 21.6923 48.0005 21.6923 44.7717 19.0749 42.1543 15.8462 42.1543 12.6174 42.1543 10 44.7717 10 48.0005zM42.1538 48.0005C42.1538 51.2292 44.7713 53.8466 48 53.8466 51.2287 53.8466 53.8462 51.2292 53.8462 48.0005 53.8462 44.7717 51.2287 42.1543 48 42.1543 44.7713 42.1543 42.1538 44.7717 42.1538 48.0005zM74.3077 48.0005C74.3077 51.2292 76.9251 53.8466 80.1538 53.8466 83.3826 53.8466 86 51.2292 86 48.0005 86 44.7717 83.3826 42.1543 80.1538 42.1543 76.9251 42.1543 74.3077 44.7717 74.3077 48.0005z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="incompleteTodo-titleAndDesc">
                    <div className="title-content">
                      <p>{todos.title}</p>
                    </div>
                    <div className="discription-content">
                      <p>{todos.description}</p>
                    </div>
                  </div>
                  <div className="startAndEnd-Date">
                    <p>Start Date: {todos.startDate}</p>
                    <p>End Date: {todos.endDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="Completed-section">
          <div className="header-content">
            <div className="complete-header IncompleteSection-heading">
              <ul className="board-ul">
                <li>Complete</li>
              </ul>
            </div>
            <div className="IncompleteTask-Count">
              <p style={{ backgroundColor: "#0cd321" }}>{totalCompletedTodos.length}</p>
            </div>
          </div>
          <div className="all-Incomplete-Todo">
            {totalCompletedTodos.length === 0 ? (
              <p style={{textAlign:"center"}}>No todos available</p>
            ) : (
              totalCompletedTodos.map((todos) => (
                <div className="all-incomplete-todos" key={todos._id} draggable>
                  <div className="incompleteTodo-category">
                    <div className="category-heading">
                      <p>{todos.category}</p>
                    </div>
                    <div className="otherOptions">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="none"
                          viewBox="0 0 96 96"
                          id="dots-horizontal"
                        >
                          <path
                            fill="#000"
                            d="M10 48.0005C10 51.2292 12.6174 53.8466 15.8462 53.8466 19.0749 53.8466 21.6923 51.2292 21.6923 48.0005 21.6923 44.7717 19.0749 42.1543 15.8462 42.1543 12.6174 42.1543 10 44.7717 10 48.0005zM42.1538 48.0005C42.1538 51.2292 44.7713 53.8466 48 53.8466 51.2287 53.8466 53.8462 51.2292 53.8462 48.0005 53.8462 44.7717 51.2287 42.1543 48 42.1543 44.7713 42.1543 42.1538 44.7717 42.1538 48.0005zM74.3077 48.0005C74.3077 51.2292 76.9251 53.8466 80.1538 53.8466 83.3826 53.8466 86 51.2292 86 48.0005 86 44.7717 83.3826 42.1543 80.1538 42.1543 76.9251 42.1543 74.3077 44.7717 74.3077 48.0005z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="incompleteTodo-titleAndDesc">
                    <div className="title-content">
                      <p>{todos.title}</p>
                    </div>
                    <div className="discription-content">
                      <p>{todos.description}</p>
                    </div>
                  </div>
                  <div className="startAndEnd-Date">
                    <p>Start Date: {todos.startDate}</p>
                    <p>End Date: {todos.endDate}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
