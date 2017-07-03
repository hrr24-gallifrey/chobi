import React from 'react';

const UserList = ({users, addFriend}) => {
  let userListItem = users.map( (user, idx) => {
    return (
      <div key={idx} className="row">
        <div className="col-xs-4"><img className="userlist-pic" src={user.profilePic} /></div>
        <div className="userlist-name col-xs-4">{user.firstName} {user.lastName}</div>
        <button className="btn btn-sm col-xs-4"
          onClick={(e) => {
            e.preventDefault();
            addFriend(user.username);
          }}>Add Friend
        </button>
      </div>
    );
  });
  return (
    <div className="modal fade" id="userListModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title" id="myModalLabel">Users</h4>
          </div>
          <div className="modal-body">
            <div className="container-fluid">{userListItem}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
