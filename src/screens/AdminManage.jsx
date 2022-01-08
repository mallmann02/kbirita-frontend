import React from 'react';
import CreateUser from '../components/CreateUser';
import NavBarAdmin from '../components/NavBarAdmin';
import UsersList from '../components/UsersList';

function AdminManage() {
  return (
    <>
      <NavBarAdmin />
      <CreateUser />
      <UsersList />
    </>
  );
}

export default AdminManage;
