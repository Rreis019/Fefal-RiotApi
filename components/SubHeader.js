

export default function SubHeader(props) 
{

    return (
        <div className="subheader">
            <div className="subheader-content position-relative">
                <img style={{"border-radius":"10px"}} id="profileIcon" src={props.profileIcon}></img>
                <div className="subheader-level-container" >
                    <span className="h2 color-white">Nivel : {props.summonerLevel}</span>
                </div>
            </div>
        
        </div>
    );
}