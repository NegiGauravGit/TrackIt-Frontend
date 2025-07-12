import { useEffect, useState } from "react";
import "../Styling/Home.css";
import axios from "axios";
import BoardsSection from "./Boards";
import {setTodoData,setEndDate,setStartDate,setTaskRefers} from "../../Features/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function HomeSection() {
  const [showBoards, setShowBoards] = useState(false);
  const [showButton, setshowButton] = useState(true);
  const userName = useSelector((state) => state.Auth.userInfo.name)
  const totalIncompleteTodos = useSelector(
    (state) => state.setTodoData.totalIncompleteTodos
  );
  const totalOnGoingTodos = useSelector(
    (state) => state.setTodoData.totalOnGoingTodos
  );
  const totalCompletedTodos = useSelector(
    (state) => state.setTodoData.totalCompleteTodos
  );
  const dispatch = useDispatch();

  const todoData = useSelector((state) => state.setTodoData.todoData);
  const { startDate, endDate } = useSelector(
    (state) => state.setTodoData.todoData
  );

  function handleNavigation() {
    setShowBoards(true);
  }
  function handleOnChange(e) {
    const { name, value } = e.target;

    dispatch(setTodoData({ name, value }));
  }

  async function handleAddTask() {
    const respoonse = await axios.post("http://localhost:3000/user/createTodo",todoData,
      {
        withCredentials: true,
      }
    )
    if (respoonse.status == 200) {
      dispatch(setTaskRefers())
      setshowButton(true);
    }
  }
  return (
    <header>
      <section style={!showButton ? { filter: "blur(4px)" } : {}}>
        {/* Fixed Navbar */}
        <div className="Header-content">
          <div className="mainContentWrapper">
            <div className="contentOfHeader">
              <div className="logo">
                <p>Track The Task</p>
              </div>
              <div className="nav-right-side">
                <div className="searchBar">
                  <input
                    type="text"
                    id="homeSearchBar"
                    placeholder="Search task"
                  />
                </div>
                <div
                  className="settingIcon"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path d="M 24 4 C 22.423103 4 20.902664 4.1994284 19.451172 4.5371094 A 1.50015 1.50015 0 0 0 18.300781 5.8359375 L 17.982422 8.7382812 C 17.878304 9.6893592 17.328913 10.530853 16.5 11.009766 C 15.672739 11.487724 14.66862 11.540667 13.792969 11.15625 L 13.791016 11.15625 L 11.125 9.9824219 A 1.50015 1.50015 0 0 0 9.4257812 10.330078 C 7.3532865 12.539588 5.7626807 15.215064 4.859375 18.201172 A 1.50015 1.50015 0 0 0 5.4082031 19.845703 L 7.7734375 21.580078 C 8.5457929 22.147918 9 23.042801 9 24 C 9 24.95771 8.5458041 25.853342 7.7734375 26.419922 L 5.4082031 28.152344 A 1.50015 1.50015 0 0 0 4.859375 29.796875 C 5.7625845 32.782665 7.3519262 35.460112 9.4257812 37.669922 A 1.50015 1.50015 0 0 0 11.125 38.015625 L 13.791016 36.841797 C 14.667094 36.456509 15.767551 36.511947 16.5 36.990234 C 17.328913 37.469147 17.878304 38.310641 17.982422 39.261719 L 18.300781 42.164062 A 1.50015 1.50015 0 0 0 19.449219 43.460938 C 20.901371 43.799844 22.423103 44 24 44 C 25.576897 44 27.097336 43.800572 28.548828 43.462891 A 1.50015 1.50015 0 0 0 29.699219 42.164062 L 30.017578 39.261719 C 30.121696 38.310641 30.671087 37.469147 31.5 36.990234 C 32.327261 36.512276 33.33138 36.45738 33.207031 36.841797 L 36.875 38.015625 A 1.50015 1.50015 0 0 0 38.574219 37.669922 C 40.646713 35.460412 42.237319 32.782983 43.140625 29.796875 A 1.50015 1.50015 0 0 0 42.591797 28.152344 L 40.226562 26.419922 C 39.454197 25.853342 39 24.95771 39 24 C 39 23.04229 39.454197 22.146658 40.226562 21.580078 L 42.591797 19.847656 A 1.50015 1.50015 0 0 0 43.140625 18.203125 C 42.237319 15.217017 40.646713 12.539588 38.574219 10.330078 A 1.50015 1.50015 0 0 0 36.875 9.984375 L 33.207031 11.158203 C 33.33138 11.54262 32.327261 11.487724 31.5 11.009766 C 30.671087 10.530853 30.121696 9.6893592 30.017578 8.7382812 L 29.699219 5.8359375 A 1.50015 1.50015 0 0 0 28.550781 4.5390625 C 27.098629 4.2001555 25.576897 4 24 4 z M 24 7 C 24.974302 7 25.90992 7.1748796 26.847656 7.3398438 L 27.035156 9.0644531 C 27.243038 10.963375 28.346913 12.652335 30 13.607422 C 31.654169 14.563134 33.668094 14.673009 35.416016 13.904297 L 37.001953 13.207031 C 38.219788 14.669402 39.183985 16.321182 39.857422 18.130859 L 38.451172 19.162109 C 36.911538 20.291529 36 22.08971 36 24 C 36 25.91029 36.911538 27.708471 38.451172 28.837891 L 39.857422 29.869141 C 39.183985 31.678818 38.219788 33.330598 37.001953 34.792969 L 35.416016 34.095703 C 33.668094 33.326991 31.654169 33.436866 30 34.392578 C 28.346913 35.347665 27.243038 37.036625 27.035156 38.935547 L 26.847656 40.660156 C 25.910002 40.82466 24.973817 41 24 41 C 23.025698 41 22.09008 40.82512 21.152344 40.660156 L 20.964844 38.935547 C 20.756962 37.036625 19.653087 35.347665 18 34.392578 C 16.345831 33.436866 14.331906 33.326991 12.583984 34.095703 L 10.998047 34.792969 C 9.7799772 33.330806 8.8159425 31.678964 8.1425781 29.869141 L 9.5488281 28.837891 C 11.088462 27.708471 12 25.91029 12 24 C 12 22.08971 11.087719 20.290363 9.5488281 19.160156 L 8.1425781 18.128906 C 8.8163325 16.318532 9.7814501 14.667839 11 13.205078 L 12.583984 13.902344 C 14.331906 14.671056 16.345831 14.563134 18 13.607422 C 19.653087 12.652335 20.756962 10.963375 20.964844 9.0644531 L 21.152344 7.3398438 C 22.089998 7.1753403 23.026183 7 24 7 z M 24 16 C 19.599487 16 16 19.59949 16 24 C 16 28.40051 19.599487 32 24 32 C 28.400513 32 32 28.40051 32 24 C 32 19.59949 28.400513 16 24 16 z M 24 19 C 26.779194 19 29 21.220808 29 24 C 29 26.779192 26.779194 29 24 29 C 21.220806 29 19 26.779192 19 24 C 19 21.220808 21.220806 19 24 19 z"></path>
                  </svg>
                </div>
                <div
                  className="notfication"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path d="M 23.277344 4.0175781 C 15.193866 4.3983176 9 11.343391 9 19.380859 L 9 26.648438 L 6.3496094 31.980469 A 1.50015 1.50015 0 0 0 6.3359375 32.009766 C 5.2696804 34.277268 6.9957076 37 9.5019531 37 L 18 37 C 18 40.295865 20.704135 43 24 43 C 27.295865 43 30 40.295865 30 37 L 38.496094 37 C 41.002339 37 42.730582 34.277829 41.664062 32.009766 A 1.50015 1.50015 0 0 0 41.650391 31.980469 L 39 26.648438 L 39 19 C 39 10.493798 31.863289 3.6133643 23.277344 4.0175781 z M 23.417969 7.0136719 C 30.338024 6.6878857 36 12.162202 36 19 L 36 27 A 1.50015 1.50015 0 0 0 36.15625 27.667969 L 38.949219 33.289062 C 39.128826 33.674017 38.921017 34 38.496094 34 L 9.5019531 34 C 9.077027 34 8.8709034 33.674574 9.0507812 33.289062 C 9.0507812 33.289062 9.0507812 33.287109 9.0507812 33.287109 L 11.84375 27.667969 A 1.50015 1.50015 0 0 0 12 27 L 12 19.380859 C 12 12.880328 16.979446 7.3169324 23.417969 7.0136719 z M 21 37 L 27 37 C 27 38.674135 25.674135 40 24 40 C 22.325865 40 21 38.674135 21 37 z"></path>
                  </svg>
                </div>
                <div
                  className="vertical-line"
                  style={{ display: "flex", justifyContent: "center" }}
                ></div>
                <div className="Profile">
                  <div
                    className="profilePhoto"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <img
                      src="https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg"
                      alt=""
                    />
                    <div className="userName">
                      <p>{userName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <hr />
          </div>

          {/* Main Content Area */}
          <div className="todo-content-container">
            <div className="todo-content">
              <div className="todo-content-main">
                <div className="menu">
                  <div>
                    <p id="menu-heading">Menu</p>
                  </div>
                  <div className="menu-content">
                    <span className="todo-span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        height="20"
                        viewBox="0 0 64 64"
                      >
                        <path d="M 32 9.0019531 C 31.225957 9.0019531 30.451863 9.2247995 29.78125 9.671875 L 5.78125 25.671875 C 3.9538194 26.890604 3.4532611 29.390166 4.671875 31.21875 C 5.845859 32.97845 8.1947613 33.469534 10 32.417969 L 10 53 A 1.0001 1.0001 0 0 0 11 54 L 21 54 A 1.0001 1.0001 0 1 0 21 52 L 12 52 L 12 30.605469 A 1.0001 1.0001 0 0 0 10.445312 29.773438 L 9.109375 30.664062 C 8.1811589 31.283772 6.9564342 31.039446 6.3359375 30.109375 C 5.7165514 29.179959 5.9620556 27.955208 6.890625 27.335938 L 30.890625 11.335938 C 31.565399 10.886088 32.434601 10.886088 33.109375 11.335938 L 57.109375 27.335938 C 58.037944 27.955208 58.283449 29.179959 57.664062 30.109375 C 57.274555 30.693636 56.643757 31 55.996094 31 C 55.61407 31 55.234406 30.893474 54.890625 30.664062 L 53.554688 29.773438 A 1.0001 1.0001 0 0 0 52 30.605469 L 52 52 L 27 52 L 27 31 L 37 31 L 37 38.732422 C 36.576988 38.452531 36.125457 38.252859 35.654297 38.179688 C 34.786371 38.044899 33.91515 38.22673 33.214844 38.708984 C 32.514538 39.191238 32 40.035337 32 41 C 32 41.957056 32.519219 42.791667 33.216797 43.267578 C 33.914375 43.743489 34.779929 43.925905 35.646484 43.796875 C 36.119122 43.726499 36.574791 43.529252 37 43.25 L 37 49 A 1.0001 1.0001 0 1 0 39 49 L 39 43 C 39 42.247112 38.873416 41.587139 38.673828 40.998047 C 38.87393 40.410772 39 39.752159 39 39 L 39 30 A 1.0001 1.0001 0 0 0 38 29 L 26 29 A 1.0001 1.0001 0 0 0 25 30 L 25 53 A 1.0001 1.0001 0 0 0 26 54 L 53 54 A 1.0001 1.0001 0 0 0 54 53 L 54 32.394531 C 54.627636 32.761057 55.309379 33 55.996094 33 C 57.288431 33 58.561632 32.368489 59.328125 31.21875 C 60.546739 29.390166 60.046181 26.890604 58.21875 25.671875 L 34.21875 9.671875 C 33.548137 9.2247995 32.774043 9.0019531 32 9.0019531 z M 35.0625 40.138672 C 35.155446 40.135537 35.250185 40.141416 35.345703 40.15625 C 35.761884 40.22088 36.181269 40.491448 36.507812 41.005859 C 36.184018 41.504294 35.767551 41.756709 35.353516 41.818359 C 34.970071 41.875449 34.585625 41.778919 34.345703 41.615234 C 34.105781 41.451552 34 41.287444 34 41 C 34 40.688163 34.110462 40.518809 34.347656 40.355469 C 34.525552 40.232964 34.783662 40.148075 35.0625 40.138672 z"></path>
                      </svg>{" "}
                      Dashboard
                    </span>
                    <span className="todo-span">
                      <img
                        id="profile-img"
                        src="https://static.vecteezy.com/system/resources/thumbnails/026/630/551/small_2x/profile-icon-symbol-design-illustration-vector.jpg"
                        alt=""
                      />
                      Profile
                    </span>
                    <span className="todo-span">
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 11.5V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22H12.5M21 10H3M16 2V6M8 2V6M18 21V15M15 18H21"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Calender
                    </span>
                    <span className="todo-span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        viewBox="0 0 48 48"
                      >
                        <g data-name="17analytics">
                          <path d="M43 42H5a5.006 5.006 0 0 1-5-5V13a5.006 5.006 0 0 1 5-5h3v2H5a3 3 0 0 0-3 3v24a3 3 0 0 0 3 3h38a3 3 0 0 0 3-3v-3h2v3a5.006 5.006 0 0 1-5 5zM14 46h20v2H14z" />
                          <path d="M17 41h2v6h-2zM29 41h2v6h-2zM28 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 28 2z" />
                          <path d="M29 13h-2a3 3 0 0 1 0-6h2a3 3 0 0 1 3 3h-2a1 1 0 0 0-1-1h-2a1 1 0 0 0 0 2h2z" />
                          <path d="M29 17h-2a3 3 0 0 1-3-3h2a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2h-2v-2h2a3 3 0 0 1 0 6zM27 6h2v2h-2z" />
                          <path d="M27 16h2v2h-2zM44.8 32a3.2 3.2 0 0 1-2.267-.936l-6.236-6.237a1 1 0 0 1 0-1.414l3.118-3.118a1 1 0 0 1 1.414 0l6.237 6.236a3.212 3.212 0 0 1 0 4.533A3.2 3.2 0 0 1 44.8 32zm-6.382-7.88 5.529 5.529a1.2 1.2 0 1 0 1.7-1.7l-5.529-5.529z" />
                          <path d="m35.293 20.708 1.415-1.415 3 3-1.414 1.415zM6 35h36v2H6z" />
                          <path d="M12 36h-2V3a1 1 0 0 1 1-1h5v2h-4zM15 21h2v15h-2zM28 36h-2v-7h-3v7h-2v-8a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1zM39 36h-2v-4h-3v4h-2v-5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1zM48 24h-2V13a3 3 0 0 0-3-3h-1V8h1a5.006 5.006 0 0 1 5 5z" />
                        </g>
                      </svg>
                      Analytic
                    </span>
                  </div>
                </div>
                <div className="tasks menu">
                  <div className="task-heading">
                    <p id="menu-heading">Tasks</p>
                  </div>
                  <div className="tasks-content">
                    <span className="todo-span">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        enableBackground="new 0 0 66 66"
                        viewBox="0 0 66 66"
                        id="task-list"
                      >
                        <path
                          d="M15.4053,65h35.1895c2.2461,0,4.0742-1.8276,4.0742-4.0742V14.102c0-2.2466-1.8281-4.0747-4.0742-4.0747h-5.8722
		c-0.0731-1.6188-1.402-2.9165-3.0389-2.9165h-2.6962C39.0568,3.7029,36.2997,1,33,1c-3.3051,0-6.0567,2.7086-5.9874,6.1108h-2.6962
		c-1.6369,0-2.9659,1.2977-3.0389,2.9165h-5.8722c-2.2461,0-4.0742,1.8281-4.0742,4.0747v46.8237
		C11.3311,63.1724,13.1592,65,15.4053,65z M33,3c2.2169,0,4.0501,1.8231,3.9922,4.1108h-7.9844C28.9499,4.8231,30.7832,3,33,3z
		 M23.2637,10.1636c0-0.5806,0.4727-1.0527,1.0527-1.0527c3.8587,0,13.1493,0,17.3672,0c0.5801,0,1.0527,0.4722,1.0527,1.0527
		v1.7217c0,0.5806-0.4727,1.0527-1.0527,1.0527H24.3164c-0.5801,0-1.0527-0.4722-1.0527-1.0527V10.1636z M13.3311,14.102
		c0-1.144,0.9307-2.0747,2.0742-2.0747h5.8727c0.076,1.616,1.4034,2.9106,3.0384,2.9106h17.3672
		c1.6349,0,2.9624-1.2946,3.0384-2.9106h5.8727c1.1436,0,2.0742,0.9307,2.0742,2.0747v46.8237c0,1.1436-0.9307,2.0742-2.0742,2.0742
		H15.4053c-1.1436,0-2.0742-0.9307-2.0742-2.0742V14.102z"
                        ></path>
                        <path d="M18.0068 29.5478h9.4307c.2764 0 .5-.2236.5-.5v-9.4312c0-.2764-.2236-.5-.5-.5h-9.4307c-.2764 0-.5.2236-.5.5v9.4312C17.5068 29.3242 17.7305 29.5478 18.0068 29.5478zM18.5068 20.1167h8.4307v8.4312h-8.4307V20.1167zM32.7607 22.6777h15.2324c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5H32.7607c-.2764 0-.5.2236-.5.5S32.4844 22.6777 32.7607 22.6777zM32.7607 26.9868h7.665c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5h-7.665c-.2764 0-.5.2236-.5.5S32.4844 26.9868 32.7607 26.9868zM18.0068 44.1846h9.4307c.2764 0 .5-.2236.5-.5v-9.4312c0-.2764-.2236-.5-.5-.5h-9.4307c-.2764 0-.5.2236-.5.5v9.4312C17.5068 43.9609 17.7305 44.1846 18.0068 44.1846zM18.5068 34.7534h8.4307v8.4312h-8.4307V34.7534zM32.7607 37.3144h15.2324c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5H32.7607c-.2764 0-.5.2236-.5.5S32.4844 37.3144 32.7607 37.3144zM32.7607 41.6235h7.665c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5h-7.665c-.2764 0-.5.2236-.5.5S32.4844 41.6235 32.7607 41.6235zM18.0068 58.8242h9.4307c.2764 0 .5-.2236.5-.5v-9.4312c0-.2764-.2236-.5-.5-.5h-9.4307c-.2764 0-.5.2236-.5.5v9.4312C17.5068 58.6006 17.7305 58.8242 18.0068 58.8242zM18.5068 49.3931h8.4307v8.4312h-8.4307V49.3931zM32.7607 51.9546h15.2324c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5H32.7607c-.2764 0-.5.2236-.5.5S32.4844 51.9546 32.7607 51.9546zM32.7607 56.2632h7.665c.2764 0 .5-.2236.5-.5s-.2236-.5-.5-.5h-7.665c-.2764 0-.5.2236-.5.5S32.4844 56.2632 32.7607 56.2632z"></path>
                        <path d="M24.4941 51.8232l-2.5098 2.5103-1.0342-1.0337c-.1953-.1953-.5117-.1953-.707 0s-.1953.5117 0 .707l1.3877 1.3872c.0977.0977.2256.1465.3535.1465s.2559-.0488.3535-.1465l2.8633-2.8638c.1953-.1953.1953-.5117 0-.707S24.6895 51.6279 24.4941 51.8232zM24.4941 37.1836l-2.5098 2.5103-1.0342-1.0342c-.1953-.1953-.5117-.1953-.707 0s-.1953.5117 0 .707l1.3877 1.3877c.0938.0938.2207.1465.3535.1465s.2598-.0527.3535-.1465l2.8633-2.8638c.1953-.1953.1953-.5117 0-.707S24.6895 36.9883 24.4941 37.1836zM24.667 22.3872c-.1953-.1953-.5117-.1953-.707 0l-1.2378 1.2378-1.2378-1.2378c-.1953-.1953-.5117-.1953-.707 0s-.1953.5117 0 .707l1.2378 1.2378-1.2378 1.2378c-.1953.1953-.1953.5117 0 .707.0977.0977.2256.1465.3535.1465s.2559-.0488.3535-.1465l1.2378-1.2378 1.2378 1.2378c.0977.0977.2256.1465.3535.1465s.2559-.0488.3535-.1465c.1953-.1953.1953-.5117 0-.707l-1.2378-1.2378 1.2378-1.2378C24.8623 22.8989 24.8623 22.5825 24.667 22.3872z"></path>
                      </svg>{" "}
                      My Tasks
                    </span>
                    <ul className="home-ul">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <li>In Completed</li>
                        <span style={{ color: "#d74a12eb", fontWeight: 600 }}>
                          {totalIncompleteTodos.length}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <li>On Going</li>
                        <span style={{ color: "#d74a12eb", fontWeight: 600 }}>
                          {totalOnGoingTodos.length}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <li>Completed</li>
                        <span style={{ color: "#d74a12eb", fontWeight: 600 }}>
                          {totalCompletedTodos.length}
                        </span>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="vertical-line2"></div>
              <div className="front-page-content">
                <div className="frontPage-MainContent">
                  <div className="frontPageHeading">
                    <p>My Task</p>
                    <p id="sub-heading">
                      You can organize,track,and complete you assignmnents
                      efficiently
                    </p>
                  </div>
                  <div>
                    {showButton && (
                      <button
                        className="addTask-btn"
                        onClick={() => setshowButton(false)}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="14"
                          width="14px"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="#d8690e"
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                          />
                        </svg>
                        Add Task
                      </button>
                    )}
                  </div>
                </div>
                <div className="category-section">
                  <div className="category-content">
                    <div className="category-heading">
                      <span id="category-heading1">All Tasks</span>
                      <span id="category-heading2" onClick={handleNavigation}>
                        Boards
                      </span>
                    </div>
                  </div>
                  <div className="scrollable-boards-section">
                    <BoardsSection />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {!showButton && (
        <div className="addTodo-Model">
          <div className="main-model-div">
            <span id="cut-it" onClick={() => setshowButton(true)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <input
              type="text"
              name="category"
              onChange={handleOnChange}
              placeholder="Category(example : freelance Work , College Work)"
            />
            <input
              type="text"
              name="title"
              onChange={handleOnChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              id="desc"
              placeholder="Description"
              onChange={handleOnChange}
            ></textarea>
            <select name="status" id="select-status" onChange={handleOnChange} defaultValue="">
              <option value="" disabled hidden>Choose One</option>
              <option value="Incomplete" name="status">Incomplete</option>
              <option value="OnGoing"  name="status">OnGoing</option>
              <option value="Completed"  name="status">Completed</option>
            </select>
            <div className="date-section">
              <div>
                <label>Start Date:</label>
                <DatePicker
                  selected={startDate ? new Date(startDate) : null}
                  onChange={(date) =>
                    dispatch(setStartDate(date.toDateString()))
                  }
                  placeholderText="Select Start Date"
                />{" "}
                <br />
              </div>
              <div>
                <label>End date:</label>
                <DatePicker
                  selected={endDate ? new Date(endDate) : null}
                  onChange={(date) => dispatch(setEndDate(date.toDateString()))}
                  minDate={startDate}
                  placeholderText="Select End Date"
                />
              </div>
            </div>
            <button onClick={handleAddTask}>Add Task</button>
          </div>
        </div>
      )}
    </header>
  );
}
