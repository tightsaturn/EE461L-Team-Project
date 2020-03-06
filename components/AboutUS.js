import React from 'react';

fetch('https://api.github.com/orgs/nodejs')
    .then(response => response.json())
    .then(data => {
        console.log(data) // Prints result from `response.json()` in getRequest
    })
    .catch(error => console.error(error))

const AboutUS = () => {
    return (
        <div>
            <h1>About US</h1>
            <p>About US page body content</p>
        </div>
    );
}

export default AboutUS;