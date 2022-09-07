# ChatAppAngular
The following repo is for the Assignment in 3813ICT. It includes an Angular app that has the foundations for a chat app (to be completed in Phase 2).

Usernames: Use these usernames to log in and test the different permissions

superuser: includes super privileges and the ability to create other super users

groupadminuser: has groupadmin-role and lacks the ability to create other super users

defaultuser: has no permissions, can only access the home page

## Git Repository

Github utilizes the git framework to track versions of software, bugs, and adds the ability of easy collaborations for groups of developers. The git framework is commonly used in development environments for these reasons, so using it in this project was good experience and practice for future development endeavors.

This project uses Github mainly to track versions and to keep a concise log of each feature and when it is added. Branches were not needed for this project, as I felt like it was needlessly complicated through the way I developed the website. Additionally, I was the sole developer on this project, so I could keep a linear approach to developing the website.

## Data Structures

The main structure for the data involves a single JSON file with users, groups and channels stored inside. The user object consists of username, email, ID, role and group properties. The group object consists of a group name and an ID property. Lastly, the channel object consists of a channel name, ID and groups assigned property. Super users can create, edit and delete any of these pieces of data, whereas other roles have limited or no access in editing these objects.

## Angular

Angular is the main framework used to build this website. With angular, the website can use its various mechanisms such as components and routing in order to create a cleaner experience for the user. The components make up each webpage and allow back-end code to run simultaneously. The routing aspect of Angular allows a seamless way for webpages to link and interact with one another.

Each webpage is made through the components feature of Angular. This provides a template for the webpage to have a unique CSS file, and a TypeScript file to work with the HTML code.

### Home Page

The home page of the website consists of a list of the logged in users channels. This is done through using the "/getUsersChannels" route and matching the "groupsinchannel" property of the channels with the "usergroup" property in sessionStorage.

It also includes a navbar that links to the dashboard, if the user logged in has the right group permissions.

### Login Page

The login page is a simple form that contains an area for the user to input their username. As user authentication was not required, a password input is not included on the website. The login page uses the "/postLogin" route to certify the username and return the matching users data.

If the user is not logged in and tries to access the website, they are given an error message and sent back to the login form.

### New Channel/Group/User Page

These pages are all like each other. They all include a form for the user to fill including the required information to successfully input the data into the corresponding JSON file. They also use their corresponding routes to submit the data into the JSON file.

Certain permissions are required in the "createuser" page. Only a Super User can create another Super User.

## Client and Server Responsibilities (REST API)

### Login Route

| Route | /postLogin |
| --- | --- |
| Method | POST |
| Parameters | username: string |
| Return Value | If username is ok: returns matching user data(username: string, userid: string, useremail: string, userrole: string, usergroup: string)
If username is not ok: asked to resubmit |
| Explanation | When the user submits their username by pressing the "submit" button, the server reads the users.json file to find the matching username. If a matching username is found, the server returns the users data for the client to store for future use in sessionStorage. The client then sends the user to the home page. |

### Create New User

| Route | /postNewUser |
| --- | --- |
| Method | POST |
| Parameters | "username": string,"userid": string,"useremail": string,"userrole": string,"usergroup": string,"ok": string |
| Return Value | - |
| Explanation | The route reads the inputted data from the client. It then reads the users.json file to retrieve an array of all the users currently stored. It then pushes the new user data into the array and sends the array to the json file |

### Create New Group

| Route | /postNewGroup |
| --- | --- |
| Method | POST |
| Parameters | "groupid": string,"groupname": string |
| Return Value | - |
| Explanation | The route reads the inputted data from the client. It then reads the groups.json file to retrieve an array of all the groups currently stored. It then pushes the new group data into the array and sends the array to the json file |

### Create New Channel

| Route | /postNewChannel |
| --- | --- |
| Method | POST |
| Parameters | "channelid": string,"channelname": string,"groupsinchannel": string |
| Return Value | - |
| Explanation | The route reads the inputted data from the client. It then reads the channels.json file to retrieve an array of all the channels currently stored. It then pushes the new channel data into the array and sends the array to the json file |

### Get User List

| Route | /postAllUsers |
| --- | --- |
| Method | POST |
| Parameters | - |
| Return Value | Array of all users |
| Explanation | When a webpage is loaded, and it requires user data (such as the userlist page), the ngOnInit function will call this route. The route will then read the users.json file and return an array of all the users. |

### Get Group List

| Route | /getGroups |
| --- | --- |
| Method | POST |
| Parameters | - |
| Return Value | Array of all groups |
| Explanation | When a webpage is loaded, and it requires group data (such as the createuser page), the ngOnInit function will call this route. The route will then read the groups.json file and return an array of all the groups. |

### Get Channel List

| Route | /getUserChannels |
| --- | --- |
| Method | POST |
| Parameters | - |
| Return Value | Array of all the channels |
| Explanation | When a webpage is loaded, and it requires channel data (such as the home page), the ngOnInit function will call this route. The route will then read the channels.json file and return an array of all the groups. |