import { useEffect,useRef,useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/locationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';
function App() {
const [finder, setFinder] = useState(Math.floor(Math.random() * 126+1))
const [location, getLocation,isLoading,hasError] = useFetch();
const [currentPage, setCurrentPage] = useState(1)
useEffect(() => {
const url = `https://rickandmortyapi.com/api/location/${finder}`;
getLocation(url);
}, [finder])
//console.log(location);
const textImput= useRef();
const handleSubmit = event => {
  event.preventDefault();
  setFinder(textImput.current.value.trim());
}
const quantity= 15;
const second= currentPage * quantity;
const first = second - quantity; 
const residentsPart = location && location.residents.slice(first,second)
const totalPages= location && Math.floor(location.residents.length/ quantity) + 1  
return (
    <div className='app'>
      {
       isLoading ?
       <h2>LOADING.....</h2>
       :
       <>
       <h1>Rick  and Morty </h1>
       <img src="https://i.pinimg.com/originals/29/bd/26/29bd261d201e956588ee777d37d26800.gif" alt="gif" />
       <form className='app__form' onSubmit={handleSubmit}>
         <input className='app__text' type="number" ref={textImput}
         placeholder='Digit number 1-126'/>
         <button className='app__btn'>Search</button>
       </form>
       {
        hasError || finder==='0' ?
        <h2>THIS LOCATION NOT EXIST</h2>
        :
        <>
       <LocationCard
       location={location}
       />
        <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}/>

       <div className='app__container'>

      
       {
         residentsPart.map(resident => (
           <ResidentCard
           key= {resident}
           url={resident}
           />
         ))
       }
       </div>
        </> 
       }
         
      </> 
        
      }
    </div>
  )
}

export default App
