import React from 'react';

import UserProvider from '../do-dont/UserProvider.jsx';

// Expression type arrow function
// implicit return statement
let AboutPage = (props) =>
{
  return (
    <UserProvider>
      <h3 className="page-title">This is the Stateless Functional About page2</h3>
    </UserProvider>
  );
}


export default AboutPage;
