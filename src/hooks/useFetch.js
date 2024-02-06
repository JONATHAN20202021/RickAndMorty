import axios from "axios";
import { useState } from "react"

const useFetch = () => {
 const [apiData, setApiData] = useState();
  const [loading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false); 
 const getApi = url =>{
    axios.get(url)
    .then(res => {
      setHasError(false)
      setApiData(res.data)})
    .catch(err =>{
      setHasError(true)
      console.log(err)})
    .finally(() => {
      setIsLoading(false);
    } );
 }
 return [apiData, getApi, loading,hasError];
}

export default useFetch