import React, { useEffect, useState } from 'react'
import {Link, useParams} from 'react-router-dom'
import { IAnimals } from '../../models/IAnimal';
import './About.css'

const About = () => {
    const [animalsFromApi, setAnimalsFromApi] = useState<IAnimals>()
    let { aboutId } = useParams()
    
    const feedMe = () => {
        const fetchedData =  localStorage.getItem('animal')
        if(fetchedData) {
            const animaldataParsed = JSON.parse(fetchedData)
                animaldataParsed.find((data:any) => {
                if(data.id == aboutId) {
                    
                    setAnimalsFromApi(data)

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

    const saveLocalStorage = (data:any) => {
        
        const dataStringify = JSON.stringify(data)
        localStorage.setItem('animal', dataStringify)
    }

    const fetchLocalStorage = () => {
        const fetchedData =  localStorage.getItem('animal')        

        if(fetchedData) {
            const animalData = JSON.parse(fetchedData)           

            animalData.find((data:any) => {
                if(data.id == aboutId) {

                    let lastFedTime = Date.parse(data.lastFed)
                    
                    let timeNow = new Date().getTime()

                    let timeSinceFed = timeNow - lastFedTime

                    let hoursSinceFed = Math.floor(timeSinceFed/1000 /60 /60);

                    if(hoursSinceFed >= 3) {
                        data.isFed = false
                    }

                    setAnimalsFromApi(data)

                   return data
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
                    {animalsFromApi?.isFed ? <button disabled onClick={()=> feedMe()} >Mata mig!</button> : (<button  onClick={()=> feedMe() } >Mata mig!</button>)}
                    </div>
                    <h1>{animalsFromApi?.isFed ? `${animalsFromApi?.name } Har blivit matad` : `${animalsFromApi?.name } Har inte blivit matad!!!`}</h1>
                    <h1>{animalsFromApi?.name } blev matad kl: {animalsFromApi?.lastFed}</h1>
                </div>
            </div>
}
export default About