const mongoose = require("mongoose");
const { Error } = require("mongoose");

const {
    courseModel,
    subtitlesModel,
    lessonsModel,
    exerciseModel,
    questionModel,
} = require("../models/courseModel");
const instructorModel = require("../models/instructorModel");

const getAllCourses = async (req, res) => {
    try {
        const allCoures = await courseModel.find({ status: "published" });
        res.status(200).json(allCoures);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const createCourse = async (req, res) => {
    try {
        const instructorId = req._id;

        const instrucrtorData = await instructorModel.find(
            { _id: instructorId },
            "name -_id"
        );
        const instructorName = instrucrtorData[0].name || "unnamed";
        const {
            title,
            outlines,
            summary,
            previewVideo,
            subject,
            price,
            totalHours,
            imageURL,
        } = req.body;
        // subtitles taken from the json is an array of the titles of the subtitles
        const reg =
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = previewVideo.match(reg);
        // const subParemters = await subtitles.map(sub => { return { title: sub.title, totalHours: sub.totalHours } })
        // const subtitlesData = await subParemters.map(sub => new subtitlesModel(sub))

        const course = await courseModel.create({ title, outlines, summary, previewVideo: match[1], subject, price, totalHours, imageURL, instructorId, instructorName })
        console.log('we got here' + course._id);
        await instructorModel.updateOne({ _id: instructorId }, { $push: { 'courses': course._id } }, { new: true, upsert: true })
        console.log('we did it ' + course._id);
        res.status(200).json(course._id)
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const getAllSubjects = async (req, res) => {
    try {
        const subjects = await courseModel.distinct("subject", { status: "published" });
        res.status(200).json(subjects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const filterOnSubject = async (subject) => {
    if (subject != null) {
        const courses = await courseModel.find({ subject: subject });
    } else {
        const courses = {};
    }
    return courses;
};

const filterOnRating = async (minRating) => {
    const courses = await courseModel.find({ rating: { $gte: minRating } });
    return courses;
};

const filterOnPrice = async (minPrice, maxPrice) => {
    const courses = await courseModel.find({
        price: $and[({ $gte: minPrice }, { $lte: maxPrice })],
    });
    return courses;
};

const filter = async (req, res) => {
    const { } = req.body;
    const priceFiltered = filterOnPrice();
    const subjectFiltered = filterOnSubject();
};

const searchForCourses = async (req, res) => {
    try {
        const { searchKey } = req.params;
        const instructorId = await instructorModel.find(
            { name: searchKey.toLowerCase() },
            { _id: 1 }
        );
        const courses = await courseModel.find({
            $or: [
                { instructorId: instructorId },
                { title: searchKey.toLowerCase() },
                { subject: searchKey },
            ],
        });
        res.status(200).json(courses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// const getCourseInfo= async (req, res) => {
//     try{
//         const courseId = req.params.courseId
//         const courseData = await (courseModel.find({_id:courseId}).select('-_id').lean())
//         const courseInfo= JSON.parse(JSON.stringify(courseData))
//         courseInfo[0].subtitles=courseInfo[0].subtitles.map(sub => sub.title)
//         res.status(200).json(courseInfo[0])
//     }catch(err){
//         res.status(400).json({error:err.message})
//     }
// }
const deleteCourse = async (req, res) => {
    try {
        const id = req._id;
        const { courseId } = req.body;
        const ret = await courseModel.deleteOne({ _id: courseId })
        res.status(200).json(ret)
    } catch (err) {
        res.status(400).json({ error: err.message });

    }
}
const getCourseInfo = async (req, res) => {
    try {
        const courseId = req.params.courseId
        const courseData = await courseModel.find({ _id: courseId }, 'title outlines summary previewVideo subject subtitles rating reviews price totalHours instructorId instructorName promotion numOfViews imageURL status')
        res.status(200).json(courseData[0])
        console.log(courseData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const searchByText = async (req, res) => {
    try {
        const text = req.params.text;
        console.log(text);
        const courses = await courseModel.find(
            {
                $or: [
                    { title: { $regex: text, $options: "i" } },
                    { subject: { $regex: text, $options: "i" } },
                    { instructorName: { $regex: text, $options: "i" } },
                ],
            },
            "title outlines summary previewVideo subject subtitles.title rating price totalHours instructorId instructorName promotion numOfViews imageURL"
        );
        res.status(200).json(courses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const viewMyCourses = async (req, res) => {
    const id = req._id;
    try {
        const instructorCourses = await courseModel.find({ instructorId: id });
        res.json(instructorCourses);
    } catch (err) {
        res.send({ error: err.message });
    }
};

const viewMySubjects = async (req, res) => {
    const id = req._id;
    try {
        const subjects = await courseModel.distinct("subject", {
            instructorId: id,
        });
        res.json(subjects);
    } catch (err) {
        res.send({ error: err.message });
    }
};

const instructorFilterOnSubject = async (req, res) => {
    const id = req._id;
    const { subject } = req.body;
    try {
        const { courses } = await instructorModel
            .findOne({ _id: id })
            .select("courses -_id");
        var x = [];
        for (let index = 0; index < courses.length; index++) {
            const element = courses[index];
            const courseInfo = await courseModel
                .findOne({ _id: element, subject: subject })
                .select("title -_id");
            if (courseInfo) x.push(courseInfo);
        }
        res.send(x);
    } catch (err) {
        res.send({ error: err.message });
    }
};
const addSubVid = async (req, res) => {
    // adds a video link to a lesson and discription as well
    try {
        const id = req._id;
        const { vidUrl, courseId, position, subtitleId, description } =
            req.body;
        const reg =
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg);
        if (match && match[1].length == 11) {
            ///no///const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId},{$set:{'subtitles.$[a].lessons.$[b].$.videoURL': match[1]}},{arrayFilters:[{"a.title":title},{"b.position":position}]})
            //const updatedCourse = await courseModel.findOneAndUpdate({_id:courseId,'subtitles.title':title,'subtitles.0.lessons.position':position},//working properly
            //    {$set:{'subtitles.$[a].lessons.$[b].videoURL': match[1]}},{arrayFilters:[{"a.title":title},{"b.position":position}],new:true,upsert:true})
            const updatedCourse = await courseModel.findOneAndUpdate(
                { _id: courseId },
                {
                    $set: {
                        "subtitles.$[a].lessons.$[b].videoURL": match[1],
                        "subtitles.$[a].lessons.$[b].description": description,
                    },
                },
                {
                    arrayFilters: [
                        { "a._id": subtitleId },
                        { "b.position": position },
                    ],
                    new: true,
                    upsert: true,
                }
            );

            res.status(200).json(updatedCourse);
        } else {
            res.status(400).json({ error: "Invalid Video Link" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const addLesson = async (req, res) => {
    try {
        const { vidUrl, courseId, subtitleId, title, readings, description } =
            req.body;
        console.log(req.body);
        const reg =
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg);
        if (match && match[1].length == 11) {
            const courseData = await courseModel
                .findOne({ _id: courseId }, "materialCount -_id")
                .lean();
            const position = courseData.materialCount + 1;
            const lesson = await new lessonsModel({
                title: title,
                description: description,
                videoURL: match[1],
                readings: readings,
                position: position,
            });
            const updatedCourse = await courseModel.findOneAndUpdate(
                { _id: courseId },
                {
                    $push: { "subtitles.$[a].lessons": lesson },
                    $inc: { materialCount: 1 },
                },
                { arrayFilters: [{ "a._id": subtitleId }], new: true }
            );
            res.status(200).json(updatedCourse);
        } else {
            res.status(400).json({ error: "Invalid Youtube Video Link" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const addPreviewLink = async (req, res) => {
    try {
        const { courseId, vidUrl } = req.body;
        const reg =
            /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const match = vidUrl.match(reg);
        if (match && match[1].length == 11) {
            const updatedCourse = await courseModel.findOneAndUpdate(
                { _id: courseId },
                { $set: { previewVideo: match[1] } },
                { new: true }
            );
            res.status(200).json(updatedCourse);
        } else {
            res.status(400).json("Invalid Youtube Link");
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

///////////////////////////////////////////add Ex
const addExercise = async (req, res) => {
    try {
        const { courseId, title, subtitleId, questions } = req.body;
        console.log(req.body.courseId);
        console.log(req.body.subtitleId);
        console.log(req.body.title);
        const courseData = await courseModel
            .findOne({ _id: courseId }, "materialCount -_id")
            .lean();
        const position = courseData.materialCount + 1;
        const exercise = await new exerciseModel({
            title: title,
            position: position,
            questions: questions,
        });
        await courseModel.findOneAndUpdate(
            { _id: courseId },
            {
                $push: { "subtitles.$[a].exercises": exercise },
                $inc: { materialCount: 1 },
            },
            { arrayFilters: [{ "a._id": subtitleId }], new: true }
        );
        res.status(200).json(exercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const loadExercise = async (req, res) => {
    try {
        const { courseId, subtitleId, exerciseId } = req.body;
        const data = await courseModel
            .findOne(
                { _id: courseId },
                { _id: 0, subtitles: { $elemMatch: { _id: subtitleId } } }
            )
            .lean();
        const exercise = data.subtitles[0].exercises.find((ex) => {
            return ex._id.toString() === exerciseId.toString();
        });
        if (exercise) res.status(200).json(exercise);
        else throw new Error("this exercise is not in this subtitle");
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const addQuestion = async (req, res) => {
    try {
        const {
            courseId,
            exerciseId,
            subtitleId,
            questionContent,
            choice1,
            choice2,
            choice3,
            choice4,
            answer,
        } = req.body;
        const question = await new questionModel({
            question: questionContent,
            choice1,
            choice2,
            choice3,
            choice4,
            answer,
        });
        await courseModel.findOneAndUpdate(
            { _id: courseId },
            { $push: { "subtitles.$[a].exercises.$[b].questions": question } },
            {
                arrayFilters: [
                    { "a._id": subtitleId },
                    { "b._id": exerciseId },
                ],
                new: true,
                upsert: true,
            }
        );
        res.status(200).json(question);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const addPromotion = async (req, res) => {
    try {
        const { courseId, discount, date } = req.body;
        if (!courseId || !discount || !date)
            throw new Error("All fields must be satisfied");
        const Endate = new Date(date);
        const updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { promotion: { discount: discount, saleEndDate: Endate } },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const addAdminPromotion = async (req, res) => {
    try {
        const { courseIds, discount, date } = req.body;
        if (!courseIds || !discount || !date)
            throw new Error("All fields must be satisfied");
        const Endate = new Date(date);
        courseIds.forEach(async (id) => {
            await courseModel.findOneAndUpdate(
                { _id: id },
                { adminPromotion: { discount: discount, saleEndDate: Endate } },
                { new: true, upsert: true }
            );
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const addAdminPromotionToAllCourses = async (req, res) => {
    try {
        const { discount, date } = req.body;
        if (!discount || !date) throw new Error("All fields must be satisfied");
        const Endate = new Date(date);
        const updatedCourse = await courseModel.updateMany(
            {},
            { adminPromotion: { discount: discount, saleEndDate: Endate } },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const addAdminPromotionWithSubject = async (req, res) => {
    try {
        const { subject, discount, date } = req.body;
        if (!subject || !discount || !date)
            throw new Error("All fields must be satisfied");
        const Endate = new Date(date);
        const updatedCourse = await courseModel.updateMany(
            { subject: subject },
            { adminPromotion: { discount: discount, saleEndDate: Endate } },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const getCoursesWithAdminPromotion = async (req, res) => {
    try {
        const data = await courseModel.find(
            { "adminPromotion.saleEndDate": { $gte: new Date() } },
            "title subject"
        );
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const getCoursesWithPromotion = async (req, res) => {
    try {
        const data = await courseModel.find(
            {
                $or: [
                    { "promotion.saleEndDate": { $gte: new Date() } },
                    { "adminPromotion.saleEndDate": { $gte: new Date() } },
                ],
            },
            "title subject"
        );
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const removePromotion = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { promotion: null },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

const loadSubtitle = async (req, res) => {
    try {
        const { courseId, subtitleId } = req.params;
        let answers = await courseModel
            .findOne(
                { _id: courseId },
                { _id: 0, subtitles: { $elemMatch: { _id: subtitleId } } }
            )
            .lean();
        answers.subtitles[0].excercises.map((ex) => {
            ex.questions.map((q) => {
                delete q.answer;
            });
        });
        res.status(200).json(answers.subtitles[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const instructorLoadSubtitle = async (req, res) => {
    try {
        const { courseId, subtitleId } = req.body;
        console.log(courseId, subtitleId);
        const data = await courseModel.findOne(
            { _id: courseId },
            { _id: 0, subtitles: { $elemMatch: { _id: subtitleId } } }
        );

        res.status(200).json(data.subtitles[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const loadExamAnswers = async (req, res) => {
    try {
        const { courseId, subtitleId, exerciseId } = req.body;
        const courseData = await courseModel
            .findOne(
                { _id: courseId },
                { _id: 0, subtitles: { $elemMatch: { _id: subtitleId } } }
            )
            .lean();
        const courseInfo = JSON.parse(JSON.stringify(courseData));
        const answers = await courseInfo.subtitles[0].exercises
            .find((ex) => {
                return ex._id === exerciseId;
            })
            .questions.map((q) => q.answer);
        res.status(200).json({ answers });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};
const rateCourse = async (req, res) => {
    //needs to be checked again
    try {
        const id = req._id;
        const { rating, comment, courseId } = req.body;
        const courseData = await courseModel
            .findOne({ _id: courseId }, "reviews.reviewerId -_id")
            .lean();
        const check = courseData.reviews.find((rev) =>
            rev.reviewerId.equals(mongoose.Types.ObjectId(id))
        );
        if (check) {
            throw new Error("You already reviewed this course");
        }
        const addedReview = await courseModel
            .findOneAndUpdate(
                { _id: courseId },
                { $push: { reviews: { rating, comment, reviewerId: id } } },
                { new: true, upsert: true }
            )
            .lean();
        const Rating = addedReview.rating;
        Rating["" + rating] = Rating["" + rating] + 1;
        const numOfReviews =
            Rating["1"] + Rating["2"] + Rating["3"] + Rating["4"] + Rating["5"];
        Rating["total"] =
            (Rating["1"] +
                Rating["2"] * 2 +
                Rating["3"] * 3 +
                Rating["4"] * 4 +
                Rating["5"] * 5) /
            numOfReviews;
        const ret = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { rating: Rating },
            { new: true, upsert: true }
        );
        res.status(200).json(ret);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getCourseReviews = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const courseInfo = await courseModel.findOne(
            { _id: courseId },
            "reviews -_id"
        );
        res.status(200).send(courseInfo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getSubtitles = async (req, res) => {
    try {
        const { courseId } = req.params;
        const subtitleData = await courseModel
            .findOne({ _id: courseId }, "subtitles -_id")
            .lean();

        res.status(200).json(subtitleData.subtitles);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const addSubtitleToCourse = async (req, res) => {
    try {
        const { title, courseId, totalHours } = req.body;
        const subtitle = await new subtitlesModel({ title, totalHours });
        const updatedCourse = await courseModel.findOneAndUpdate(
            { _id: courseId },
            {
                $push: { subtitles: subtitle },
                $inc: { totalHours: totalHours },
            },
            { new: true, upsert: true }
        );
        res.status(200).json(updatedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getPriceInfo = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const data = await courseModel
            .findOne(
                { _id: courseId },
                "title subject price instructorName promotion adminPromotion totalHours -_id"
            )
            .lean();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const publishCourse = async (req, res) => {
    try {
        const id = req._id;
        const { courseId } = req.body;
        const courseData = await courseModel
            .findOne({ _id: courseId }, "instructorId -_id")
            .lean();
        if (
            courseData &&
            courseData.instructorId &&
            courseData.instructorId.toString() === id.toString()
        ) {
            await courseModel.updateOne(
                { _id: courseId },
                { status: "published" },
                { new: true, upsert: true }
            );
            res.status(200).json({ message: "successful" });
        } else {
            res.status(401).json({ error: "invalid course id" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
const closeCourse = async (req, res) => {
    try {
        const id = req._id;
        const { courseId } = req.body;
        const courseData = await courseModel
            .findOne({ _id: courseId }, "instructorId -_id")
            .lean();
        if (
            courseData &&
            courseData.instructorId &&
            courseData.instructorId.toString() === id.toString()
        ) {
            await courseModel.updateOne(
                { _id: courseId },
                { status: "closed" },
                { new: true, upsert: true }
            );
            res.status(200).json({ message: "successful" });
        } else {
            res.status(401).json({ error: "invalid course id" });
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getCourseImage = async (req, res) => {
    const { courseId } = req.body
    try {
        console.log(courseId);
        const img = await courseModel.findOne({ _id: courseId }, 'imageURL -_id')
        console.log(img)
        res.status(200).json(img)

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    getAllCourses,
    createCourse,
    filterOnSubject,
    filterOnRating,
    searchForCourses,
    getCourseInfo,
    searchByText,
    loadSubtitle,
    loadExamAnswers,
    rateCourse,
    viewMyCourses,
    instructorFilterOnSubject,
    viewMySubjects,
    addLesson,
    addSubVid,
    addPreviewLink,
    addExercise,
    addQuestion,
    addPromotion,
    getAllSubjects,
    getSubtitles,
    getCourseReviews,
    addSubtitleToCourse,
    removePromotion,
    instructorLoadSubtitle,
    loadExercise,
    getPriceInfo,
    getCoursesWithAdminPromotion,
    getCoursesWithPromotion,
    addAdminPromotionToAllCourses,
    addAdminPromotionWithSubject,
    addAdminPromotion,
    publishCourse,
    closeCourse,
    deleteCourse,
    getCourseImage,
};
