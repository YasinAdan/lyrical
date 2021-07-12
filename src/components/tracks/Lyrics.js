import React, { Component } from "react";
import axios from "axios";
import { apiKey } from "../../apis";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${apiKey}`
      )
      .then((res) => {
        this.setState({ lyrics: res.data.message.body.lyrics });

        return axios.get(
          `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${apiKey}`
        );
      })
      .then((res) => this.setState({ track: res.data.message.body.track }))
      .catch((error) => console.log(error));
  }

  render() {
    const { track, lyrics } = this.state;
    console.log(track);
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <div class="w-screen h-screen flex flex-col items-center rounded-lg">
          <div className="w-8/12 mt-10 border-2">
            <h5 className="bg-gray-300 p-4 font-bold">
              {track.track_name} {" "}
              <span className="italic font-normal">by {track.artist_name}</span>
            </h5>
            <div className="p-2">
              <p className="">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="w-8/12 mt-5 divide-y divide-blue-900 border-2 border-blue-500 rounded-sm">
            <li className="p-1">
              <span class='font-bold italic'>Album ID</span>: {track.album_id}
            </li>
            <li className="p-1">
              <span class='font-bold italic'>Explicit Words </span>:{" "}
              {track.explicit === 0 ? "No" : "Yes"}
            </li>
            <li className="p-1">
              <span class='font-bold italic'>Release Date</span>:{" "}
              <Moment format={"MM/DD/YYYY"}>{track.updated_time}</Moment>
            </li>
          </ul>
          <Link to="/" className="border-2 p-2 mt-2 rounded bg-green-400">
            Go Back
          </Link>
        </div>
      );
    }
  }
}

export default Lyrics;
