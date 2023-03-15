import { startOfDay } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Cancel,
  Check,
  EditPencil,
  LongArrowUpRight,
  Trash,
} from "iconoir-react";
import { useEffect, useState } from "react";
import { getReadableTime } from "../../helpers";
import Clock from "../UI/AnimatedIcons/Clock";

const TodoItem = ({
  todo,
  handleDeleteTodo,
  updateTodoId,
  updateTodoText,
  updateTodoTime,
  updateTodoCompleted,
  setActiveTimer,
  activeTimer,
}) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(todo.time);
  const [intervalId, setIntervalId] = useState(null);
  const [editTodo, setEditTodo] = useState(false);
  const [todoValue, setTodoValue] = useState(todo.text);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const isToday =
    startOfDay(new Date(todo.id)).getTime() ===
    startOfDay(new Date()).getTime();

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

    setActiveTimer(todo.id);
    setTimerStarted(true);
    setStartTime(Date.now());
  };

  const handleUpdateTodoText = (text) => {
    updateTodoText({ ...todo, text });
    setEditTodo(false);
  };

  const handleUpdateTodoId = (id) => {
    updateTodoId(todo.id, { ...todo, id });
  };

  const moveToToday = () => {
    handleUpdateTodoId(Date.now());
  };

  useEffect(() => {
    if (activeTimer !== todo.id) {
      toggleTimer(true);
    }
  }, [activeTimer]);

  return (
    <AnimatePresence>
      <div
        className={`group relative mb-3 flex flex-col items-start gap-3 overflow-hidden rounded-md border-2 p-2 pl-3 transition-all sm:flex-row
        ${todo.completed ? "border-success" : "border-transparent"}
        ${todo.completed ? "bg-success-content" : "bg-base-100"}
        ${timerStarted ? "border-accent" : "border-transparent"}`}
      >
        <div className="flex min-h-[33px] w-full justify-between">
          <div className="flex w-full">
            <div
              className="tooltip tooltip-right tooltip-success z-20 flex items-center"
              data-tip="Mark task complete"
            >
              <div className="form-control">
                <label className="label flex h-full w-full cursor-pointer items-center justify-center py-0">
                  <input
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onClick={() => {
                      toggleTimer(true);
                      updateTodoCompleted({
                        ...todo,
                        completed: !todo.completed,
                      });
                    }}
                    className="checkbox-success checkbox"
                  />
                </label>
              </div>
            </div>
            {!todo.completed && editTodo && (
              <motion.div
                key={`${todo.id}-edit-confirm`}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex w-full"
              >
                <div
                  className="tooltip tooltip-right tooltip-success ml-3"
                  data-tip="Confirm edit"
                >
                  <button
                    className="btn-success btn-sm btn border-0 px-2 text-sm"
                    onClick={() => handleUpdateTodoText(todoValue)}
                  >
                    <Check width={20} />
                  </button>
                </div>
                <input
                  className="mx-3 hidden w-full rounded-md bg-white p-1 text-neutral sm:block"
                  value={todoValue}
                  onChange={(e) => setTodoValue(e.target.value)}
                />
              </motion.div>
            )}
            {!editTodo && (
              <div className="flex w-full">
                {!todo.completed && (
                  <motion.div
                    key={`${todo.id}-edit-button`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="tooltip tooltip-right tooltip-primary ml-3"
                    data-tip="Edit task"
                  >
                    <button
                      className="btn-outline btn-primary btn-sm btn border-0 px-2 text-sm"
                      onClick={() => setEditTodo(true)}
                    >
                      <EditPencil width={20} />
                    </button>
                  </motion.div>
                )}
                <p
                  key={todo.id}
                  className="mx-3 hidden min-h-[32px] w-full select-none pt-1 sm:flex"
                >
                  {todo.text}
                </p>
                {todo.completed && elapsedTime > 0 && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "100%" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ ease: "easeIn" }}
                    key="completed-time"
                    className="flex justify-end overflow-hidden"
                  >
                    <p className="min-w-[max-content] pl-3 pt-1">Time Spent:</p>
                    <p className="pl-3 pt-1">{getReadableTime(elapsedTime)}</p>
                  </motion.div>
                )}
              </div>
            )}
          </div>
          {!todo.completed && (
            <div className="flex min-h-[32px] justify-end">
              {!isToday && (
                <motion.div
                  key={`${todo.id}-control-move-to-today`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "max-content" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="w-full"
                >
                  <div
                    className="tooltip tooltip-left tooltip-primary mr-3"
                    data-tip="Move to today"
                  >
                    <button
                      className="btn-primary btn-sm btn px-2 text-sm"
                      onClick={() => moveToToday()}
                    >
                      <LongArrowUpRight width={20} />
                    </button>
                  </div>
                </motion.div>
              )}
              <AnimatePresence>
                <motion.div
                  key={`${todo.id}-control-clock`}
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                >
                  <div
                    className="tooltip tooltip-left tooltip-accent mr-3"
                    data-tip="Time spent on task"
                  >
                    <button
                      className={`btn-accent btn-sm btn flex flex-nowrap justify-start overflow-hidden px-2 text-sm transition-all hover:w-[120px] ${
                        timerStarted || todo.time > 0 ? "w-[120px]" : "w-[38px]"
                      }`}
                      onClick={() => toggleTimer()}
                    >
                      <Clock
                        className="w-[20px] min-w-[20px]"
                        started={timerStarted}
                      />
                      <p className="pl-3">{getReadableTime(elapsedTime)}</p>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                {showConfirmDelete && (
                  <motion.div
                    key={`${todo.id}-confirm-delete-buttons`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.175, easings: [0.5, 1, 0.5, 1] }}
                    className="flex w-full"
                  >
                    <div
                      className="tooltip tooltip-left tooltip-success mr-3 w-1/2"
                      data-tip="Confirm Delete"
                    >
                      <button
                        className="btn-success btn-sm btn px-2 text-sm"
                        onClick={() => {
                          handleDeleteTodo(todo.id);
                          setShowConfirmDelete(false);
                        }}
                      >
                        <Check width={20} />
                      </button>
                    </div>

                    <div
                      className="tooltip tooltip-left tooltip-error w-1/2"
                      data-tip="Cancel Delete"
                    >
                      <button
                        className="btn-error btn-sm btn px-2 text-sm"
                        onClick={() => {
                          setShowConfirmDelete(false);
                        }}
                      >
                        <Cancel width={20} />
                      </button>
                    </div>
                  </motion.div>
                )}
                {!showConfirmDelete && (
                  <motion.div
                    key={`${todo.id}-confirm-delete`}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="tooltip tooltip-left tooltip-secondary"
                    data-tip="Delete Task"
                  >
                    <button
                      className="btn-secondary btn-sm btn px-2 text-sm"
                      onClick={() => setShowConfirmDelete(true)}
                    >
                      <Trash width={20} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
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
    </AnimatePresence>
  );
};

export default TodoItem;
