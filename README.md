# 3AKO
# Online Learning System 3AKO
 
![HomePage](https://i.ibb.co/7YXDMj8/home1.png)
 
## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Installation](#Installation)
- [Features](#features)
  * [Guest Functionalities](#guest)
  * [General User Functionalities](#General-user)
  * [Individual Trainee Functionalities](#individual-Trainee)
  * [Corporate Trainee Functionalities](#corporate-Trainee)
  * [Instructor Functionalities](#instructor)
  * [Admin Functionalities](#administrator) 
- [API References](#api-references)
  * [General trainee APIs](#General-trainee-APIs)
  * [Instructor APIs](#instructor's-APIs)
  * [Admin APIs](#admin-APIs)
- [Testing](#testing)
  * [Trainee Routes Testing](#Trainee-Routes-Testing)
  * [Instructor Routes Testing](#Instructor-Routes-Testing)
  * [Admin Routes Testing](#Admin-Routes-Testing)
- [Acknowledgements](#Acknowledgements)

## Project Description
 
### Course 
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2022
 
### Theme
The theme of the project, is to create an Online Learning System. An Online Learning
System is a web application through which trainees can enroll in online courses and
Instructors can add courses to the system for trainees which they get paid for.
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

## Installation
To get started, you will need to do the following:

#### Install Node
- To install Node, go to https://nodejs.org/en/ and download either the LTS version or the current version.

#### Have or Install a Code Editor
- You can use any code editor of your choice for this tutorial. However, for the sake of demonstration, we will be using VS Code editor with the plugin prettier and vscode icons.

#### Install dependencies 
- Run script **npm i** in the frontend and backend directories using the terminal

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

- See a course preview after searching including course title, preview video, 
subtitles, outlines, price and instructor 
![preview](https://i.ibb.co/Y8kLTTr/preview.png)

- See course ratings in the preview page
![rating](https://i.ibb.co/8drDfsg/rating.png)

- Pay for courses to enroll in them
![pay](https://i.ibb.co/nD30CV7/pay.png)

### Corporate Trainee
Corporate trainees have the same features as individual ones except they
don't deal with payments and request courses from admin instead

### Instructor

- Search and filter his courses
![search](https://i.ibb.co/h84425L/instructor-Search.png)

- Create a new course
![create](https://i.ibb.co/6NHyrwd/create.png)

- Add subtitles in his unpublished course
![addsubtitles](https://i.ibb.co/8gG5tzB/addsub.png)

- Add lessons in his unpublished course
![addlesson](https://i.ibb.co/3rQnF9T/addlesson.png)

- Add exams in his unpublished course
![addexercise](https://i.ibb.co/wsDcKpD/exercise.png)

### Administrator

- Add users to the system including instructors, admins and corporate trainees.
![addUser](https://i.ibb.co/GkkLBr8/adduser.png)

- Add discount to a set of courses
![addDisc](https://i.ibb.co/T2BGxx5/add-Discount.png)

- Resolve complaints
![resolve](https://i.ibb.co/qrSKYH7/resolve-Reports.png)

- Accept or reject Corporate trainees' requests to join courses
![requests](https://i.ibb.co/7z0d4QV/course-Requests.png)

- Accept or reject Individual trainees' refund requests
![refund](https://i.ibb.co/P6x5qjs/refund-Requests.png)

## API Reference

## General trainee APIs

#### enroll a trainee in a course

```
  patch /trainee/addCourseToTrainee/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of the trainee |
| `courseId`      | `mongoose.ObjectId` | **Required**. Id of the course to be enrolled in |

#### mark a lesson as seen to update the course progress

```
http
  patch /trainee/addLessonRecord
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `lessonId`      | `mongoose.ObjectId` | **Required**. Id of the lesson that has been seen |
| `courseId`      | `mongoose.ObjectId` | **Required**. Id of the course to be enrolled in |

#### checks if the exercise is passed or not given the trainee's answers for it to update the course progress.

```
  patch /trainee/addExerciseRecord
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. Id of the course containing the exercise |
| `subtitleId`      | `mongoose.ObjectId` | **Required**. Id of the subtitle containing the exercise |
| `exerciseId`      | `mongoose.ObjectId` | **Required**. Id of the exercise |
| `answers`      | `list` | **Required**. list of answers to the questions of the exercise |

#### report a complaint to the admins

```
  patch /trainee/addComplaint
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. title of the complaint |
| `body`      | `string` | **Required**. content of the complaint |
| `reportedCourse`      | `mongoose.ObjectId` | **Required**. Id of the course to be reported |
| `reportType`      | `string` | **Required**. type of the report |

#### view the contents of a subtitle

```
  POST /trainee/loadSubtitle
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. Id of the course containing the subtitle |
| `subtitleId`      | `mongoose.ObjectId` | **Required**. Id of the Required subtitle |

#### view the answers to a given exercise

```
  POST /trainee/loadExamAnswers
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. Id of the course containing the exercise |
| `subtitleId`      | `mongoose.ObjectId` | **Required**. Id of the subtitle containing the exercise |
| `exerciseId`      | `mongoose.ObjectId` | **Required**. Id of the Required exercise that has the answers |

#### view all the courses currently enrolled in

```
  GET /trainee/myCourses
```

does not take Parameters.

#### view all subtitles of a given course

```
  GET /trainee/getSubtitles
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. Id of the course containing the exercise |


#### view my information

```
  GET /trainee/getMyInfo
```

does not take Parameters.

#### edit my information

```
  PATCH /trainee/editTraineeInfo
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `String` | **Required**. new name to be set |
| `gender`      | `String` | **Required**. new gender to be set |
| `email`      | `email` | **Required**.  new email to be set|

#### edit my Password

```
  PATCH /trainee/editPassword
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `oldPassword`      | `String` | **Required**. old password to be replaced |
| `newPassword`      | `String` | **Required**. new password to be set |

#### add a side note to a lesson

```
  PATCH /trainee/addNote
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. id of course containing the lesson |
| `lessonId`      | `mongoose.ObjectId` | **Required**. id of lesson that contains the note |
| `note`      | `String` | **Required**. content of the note |

#### load all the lessons that I viewed

```
  GET /trainee/getLessonsList/:courseId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. id of course containing the lesson |

#### load an instructor's profile

```
  POST /trainee/viewInstructor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `instructorId`      | `mongoose.ObjectId` | **Required**. id of instructor to be viewed |

#### download all the notes in a course

```
  GET /trainee/downloadNotes/:courseId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. id of course containing notes to be download |

#### download the certificate of completion of a completed course

```
  GET /trainee/downloadCertificate/:courseId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseId`      | `mongoose.ObjectId` | **Required**. id of a completed course to download its certificate |



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


## Admin APIs

#### add a new admin to the system, with a given username and password

```
  GET /admin/addAdmin
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `String` | **Required**. username of the new admin |
| `password`      | `String` | **Required**. password of the new admin |

#### add a new instructor to the system, with a given username and password

```
  GET /admin/addInstructor
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `String` | **Required**. username of the new instructor |
| `password`      | `String` | **Required**. password of the new instructor |

#### add a new Corporate Trainee to the system, with a given username and password

```
  GET /admin/addCorporateTrainee
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `String` | **Required**. username of the new Corporate Trainee |
| `password`      | `String` | **Required**. password of the new Corporate Trainee |

#### add a new Corporate Trainee to the system, with a given username and password

```
  PATCH /admin/addCourseToTrainee
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `mongoose.ObjectId` | **Required**. id of the Corporate Trainee to whom we will add the course |
| `courseId`      | `mongoose.ObjectId` | **Required**. id of the course to be added to the trainee |




#### view all pending complaints
```
  GET /admin/getPendingComplaints
```

does not take Parameters.

#### view the contents of complaint given its id

```
  PATCH /admin/loadComplaint
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `complaintId`      | `mongoose.ObjectId` | **Required**. id of the complaint to be viewed |

#### resolve a complaint given its id

```
  PATCH /admin/resolveComplaint
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `complaintId`      | `mongoose.ObjectId` | **Required**. id of the complaint to be resolved |

#### mark a specific as pending if needs further follow ups

```
  PATCH /admin/markComplaintPending
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `complaintId`      | `mongoose.ObjectId` | **Required**. id of the complaint to be resolved |

#### get all Corporate trainees requests to get access to courses

```
  PATCH /admin/getCourseRequests
```

does not take parameters.

#### view all course refund requests

```
  GET /admin/getRefundRequests
```

does not take parameters.

#### mark a specific as pending if needs further follow ups

```
  PATCH /admin/answerRefundRequest
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `requestId`      | `mongoose.ObjectId` | **Required**. id of the request to be handled |
| `response`      | `String` | **Required**. reply to request whether accepted or rejected |



# Testing
API testing was done using Postman, a request was sent with a given body and a specific response was expected.
various test cases were used in the process of testing these APIs, cases where the body is valid, not valid, with user authentication, or without user authentication.  In this section, different outcomes of API responses will be shown.


## Trainee Routes Testing

| header |   POST /user/login|
| :-------- | :------- | 
| body | {"username": "ahmed","password" : "123"}| 
| response | {"name": "Ahmed","type": "individual trainee","courseList": []} |

| header |   POST /user/login|
| :-------- | :------- | 
| body | {"username": "ahme","password" : "123"}| 
| response | {"error": "Invalid username"}|

| header |   POST /user/login|
| :-------- | :------- | 
| body | {"username": "","password" : ""}| 
| response | {"error": "Must fill username and password"} |

testing logout with user logged in
| header |   POST /user/logout|
| :-------- | :------- | 
| response | {"message": "loged out successfully"} |

testing logout with user not logged in

| header |   POST /user/logout|
| :-------- | :------- | 
| response |{"error": "Token required"} |

| header |   PATCH /trainee/addCourseToTrainee/:id|
| :-------- | :------- | 
| body | {"courseId" : "6382cf852a928dbf577f1888"}| 
| response | {course data} |

| header |   PATCH /trainee/addCourseToTrainee/:id|
| :-------- | :------- | 
| body | {"courseId" : "6382cf852a928dbf577f1889"}| 
| response | {"error" : "invalid course id"} |

| header |   PATCH /trainee/addTraineeInfo|
| :-------- | :------- | 
| body | { "name" : "ahmed", "gender": "male" }| 
| response | {updated trainee document} |

testing while logged in
| header |   PATCH /trainee/addTraineeInfo|
| :-------- | :------- | 
| body | { "name" : "ahmed", "gender": "male" }| 
| response | {updated trainee document} |

testing while logged out
| header |   PATCH /trainee/addTraineeInfo|
| :-------- | :------- | 
| body | { "name" : "ahmed", "gender": "male" }| 
| response | {"error": "Token required"} |

testing while logged in
| header |   GET /trainee/myCourses|
| :-------- | :------- | 
| response | [{"title": "corurse title","courseId": "course id","progress": number,"status": "coures status"},...] |

testing while logged out
| header |   GET /trainee/myCourses|
| :-------- | :------- | 
| response | {"error": "Token required"} |

testing while logged in, owning the course and first time correctly solving the exercise
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this exercise", "subtitleId": " subititle of this exercise", "exerciseId": "exercise id", "answers": "array of numbers" }| 
| response | {"grade": "grade from this exercise"} |

testing while logged out
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this exercise", "subtitleId": " subititle of this exercise", "exerciseId": "exercise id", "answers": "array of numbers" }| 
| response | {"error": "Token required"} |

testing while logged in, but not owning the course 
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this exercise", "subtitleId": " subititle of this exercise", "exerciseId": "exercise id", "answers": "array of numbers" }| 
| response | {"error": "You do not own this course"} |

testing while logged in, owning the course, but failing the exam
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this exercise", "subtitleId": " subititle of this exercise", "exerciseId": "exercise id", "answers": "array of numbers" }| 
| response | {"grade": "Exam Failed"} |

testing while logged in as a trinee
| header |   PATCH /trainee/addComplaint|
| :-------- | :------- | 
| body | {"title" : "title of the complaint", "body": "body of the complaint", "reportedCourse": "id of the reported course", "reportType":"type"}| 
| response | {"message": "successful"} |

testing while logged out
| header |   PATCH /trainee/addComplaint|
| :-------- | :------- | 
| body | {"title" : "title of the complaint", "body": "body of the complaint", "reportedCourse": "id of the reported course", "reportType":"type"}| 
| response | {"error": "Token required"} |

testing while logged in as a trinee and owning the course
| header |   GET /loadSubtitle/:courseId/:subtitleId|
| :-------- | :------- | 
| response | {subtitle data without answers} |

testing while logged in as a trinee and not owning the course
| header |   GET /loadSubtitle/:courseId/:subtitleId|
| :-------- | :------- | 
| response | {"error": "You do not own this course"} |

testing while logged out
| header |   GET /loadSubtitle/:courseId/:subtitleId|
| :-------- | :------- | 
| response | {"error": "Token required"} |

| header |   POST /trainee/loadExamAnswers|
| :-------- | :------- | 
| body | { "courseId":"course id of this exercise", "subtitleId": " subititle of this exercise", "exerciseId": "exercise id", "answers": "array of numbers" }| 
| response | {array of exam answers} |

testing with invalid course id
| header |   POST /trainee/loadExamAnswers|
| :-------- | :------- | 
| body | { "courseId":"course id of this exercise", "subtitleId": " subititle of this exercise", "exerciseId": "exercise id", "answers": "array of numbers" }| 
| response | {"error":"null does not have a property subtitles"} |

testing while logged in as a trinee and owning the course
| header |    GET /trainee/getSubtitles|
| :-------- | :------- | 
| body | { "courseId":"course id"}}| 
| response | {course subitles} |

testing while logged in as a trinee and not owning the course
| header |    GET /trainee/getSubtitles|
| :-------- | :------- | 
| body | { "courseId":"course id"}| 
| response | {"error": "You do not own this course"} |

testing while logged out
| header |    GET /trainee/getSubtitles|
| :-------- | :------- | 
| body | { "courseId":"course id"}| 
| response | {"error": "Token required"} |

testing while logged in as a trainee
| header |    GET /trainee/getMyInfo|
| :-------- | :------- | 
| response | {"name"","gender","email"} |

testing while logged out
| header |    GET /trainee/getMyInfo|
| :-------- | :------- | 
| response | {"error": "Token required"} |

testing while logged in with correct old password
| header |    PATCH /trainee/editPassword|
| :-------- | :------- | 
| body | { "oldPassword":"old value of the password", "newPassword":"the updated password"}| 
| response | {user data} |

testing while logged in with incorrect old password
| header |    PATCH /trainee/editPassword|
| :-------- | :------- | 
| body | { "oldPassword":"old value of the password", "newPassword":"the updated password"}| 
| response | {"error":"Wrong Password"}|

testing while logged out
| header |    PATCH /trainee/editPassword|
| :-------- | :------- | 
| body | { "oldPassword":"old value of the password", "newPassword":"the updated password"}| 
| response | {"error": "Token required"}|

testing while logged in as a trainee while owning the course
| header |    PATCH /trainee/addNote|
| :-------- | :------- | 
| body | {"courseId":"id of the course of this note", "lessonId":"id of the lesson of this note", "note":"note text"}| 
| response | {updated date}|

testing while logged in as a trainee and not owning the coures
| header |    PATCH /trainee/addNote|
| :-------- | :------- | 
| body | {"courseId":"id of the course of this note", "lessonId":"id of the lesson of this note", "note":"note text"}| 
| response | {"error": "You do not own this course"}|

testing while logged out
| header |    PATCH /trainee/addNote|
| :-------- | :------- | 
| body | {"courseId":"id of the course of this note", "lessonId":"id of the lesson of this note", "note":"note text"}| 
| response | {"error": "Token required"}|


testing while logged in as a trainee while owning the course
| header |    GET /trainee/getLessonsList/:courseId|
| :-------- | :------- | 
| response | {list of lessons this trainee opened and their notes}|

testing while logged in as a trainee and not owning the course
| header |    GET /trainee/getLessonsList/:courseId|
| :-------- | :------- | 
| response | {"error": "You do not own this course"}|

testing while logged in as a trainee and not owning the course
| header |    GET /trainee/getLessonsList/:courseId|
| :-------- | :------- | 
| response | {"error": "You do not own this course"}|

testing while logged out
| header |    GET /trainee/getLessonsList/:courseId|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in as a trainee
| header |    POST /trainee/viewInstructor|
| :-------- | :------- | 
| body | {"instructorId":"id of the instructor"}| 
| response | {instructor data}|

testing with correct 
| header |    POST /trainee/viewInstructor|
| :-------- | :------- | 
| body | {"instructorId":"id of the instructor"}| 
| response | {instructor data}|

testing while logged in as a trainee
| header |    POST /trainee/viewInstructor|
| :-------- | :------- | 
| body | {"instructorId":"id of the instructor"}| 
| response | {instructor data}|


testing while logged in as a trainee and owning the coures
| header |    GET /trainee/downloadNotes/:courseId|
| :-------- | :------- | 
| response | {notes pdf file}|

testing while logged in as a trainee and not owning the coures
| header |    GET /trainee/downloadNotes/:courseId|
| :-------- | :------- | 
| response | {"error": "You do not own this course"}|

testing while logged out or as another user type
| header |    GET /trainee/downloadNotes/:courseId|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in as a trainee and owning the coures
| header |    GET /trainee/downloadCertificate/:courseId|
| :-------- | :------- | 
| response | {certificate pdf file}|

testing while logged in as a trainee and not owning the coures
| header |    GET /trainee/downloadCertificate/:courseId|
| :-------- | :------- | 
| response | {"error": "You do not own this course"}|

testing while logged out or as another user type
| header |    GET /trainee/downloadCertificate/:courseId|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in, owning the course and first time viewing this lesson
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this lesson", "lessonId": " lesson id"}| 
| response | { "message": "Successful" } |

testing while logged in, not owning the course
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this lesson", "lessonId": " lesson id"}| 
| response | {"error": "You do not own this course"} |

testing while logged out
| header |   PATCH /trainee/addExerciseRecord|
| :-------- | :------- | 
| body | { "courseId":"course id of this lesson", "lessonId": " lesson id"}| 
| response | {"error": "Token required"} |


## Instructor Routes Testing 

testing while logged in as an instructor
| header |   PATCH /admin/answerRefundRequest|
| :-------- | :------- | 
| body | {"title","outlines","summary","previewVideo","subject","price","totalHours","imageURL"}| 
| response | {created course id}|

testing while logged out
| header |   PATCH /admin/answerRefundRequest|
| :-------- | :------- | 
| body | {"title","outlines","summary","previewVideo","subject","price","totalHours","imageURL"}| 
| response | {"error": "Token required"}|

testing while logged in not as an instructor
| header |   PATCH /admin/answerRefundRequest|
| :-------- | :------- | 
| body | {"title","outlines","summary","previewVideo","subject","price","totalHours","imageURL"}| 
| response | {"error": ""You are not an authorized instructor"}|

testing while logged in as an instructor
| header |   GET /instructor/getInstructor|
| :-------- | :------- | 
| response | {instructor data}|

testing while logged out
| header |   GET /instructor/getInstructor|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in as an instructor
| header |   GET /instructor/viewMyCourses|
| :-------- | :------- | 
| response | {instructor courses data}|

testing while logged out
| header |   GET /instructor/viewMyCourses|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in as an instructor
| header |   GET /instructor/viewMySubjects|
| :-------- | :------- | 
| response | {instructor courses subjects}|

testing while logged out
| header |   GET /instructor/viewMySubjects|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in as an instructor
| header |   GET /instructor/getContractState|
| :-------- | :------- | 
| response | {instructor contract state accepted or not yet }|

testing while logged out
| header |   GET /instructor/getContractState|
| :-------- | :------- | 
| response | {"error": "Token required"}|

testing while logged in as an instructor
| header |   PATCH /instructor/setContractState|
| :-------- | :------- | 
| body | {"state"} |
| response | {updated instructor data}|

testing while logged out
| header |   PATCH /instructor/setContractState|
| :-------- | :------- | 
| body | {"state"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor
| header |   PATCH /instructor/editMyInfo|
| :-------- | :------- | 
| body | {"name", "gender", "biography", "email"} |
| response | {updated instructor data}|

testing while logged out
| header |   PATCH /instructor/editMyInfo|
| :-------- | :------- | 
| body | {"name", "gender", "biography", "email"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   PATCH /instructor/addLesson|
| :-------- | :------- | 
| body | {"vidUrl", "courseId", "subtitleId", "title", "readings', "description"} |
| response | {updated course data}|

testing while logged in as an instructor and he/she is not the author the course
| header |   PATCH /instructor/addLesson|
| :-------- | :------- | 
| body | {"vidUrl", "courseId", "subtitleId", "title", "readings', "description"} |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   PATCH /instructor/addLesson|
| :-------- | :------- | 
| body | {"vidUrl", "courseId", "subtitleId", "title", "readings', "description"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   PATCH /instructor/addExercise|
| :-------- | :------- | 
| body | {"courseId", "title", "subtitleId", "questions"} |
| response | {updated course data}|

testing while logged in as an instructor and he/she is not the author the course
| header |   PATCH /instructor/addExercise|
| :-------- | :------- | 
| body | {"courseId", "title", "subtitleId", "questions"} |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   PATCH /instructor/addExercise|
| :-------- | :------- | 
| body | {"courseId", "title", "subtitleId", "questions"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   POST /instructor/loadExercise|
| :-------- | :------- | 
| body | {"courseId", "subtitleId", "exerciseId"} |
| response | {exercise data}|

testing while logged in as an instructor and he/she is not the author the course
| header |   POST /instructor/loadExercise|
| :-------- | :------- | 
| body | {"courseId", "subtitleId", "exerciseId"}  |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   POST /instructor/loadExercise|
| :-------- | :------- | 
| body | {"courseId", "subtitleId", "exerciseId"}  |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   PATCH /instructor/addPromotion|
| :-------- | :------- | 
| body | {"courseId", "discount", "date"} |
| response | {updated course data}|

testing while logged in as an instructor and he/she is not the author the course
| header |   PATCH /instructor/addPromotion|
| :-------- | :------- | 
| body | {"courseId", "discount", "date"}  |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   PATCH /instructor/addPromotion|
| :-------- | :------- | 
| body | {"courseId", "discount", "date"}  |
| response | {"error": "Token required"}|

testing while logged in with correct old password
| header |    PATCH /instructor/editPassword|
| :-------- | :------- | 
| body | { "oldPassword":"old value of the password", "newPassword":"the updated password"}| 
| response | {user data} |

testing while logged in with incorrect old password
| header |    PATCH /instructor/editPassword|
| :-------- | :------- | 
| body | { "oldPassword":"old value of the password", "newPassword":"the updated password"}| 
| response | {"error":"Wrong Password"}|

testing while logged out
| header |    PATCH /instructor/editPassword|
| :-------- | :------- | 
| body | { "oldPassword":"old value of the password", "newPassword":"the updated password"}| 
| response | {"error": "Token required"}|

testing while logged in as a trinee
| header |   PATCH /instructor/addComplaint|
| :-------- | :------- | 
| body | {"title" : "title of the complaint", "body": "body of the complaint", "reportedCourse": "id of the reported course", "reportType":"type"}| 
| response | {"message": "successful"} |

testing while logged out
| header |   PATCH /instructor/addComplaint|
| :-------- | :------- | 
| body | {"title" : "title of the complaint", "body": "body of the complaint", "reportedCourse": "id of the reported course", "reportType":"type"}| 
| response | {"error": "Token required"} |

testing while logged in as an instructor and he/she is the author the course
| header |   patch /instructor/addSubtitleToCourse|
| :-------- | :------- | 
| body | {"courseId", "title", "totalHourse"} |
| response | {updated course data}|

testing while logged in as an instructor and he/she is not the author the course
| header |   patch /instructor/addSubtitleToCourse|
| :-------- | :------- | 
| body | {"courseId", "title", "totalHourse"} |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   patch /instructor/addSubtitleToCourse|
| :-------- | :------- | 
| body | {"courseId", "title", "totalHourse"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   POST /instructor/loadSubtitle|
| :-------- | :------- | 
| body | {"courseId", "subtitleId"} |
| response | {subtitle data}|

testing while logged in as an instructor and he/she is not the author the course
| header |   POST /instructor/loadSubtitle|
| :-------- | :------- | 
| body | {"courseId", "subtitleId"} |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   POST /instructor/loadSubtitle|
| :-------- | :------- | 
| body | {"courseId", "subtitleId"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   POST /instructor/publishCourse|
| :-------- | :------- | 
| body | {"courseId"} |
| response | { "message": "successful" }|

testing while logged in as an instructor and he/she is not the author the course
| header |   POST /instructor/publishCourse|
| :-------- | :------- | 
| body | {"courseId"} |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   POST /instructor/publishCourse|
| :-------- | :------- | 
| body | {"courseId"} |
| response | {"error": "Token required"}|

testing while logged in as an instructor and he/she is the author the course
| header |   POST /instructor/closeCourse|
| :-------- | :------- | 
| body | {"courseId"} |
| response | { "message": "successful" }|

testing while logged in as an instructor and he/she is not the author the course
| header |   POST /instructor/closeCourse|
| :-------- | :------- | 
| body | {"courseId"} |
| response | {"error":"You do not have access to this Course"}|

testing while logged out
| header |   POST /instructor/closeCourse|
| :-------- | :------- | 
| body | {"courseId"} |
| response | {"error": "Token required"}|

## Admin Routes Testing

testing while logged in as an admin and username given is unique
| header |   POST /admin/addAdmin|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {created document} |

testing while logged in as an admin and username given is not unique
| header |   POST /admin/addAdmin|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {"error":"This username already exists"} |

testing while logged out
| header |   POST /admin/addAdmin|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {"error": "Token required"} |

testing while logged in as an admin and username given is unique
| header |   POST /admin/addInstructor|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {created document} |

testing while logged in as an admin and username given is not unique
| header |   POST /admin/addInstructor|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {"error":"This username already exists"} |

testing while logged out
| header |   POST /admin/addInstructor|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {"error": "Token required"} |

testing while logged in as an admin and username given is unique
| header |   POST /admin/addCorporateTrainee|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {created document} |

testing while logged in as an admin and username given is not unique
| header |   POST /admin/addCorporateTrainee|
| :-------- | :------- | 
| body | { "username", "password"}| 
| response | {"error":"This username already exists"} |

testing while logged out
| header |   POST /admin/addCorporateTrainee|
| :-------- | :------- | 
| body | {"courseId" : "6382cf852a928dbf577f1888"}| 
| response | {"error": "Token required"} |

testing while logged in as an admin
| header |   PATCH /admin/answerRequest|
| :-------- | :------- | 
| body | {"requestId":"id of the course request", "response":"not accept or reject"}| 
| response |{"message": "successful"} |

testing while logged in as an admin but with a response that isn't accept or reject
| header |   PATCH /admin/answerRequest|
| :-------- | :------- | 
| body | {"requestId":"id of the course request", "response":"not accept or reject"}| 
| response |{"error": "No such request"}|

testing while logged out
| header |   PATCH /admin/answerRequest|
| :-------- | :------- | 
| body | {"requestId":"id of the course request", "response":"not accept or reject"}| 
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   GET /admin/getPendingComplaints|
| :-------- | :------- | 
| response |{list of unresolved complaints}|

testing while logged out
| header |   GET /admin/getPendingComplaints|
| :-------- | :------- | 
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   PATCH /admin/loadComplaint|
| :-------- | :------- | 
| body | {"complaintId"} |
| response |{complaint content}|

testing while logged out
| header |   PATCH /admin/loadComplaint|
| :-------- | :------- | 
| body | {"complaintId"} |
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   PATCH /admin/resolveComplaint|
| :-------- | :------- | 
| body | {"complaintId"} |
| response |{"success": true }|

testing while logged out
| header |   PATCH /admin/resolveComplaint|
| :-------- | :------- | 
| body | {"complaintId"} |
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   PATCH /admin/markComplaintPending|
| :-------- | :------- | 
| body | {"complaintId"} |
| response |{"success": true }|

testing while logged out
| header |   PATCH /admin/markComplaintPending|
| :-------- | :------- | 
| body | {"complaintId"} |
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   GET /admin/getCourseRequests|
| :-------- | :------- | 
| response |{all pending course requests}|

testing while logged out
| header |   GET /admin/getCourseRequests|
| :-------- | :------- | 
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   GET /admin/getRefundRequests|
| :-------- | :------- | 
| response |{all pending refund requests}|

testing while logged out
| header |   GET /admin/getRefundRequests|
| :-------- | :------- | 
| response |{"error": "Token required"}|

testing while logged in as an admin
| header |   PATCH /admin/answerRefundRequest|
| :-------- | :------- | 
| body | {"requestId":"id of the course request", "response":"not accept or reject"}| 
| response |{"message": "successful"} |

testing while logged in as an admin but with a response that isn't accept or reject
| header |   PATCH /admin/answerRefundRequest|
| :-------- | :------- | 
| body | {"requestId":"id of the course request", "response":"not accept or reject"}| 
| response |{"error": "No such request"}|

testing while logged out
| header |   PATCH /admin/answerRefundRequest|
| :-------- | :------- | 
| body | {"requestId":"id of the course request", "response":"not accept or reject"}| 
| response |{"error": "Token required"}|


# Acknowledgements

 - [The Net Ninja MERN stack tutorial](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&ab_channel=TheNetNinja)
 - [The Net Ninja MERN authentication tutorial](https://www.youtube.com/watch?v=WsRBmwNkv3Q&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&ab_channel=TheNetNinja)


