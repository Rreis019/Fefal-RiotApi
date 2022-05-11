import { useState } from "react";

export default function Header(props) 
{
    const [summonerName, setSummonerName] = useState("");
    const [regionName, setRegionName] = useState("euw1");


    function redirectToSummonerPage()
    {
      if(summonerName === "")
      {
        //alert("Please enter a summoner name");
        return;
      }

  
      window.location.href = `/Summoner/${summonerName}?Region=${regionName}`;
    }

        function handleKeyPress(event) {
            if(event.key === 'Enter'){
            redirectToSummonerPage();
            }
        }

    return (
        <div className="header">
            <div className="header-left">
                <span className="h1 black font-inter">{props.title}</span>
            </div>
            <div className="header-right">
                <input  type="text"  className="inputHuge font-inter h3" onChange={(e) => setSummonerName(e.target.value)} onKeyPress={handleKeyPress} placeholder="Summoner Name"></input>
                <select className="dropDown-black" onChange={(e) => setRegionName(e.target.value)}>
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
            </div>
        </div>
    );
}