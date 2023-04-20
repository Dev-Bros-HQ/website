import ChooseWorkout from "../../components/WorkoutGen/ChooseWorkout";


const Page = () => {
 



  return (
    <>
      <section className="">
        <ChooseWorkout/>
      </section>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "Home Workout Generator",
  "og:description":
    "Get a random workout you can do from home",
  "og:url": "https://devbroshq.com/",
  "og:image": "https://devbroshq.com/square-dev-bros-hq-title.webp",
};
