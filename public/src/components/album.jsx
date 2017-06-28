import React from 'react';

const Album = ({album, selectAlbum}) => { // edited this (wip)
  return (
    <div>
      <h3 onClick={() => { selectAlbum(album); }}>Album Name</h3> {/* << make dynamic*/}
      <ul>
        {/* map Photo elements inside? */}
      </ul>
    </div>
  );
};

export default Album;
