import React from 'react';
import { Link } from 'react-router-dom';

const Track = (props) => {
    const { track } = props;
    return (
        <div className='mr-5 border-b-2 border-indigo-600 hover:shadow-xl hover:bg-gray-100 transition duration-500 ease-in-out
        transform hover:-translate-y-1 hover:scale-110'>
            <div className='ml-4 mb-4'>
                <div>
                    <h5>{track.artist_name}</h5>
                    <p>
                        <span class='font-bold'><i className='fas fa-play'></i> Track</span>: {track.track_name}
                        <br />
                        <span class='font-bold'><i className='fas fa-compact-disc'></i> Album</span>: {track.album_name}
                    </p>
                    <Link to={`lyrics/track/${track.track_id}`} className='underline'>
                        <i className='fas fa-chevron-right'></i> View Lyrics
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Track;