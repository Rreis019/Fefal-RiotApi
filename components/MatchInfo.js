import { useEffect,useState } from "react";
import React, { Component } from 'react';
import Axios from "axios";
const { riotApiKey } = require('/pages/api/riot.js');

function getSpellName(id)
{
    var spellList = [ "SummonerBarrier.png", "SummonerBoost.png", "SummonerDot.png", "SummonerExhaust.png", "SummonerFlash.png", "SummonerHaste.png", "SummonerHeal.png", "SummonerMana.png", "To the King!", "SummonerPoroThrow.png", "SummonerSmite.png", "SummonerSnowball.png", "SummonerTeleport.png", "SummonerTeleport.png", "Placeholder and Attack-Smite"];
    var spellID = [21,1,14,3,4,6,7,13,30,31,11,39,32,12,54,55];
    for(let i = 0; i < spellList.length; i++)
    {
        if(id === spellID[i])
        {
            return spellList[i];
        }
    }

    return "";
}

function getLaneImgName(laneName){
    var laneList = ["TOP","SUPPORT","MIDDLE","JUNGLE","BOTTOM"];
    var laneImgList = ["Top.png","Support.png","Mid.png","Jungle.png", "Bottom.png"];
    for(let i = 0; i < laneList.length; i++)
    {
        if(laneName === laneList[i])
        {
            return laneImgList[i];
        }
    }
    return "";
}



export default function MatchInfo(props) 
{
    const [localPlayer, setLocalPlayer] = useState([]);
    const [localPlayerKda, setKda] = useState();
    const [info, setInfo] = useState([]);

    const [spellName1, setspellName1] = useState();
    const [spellName2, setspellName2] = useState();
    const [laneImgName, setLaneImgName] = useState();


    useEffect(() => {
        // /lol/match/v5/matches/{matchId}
        //https://europe.api.riotgames.com/lol/match/v5/matches/EUW1_5817803628?api_key=RGAPI-c47526d2-7036-430a-ab18-5b3666d8bafe
        var url = "https://" + props.region + ".api.riotgames.com/lol/match/v5/matches/" + props.id + "?api_key=" + riotApiKey; 
        Axios.get(url).then(response => 
        {
            setInfo(response.data.info);
            //loop through all the players in the match
            for(var i = 0; i < response.data.info.participants.length; i++){
                if(response.data.info.participants[i].summonerName == props.summonerName){
                    setLocalPlayer(response.data.info.participants[i]);
                    console.log(response.data);

                    var kills = response.data.info.participants[i].kills;
                    var deaths = response.data.info.participants[i].deaths;
                    var assists = response.data.info.participants[i].assists;
                    var kda = (kills + assists)/ deaths;
                    //if kda == Infinity, set to Inf
                    kda = kda.toFixed(2);
                    setKda(kda);

                    setspellName1(getSpellName(response.data.info.participants[i].summoner1Id));
                    setspellName2(getSpellName(response.data.info.participants[i].summoner2Id));


                    var lane = response.data.info.participants[i].lane;
                    console.log("lane:" +  lane);
                    if(lane == "" || lane == null || lane == "NONE"){
                        lane = response.data.info.participants[i].role;
                        if(lane == "DUO") {lane = "BOTTOM";}
                    }



                    setLaneImgName(getLaneImgName(lane));
                }
            }
            //get most played champion
        });
    }, [props]);

    return (
        <div className={`matchInfo ${localPlayer.win ? '' : 'matchInfo-border-red'}`}>
            <div className="position-relative text-center" style={{"witdh":"90px","height":"90px"}}>
                <img id="championImage" src={"/img/lol/champion/" + localPlayer.championName + ".png"}></img>
                <div className="position-absolute-bottom-left" style={{"background-color":"rgba(37, 37, 37, 0.1)"}} >
                    <img  style={{"width":"20px"}} id="spellImage1" src={"/img/lol/roles/" + laneImgName}></img>
                </div>

                <div style={{"background-color":"rgba(37, 37, 37, 0.1)","padding":"2px"}} className="position-absolute-bottom-right">
                    <span className="h4 color-white font-inter">{localPlayer.champLevel}</span>
                </div>
            </div>

            <div className="matchStats">
                {localPlayer.win == true ? 
                    <span className="h1 color-green font-inter">Victory</span> :
                    <span className="h1 color-red font-inter">Defeat</span>
                }
                <span className="h4 color-black font-inter font-400">{info.gameMode}</span>
            </div>

            <div className="matchItems">
                <div><img src={ "/img/lol/spell/" + spellName1}></img></div>
                <div>{localPlayer.item0 != 0 ? <img src= {"/img/lol/item/" + localPlayer.item0 + ".png"} ></img> : "" }</div>
                <div>{localPlayer.item1 != 0 ? <img src= {"/img/lol/item/" + localPlayer.item1 + ".png"} ></img> : "" }</div>
                <div>{localPlayer.item2 != 0 ? <img src= {"/img/lol/item/" + localPlayer.item2 + ".png"} ></img> : "" }</div>

                <div><img src={ "/img/lol/spell/" + spellName2}></img>  </div>
                <div>{localPlayer.item3 != 0 ? <img src= {"/img/lol/item/" + localPlayer.item3 + ".png"} ></img> : "" }</div>
                <div>{localPlayer.item4 != 0 ? <img src= {"/img/lol/item/" + localPlayer.item4 + ".png"} ></img> : "" }</div>
                <div>{localPlayer.item5 != 0 ? <img src= {"/img/lol/item/" + localPlayer.item5 + ".png"} ></img> : "" }</div>
            </div>

            

            <div className="flex flex-col text-center">
                <span className="h2 color-black">Kda : {localPlayerKda}</span>
                <span className="h2 color-black">{localPlayer.kills}/{localPlayer.deaths}/{localPlayer.assists}</span>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-items-center gap-5">
                    <img className="w-32 h-32" src="/img/misc/coins.png"></img>
                    <span className="h3 color-black">{localPlayer.goldEarned}</span>
                </div>

                <div className="flex flex-items-center gap-5">
                    <img alt="Gold Spent" className="w-32 h-32" src="/img/misc/coinsRed.png"></img>
                    <span className="h3 color-black">{localPlayer.goldSpent}</span>
                </div>
            </div>

        
        </div>
    );
}