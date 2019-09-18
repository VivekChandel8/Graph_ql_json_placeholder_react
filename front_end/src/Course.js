import React from 'react';

const Course = (props) => (
    <div className="card" style={{'width': '100%', 'marginTop': '10px'}}>
        <div className="card-body">
            <h5 className="card-title">{props.posts.user.username}</h5>
           
        </div>
    </div>
);

export default Course;