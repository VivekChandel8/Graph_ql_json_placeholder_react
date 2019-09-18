import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Course from './Course';

const Courses = () => (
    <Query query={gql`
    {
        posts {
          user {
           username
          }
        }
      }
    `}
    >
        {({loading, error, data}) => {
            if (loading) return <p>Loading ...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data)
            return data.posts.map((posts) => (
                <Course posts={posts} />
               
            ));
        }}
    </Query>
);

export default Courses;