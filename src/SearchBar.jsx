import React from 'react';
import './App.css';

function SearchBar(props) {
    const [movie_name, setMovieName] = React.useState("");
    const {onSubmit}= props;

    const handleChange=(event)=>{
        setMovieName(event.target.value);
    }
    return (<>
        Enter a Movie name: <input className="button" value={movie_name} onChange={handleChange}/>
        <button className="button" onClick={()=>onSubmit(movie_name)}>Search</button>
    </>);
}

export default SearchBar;