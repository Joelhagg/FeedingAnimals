import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import { IAnimals } from '../../models/IAnimal'
import './Main.css'

const Main = () => {
    
    const [animalsFromApi, setAnimalsFromApi] = useState<IAnimals[]>([])
    let animalsFed:any = []
 
    const getAnimalData = async () => {
        
        const response = await axios.get<IAnimals[]>('https://animals.azurewebsites.net/api/animals')
        let listOfAnimalsFromApi = response.data

        saveLocalStorage(listOfAnimalsFromApi)
        setAnimalsFromApi(listOfAnimalsFromApi)
    }
    
    useEffect(()=> {
        fetchLocalStorage()
    },[])
    
    const fetchLocalStorage = () => {
        const myLocalData = localStorage.getItem('animal')
        
        if(!myLocalData) {      
            getAnimalData()
        } else {
            const animalData = JSON.parse(myLocalData)   
            setAnimalsFromApi(animalData)
        }
    }

    useEffect(() => {
        checkForHungryAnimal()
    },[])


    const checkForHungryAnimal = () => {
        const myLocalData = localStorage.getItem('animal')

        if(!myLocalData) {     
        } else {
            const animalData = JSON.parse(myLocalData)   

                animalData.find((data: any) => {
                                
                    if (data.isFed == true) {
                         
                        let lastFedTime = Date.parse(data.lastFed)

                        let timeNow = new Date().getTime()

                        let timeSinceFed = timeNow - lastFedTime

                        let hoursSinceFed = Math.floor(timeSinceFed/ 1000 /60 /60)
                        
                        if(hoursSinceFed >= 3) {
                            data.isFed = false    
                        } 
                    }
                })
                saveLocalStorage(animalData)
        }
    }

    const saveLocalStorage = (data: IAnimals[]) => {       
        
        if(data.length >= 0) {
            localStorage.setItem('animal', JSON.stringify(data))   
        }        
    }

    return <div>
            <div className='hungryAnimalsWraper'>
                <h2>Dom här djuren har inte fått mat på mer än 3 timmar!</h2>
                    {animalsFromApi.map(animal => {
                        return(
                            <h3 className='hungryAnimalsContainer' key={animal.name}> {animal.isFed ? `` : `${animal.name},`} </h3>
                    )
                })}
            </div>
            <div className='animalWraper'>
            {animalsFromApi.map(animal => {
            return (                        
                <div className='animalContainer' key={animal.id}>
                    <h2> {animal.name} </h2>
                    <img src={animal.imageUrl}></img> 
                    <p> {animal.shortDescription} </p>
                        <Link  to={`/about/${animal.id}`} >
                            <button type="button">
                                Mata och lär känna {animal.name}!
                            </button>
                        </Link> 
                </div>)
        })}
        </div>
    </div>
}
export default Main