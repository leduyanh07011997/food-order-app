import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import "./AvailableMeals.scss";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://foody-app-df9a0-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHasError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <h1 className="mealsLoading">Loading...</h1>
      </section>
    );
  }

  if (hasError) {
    return (
      <section>
        <h1 className="errorText">{hasError}</h1>
      </section>
    );
  }
  const mealsArray = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));

  return (
    <section className="meals">
      <Card>
        <ul>{mealsArray}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
