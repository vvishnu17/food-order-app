import React,{useState,useEffect, useCallback} from "react";
import styles from './Meals.module.css';
import MealItem from "./MealItem";
import useHTTP from "../Hooks/useHTTP";

const Meals = () =>{
    const [meals,setMeals] = useState([]);
    const {isLoading,error,sendHttpRequest} = useHTTP();
    const setMealsData = useCallback((data) =>{
        setMeals([...data]);
    },[])

    useEffect(()=>{
        const url = "http://localhost:3000/meals";
        const config = {
            method: 'GET',
        }
        sendHttpRequest(url,config,setMealsData)
    },[sendHttpRequest,setMealsData]);

    let content = <p>No meals available</p>
    if(error){
        content = <p>{error}</p>
    }
    if(isLoading)
    {
        content = <p className={styles.center}>Page is Loading....</p>
    }
    if(meals.length > 0)
    {
        content = meals.map((meal)=> <MealItem key={meal.id} mealData={meal} />)
    }


   /* Normal flow without useHttp Hook
   useEffect(()=>{
        const fetchMeals = async()=>{
            try{
                const response = await fetch("http://localhost:3000/meal");
                console.log("Response:",response);
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log("Data",data)
                setMeals(data);
            }
            catch(error){
                console.log("Fetch Error",error);
                setMeals([...availableMeals])

            }
        }
        fetchMeals();
    },[])*/


    return <div className={styles.meals}>
        {content}
    </div>
}

export default Meals;