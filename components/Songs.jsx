import React from 'react';
import { useRecoilValue } from 'recoil';
import { playlistState } from '../atoms/playlistAtoms';
import Song from './Song';


function Songs() {
    const playlist = useRecoilValue(playlistState);
    return <div className='flex flex-col px-8 text-white space-y-1 pb-28'>
        {playlist?.tracks.items.map((track, i) => (
            <Song key={track.id} track={track} order ={i}/>
        ))}
    </div>;
}

export default Songs;
