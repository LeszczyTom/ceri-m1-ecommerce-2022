import { useEffect, useState } from 'react';
import VinylCard from '../card/VinylCard';
import './productsList.css';

function ProductsList(props) {

  const [allRecords, setAllRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filtersGenres, setFiltersGenres] = useState([]);
  const [filtersArtists, setFiltersArtists] = useState([]);
  const [filtersAlbums, setFiltersAlbums] = useState([]);
  const [filtersMinYear, setFiltersMinYear] = useState(1948);
  const [filtersMaxYear, setFiltersMaxYear] = useState(2023);
  const [filtersMinPrice, setFiltersMinPrice] = useState(0);
  const [filtersMaxPrice, setFiltersMaxPrice] = useState(100);
  const [uniqueAlbums, setUniqueAlbums] = useState([]);
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [uniqueGenres, setUniqueGenres] = useState([]);

  useEffect(() => {
    if(props.records){
      setAllRecords(props.records);
      setFiltered(props.records);
      setUniqueAlbums([...new Set(allRecords.map(q => q.album))]);
      setUniqueArtists([...new Set(allRecords.map(q => q.artist))]);
      setUniqueGenres([...new Set(allRecords.map(q => q.genre))]);
    }
    setFiltered(allRecords.filter(q => {
      return (
        (filtersGenres.length === 0 || filtersGenres.includes(q.genre)) &&
        (filtersArtists.length === 0 || filtersArtists.includes(q.artist)) &&
        (filtersAlbums.length === 0 || filtersAlbums.includes(q.album)) &&
        (q.year >= filtersMinYear && q.year <= filtersMaxYear) &&
        (q.price >= filtersMinPrice && q.price <= filtersMaxPrice)
      )
    }));

  }, [props.records, allRecords, filtersGenres, filtersArtists, filtersAlbums, filtersMinYear, filtersMaxYear, filtersMinPrice, filtersMaxPrice]);


  const handleGenreChange = (e, genre) => {
    if(e.target.checked){
      setFiltersGenres(filtersGenres => [...filtersGenres, genre]);
    }else{
      setFiltersGenres(filtersGenres.filter(item => item !== genre));
    }
  }

  const handleAlbumChange = (e, album) => {
    if(e.target.checked){
      setFiltersAlbums(filtersAlbums => [...filtersAlbums, album]);
    }else{
      setFiltersAlbums(filtersAlbums.filter(item => item !== album));
    }
  }

  const handleArtistChange = (e, artist) => {
    if(e.target.checked){
      setFiltersArtists(filtersArtists => [...filtersArtists, artist]);
    }else{
      setFiltersArtists(filtersArtists.filter(item => item !== artist));
    }
  }

  const handleMinYearChange = (e) => {
    if(e.target.value >= 1948 && e.target.value <= 2023){
      setFiltersMinYear(e.target.value);
    }
    else if (e.target.value < 1948){
      setFiltersMinYear(1948);
      e.target.value = 1948;
    }
    else if (e.target.value > 2023){
      setFiltersMinYear(2023);
      e.target.value = 2023;
    }
    if(e.target.value > filtersMaxYear) {
      setFiltersMinYear(filtersMaxYear);
      e.target.value = filtersMaxYear;
    }
  }

  const handleMaxYearChange = (e) => {
    if(e.target.value >= 1948 && e.target.value <= 2023){
      setFiltersMaxYear(e.target.value);
    }
    else if (e.target.value > 2023 || e.target.value === ""){
      setFiltersMaxYear(2023);
      e.target.value = 2023;
    }
    else if (e.target.value < 1948){
      setFiltersMaxYear(1948);
      e.target.value = 1948;
    }
    
    if(e.target.value < filtersMinYear) {
      setFiltersMaxYear(filtersMinYear);
      e.target.value = filtersMinYear;
    }
  }

  const handleMinYearKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMinYearChange(e)
    }
  }

  const handleMaxYearKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMaxYearChange(e)
    }
  }

  /* Prix */

  const handleMinPriceChange = (e) => {
    if(e.target.value < 0 || e.target.value === "") {
      setFiltersMinPrice(0);
      e.target.value = 0;
    }

    if(e.target.value > filtersMaxPrice) {
      setFiltersMinPrice(filtersMaxPrice);
      e.target.value = filtersMaxPrice;
    }
    setFiltersMinPrice(parseFloat(e.target.value));
  }

  const handleMaxPriceChange = (e) => {
    if(e.target.value < 0) {
      setFiltersMaxPrice(0);
      e.target.value = 0;
    }

    if(e.target.value === "") {
      setFiltersMaxPrice(100);
      e.target.value = 100;
    }

    if(e.target.value < filtersMinPrice) {
      setFiltersMaxPrice(filtersMinPrice);
      e.target.value = filtersMinPrice;
    }

    setFiltersMaxPrice(parseFloat(e.target.value));
  }

  const handleMinPriceKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMinPriceChange(e)
    }
  }

  const handleMaxPriceKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleMaxPriceChange(e)
    }
  }

  if(filtered.length !== 0){
    const products = filtered.map((record, index) => {
      return (
        <VinylCard key={index} record={record}/>
      )
    })
    
    return (
      <>
      <div className="container">
      <div className="filtersList">
        <h1 style={{fontFamily: "KarlaRegular", letterSpacing: "-2px"}}>Filtrer</h1>
        
        <div className="filter">
          <h3>Prix</h3>
          <div className="filterOptions">
              <input className="inputPrix" type="number" placeholder="0" onKeyDown={handleMinPriceKeyDown} onBlur={handleMinPriceChange} />
            -
              <input className="inputPrix" type="number" placeholder="100" onKeyDown={handleMaxPriceKeyDown} onBlur={handleMaxPriceChange} />
          </div>
        </div>
        {/*
        <div className="filter">
          <h3>Genre</h3>
          <div className="filterOptions">
            
            {uniqueGenres.map((x,y) => {
              return(
                <div className="filterOption" style={{textAlign:'left'}}>
                  
                  <label className="filterOptionLabel"htmlFor={x}>
                  <input type="checkbox" id={x} name={x} onChange={(e) => handleGenreChange(e, x)}></input>
                  {x}
                  </label>
                </div>
            )})}
            
          </div>
        </div>
        <div className="filter">
          <h3>Albums</h3>
          <div className="filterOptions">

            {uniqueAlbums.map((x,y) => {
              return(
                <div className="filterOption" style={{textAlign:'left'}}>
                  
                  <label className="filterOptionLabel"htmlFor={x}>
                  <input type="checkbox" id={x} name={x} onChange={(e) => handleAlbumChange(e, x)}></input>
                  {x}
                  </label>
                </div>
            )})}
            
          </div>
        </div>
        <div className="filter">
          <h3>Artistes</h3>
          <div className="filterOptions">
            
            {uniqueArtists.map((x,y) => {
              return(
                <div className="filterOption" style={{textAlign:'left'}}>
                  
                  <label className="filterOptionLabel" htmlFor={x}>
                  <input type="checkbox" id={x} name={x} onChange={(e) => handleArtistChange(e, x)}></input>
                  {x}
                  </label>
                </div>
            )})}
            
          </div>
        </div>
         */}

        <div className="filter">
          <h3>Année</h3>
          <div className="filterOptions">
              <input className="inputAnnee" type="number" placeholder="1948" onKeyDown={handleMinYearKeyDown} onBlur={handleMinYearChange} />
            -
              <input className="inputAnnee" type="number" placeholder="2023" onKeyDown={handleMaxYearKeyDown} onBlur={handleMaxYearChange} />
          </div>
        </div>
       
        {/*<div style={{margin:'30px'}}>
          <button className="filterButton">Filtrer</button>
              </div>*/}

      </div>
      <div className="productsList">
        {products}
      </div>
      </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
      <div className="filtersList">
        <h1 style={{fontFamily: "KarlaRegular", letterSpacing: "-2px"}}>Filtrer</h1>
        
        <div className="filter">
          <h3>Prix</h3>
          <div className="filterOptions">
              <input className="inputPrix" type="number" placeholder="0" onKeyDown={handleMinPriceKeyDown} onBlur={handleMinPriceChange} />
            -
              <input className="inputPrix" type="number" placeholder="100" onKeyDown={handleMaxPriceKeyDown} onBlur={handleMaxPriceChange} />
          </div>
        </div>
        {/*
        <div className="filter">
          <h3>Genre</h3>
          <div className="filterOptions">
            
            {uniqueGenres.map((x,y) => {
              return(
                <div className="filterOption" style={{textAlign:'left'}}>
                  
                  <label className="filterOptionLabel"htmlFor={x}>
                  <input type="checkbox" id={x} name={x} onChange={(e) => handleGenreChange(e, x)}></input>
                  {x}
                  </label>
                </div>
            )})}
            
          </div>
        </div>
        <div className="filter">
          <h3>Albums</h3>
          <div className="filterOptions">

            {uniqueAlbums.map((x,y) => {
              return(
                <div className="filterOption" style={{textAlign:'left'}}>
                  
                  <label className="filterOptionLabel"htmlFor={x}>
                  <input type="checkbox" id={x} name={x} onChange={(e) => handleAlbumChange(e, x)}></input>
                  {x}
                  </label>
                </div>
            )})}
            
          </div>
        </div>
        <div className="filter">
          <h3>Artistes</h3>
          <div className="filterOptions">
            
            {uniqueArtists.map((x,y) => {
              return(
                <div className="filterOption" style={{textAlign:'left'}}>
                  
                  <label className="filterOptionLabel" htmlFor={x}>
                  <input type="checkbox" id={x} name={x} onChange={(e) => handleArtistChange(e, x)}></input>
                  {x}
                  </label>
                </div>
            )})}
            
          </div>
        </div>
         */}
        <div className="filter">
          <h3>Année</h3>
          <div className="filterOptions">
              <input className="inputAnnee" type="number" placeholder="1948" onKeyDown={handleMinYearKeyDown} onBlur={handleMinYearChange} />
            -
              <input className="inputAnnee" type="number" placeholder="2023" onKeyDown={handleMaxYearKeyDown} onBlur={handleMaxYearChange} />
          </div>
        </div>
       
        {/*<div style={{margin:'30px'}}>
          <button className="filterButton">Filtrer</button>
              </div>*/}

      </div>
      <div className="notFound">
        <h2 style={{fontFamily: "KarlaRegular", letterSpacing: "-2px"}}>Nous n'avons trouvé aucun vinyle avec ces critères...</h2>
      </div>
      
      </div>
      </>
  );
}
export default ProductsList;
