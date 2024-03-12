import React from 'react'

const Password = () => {
  return (
    <div>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input
                        type="password"
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                    />
                </div>


                <div className='mt-3'>
                    <button className='btn btn-warning'>Update</button>
                </div>
            </div>
        </div>
  )
}

export default Password