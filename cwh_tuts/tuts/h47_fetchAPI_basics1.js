/* fetch API */

/* GET Request: -
GET requests are widely used methods in APIs and websites.The purpose of this method is to retrieve data from the server at the specified resource.The Fetch API uses the GET method for asynchronous requests.Here is an example of get request: */

// get request example
fetch('https://api.github.com/orgs/nodejs')
    .then(response => response.json())
    .then(data => {
        console.log(data) // Prints result from `response.json()` in getRequest
    })
    .catch(error => console.error(error))

/* POST Request: -
The purpose of the post request is to send the data to the server and creates a new resource.The resource post request creates subordinate to some other parent resource.When a new resource is posted to the parent, the API service will automatically associate the new resource by assigning it an ID.All we need to do is set the method and body parameters in the fetch() options: */

// post request example
let data = {
    first_name: 'John',
    last_name: 'Adams',
    job_title: 'Software Engineer'
};
const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}
fetch('https://reqres.in/api/users', options)
    .then(res => res.json())
    .then(res => console.log(res));