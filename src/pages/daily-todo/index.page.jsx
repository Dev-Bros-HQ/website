import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import useLocalStorage from "../../hooks/useLocalStorage";
import Input from "../../components/UI/Inputs/Input";
import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "../../components/Todo/TodoItem";
import { getRandomInt } from "../../helpers";
import { startOfDay, formatRelative } from "date-fns";
import Contributors from "../../components/Contributors";

const Page = () => {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [error, setError] = useState("");
  const [todoInput, setTodoInput] = useState("");
  const [currentTodo, setCurrentTodo] = useState("");
  const [day, setDay] = useState(startOfDay(new Date()).getTime());
  const [hasMounted, setHasMounted] = useState(false);
  const isToday = day === startOfDay(new Date()).getTime();
  const filteredTodos = todos.filter(
    (todo) => todo?.id >= day && todo?.id < day + 1000 * 60 * 60 * 24
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const updateDay = (num) => {
    const oneDay = 1000 * 60 * 60 * 24;
    const updatedDay = day + num * oneDay;
    setDay(updatedDay);
  };

  const handleTodoInput = (value) => {
    if (error.length) {
      setError("");
    }
    setTodoInput(value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoInput === "" || !todoInput) {
      setError("Type a task in the input and then submit");
      return;
    }
    const todo = {
      id: Date.now(),
      text: todoInput,
      time: 0,
      completed: false,
    };
    setTodoInput("");
    setTodos([...(todos.length ? todos : []), todo]);
  };

  const updateTodoTime = (updatedTodo) => {
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    const newTodos = [
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ];
    setTodos(newTodos);
  };

  const updateTodoText = (updatedTodo) => {
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    const newTodos = [
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ];
    setTodos(newTodos);
  };
  const updateTodoCompleted = (updatedTodo) => {
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    const newTodos = [
      ...todos.slice(0, index),
      updatedTodo,
      ...todos.slice(index + 1),
    ];
    setTodos(newTodos);
  };

  const handleDeleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    if (`${id}` === currentTodo) {
      setCurrentTodo("");
    }
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(newTodos);
  };

  // useEffect(() => {
  //   const sampleTodos = [
  //     "Buy groceries",
  //     "Clean the kitchen",
  //     "Schedule a dentist appointment",
  //     "Pay bills",
  //     "Call a friend",
  //     "Exercise for 30 minutes",
  //     "Water the plants",
  //     "Write a blog post",
  //     "Make a budget",
  //     "Read a chapter of a book",
  //     "Plan a weekend trip",
  //     "Organize closet",
  //     "Go for a walk",
  //     "Research a new hobby",
  //     "Write a thank you note",
  //     "Sweep the floors",
  //     "Make a meal plan for the week",
  //     "Vacuum the living room",
  //     "Call your parents",
  //     "Attend a virtual event",
  //   ];

  //   const newTodos = [];

  //   for (let i = 0; i < 7; i += 1) {
  //     for (let j = 0; j < 5; j += 1) {
  //       const todo = {
  //         id: Date.now() + j * 1000 - 1000 * 60 * 60 * 24 * i,
  //         text: sampleTodos[getRandomInt(0, sampleTodos.length - 1)],
  //         time: 0,
  //         completed: false,
  //       };
  //       newTodos.push(todo);
  //     }
  //   }
  //   setTodos(newTodos);
  // }, []);

  return (
    <>
      <section className="flex flex-col items-center py-12 px-3">
        <div className="flex w-full justify-between">
          <h1 className="text-left text-4xl">
            Things {isToday ? "to do" : "you did"}{" "}
            {formatRelative(new Date(day), new Date()).split(" at")[0]}:
          </h1>
          <div className="flex gap-3">
            <button
              className="btn-ghost btn-sm btn md:btn-outline md:btn-md"
              onClick={() => updateDay(-1)}
            >
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button
              className="btn-ghost btn-sm btn md:btn-outline md:btn-md"
              disabled={day === startOfDay(new Date()).getTime()}
              onClick={() => updateDay(+1)}
            >
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="currentColor"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isToday && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="w-full overflow-hidden"
            >
              <form
                onSubmit={(e) => handleAddTodo(e)}
                className="my-2 flex w-full items-start items-center px-2 pt-7"
              >
                <Input
                  id="todo-input"
                  name="todo-input"
                  label="Enter new todo here"
                  value={todoInput}
                  onChange={(e) => handleTodoInput(e.target.value)}
                  className="w-full max-w-full"
                  autoComplete="off"
                  error={error.length ? error : ""}
                  labelClassName={`group-focus-within:text-neutral-content`}
                />
                <button
                  type="submit"
                  className="btn-primary btn-sm btn ml-4 h-auto pl-1 pr-1"
                >
                  <svg
                    width="35px"
                    height="35px"
                    strokeWidth="1.98"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    color="currentColor"
                  >
                    <path
                      d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                      stroke="currentColor"
                      strokeWidth="1.98"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="my-4 flex min-h-[50vh] w-full flex-col rounded-lg bg-base-300 p-3 pb-0"
              >
                {hasMounted && (
                  <AnimatePresence>
                    {filteredTodos.map((todo, index) => (
                      <Draggable
                        key={todo.id}
                        draggableId={`${todo.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <motion.div
                            key={todo.id}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="w-full overflow-hidden"
                          >
                            <TodoItem
                              todo={todo}
                              handleDeleteTodo={handleDeleteTodo}
                              updateTodoTime={updateTodoTime}
                              updateTodoText={updateTodoText}
                              updateTodoCompleted={updateTodoCompleted}
                            />
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                  </AnimatePresence>
                )}
                {provided.placeholder}
                {!filteredTodos.length && hasMounted ? (
                  <div
                    className={`group mb-3 flex items-center gap-3 rounded-md border-2 border-transparent p-2 pl-3 transition-all`}
                  >
                    No todos in list for{" "}
                    {formatRelative(new Date(day), new Date()).split(" at")[0]}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
      <section className="flex flex-col items-center py-12 px-3">
        <p>
          Using a to-do list can help you prioritize your tasks and stay
          organized. By writing down everything you need to accomplish, you can
          make sure that you don't forget anything important and can keep track
          of what you've already done. Additionally, checking items off of your
          list can give you a sense of accomplishment and help you stay
          motivated.
        </p>
        <br />
        <p>
          Tracking the time you spend on tasks can also be incredibly helpful.
          It can help you identify where you're spending your time and if you're
          using it efficiently. By understanding how long different tasks take,
          you can better estimate how much time you'll need for future projects
          and plan your schedule accordingly. Additionally, tracking your time
          can help you identify patterns of procrastination or distraction,
          which can help you work on improving your focus and productivity.
        </p>
      </section>
      <Contributors projectName="daily-todo" />
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "Daily Todo List",
  "og:description":
    "Keep track of what you need to get done today, and how long you spend on each task.",
  "og:url": "https://devbroshq.com/",
  "og:image": "https://devbroshq.com/square-dev-bros-hq-title.webp",
};
