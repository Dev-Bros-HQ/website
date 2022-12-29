import Fridge from "../../components/inYourFridge/Fridge";
import Recipes from "../../components/inYourFridge/Recipes";

const InYourFridgeDashboard = () => {
  return (
    <section className="flex flex-col items-center mb-64">
      <br />
      <br />
      <br />
      <div className="w-full flex flex-col md:flex-row min-h-[65vh]">
        <Fridge />
        <Recipes />
      </div>
    </section>
  );
};

export default InYourFridgeDashboard;
