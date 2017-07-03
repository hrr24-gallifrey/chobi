import React from 'react';

const FriendList = ({friends, currentUser}) => {

  let friendsList = friends.map((user, idx) => {
    return (
      <div key={idx} className="row">
        <div className="col-xs-4"><img className="userlist-pic" src={user.profilePic} /></div>
        <div className="userlist-name col-xs-4">{user.firstName} {user.lastName}</div>
        <button className="btn btn-sm friend-req-accept col-xs-2">Accept</button>
        <button className="btn btn-sm friend-req-reject col-xs-2">Reject</button>
      </div>
    );
  });

  return (
    <div>
      {friendsList}
      <button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#userListModal">
      Add Friend
      </button>
    </div>
  );
}

export default FriendList;
