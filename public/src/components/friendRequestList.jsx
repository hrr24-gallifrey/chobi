import React from 'react';

const FriendRequestList = ({user, friendRequests}) => {
  console.log('===friendRequests===', friendRequests);
  let friendReqsSent = friendRequests.pendingSentUsers.map(user => {
    return (
      <div className="row">
        <div className="col-xs-4"><img className="userlist-pic" src={user.profilePic} /></div>
        <div className="userlist-name col-xs-4">{user.firstName} {user.lastName}</div>
        <div className="friend-req-pending col-xs-4">pending</div>
      </div>
    );
  });

  let friendReqsRec = friendRequests.pendingRecUsers.map(user => {
    return (
      <div className="row">
        <div className="col-xs-4"><img className="userlist-pic" src={user.profilePic} /></div>
        <div className="userlist-name col-xs-4">{user.firstName} {user.lastName}</div>
        <button className="btn btn-sm friend-req-accept col-xs-2">Accept</button>
        <button className="btn btn-sm friend-req-reject col-xs-2">Reject</button>
      </div>
    );
  });

  return (
    <div className="container-fluid">
      <div>{friendReqsSent}</div>
      {/*<div>{friendReqsRec}</div>*/}
    </div>
  )
}

export default FriendRequestList;
