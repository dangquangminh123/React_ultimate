import React, { useState, useEffect } from 'react';
import { getHistory } from "../../services/apiService";
import moment from 'moment';

const History = (props) => {
  const [listHistory, setListHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, [])

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map(item => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
        }
      })
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length)
      }
      setListHistory(newData);
    }
    // console.log(">>> check rs", res);
  }
  return (
    <div>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Question</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory && listHistory.length > 0 &&
            listHistory.map((item, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              )
            })
          }
          {listHistory && listHistory.length === 0 &&
            <tr>
              <td colSpan={'4'}>Not found data</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default History