import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleAddUser = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          const newUser = [...users, data];
          setUsers(newUser);
        })
      .catch(error => console.error(error))

    event.target.reset();
    console.log(user);
  }

  return (
    <div className="App">
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Enter Your Name'/>
        <br/>
        <input type="text" name="email" placeholder='Enter Your Email'/>
        <br/>
        <button type="submit">Add User</button>
      </form>

        <h2>User: {users.length}</h2>
        {
          users.map(user => <p key={user._id}> {user.name} {user.email}</p>)
        }
    </div>
  );
}

export default App;
