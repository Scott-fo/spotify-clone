import { signOut, useSession } from 'next-auth/react';
import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from '../atoms/playlistAtoms';
import useSpotify from '../hooks/useSpotify';
import Songs from './Songs';

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
];

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = React.useState(null);
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  React.useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId])
  

  React.useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body);
    }).catch((error) => console.log(error));
  }, [spotifyApi, playlistId])

  // console.log(playlist);

  return (
    <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
        <header className='absolute top-5 right-8'>
            <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2' onClick={signOut}>
                {session?.user.image && <img className='rounded-full w-10 h-10 text-white' src={session?.user.image} alt="profile pic" />}
                {!session?.user.image && <UserIcon className='w-5 h-5 text-white' />}
                <h2 className='text-white'>{session?.user.name}</h2>
                <ChevronDownIcon className='h-5 w-5 text-white' />
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
            <img className = "h-44 w-44 shadow-2xl"src={playlist?.images?.[0]?.url} alt="" />
            <div>
                <p>Playlist</p>
                <h1 className='text-2xl md:text-3xl xl:text-5xl'>{playlist?.name}</h1>
            </div>
        </section>

        <div>
            <Songs />
        </div>
    </div>
  );
}

export default Center;
