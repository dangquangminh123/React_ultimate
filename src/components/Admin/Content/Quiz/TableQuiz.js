import React, { useState, useEffect } from 'react';



const TableQuiz = (props) => {

    const {listQuiz} = props;

    return (
        <>
            <div>List Quizzes: </div>
            <table className="table table-hover table-bordered mt-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Images</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button onClick={() => props.handleClickUpdateQuiz(item)}
                                     className='btn btn-warning'>Edit</button>
                                    <button onClick={() => props.handleClickDeleteQuiz(item)} 
                                    className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TableQuiz