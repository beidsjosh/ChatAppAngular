# ChatAppAngular
The following repo is for the Assignment in 3813ICT. It includes an Angular app that has the complete features for a functional chat app (Phase 2 completed).

Usernames: Use these usernames to log in and test the different permissions

superuser: includes super privileges and the ability to create other super users

groupadminuser: has groupadmin-role and lacks the ability to create other super users

defaultuser: has no permissions, can only access the home page

## Git Repository

Github utilizes the git framework to track versions of software, bugs, and adds the ability of easy collaborations for groups of developers. The git framework is commonly used in development environments for these reasons, so using it in this project was good experience and practice for future development endeavors.

This project uses Github mainly to track versions and to keep a concise log of each feature and when it is added. Branches were not needed for this project, as I felt like it was needlessly complicated through the way I developed the website. Additionally, I was the sole developer on this project, so I could keep a linear approach to developing the website.

## Data Structures

The main structure of the data involves utilising MongoDB to store the three sets of data the platform uses. The three sets are users, roles and channels. The user object consists of username, email, ID, role and group properties. The group object consists of a group name and an ID property. Lastly, the channel object consists of a channel name, ID and groups assigned property. Super users can create, edit and delete any of these pieces of data, whereas other roles have limited or no access in editing these objects.

### Users Class code

```
export class Users {

    constructor(

        public userid: number,

        public username: string,

        public password: string,

        public useremail: string,

        public userrole: string,

        public usergroup: string,

        public ok: boolean

     ) {}

}
```

### Groups class code

```
export class Groups {

    constructor(

        public groupid: number,

        public groupname: string

     ) {}

}
```

### Channels class code

```
export class Channels {

    constructor(

        public channelid: number,

        public channelname: string,

        public groupsinchannel: string

     ) {}

}
```

## Angular

Angular is the main framework used to build this website. With angular, the website can use its various mechanisms such as components and routing in order to create a cleaner experience for the user. The components make up each webpage and allow back-end code to run simultaneously. The routing aspect of Angular allows a seamless way for webpages to link and interact with one another.

Each webpage is made through the components feature of Angular. This provides a template for the webpage to have a unique CSS file, and a TypeScript file to work with the HTML code.

### Home Page

The home page of the website consists of a list of the logged in users channels. This is done through using the "/getUsersChannels" route and matching the "groupsinchannel" property of the channels with the "usergroup" property in sessionStorage.

It also includes a navbar that links to the dashboard, if the user logged in has the right group permissions.

### Login Page

The login page is a simple form that contains an area for the user to input their username and password. The login page uses the "/postLogin" route to certify the username and password and returns the matching users data.

If the user is not logged in and tries to access the website, they are given an error message and sent back to the login form.

### New Channel/Group/User Page

These pages are all like each other. They all include a form for the user to fill including the required information to successfully input the data into the corresponding MongoDB collection. They also use their corresponding routes to submit the data into the MongoDB collection.

Certain permissions are required in the "createuser" page. Only a Super User can create another Super User.

## Client and Server Responsibilities (REST API)

### Login Route

| Route | /postLogin |
| --- | --- |
| Method | POST |
| Parameters | username: stringpassword: string |
| Return Value | If username and password is ok: returns matching user data(username: string, password: string, userid: string, useremail: string, userrole: string, usergroup: string)
If username/password is not ok: asked to resubmit |
| Explanation | When the user submits their username and password by pressing the "submit" button, the server reads the MongoDB database to find the matching user with the same username and password. If a matching username and password is found, the server returns the users data for the client to store for future use in sessionStorage. The client then sends the user to the home page. |

### Create New User

| Route | /postNewUser |
| --- | --- |
| Method | POST |
| Parameters | "username": string,"password": string,"userid": string,"useremail": string,"userrole": string,"usergroup": string,"ok": string |
| Return Value | - |
| Explanation | The route reads the inputted data from the client. It then reads the MongoDB database to check if the userid already exists in the database. If the id is unique, the data is sent to the MongoDB database to be stored |

### Create New Group

| Route | /postNewGroup |
| --- | --- |
| Method | POST |
| Parameters | "groupid": string,"groupname": string |
| Return Value | - |
| Explanation | The route reads the inputted data from the client. It then reads the MongoDB database to see if there is a matching id. If the id is unique, the data is sent to the MongoDB database to be stored |

### Create New Channel

| Route | /postNewChannel |
| --- | --- |
| Method | POST |
| Parameters | "channelid": string,"channelname": string,"groupsinchannel": string |
| Return Value | - |
| Explanation | The route reads the inputted data from the client. It then reads the MongoDB database to see if there is a matching id. If the id is unique, the data is sent to the MongoDB database to be stored |

### Get User List

| Route | /postAllUsers |
| --- | --- |
| Method | POST |
| Parameters | - |
| Return Value | Array of all users |
| Explanation | When a webpage is loaded, and it requires user data (such as the userlist page), the ngOnInit function will call this route. The route will then read the MongoDb database and return an array of all the users. |

### Get Group List

| Route | /getGroups |
| --- | --- |
| Method | POST |
| Parameters | - |
| Return Value | Array of all groups |
| Explanation | When a webpage is loaded, and it requires group data (such as the createuser page), the ngOnInit function will call this route. The route will then read the MongoDB database and return an array of all the groups. |

### Get Channel List

| Route | /getUserChannels |
| --- | --- |
| Method | POST |
| Parameters | - |
| Return Value | Array of all the channels |
| Explanation | When a webpage is loaded, and it requires channel data (such as the home page), the ngOnInit function will call this route. The route will then read the MongoDB database and return an array of all the groups. |