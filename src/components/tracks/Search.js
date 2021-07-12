import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";

class Search extends Component {
  state = {
    trackTitle: "",
  };

  onChange = (e) => {
    this.setState({ trackTitle: e.target.value });
  };

  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=12&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        });
        this.setState({ trackTitle: "" });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <div>
        <Consumer>
          {(value) => {
            const { dispatch } = value;
            return (
              <div class="w-full flex justify-center items-center">
                <div className="w-11/12 mt-5 pb-10 flex flex-col justify-center items-center shadow-lg border-2 rounded">
                  <h1 className="text-center text-5xl text-gray-700 mt-4">
                    <i className="fas fa-music"></i> Search For A Song
                  </h1>
                  <p className="text-center text-md text-gray-600 mt-3 mb-1">
                    Get the lyrics for any song
                  </p>
                  <form
                    onSubmit={this.findTrack.bind(this, dispatch)}
                    class="w-full flex flex-col justify-center items-center"
                  >
                    <input
                      className="w-10/12 border-2 rounded placeholder-gray-600 pl-2 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Song title..."
                      name="trackTitle"
                      value={this.state.trackTitle}
                      onChange={this.onChange}
                    />
                    <button
                      className="w-9/12 mt-5 bg-gradient-to-r 
                      from-green-400 to-blue-500 hover:shadow-xl py-2
                      rounded hover:pointer transition duration-500 ease-in-out
                      transform hover:-translate-y-1 hover:scale-110 hover:from-green-300 hover:to-blue-400"
                      type="submit"
                    >
                      Get Track Lyrics
                    </button>
                  </form>
                </div>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default Search;
