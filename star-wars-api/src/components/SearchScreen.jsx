import React, { Component } from 'react';
import { auth } from '../utils';
import './SearchScreen.css';

export default class SearchScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      planets:[...props.planet],
      filtered:[],
      searchInput:'',
      selectedPlanet:'',
      showPlanetFlag:false
    }
  }

  planetFilter = (sub)=>{
    let filtered = this.state.planets && this.state.planets.filter((planet)=>{
      return planet.name.toLowerCase().includes(sub);
    });
    this.setState({filtered,showPlanetFlag:false});
  }
  handleChange = (e)=>{
    if(e.target.value !== ""){
      this.planetFilter(e.target.value);
    }else{
     this.setState({filtered:[]});      
    }
    this.setState({searchInput:e.target.value});
  }
  handleClick = (planet)=>{
    this.setState({showPlanetFlag:true,selectedPlanet:planet})
  }
  handleLogout = ()=>{
    auth.logout();
    this.props.history.push('/login');
  }
  singlePlanetComponent=(planet)=>(
    <div className="single-planet-container">
      <div id="label" >Name <span>{planet.name}</span></div>
      <div id="label" >Population <span>{planet.population}</span></div>
      <div id="label">Diameter <span>{planet.diameter}</span></div>
      <div id="label" >Climate <span>{planet.climate}</span></div>
      <div id="label" >Gravity <span>{planet.gravity}</span></div>
      <div id="label" >Orbitational Period <span>{planet.orbitational_period}</span></div>
      <div id="label" >Rotation Period <span>{planet.rotation_period}</span></div>
      <div id="label" >Surface Water <span>{planet.surface_water}</span></div>
      <div id="label" >Terrain <span>{planet.terrain}</span></div>
      <div id="label" >Created <span>{planet.created}</span></div>
      <div id="label" >Edited <span>{planet.edited}</span></div>
      <div id="label" >URL <span>{planet.url}</span></div>
      <div id="label" >Residents <select name="Residents" id="">
        {planet.residents.map((resident,ind)=><option key={ind} value={resident}>{resident}</option>)}
      </select></div>
      <div id="label" >Films <select name="Residents" id="">
      {planet.films.map((film,ind)=><option key={ind} value={film}>{film}</option>)}
      </select></div>
    </div>
  )
  render() {
    let {filtered,showPlanetFlag,selectedPlanet} = this.state;

    return (
      <div className="container search-container"> 
        <div className="row logout-container">
          <button onClick={this.handleLogout} className="btn btn-warning logout-button" >Logout</button>
        </div>
        <div className="row">
            <input className="search-planet" onChange={this.handleChange} type="text" placeholder="Search for a planet... "/>
        </div>
        {!showPlanetFlag && <div className="planets-container">
          {filtered.map((planet)=><li onClick={()=>this.handleClick(planet)} style={{fontSize:`${planet.population !== 'unknown'?planet.population.length+25:20}px`,letterSpacing:`${planet.population.length-3}px`,fontWeight:`${planet.population.length-4}*100`}} key={planet.name} value={planet.name}>{planet.name}</li>)}
        </div>}
        {showPlanetFlag && this.singlePlanetComponent(selectedPlanet)}
      </div>
    );
  }
}
