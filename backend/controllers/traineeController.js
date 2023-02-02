const { default: mongoose } = require('mongoose')
const { Error } = require('mongoose');
const { traineeModel, courseRecordModel } = require('../models/traineeModel')
const { courseModel } = require('../models/courseModel')
const nodemailer = require("nodemailer");

let testAccount = ''
let transporter = ''
const initalizeMailer = async () => {
    try {
        testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            auth: {
                user: process.env.email,
                pass: process.env.password,
            },
        });
    } catch (err) {
        console.log({ error: "nodemailer not connected" });
    }
}
initalizeMailer()


const userModel = require("../models/userModel");

const pdf = require("pdf-creator-node");
const fs = require("fs");
const path = require("path");
const instructorModel = require('../models/instructorModel');

const notesTemplate = fs.readFileSync("template.html", "utf8");
const certifaceTemplate = fs.readFileSync("certficateTemplate.html", "utf8");

const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

////////////////////////////////////////////////////////////////////
var assestspath = path.join(__dirname + "/../");
assestspath = assestspath.replace(new RegExp(/\\/g), '/');
console.log(assestspath);
var options2 = {
    "height": "12.93cm", // allowed units: mm, cm, in, px
    "width": "16.85cm", // allowed units: mm, cm, in, px

};



const addCourseToTrainee = async (req, res) => {//works with corporate but how with indiviual
    try {
        const { id } = req.params
        const { courseId } = req.body
        const newCourseRecord = await new courseRecordModel({ courseId: courseId })
        const newCourseList = await traineeModel.findOneAndUpdate({ _id: id }, { $addToSet: { courseList: newCourseRecord } }, { new: true, upsert: true })
        res.status(200).json(newCourseList)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const addLessonRecord = async (req, res) => {
    try {
        const traineeId = await req._id
        const { courseId, lessonId } = req.body
        // console.log(req.body);
        const total = await courseModel.findOne({ _id: courseId }, 'materialCount -_id').lean()
        const newCourseList = await traineeModel.findOneAndUpdate({ _id: traineeId, 'courseList.courseId': courseId }, { $push: { 'courseList.$.lessonsList': { lessonId, note: "" } }, $inc: { 'courseList.$.progress': 1 / total.materialCount } }, { new: true, upsert: true }).lean()
        let data = newCourseList.courseList.find(l => { return l.courseId.toString() === courseId.toString() })
        if (data.progress > .95) {
            sendCertificate(traineeId, courseId)
        }
        res.status(200).json({ message: "Successful" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const addExerciseRecord = async (req, res) => {
    try {
        const traineeId = await req._id
        const { courseId, subtitleId, exerciseId, answers } = req.body
        // check if a record already exists for this exercise
        const exerciseData = await traineeModel.findOne({ _id: req._id }, { _id: 0, courseList: { $elemMatch: { courseId: courseId } } }).lean()
        const parsedData = await JSON.parse(JSON.stringify(exerciseData))
        const exerciseRecord = await (parsedData.courseList[0].exerciseList).find((ex) => { return ex.exerciseId === exerciseId })
        if (exerciseRecord) return res.status(401).json({ message: "You already passed this exam" })
        // getting the correct answers for the exercise
        const courseData = await courseModel.findOne({ _id: courseId }, { _id: 0, materialCount: 1, subtitles: { $elemMatch: { _id: subtitleId } } }).lean()
        const count = courseData.materialCount
        const courseInfo = JSON.parse(JSON.stringify(courseData))

        const correctAnswers = await courseInfo.subtitles[0].exercises.find(ex => { return ex._id === exerciseId }).questions.map(q => q.answer)
        if (!correctAnswers) throw new Error("this exercise does not exist")
        let grade = 0
        // comparing the answers
        for (let i = 0; i < correctAnswers.length; i++) {
            if (answers[i].toString() == correctAnswers[i].toString()) {
                grade++
            }
        }
        //adding a record only if the trainee gets more than half the answers correct
        if (grade < correctAnswers.length / 2) return res.status(200).json({ message: "Exam Failed" })
        const newCourseList = await traineeModel.findOneAndUpdate({ _id: traineeId, 'courseList.courseId': courseId }, { $push: { 'courseList.$.exerciseList': { exerciseId: exerciseId, grade: grade, answers } }, $inc: { 'courseList.$.progress': 1 / count } }, { new: true, upsert: true })
        let data = newCourseList.courseList.find(l => { return l.courseId.toString() === courseId.toString() })
        if (data.progress > .95) {
            sendCertificate(traineeId, courseId)
        }
        res.status(200).json({ grade })
    } catch (err) {
        // console.log(err);
        res.status(400).json({ error: err.message })
    }
}
const addTraineeInfo = async (req, res) => { // adds info for first time trainee
    try {
        const id = req._id;
        const { name, gender } = req.body
        const updatedTrainee = await traineeModel.findOneAndUpdate({ _id: id }, { name, gender }, { new: true, upsert: true })
        res.status(200).json(updatedTrainee)
    }
    catch (err) {
        res.status(400).json({ error: err.message })

    }
}
const myCourses = async (req, res) => {
    try {
        const id = req._id
        const myCourseData = await traineeModel.findOne({ _id: id }, 'courseList.courseId courseList.progress courseList.status -_id').lean()
        let myCourseIds = myCourseData.courseList.map(li => {
            if (li.status && li.status == 'active') return li.courseId
            else return null
        })
        myCourseIds = myCourseIds.filter(li => li != null)
        // console.log(myCourseIds.filter(li => li!=null));
        // console.log(myCourseIds);
        const findHelper = async (courseId) => {
            // console.log("id " + courseId);
            const title = await courseModel.findOne({ _id: courseId }, 'title -_id').lean()
            // console.log(title);
            return title
        }
        const coursesTitles = await Promise.all(myCourseIds.map(courseId => findHelper(courseId)))
        const coursesInfo = []
        for (i = 0; i < myCourseIds.length; i++) {
            // console.log(myCourseData.courseList[i]);
            coursesInfo[i] = { ...coursesTitles[i], ...myCourseData.courseList[i] }
        }
        res.status(200).json(coursesInfo)
        //res.status(200).json({...(myCourseData)})

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const getMyInfo = async (req, res) => {//this is for the instructor himself
    const id = req._id
    const trainee = await traineeModel.findOne({ '_id': id }, 'name gender -_id').lean()
    const email = await userModel.findOne({ '_id': id }, 'email -_id').lean()
    res.json({ ...trainee, ...email })
}
const editTraineeInfo = async (req, res) => { // adds info for first time instructors
    try {
        const id = req._id;
        const { name, gender, email } = req.body
        if (!name || !gender || !email) { throw new Error('incomplete info') }
        const updatedTrainee = await traineeModel.findOneAndUpdate({ _id: id }, { name, gender }, { new: true, upsert: true })
        await userModel.updateOne({ _id: id }, { email }, { new: true, upsert: true })
        res.status(200).json(updatedTrainee)
    }
    catch (err) {
        res.status(401).json({ error: err.message })

    }
}
const getMyAnswers = async (req, res) => {
    try {
        const { courseId, exerciseId } = req.body
        const courseData = await traineeModel.findOne({ _id: req._id }, { _id: 0, courseList: { $elemMatch: { courseId: courseId } } }).lean()
        const parsedData = await JSON.parse(JSON.stringify(courseData))
        const answers = await (parsedData.courseList[0].exerciseList).find((ex) => {
            // console.log(ex.exerciseId, exerciseId, ex.exerciseId === exerciseId);
            return ex.exerciseId === exerciseId
        })
        res.status(200).json(answers)
    }
    catch (err) {
        res.status(401).json({ error: err.message })

    }

}


const addNote = async (req, res) => {
    try {
        const traineeId = await req._id
        const { courseId, lessonId, note } = req.body
        // console.log(req.body)
        // console.log(traineeId)
        const total = await courseModel.findOne({ _id: courseId }, 'materialCount -_id').lean()
        const newCourseList = await traineeModel.findOneAndUpdate(
            { _id: traineeId, 'courseList.courseId': courseId },
            { $set: { "courseList.$.lessonsList.$[element]": { lessonId: lessonId, note: note } } },
            { arrayFilters: [{ "element.lessonId": lessonId }] }

        ).lean()
        res.status(200).json({ message: newCourseList })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const lessonsList = async (req, res) => {
    try {
        const traineeId = await req._id
        const { courseId } = req.params
        const courseData = await traineeModel.findOne({ _id: traineeId }, { _id: 0, courseList: { $elemMatch: { courseId: courseId } } }).lean()
        const parsedData = await JSON.parse(JSON.stringify(courseData))
        res.status(200).json(parsedData.courseList[0].lessonsList)
    }
    catch (err) {
        res.status(400).json({ error: err.message })

    }
}
const viewInstructor = async (req, res) => {
    try {
        const { instructorId } = req.body
        const instructor = await instructorModel.findOne({ _id: instructorId })
        res.status(200).json(instructor)
    }
    catch (err) {
        res.status(401).json({ error: err.message })
    }
}

const downloadNotes = async (req, res) => {
    try {
        const id = req._id
        const { courseId } = req.params
        const courseListData = await traineeModel.findOne({ _id: id }, { _id: 0, complaints: 0, profileImag: 0, type: 0, gender: 0, name: 0, courseList: { $elemMatch: { courseId: courseId } } }).lean()
        if (!courseListData || !courseListData.courseList) throw new Error("you do not own this course")
        else {
            let traineeNotes = courseListData.courseList[0].lessonsList
            const courseData = await courseModel.findOne({ _id: courseId }, { subtitles: { lessons: { title: 1, _id: 1 }, title: 1 }, title: 1 }).lean()
            const notes = courseData.subtitles.reduce((sum, sub) => {
                let notesInSub = []
                traineeNotes.forEach(note => {
                    let lesson = sub.lessons.find((l) => {
                        if (!note.lessonId || !l._id) { return }
                        return l._id.toString() === note.lessonId.toString()
                    })
                    if (lesson) {

                        notesInSub.push({ title: lesson.title, note: note.note })
                    }

                })
                if (notesInSub.length !== 0) sum.push({ title: sub.title, notes: notesInSub })
                return sum
            }, [])
            // example data
            // const notes =  [
            //     {title:"first title", notes: [{title : "lesson 1", note:"haha"},{title : "lesson 2", note:"hahahs"},{title : "lesson 3", note:"hahahsha"}]},
            //     {title:"second title", notes: [{title : "lesson 1", note:"jaja"},{title : "lesson 2", note:"jajaja"},{title : "lesson 3", note:"jajajaja"}]}
            // ]
            var document = {
                html: notesTemplate,
                data: {
                    notes: notes,
                    title: [{ title: courseData.title }]
                },
                path: `./notePdfs/${courseData.title}${id}.pdf`,
                type: "pdf",
            };
            pdf.create(document, options)
                .then((response) => {
                    var data = fs.readFileSync(`./notePdfs/${courseData.title}${id}.pdf`);
                    res.contentType("application/pdf");
                    res.status(200).send(data)
                    fs.unlinkSync(`./notePdfs/${courseData.title}${id}.pdf`)
                })
                .catch((error) => {
                    res.status(400).json({ error: error.message })
                });
        }
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message })
    }
}
////////////////////////////////////////////////////////////////////////////////////////

const downloadCertificate = async (req, res) => {

    try {
        const id = req._id
        const { courseId } = req.params
        console.log(req.params);
        console.log(id);
        const trainee = await traineeModel.findOne({ _id: id, courseList: { $elemMatch: { courseId: courseId, progress: { $gte: 1 } } } }, { name: 1, _id: 0, courseList: 1 })
        console.log(trainee);
        const courseData = await courseModel.findOne({ _id: courseId }, { instructorName: 1, title: 1 }).lean()

        var document = {
            html: certifaceTemplate,
            data: {
                courseName: [{ courseName: courseData.title }],
                trainee: [{ trainee: trainee.name }],
                instructorName: [{ instructorName: courseData.instructorName }]

            },
            path: `./certificatesPdfs/${courseData.title}${id}.pdf`,
            type: "pdf",
        };

        pdf.create(document, options2)
            .then((response) => {
                var data = fs.readFileSync(`./certificatesPdfs/${courseData.title}${id}.pdf`);
                res.contentType("application/pdf");
                res.status(200).send(data)
                fs.unlinkSync(`./certificatesPdfs/${courseData.title}${id}.pdf`)
            })
            .catch((error) => {
                res.status(400).json({ error: error.message })
            });

    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message })
    }
}

const sendCertificate = async (id, courseId) => {
    try {
        const trainee = await traineeModel.findOne({ _id: id, courseList: { $elemMatch: { courseId: courseId, progress: { $gte: 1 } } } }, { name: 1, _id: 0, courseList: 1 })
        const courseData = await courseModel.findOne({ _id: courseId }, { instructorName: 1, title: 1 }).lean()
        var document = {
            html: certifaceTemplate,
            data: {
                courseName: [{ courseName: courseData.title }],
                trainee: [{ trainee: trainee.name }],
                instructorName: [{ instructorName: courseData.instructorName }]

            },
            path: `./certificatesPdfs/${courseData.title}${id}.pdf`,
            type: "pdf",
        };

        pdf.create(document, options2)
            .then((response) => {
                const execute = async () => {
                    const data = await userModel.findOne({ _id: id }, 'email -_id').lean()
                    await transporter.sendMail({
                        from: 'The_ACL_Company@gmail.com', // sender address
                        to: data.email, // list of receivers
                        subject: `${courseData.title} Course Certificate`, // Subject line
                        text: "", // plain text body
                        html: `<p>Congratulations ! You completed ${courseData.title}. </p>`,
                        attachments: [{
                            filename: 'Certificate.pdf',
                            path: `./certificatesPdfs/${courseData.title}${id}.pdf`,
                            contentType: 'application/pdf'
                        }]
                    }, (error,) => {
                        if (error) {
                            console.log("error sending mail");
                            console.log(error);
                            fs.unlinkSync(`./certificatesPdfs/${courseData.title}${id}.pdf`)
                        } else {
                            console.log("successful");
                            fs.unlinkSync(`./certificatesPdfs/${courseData.title}${id}.pdf`)
                        }

                    });
                }
                execute()
            })
            .catch((error) => {
                res.status(400).json({ error: error.message })
            });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message })
    }

}
const reviewedInstructor = async (req, res) => {
    try {
        const id = req._id
        const { instructorId } = req.params
        const data = await instructorModel.findOne({ _id: instructorId, 'reviews.reviewerId': id }, 'reviews').lean()
        if (data && data.reviews) {
            let myReview = data.reviews.find(r => { return r.reviewerId.toString() === id.toString() })
            res.status(200).json(myReview)
        }
        else {
            res.status(200).json({ message: "instructor unrated" })
        }

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
const reviewedCourse = async (req, res) => {
    try {
        const id = req._id
        const { courseId } = req.params
        const data = await courseModel.findOne({ _id: courseId, 'reviews.reviewerId': id }, 'reviews').lean()
        if (data && data.reviews) {
            let myReview = data.reviews.find(r => { return r.reviewerId.toString() === id.toString() })
            res.status(200).json(myReview)
        }
        else {
            res.status(200).json({ message: "course unrated" })
        }
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports = { viewInstructor, addCourseToTrainee, addLessonRecord, addExerciseRecord, addTraineeInfo, myCourses, getMyInfo, editTraineeInfo, getMyAnswers, addNote, lessonsList, downloadNotes, downloadCertificate, reviewedCourse, reviewedInstructor }