import React from 'react';

const Like = ({ liked, onClick }) => {
  return (
    <i
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className={`${liked ? 'fas' : 'far'} fa-heart`}
    />
  );
}

export default Like;
