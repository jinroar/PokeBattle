import { useState } from "react";
import PinkButton from "./components/PinkButton";
import { Pokemon } from "./interfaces/Pokemon";
import AudioPlayer from "react-audio-player"
import './index.css';
import FightButton from "./components/FightButton";

function PokeReact  () {

  const [pokemonName1, setPokemonName1] = useState<string>("");
  const [pokemonName2, setPokemonName2] = useState<string>("");
  const [pokemon1Data, setPOkemon1Data] = useState<Pokemon | null>(null);
  const [pokemon2Data, setPOkemon2Data] = useState<Pokemon | null>(null);

  const [hasFightResults, setHasFightResults] = useState<boolean>(false);
  const [pkmn1Hp, setPkmn1Hp] = useState(0);
  const [pkmn2Hp, setPkmn2Hp] = useState(0);

  const selectPokemon = async () => {
    const fetchJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName1}`);
    const pokemonData = await fetchJson.json();
    setPOkemon1Data(pokemonData);
  }
  const selectPokemon2 = async () => {
    const fetchJson = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName2}`);
    const pokemonData = await fetchJson.json();
    setPOkemon2Data(pokemonData);
  }
  const fight = ()=> {
    const pkmn1Hp = 
      (pokemon1Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 ) +
      (pokemon1Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 ) - 
      (pokemon2Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);
    setPkmn1Hp(pkmn1Hp);
    const pkmn2Hp = 
      (pokemon2Data?.stats.find((s)=>s.stat.name==="hp")?.base_stat || 0 ) +
      (pokemon2Data?.stats.find((s)=>s.stat.name==="defense")?.base_stat || 0 ) - 
      (pokemon1Data?.stats.find((s)=>s.stat.name==="attack")?.base_stat || 0);
    setPkmn2Hp(pkmn2Hp);
    setHasFightResults(true);
  }

  const [showHideButton, setShowHideButton] = useState(false);

  const handleClick = () => {
    setShowHideButton(true);
  };

  return (
      <div className="image-container">
      {
          pokemon1Data && 
          <div className="box1">
            <img className="gif" src={pokemon1Data.sprites.other.showdown.front_default}/>
            <p>
              Name: {pokemon1Data?.name} <br/>
              HP: {pokemon1Data.stats.find(e=>e.stat.name==="hp")?.base_stat} <br/>
              Attack: {pokemon1Data.stats.find(e=>e.stat.name==="attack")?.base_stat} <br/>
              Defense: {pokemon1Data.stats.find(e=>e.stat.name==="defense")?.base_stat} <br/>
            <AudioPlayer src={pokemon1Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')}/>
            </p>
            
          </div>
        }
        {
          pokemon2Data && 
          <div className="box2">
            <img className="gif" src={pokemon2Data.sprites.other.showdown.front_default}/>
            <p>
              Name: {pokemon2Data?.name} <br/>
              HP: {pokemon2Data.stats.find(e=>e.stat.name==="hp")?.base_stat} <br/>
              Attack: {pokemon2Data.stats.find(e=>e.stat.name==="attack")?.base_stat} <br/>
              Defense: {pokemon2Data.stats.find(e=>e.stat.name==="defense")?.base_stat} <br/>
              <AudioPlayer src={pokemon2Data.cries.latest} controls volume={0.5} onPlay={() => console.log('Playing')} onPause={() => console.log('Paused')}/>
            </p>
           
          </div>
        }

        
     <div className="box3">
      <input className="tbox" type="" placeholder="Pokemon" value={pokemonName1} onChange={(e)=>setPokemonName1(e.target.value)}/>
      <PinkButton  buttonClick={() => {selectPokemon(); handleClick(); }} label="Select Pokemon"/><br/>
      <input className="tbox" type="" placeholder="Pokemon" value={pokemonName2} onChange={(e)=>setPokemonName2(e.target.value)}/>
      <PinkButton  buttonClick={selectPokemon2} label="Select Pokemon"/> 
      </div>
   
     
      {showHideButton ? (
         <div className="box4">
        <FightButton buttonClick={fight} label={"Payt!"} /> 
        </div>
      ) : null}

      <div className="box5">
      {hasFightResults && ( <p> 🔥 {pokemon1Data?.name}: {pkmn1Hp} vs {pokemon2Data?.name}: {pkmn2Hp} 🔥</p> )}
      </div>
      
      
    </div>

  )
}

export default PokeReact;