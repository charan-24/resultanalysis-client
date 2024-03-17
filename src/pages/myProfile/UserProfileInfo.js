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
      <h2 className="text-2xl font-bold">{user.fullname}</h2>
      <p className="text-gray-500">({user.rollno})</p>
      <p className="text-gray-500">Location: IN</p>
      <p className="mt-4">
        <span className="font-bold">Overall score:</span> {user.total} <br />
        <span className="font-bold">Global rank:</span> 9999
      </p>
    </div>
  );
};

export default UserProfileInfo;
