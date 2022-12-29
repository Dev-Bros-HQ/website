import Header from "../../components/Header";
import { useFirebase } from "../../context/firebase";
import InYourFridgeDashboard from "./Dashboard";

const InYourFridge = () => {
  const fruits = ["🍎", "🥬", "🌽"];

  const { isLoggedIn } = useFirebase();

  console.log({ isLoggedIn });

  return (
    <>
      {!isLoggedIn ? (
        <InYourFridgeDashboard />
      ) : (
        <section className="flex flex-col items-center mb-64">
          <br />
          <br />
          <Header>In Your Fridge</Header>
          <br />
          <br />
          <br />
          <br />
          <div className="flex mt-3 w-full">
            <div className="w-1/2 h-full flex items-center">
              <p className="text-accent text-4xl px-20">
                Turn the ingredients you have on hand into delicious meals.
              </p>
            </div>
            <div className="relative w-1/2 min-h-[400px] -rotate-[15deg] flex items-center justify-center -translate-x-32">
              {fruits.map((fruit, fruitIndex) => {
                const rotations = [
                  "-rotate-[20deg]",
                  "rotate-0",
                  "rotate-[20deg]",
                ];
                return (
                  <div
                    key={`fruit-${fruitIndex}`}
                    className={`card bg-secondary w-full max-w-[300px] h-full absolute flex justify-center items-center p-0 left-1/2 bottom-0 ${rotations[fruitIndex]} origin-bottom-left border-black border-2`}
                  >
                    <p className="text-[250px] rotate-1 text-center">{fruit}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <div>
            <h2 className="text-4xl text-primary text-center">
              Let's make it easy for you
            </h2>
            <br />
            <p className="text-6xl text-center">🥬 + 🍅 + 🥕 = 🥗</p>
          </div>
          <br />
          <br />
          <div className="max-w-lg">
            <p className="text-3xl">
              Welcome to "In Your Fridge," a resource designed to help you turn
              the ingredients you have on hand into delicious meals.
            </p>
            <br />

            <p className="text-3xl">
              Are you struggling to decide what to make for dinner tonight? Our
              recipe search feature allows you to easily find meal ideas based
              on the ingredients you already have in your fridge, pantry, or
              cupboard. Simply type in a few key items, and we'll provide a list
              of recipes that will help you turn those ingredients into a tasty
              meal.
            </p>
            <br />

            <p className="text-3xl">
              Not sure what to search for? No problem! We've also compiled a
              list of common pantry staples and ideas for how to use them in
              your cooking. From canned tomatoes and beans to rice and pasta,
              we've got you covered.
            </p>
            <br />

            <p className="text-3xl">
              So don't let a lack of inspiration or an empty pantry stop you
              from creating a satisfying meal. Let "In Your Fridge" be your
              go-to resource for finding recipes and making the most of the
              ingredients you already have on hand. Happy cooking!
            </p>
          </div>
          {/* 
      TODO: Look into a food list API. Each food item needs to be a
      consistent from user to user example: user 1 enters milk, user 2 eneter
      Milk. They should both point to the same ingredient. Write a helper
      function that checks if the item the user enters has already been added to
      the database, if so, return it, otherwise create it. */}
        </section>
      )}
    </>
  );
};

export default InYourFridge;
