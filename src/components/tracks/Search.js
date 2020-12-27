import React, { Component } from "react";
import axios from "axios";
import { Consumer } from "../../context";
import { apiKey } from "../../apis";

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
        `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${apiKey}`
      )
      .then((res) => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list,
        })
        this.setState({trackTitle: ''})
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
              <div className="card card-body mb-4 p-4">
                <h1 className="display-4 text-center">
                  <i className="fas fa-music"></i> Search For A Song
                </h1>
                <p className="lead text-center">Get the lyrics fir any song</p>
                <form onSubmit={this.findTrack.bind(this, dispatch)}>
                  <div className="form-group">
                    <input
                      className="form-control form-control-lg"
                      placeholder="Song title..."
                      name="trackTitle"
                      value={this.state.trackTitle}
                      onChange={this.onChange}
                    />
                  </div>
                  <button
                    className="btn btn-primary btn-lg mb-5 mt-3"
                    type="submit"
                    style={{ width: "100%" }}
                  >
                    Get Track Lyrics
                  </button>
                </form>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default Search;
