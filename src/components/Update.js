import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const storedUser = useLoaderData();
    const [user, setUser] = useState(storedUser);

    const handleUpdateUser = event => {
        event.preventDefault();
        // console.log(user);
        fetch(`http://localhost:5000/users/${storedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            if (data.modifiedCount > 0) {
                alert('User Updated');
            }
        })
    }

    const handleInputChange = event => {
        const feild = event.target.name;
        const value = event.target.value;
        const newUser = { ...user };
        newUser[feild] = value;
        setUser(newUser)
    }

    console.log(storedUser);
    return (
        <div>
            <h2>Please Update: {storedUser.name}</h2>
            <form onSubmit={handleUpdateUser}>
                <input onChange={handleInputChange} type='text' name='name' defaultValue={storedUser.name} placeholder='Your Name' required />
                <br />
                <input onChange={handleInputChange} type='text' name='address'defaultValue={storedUser.address} placeholder='Your Address' required />
                <br />
                <input onChange={handleInputChange} type='email' name='email'defaultValue={storedUser.email} placeholder='Your email' required />
                <br />
                <button type='submit'>Update user</button>
            </form>
        </div>
    );
};

export default Update;