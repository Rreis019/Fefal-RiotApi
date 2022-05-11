import Axios from 'axios';
//import state and useffect from react
import { useState, useEffect } from 'react';
import Header from '/components/Header.js'



export default function SummonerNotFound() 
{
  const [summonerName, setSummonerName] = useState("");
  const [regionName, setRegionName] = useState("euw1");

  function redirectToSummonerPage()
  {
    if(summonerName === "")
    {
        return;
    }

    window.location.href = `/Summoner/${summonerName}?Region=${regionName}`;
  }


  useEffect(() => {
      //set background image
        document.body.style.backgroundImage = "url('/champion-yasuo-splash.jpg')";
        document.body.style.backgroundSize = "cover";
  }, []);


  return (
    <div>
        <div className='bgYasuo'></div>
    
        <Header title = "Error 404"/>

        <div className="container">
            <div className='error404-container'>
                <span className='h1' >Error 404</span>
                <span className='h2'>Summoner not found</span>
            </div>
        </div>

    </div>
  )
}
