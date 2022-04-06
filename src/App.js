import React, {Suspense} from 'react';
import { fetchData } from './Api';
import './App.css';

const resource = fetchData();

const App = () => {
  return (
    <div className="container my-5">
      <Suspense fallback={<h1>Loading User...</h1>}>
        <ProfileDetails />
      </Suspense>

      <Suspense fallback={<h1>Loading Posts...</h1>}>
        <ProfilePosts />
      </Suspense>
    </div>
  );
}

const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <div className="card card-body my-3">
        <h1 className='large text-primary'>{user.name}</h1>
        <ul>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>City: {user.address.city}</li>
        </ul>
    </div>
  )

}

const ProfilePosts = () => {
  const posts = resource.posts.read();

  return(
    <ul className='list-group'>
      <li className='list-group-item'>
        <strong>Latest Posts</strong>
      </li>

      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          {post.title}
        </li>
      ))}
    </ul>
  )
}

export default App;
