import React from 'react';

const FriendForm = ({addFriend, currentUser}) => {
  let friend;
 /* const friendsList = currentUser.friends.map(friend, i) => {
    return (<div></div>)
  }*/

  return (
    <div>
    <form method="get" onSubmit={(e) => {
      e.preventDefault();
      getAlbum(friend);
    }}>
      <div className="form-group">
        <option value="">Select Friend</option>

      </div>
    </form>

    <form method="post" onSubmit={(e) => {
      e.preventDefault();
      addFriend(friend);
      friend.value = '';
    }}>
      <div className="form-group">
        <input id="addfriend" className="form-control" name="addFriend" placeholder="Add a Friend" ref={node => {
          friend = node
        }}/>
      </div>
    </form>
    </div>
  )
}

export default FriendForm;
