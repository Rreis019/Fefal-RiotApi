import Axios from 'axios';

import { useEffect,useState } from 'react';
import {useRouter} from "next/router";
const { riotApiKey } = require('/pages/api/riot.js');
import MatchInfo from "/components/MatchInfo.js";
import Header from '/components/Header.js'
import SubHeader from 'components/SubHeader';

export default function Home() 
{
  const [summonerData, setSummonerData] = useState([]);
  const [regionName, setRegionName] = useState('');
  const [regionName2, setRegionName2] = useState('');
  const [matchIDs, setMatchData] = useState([]);
  const router = useRouter();
  
  

  useEffect (() => {
    if(!router.isReady) return;
      const name = router.query.name;
      const region = router.query.Region;
      setRegionName(region);

      

      /*
   <select className='dropDown-black' onChange={(e) => setRegionName(e.target.value)}>
          <option value="euw">EUW</option>
          <option value="eune">EUNE</option>
          <option value="na1">NA1</option>
          <option value="br1">BR1</option>
          <option value="jp1">JP1</option>
          <option value="kr">KR</option>
          <option value="la1">LA1</option>
          <option value="la2">LA2</option>
          <option value="oc1">OC1</option>
          <option value="tr1">TR1</option>
          <option value="ru">RU</option>
          <option value="pbe1">PBE1</option>
        </select>

        convert to europe,americas,asia
      */
      if(region === "euw1" || region === "eun1" || region === "na1" || region == "ru")
      {
        setRegionName2("europe");
      }
      else if(region === "na" || region == "br1" ||  region === "kr" || region === "la1"){
        setRegionName2("americas");
      }
      else if(region === "la2" || region === "jp1"  | region=== "la1" || region == "kr"|| region === "oc1" || region === "tr1"){
        setRegionName2("asia");
      }

  
      
      var url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + name + "?api_key=" + riotApiKey;
      //Send get request to riot api and console log the response
      Axios.get(url)
      .then(response => {
        console.log(response);
        setSummonerData(response.data);
      }).catch((error) => {
        if(error == "Error: Network Error")
        {
         window.location.href = "/SummonerNotFound";

        }

      });




      
      
  }, [router.query.name, router.query.Region]);


  //when state summonerData is not empty execute the following
  //useeffect executes when summonerData is not empty
  useEffect(() => {
    if(summonerData.length === 0) return;

    var url = "https://" + regionName2 + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + summonerData.puuid + "/ids?type=normal&start=0&count=5&api_key=" + riotApiKey;
    
    //console.log(url);
    Axios.get(url).then(response => {
      console.log(response);
      setMatchData(response.data);
    });

  }, [summonerData]);



  return (
    <div>
      <Header title = {summonerData.name}></Header>
      <SubHeader summonerLevel={summonerData.summonerLevel} profileIcon={"/img/lol/profileicon/" + summonerData.profileIconId + ".png"} ></SubHeader>
      <div className='matchArray'>
        {matchIDs && matchIDs.map((id,index) => 
        {
          return (
            <div key={index}>
                  <MatchInfo id={id} summonerName={summonerData.name} region={regionName2}></MatchInfo>
                </div>
          )
        })}
      </div>

    </div>
  )
}
