<h2> Rationale and Context </h2>
This express backend server tests the feasibility of refactoring as much code as possible, and the use of generic methods and routes as much as possible. Controller and Mongoose model were constructed based on data structure rather than the actual context needs. This allowed the controller routes to be streamlined to a mere handful of routes. This highlights the reusability of codes. However, the limitation is that the route methods can seem abstract and the user require intimate knowledge of the data structure. This server presents a possible alternative, albeit unorthodox, where data is handled in a factory like manner.

<h2> Routes showcase </h2>

<table>
  <thead>
    <tr>
      <th><h4> 1. Retrieving a nested array from data structure </h4></th>
      <th>Get Route</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        https://<span></span>project-two-backend.onrender.com/:id/:fieldWithDataArrayAsValue
      </td>
    </tr>    
  </tbody>
</table>


<h4> Finding an Item in a nested array </h4>
GET Route
https://<span></span>project-two-backend.onrender.com/:id/:fieldWithDataArrayAsValue/:nestedObjectKey

<h4> Adding an Item into a nested array </h4>
GET Route
https://<span></span>project-two-backend.onrender.com/:id/:fieldWithDataArrayAsValue

<h4> Updating a non-nested field (non-array) </h4>
PATCH Route
https://<span></span>project-two-backend.onrender.com/:id/:field

<h4> Deleting from a nested array </h4>
PATCH Route
https://<span></span>project-two-backend.onrender.com/:id/:fieldWithDataArrayAsValue/:nestedObjectKey/:itemMatchCondition

All routes go through an id authentication through firebase. This means that user has to be logged in. In the real life version, there will not be a input box for users to key within the frontend to manually block a number. Future enhancement include using firebase payload to req.user for better user Authorization.

<h4> Search </h4>

<table>
  <thead>
    <tr>
      <th>Database syntax</th>
      <th>Search Type</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Mongoose find()</td>
      <td>Exact Number Search</td>
    </tr>
    <tr>
      <td>$eq</td>
      <td>First digit equals</td>
    </tr>
    <tr>
      <td>$gt</td>
      <td>First digit greater than</td>
    </tr>
    <tr>
      <td>$lt</td>
      <td>First digit less than</td>
    </tr>
  </tbody>
</table>

<H2> Technologies used </H2>

Express, joi, cors, http-status, mongoose, nodemon, yarn, firebase-admin

<H2> Testing </H2>

Testing done through YARC and live testing on expo.

<h2> External source code/ assets/ media </h2>

N/a
