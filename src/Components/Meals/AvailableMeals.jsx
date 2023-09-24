import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 220.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 160.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 120.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 180.99,
    },
  ];
const AvailableMeals = ()=>{

        const mealsList = DUMMY_MEALS.map(meal=><li key = {meal.id}><MealItem id = {meal.id} title={meal.name} description={meal.description} price={meal.price}/></li>)

    return <section className={classes.meals}>
        <Card>
        <ul>
           {mealsList}
        </ul>
        </Card>

</section>
}

export default AvailableMeals;