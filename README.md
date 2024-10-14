# Backend Final Project
An attempt at creating a full-stack application. 

## ***TOPIC***
We will create a platform for filmmakers on an amateur and semi-profi level. 
It aims at connecting talents over commonly shared ideas for joined effort.

We will focus on:
    – allowing users to register/creating profiles with fairly known
      schema attributes(e.g. username, password, profession, email)
    – browsing a blackboard for existing collaboration opportunities
    – enable them to upload own pitches via a form section

Most thoughts will be put into the backend structure. So a groundwork will be layed
with the handling of schema models, database and routes.

***PROGRESS***

# FIRST PHASE

## BRAINSTORMING:
    - Finding an idea; defining aim and purpose of the applicaition – _DONE_ 
    - Name of the application – _STILL PENDING_ 

## OUTLINE:
    - Considering the scope of the project (categories or sites)
    - Frontend and backend tools
    - Functions

# SECOND PHASE

## STATE OF THINGS
    Project initialized and backend has been setup. 
    - Users should be able to register // upload and edit own pitches
    - Users should be able to browse pending projects
    - role split between `admin` and `user`
    
### File Structure

├──  BACKEND_FINAL_PROJECT
│ ├── client
│ | └── index.html
| ├── server
| ├── controllers
| | ├── db.js
│ │ └── jwt.js
| ├── libs
| | ├── authMiddleware.js
│ │ └── errorHandler.js
| ├── middleware
| | ├── projectsController.js
│ │ └── usersController.js
| ├── models
| | ├── Project.js
│ │ └── User.js
| ├── node_modules
| ├── routes
| | ├── projectsRouter.js
│ │ └── usersRouter.js
│ ├── .env  
│ ├── .gitignore
│ ├── main.js
| ├── package.json  
| ├── package-lock.json  
└── README.md   
