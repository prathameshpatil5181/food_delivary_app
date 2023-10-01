import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 220.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 160.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 120.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 180.99,
  },
];

const AvailableMeals = () => {
  const [allMealItems, setMealItems] = useState([]);
  const [isLodading,setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false) 
  useEffect(() => {
    const fetchMeals = async () => {
      try{
        const response = await fetch(
          "https://fooddelivaryapp-7834d-default-rtdb.firebaseio.com/Meals.json"
        );
  
        const data = await response.json();
        const tempMeals = [];
        for (const key in data) {
          tempMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMealItems(tempMeals);
        setIsLoading(false);
      }
      catch(error){
          setIsError(true);
          throw new Error('Bad Request')
      }
    }
    fetchMeals();
   
  }, []);

  const mealsList = allMealItems.map((meal) => (
   
      <MealItem
      key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
   ))

   if(isError){
    return (
      <section className={classes.meals}>
        <Card>
          <ul>Something Went Wrong</ul>
        </Card>
      </section>
    );
   }
  
   if(isLodading){
    return (
      <section className={classes.meals}>
        <Card>
          <ul>Loading...</ul>
        </Card>
      </section>
    );
   }


  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
