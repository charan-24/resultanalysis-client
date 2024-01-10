import React from 'react';
import imageUrl from './pfp.png';
const UserProfileInfo = ({user}) => {
  return (
    <div className='text-center'>
      <img
        src={imageUrl}
        alt='Profile Picture'
        className="block mx-auto"
      />
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-gray-500">({user.username})</p>
      <p className="text-gray-500">Location: {user.location}</p>
      <p className="mt-4">
        <span className="font-bold">Overall score:</span> {user.overallScore} <br />
        <span className="font-bold">Global rank:</span> {user.globalRank}
      </p>
    </div>
  );
};

export default UserProfileInfo;
