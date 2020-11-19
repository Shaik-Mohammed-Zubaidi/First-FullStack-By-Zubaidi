import React from "react";
import axios from 'axios';
import Movies from './Movies';
import SearchBar from "./SearchBar";
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            moviesList: [],
            searchedMovie: {},
            listDisplayed: true
        }
    }

    // async componentDidUpdate(prevProps) {
    //     if(prevProps.name=== this.props){
    //         return;
    //     }
    //     const data= await axios.get("https://localhost:3000");
    //     console.log(data);
    // }

    handleSubmit = (text) => {
        this.setState({listDisplayed: false});
        const getUrl = "/api/v1/movies/" + text;
        const receivedMovie = axios.get(getUrl);
        receivedMovie.then(movie => {
            this.setState({searchedMovie: movie.data[0]});
            // console.log(movie.data[0].actors);
        }).catch(() => this.setState({searchedMovie: {error: "there was an problem"}}));

    }

    getAllMovies=()=>{
        this.setState({listDisplayed: true});
        const getUrl= "/api/v1/movies";
        const allMovies = axios.get(getUrl);
        allMovies.then(movie=>{
            this.setState({moviesList: movie.data});
            console.log("Everything Succesful");
        }).catch(()=>{
            console.log("an Error occured here");
        })

    }

    render() {
        const {name,description,actors,isHit,budget,boxOfficeCollection,releaseDate}= this.state.searchedMovie;
        // console.log(actors);
        return (
            <div className="center body">
                <h1 className="title center">Movie Page</h1>
                <div className="search">
                <SearchBar onSubmit={this.handleSubmit}/></div>
                <button className="button" onClick={this.getAllMovies}>Show All Movies</button>
                {!this.state.listDisplayed && <Movies name={name} description={description} actorList={actors} isHit={isHit} budget={budget}
                        boxOfficeCollection={boxOfficeCollection} releaseDate={releaseDate}/>}
                <div className="movieContainer">{this.state.listDisplayed && this.state.moviesList.map(movie => <Movies key={movie.name}
                                                                                        name={movie.name}
                                                                                        description={movie.description}
                                                                                        actors={movie.actors}
                                                                                        isHit={movie.isHit}
                                                                                        budget={movie.budget}
                                                                                        boxOfficeCollection={movie.boxOfficeCollection}
                                                                                        releaseDate={movie.releaseDate}/>)}
                </div>
            </div>
        );
    }
}


export default App;
