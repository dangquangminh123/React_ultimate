import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
const TableUser = (props) => {
  const { listUsers } = props;
  return (
    <>
      <table className="table table-hover table-bordered my-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button onClick={() => props.handleClickBtnView(item)}
                      className='btn btn-secondary'>View</button>
                    <button onClick={() => props.handleClickBtnUpdate(item)}
                      className='btn btn-warning mx-3'>Update</button>
                    <button onClick={() => props.handleClickBtnDelete(item)}
                      className='btn btn-danger'>Delete</button>

                  </td>
                </tr>
              )
            })
          }
          {listUsers && listUsers.length === 0 &&
            <tr>
              <td colSpan={'4'}>Not Found Data</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  );
};

export default TableUser;
