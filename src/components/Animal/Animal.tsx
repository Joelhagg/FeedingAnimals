import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { IAnimal } from '../../models/IAnimal';
import { IFed } from '../../models/IFed';
import './Animal.css'

const Animal = () => {
    const [animalsFromApi, setAnimalsFromApi] = useState<IAnimal>()
    let { AnimalId } = useParams()
    
    const feedMe = () => {
        const fetchedData =  localStorage.getItem('animal')
        if(fetchedData) {
            const animaldataParsed = JSON.parse(fetchedData)
            
                animaldataParsed.find((data: IFed) => {   
                                    
                if(data.id == AnimalId) {

                    let timeFed = new Date().getTime() - new Date(data.lastFed).getTime()
                    let fedTime = Math.floor(timeFed/1000 / 60 / 60);

                    if(fedTime >= 3) {
                        data.isFed = true  
                        data.lastFed = new Date()
                    } 
                }
            })
            saveLocalStorage(animaldataParsed)
            fetchLocalStorage()
        }
    }

    const saveLocalStorage = (data:IAnimal) => {
        
        const dataStringify = JSON.stringify(data)
        localStorage.setItem('animal', dataStringify)
    }

    const fetchLocalStorage = () => {
        const fetchedData =  localStorage.getItem('animal')                

        if(fetchedData) {
            const animalData = JSON.parse(fetchedData)           

            animalData.find((data:any) => {
                
                if(data.id == AnimalId) {

                    let lastFedTime = Date.parse(data.lastFed)
                    
                    let timeNow = new Date().getTime()

                    let timeSinceFed = timeNow - lastFedTime

                    let hoursSinceFed = Math.floor(timeSinceFed/1000 /60 /60);

                    if(hoursSinceFed >= 3) {
                        data.isFed = false
                    }

                    setAnimalsFromApi(data)
                }
            })          
            
        }
    }
   
    useEffect(()=> {
        fetchLocalStorage()
    },[])    
    
    return <div className='animalInfo'>
                <Link to='/'><button>Tillbaka till djuren</button></Link>
                <div>
                        <h1> {animalsFromApi?.name} </h1><p><em>{animalsFromApi?.latinName}</em>  </p>
                        <h4>Född: {animalsFromApi?.yearOfBirth} </h4>
                        <img src={animalsFromApi?.imageUrl}></img>
                        <p>Medicin: {animalsFromApi?.medicine} </p>
                        <div className='longDescConatiner'>
                        <p> {animalsFromApi?.longDescription} </p>
                        </div>
                        <br />
                        <br />
                        <div>
                        </div>
                        <h1>{animalsFromApi?.isFed ? `${animalsFromApi?.name } är mätt och belåten` : `${animalsFromApi?.name } är hungrig! Klicka på knappen för att mata`}</h1>
                        {animalsFromApi?.isFed ? <button disabled onClick={()=> feedMe()} >Mata mig!</button> : (<button  onClick={()=> feedMe() } >Mata mig!</button>)}
                        <br />
                        <br />
                        <h2>{animalsFromApi?.name } blev senast matad  {animalsFromApi?.lastFed}</h2>
                    </div>
                
            </div>
}
export default Animal