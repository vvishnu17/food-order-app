import {useCallback, useState} from "react";
import { availableMeals } from "../assets/availableMeals";
const useHTTP = () =>{
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();

    const sendHttpRequest = useCallback(async(url,config,transformFn) =>{
        try{
            setIsLoading(true);
            setError(null);
            const response = await fetch(url,config);
            if(!response.ok)
            {
                throw new Error(response.status);                 
            }
            const data = await response.json();
            transformFn(data);
        }
        catch(error){
            setError(error.message);
            if(config.method === 'GET')
            {
                transformFn(availableMeals)
            }
        }
        setIsLoading(false);
    },[])
    return{
        isLoading,
        error,
        sendHttpRequest,
    }

}

export default useHTTP;