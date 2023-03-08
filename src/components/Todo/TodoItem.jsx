import { useEffect, useState } from "react";
import { getReadableTime } from "../../helpers";

const TodoItem = ({
  todo,
  handleDeleteTodo,
  updateTodoTime,
  updateTodoText,
  updateTodoCompleted,
}) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(todo.time);
  const [intervalId, setIntervalId] = useState(null);
  const [editTodo, setEditTodo] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.text);

  useEffect(() => {
    let id;
    if (timerStarted) {
      id = setInterval(() => {
        const now = Date.now();
        const secondsElapsed = Math.floor(Math.abs(startTime - now) / 1000);
        setElapsedTime(secondsElapsed + todo.time);
      }, 1000);

      setIntervalId(id);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerStarted]);

  useEffect(() => {
    updateTodoTime({ ...todo, time: elapsedTime });
  }, [elapsedTime]);

  const toggleTimer = (turnoff) => {
    if (timerStarted || turnoff) {
      updateTodoTime({ ...todo, time: elapsedTime });
      setTimerStarted(false);
      clearInterval(intervalId);
      setIntervalId(null);
      return;
    }

    setTimerStarted(true);
    setStartTime(Date.now());
  };

  const handleUpdateTodoText = (text) => {
    updateTodoText({ ...todo, text });
    setEditTodo(false);
  };

  return (
    <div
      className={`group mb-3 flex flex-col items-start gap-3 rounded-md border-2 p-2 pl-3 transition-all sm:flex-row ${
        todo.completed ? "border-success" : "border-transparent"
      } ${todo.completed ? "bg-success-content" : "bg-base-100"}`}
    >
      <div className="flex w-full justify-between">
        <div className="flex w-full">
          <div className="form-control mr-3">
            <label className="label flex h-full w-full cursor-pointer items-center justify-center py-0">
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                onClick={() => {
                  toggleTimer(true);
                  updateTodoCompleted({ ...todo, completed: !todo.completed });
                }}
                className="checkbox-success checkbox"
              />
            </label>
          </div>
          {!todo.completed && editTodo && (
            <>
              <button
                className="btn-success btn-sm btn mr-3 border-0 px-2 text-sm"
                onClick={() => handleUpdateTodoText(todoValue)}
              >
                <svg
                  width="20px"
                  height="20px"
                  strokeWidth="1.98"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="currentColor"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="1.98"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <input
                className="hidden w-full rounded-md bg-white p-1 text-neutral sm:block"
                value={todoValue}
                onChange={(e) => setTodoValue(e.target.value)}
              />
            </>
          )}
          {!editTodo && (
            <>
              {!todo.completed && (
                <button
                  initial={{ width: 0 }}
                  animate={{ width: "auto" }}
                  exit={{ width: 0 }}
                  className="btn-outline btn-primary btn-sm btn mr-3 border-0 px-2 text-sm"
                  onClick={() => setEditTodo(true)}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    strokeWidth="1.98"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="currentColor"
                  >
                    <path
                      d="M14.363 5.652l1.48-1.48a2 2 0 012.829 0l1.414 1.414a2 2 0 010 2.828l-1.48 1.48m-4.243-4.242l-9.616 9.615a2 2 0 00-.578 1.238l-.242 2.74a1 1 0 001.084 1.085l2.74-.242a2 2 0 001.24-.578l9.615-9.616m-4.243-4.242l4.243 4.242"
                      stroke="currentColor"
                      strokeWidth="1.98"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              )}
              <p
                key={todo.id}
                className="mr-3 hidden min-h-[32px] w-full select-none pt-1 sm:flex"
              >
                {todo.text}
              </p>
              {todo.completed && (
                <>
                  <p className="min-w-[max-content] pl-3 pt-1">Time Spent:</p>
                  <p className="pl-3 pt-1">{getReadableTime(elapsedTime)}</p>
                </>
              )}
            </>
          )}
        </div>
        {!todo.completed && (
          <div className="flex">
            <button
              className={`btn-accent btn-sm btn mr-3 flex flex-nowrap justify-start overflow-hidden px-2 text-sm transition-all hover:w-[120px] ${
                timerStarted ? "w-[120px]" : "w-[38px]"
              }`}
              onClick={() => toggleTimer()}
            >
              {timerStarted ? (
                <>
                  <svg
                    width="20px"
                    height="20px"
                    strokeWidth="1.98"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="currentColor"
                    className="min-w-[20px]"
                  >
                    <path
                      d="M21 3.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6z"
                      stroke="currentColor"
                      strokeWidth="1.98"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </>
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  strokeWidth="1.98"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  color="currentColor"
                  className="min-w-[20px]"
                >
                  <path
                    d="M12 6v6h6"
                    stroke="currentColor"
                    strokeWidth="1.98"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeWidth="1.98"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              )}
              <p className="pl-3">{getReadableTime(elapsedTime)}</p>
            </button>
            <button
              className="btn-secondary btn-sm btn px-2 text-sm"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                strokeWidth="1.98"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75"
                  stroke="currentColor"
                  strokeWidth="1.98"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="flex w-full gap-3 sm:hidden">
        {!editTodo && (
          <p key={todo.id} className="w-full select-none">
            {todo.text}
          </p>
        )}
        {!todo.completed && editTodo && (
          <>
            <input
              className="w-full rounded-md bg-white p-1 text-neutral"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
