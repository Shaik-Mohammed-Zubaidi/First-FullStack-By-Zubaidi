import React from 'react';
import './App.css';

function Movies(props) {
    const {name,description,actorList,isHit,budget,boxOfficeCollection,releaseDate}= props;
    const gotDate= new Date(releaseDate);
    // console.log(actors);
    return (<div className="movie">
        <h3>{name}</h3>
        <p>{description}</p>
        <div>Actors: {actorList && actorList.map(actorName=><span key={actorName}>{actorName},</span>)}</div>
        <div>Budget: {budget}</div>
        <div>Box Office Collection: {boxOfficeCollection}</div>
        <div>Is Hit: {isHit? "yes":"no"}</div>
        <div>release Date: {gotDate.toDateString()}</div>
    </div>);
}

export default Movies;