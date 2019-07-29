const axios = require('axios');
const peopleURL = 'https://swapi.co/api/people/?search=';
let planetUrl = 'https://swapi.co/api/planets/';

export const userAuthentication = async (username,password)=>{
    return await axios.get(peopleURL+username)
     .then((res)=>{
         const data = res.data;
         if(data.results.length!==0){
             if(((data.results[0].name).toLowerCase() === username.toLowerCase()) && (data.results[0].birth_year === password)){
                 return true;
             } 
             return false;
         }
         else{
             return false;
         }
     })
     .catch((err)=>{
         console.log('Error from requrest ',err);
     })
 }

 export const getAllPlanets= async ()=>{
     let planetArray=[];
     while(planetUrl !== null){
        await axios.get(planetUrl).then((res)=>{
           planetUrl= res.data.next;
           planetArray.push(...res.data.results)
         }).catch((err)=>{
           console.log('Err from planets',err);
         });
     }
    planetArray.sort((a,b)=>{
        let aPop = a.population !== 'unknown'?a.population:-1;
        let bPop = b.population !== 'unknown'?b.population:-1;
            return bPop-aPop;
    });
     return planetArray;
 }