import React, { Component } from "react";
import { Consumer } from "../../context";
import Spinner from ".././layout/Spinner";
import Track from "./Track";

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {(value) => {
          const { track_list, heading } = value;
          if (track_list === undefined || track_list.length === 0) {
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                <div class='h-full flex justify-center items-center'>
                <h3 className="p-2 text-center my-4 border-2 bg-black text-white rounded-lg">{heading}</h3>
                </div>
                <div className="ml-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {track_list.map((item) => (
                    <Track track={item.track} key={item.track.track_id} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
    );
  }
}

export default Tracks;
