# Online Learning System 3AKO
 
![HomePage](https://i.ibb.co/7YXDMj8/home1.png)
 
## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Features](#features)
  * [Guest Functionalities](#guest)
  * [General User Functionalities](#General-user)
  * [Individual Trainee Functionalities](#individualTrainee)
  * [Corporate Trainee Functionalities](#corporateTrainee)
  * [Instructor Functionalities](#instructor)
  * [Admin Functionalities](#administrator)
 - [API References](#api-references)
  * [Admin Router](#admin-router)
  * [User Router](#user-router)
 
## Project Description
 
### Course 
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2021
 
### Theme
The theme of the project, is to create an Online Learning System. An Online Learning
System is a web application through which trainees can enroll in online courses and
Instructors can add courses to the system for trainees which they get paid for
Such websites include coursera.com and udemy.com
 
### Overview 
This project followed the Agile Methodology; meaning it was splited into Sprints, with
each Sprint lasting a set amount of time and a fully functioning version of the project
with the specified System Requirements should be submitted and evaluated.
 
### Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop
the software.
- Learn the process of following a given set of System Requirements to develop a
software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub.
 
 
## Tools and Frameworks
![MERN_STACK](https://i.ibb.co/qJSmJMW/mern.png)
 
### What is the MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.
 
- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server
 
Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.
 
### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.
 
![MERN_ARCH](https://i.ibb.co/HtgCG1n/mern-stack-b9q1kbudz0.png)
 
#### - React.js Front End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.
 
React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.
 
#### - Express.js and Node.js Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.
 
By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.
 
#### - MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.
 
That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas. If you’re looking to set up your own MERN stack, read on!


## Features 
 
### Guest 
- Register as a new user.
![Register](https://i.ibb.co/bFFhtXr/register.png)

- View most popular and most viewed courses
![Most popular](https://i.ibb.co/vcnMKQY/Web-capture-2-1-2023-25851-localhost.jpg)

- Search for courses by title, subject or instructor name and filter them on subject, price and rating
![Search for courses](https://i.ibb.co/cXgVp6T/search.png)

- Change their country which reflects on courses price
![country](https://i.ibb.co/mzRzkdT/country.png)

### General User
Users can search and view the most popular and most viewed courses
same as the guest and have more features. 
- Log in using his username and password.
![Login](https://i.ibb.co/J2SqR7d/login.png)

- Forget his password and recieve an E-mail to change it.
![forget password](https://i.ibb.co/xGp2Fdb/forgetpassword.png)

### Individual Trainee

- see his enrolled courses
![courses](https://i.ibb.co/233Rc90/mycourses.png)

- Download certificates for his/her completed courses 
![download certificate](https://i.ibb.co/nD49QbD/certificate.png)

- Refund a course if they didn't complete 50% of the course 
![refund course](https://i.ibb.co/wpkV8k6/refund.png)

- Report a problem with a course
![report course](https://i.ibb.co/pjHCgQK/report-problem.png)

- View his reports and add follow ups for them if they still face problems
![view reports](https://i.ibb.co/dQy3rgM/reports.png)

- View the lessons of courses they are enrolled in
![lessons](https://i.ibb.co/qmmbRZJ/lesson.png)

- Take notes, save them and download them
![notes](https://i.ibb.co/PmCFxcH/notes.png)

- Take exams in courses they are enrolled in
![take exam](https://i.ibb.co/5hktbc3/exam.png)

- Edit their personal info
![edit info](https://i.ibb.co/b2w3kCh/editinfo.png)

## API Reference
### instructor's APIs
#### create a course

```
  POST /instructor/createCourse
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `title` | `string` | *Required*. course title |
| `outlines` | `list` | *Required*.  list of course outlines|
| `summary` | `string` | *Required*. course summary|
| `previewVideo` | `URL` | *Required*. youtube link to the preview video|
| `subject` | `string` | *Required*.  the subject of the course|
| `subtitles` | `list` | *Required*.  list of course subtitles|
| `price` | `Int` |  *Required*. price of the course (0 means free course)|
| `totalHours` | `int` |  the total hours of the course|
| `imageURL` | `URL` | *Required*.  link to course image|

#### Get instructor's info

```
  GET /instructor/getInstructor
```

does not take parameters.


#### Get instructor's courses

```
  GET /instructor/viewMyCourses
```

does not take parameters.

#### Get all instructor's Subjects in which he gave courses 

```
  GET /instructor/viewMySubjects
```

does not take parameters.
#### Get instructor's contract state

```
  GET /instructor/getContractState
```

does not take parameters.

#### set instructor's contract state

```
  PATCH /instructor/setContractState
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `state`      | `boolean` | *Required*. the state of the instructor's contract |

#### set instructor's info

```
  patch /instructor/editMyInfo
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | *Required*. name of the instructor |
| `gender`      | `string` | *Required*. gender of the instructor |
| `biography`      | `string` | *Required*. biography of the instructor |
| `email`      | `string` | *Required*. email of the instructor |

#### add new lesson to a course

```
  patch /instructor/addLesson
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `vidUrl`      | `URL` | *Required*. youtube link for the lesson |
| `courseId`      | `mongoose.ObjectId` | *Required*. id of the course containing the lesson |
| `subtitleId`      | `mongoose.ObjectId` | *Required*. id of the subtitle containing the lesson |
| `title`      | `string` | *Required*. lesson title |
| `readings`      | `string` | *Required*. lesson readings |
| `description`      | `string` | *Required*. lesson description |

#### add an exercise to a subtitle

```
  patch /instructor/addExercise
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of course containing the exercise |
| `title`      | `string` | *Required*. Id of item to fetch |
| `subtitleId`      | `mongoose.ObjectId` | *Required*. Id of subtitle containing the exercise |
| `questions`      | `List` | *Required*. List of questions in the exercise |

#### load all questions of an Exercise

```
  POST /instructor/loadExercise
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of course containing the exercise |
| `subtitleId`      | `mongoose.ObjectId` | *Required*. Id of subtitle containing the exercise |
| `exerciseId`      | `mongoose.ObjectId` | *Required*. Id of exercise |

#### add a promotion to a course

```
  patch /instructor/addPromotion
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of course that is getting the discount |
| `discount`      | `int` | *Required*. discount amount |
| `date`      | `Date` | *Required*. date of discount expiry date |

#### edit instructor's password

```
  patch /instructor/editPassword
```  

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `oldPassword`      | `string` | *Required*. current account password |
| `newPassword`      | `string` | *Required*. new password |

#### send a complaint to the admins

```
  POST /instructor/addComplaint
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | *Required*. complaint title |
| `body`      | `string` | *Required*. the content of the complaint |
| `reportedCourse`      | `mongoose.ObjectId` | *Required*. Id of reported course |
| `reportType`      | `string` | *Required*. type of report |

#### add new subtitle to a course

```
  patch /instructor/addSubtitleToCourse
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | *Required*. title of the new subtitle |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of the course containing the subtitle |
| `totalHours`      | `int` | *Required*. estimate required hours to complete the subtitle |

#### get all contents of a subtitle

```
  POST /instructor/loadSubtitle
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of the course containing the subtitle |
| `subtitleId`      | `mongoose.ObjectId` | *Required*. Id of the required subtitle |

#### publish a non-published course

```
  POST /instructor/publishCourse
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of the course to be published |

#### close a published course

```
  POST /instructor/closeCourse
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | *Required*. Id of the course to be closed |
