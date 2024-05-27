import React from 'react';
import '../styles/account.css';

const UserAccount = ({ accountData }) => {
  return (
    <div className="accountWrapper">
      <div className="account">
        <div className="accountInfo">
          <h1 className="accountEmail">{accountData?.email || "example@example.com"}</h1>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
