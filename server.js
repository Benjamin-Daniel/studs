var express = require('express');

const server = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3004;
const path = require('path');
var DB_URI = "mongodb://first-studs:first-studs@cluster0-shard-00-00-loasz.mongodb.net:27017,cluster0-shard-00-01-loasz.mongodb.net:27017,cluster0-shard-00-02-loasz.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin"
//var DB_URI = process.env.DB_URI;
//connect to the mongodb server


mongoose.connect(DB_URI, { useMongoClient: true }, function (err) {
    if (err) {
        return console.log(err);
    }

    return console.log("Succesfully connected to MongoDB");
});

mongoose.Promise = global.Promise;
server.use(morgan('dev'))

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

var Student = require('./models/Student');



function checkforduplicate(newStudent, database) {
    var check = false;
    var one = newStudent;
    database.map(function (two) {
        if (one.name === two.name && one.otherNames === two.otherNames && one.level === two.level) {
            check = true
        }
    })
    return check
}
function checkforduplicateEmail(newStudent, database) {
    var check = false;
    var one = newStudent;
    database.map(function (two) {
        if (one.email === two.email) {
            check = true
        };


    })
    return check
}
function checkNumberOfEmail(newStudent, database) {
    var check = 0;
    var one = newStudent;
    database.map(function (two) {
        if (one.email === two.email) {
            check++;
        }
    })
    return check
}

// Serve static files from the React app
server.use(express.static(path.join(__dirname, '/main/build')));

var filePath = "./main/build/index.html";
console.log(filePath)
var resolvedPath = path.resolve(filePath);
console.log(resolvedPath)

server.get('/', function (req, res) {
    res.sendFile(filePath)
});

server.get('/api', function (req, res) {
    Student.find({}, function (err, foundData) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        return res.status(200).send(foundData);
    })
});

server.post('/api/add', function (req, res) {
    var name = req.body.name;
    var otherNames = req.body.otherNames;
    var email = req.body.email;
    var level = req.body.level || 'beginner';
    var sex = req.body.sex || 'It';
    level.toLowerCase();
    sex.toLowerCase();


    //find all the student in the database
    Student.find({}, function (err, foundData) {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'there was an error internally daniel id fixing that' });
        } else {
            var newStudent = new Student();
            if (name) {
                newStudent.name = name;
            }
            if (email) {
                newStudent.email = email;
            }
            if (level) {
                newStudent.level = level;
            }
            if (otherNames) {
                newStudent.otherNames = otherNames;
            }
            if (sex) {
                newStudent.sex = sex;
            }
            newStudent.added = new Date().toDateString();
            var check = checkforduplicate(newStudent, foundData);
            var checkEmail = checkforduplicateEmail(newStudent, foundData);
            if (checkEmail === true) {
                return res.status(500).send({ error: "A fellow student has this email" })
            } else {
                if (check === true) {
                    return res.send({ error: 'a student like that already exist' });
                } else {

                    newStudent.save(function (err, savedObject) {
                        if (err) {
                            console.log(err);
                            return res.status(500).send()
                        }
                        //am redirecting it so that i can see the complete database
                        //because the found data is just the data before the query
                        return res.redirect('/api');
                    });
                }
            }
        }
    })
})

server.put('/api/:id', function (req, res) {
    var _id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var otherNames = req.body.otherNames;
    var level = req.body.level || 'beginner';
    var sex = req.body.sex || 'It';
    level.toLowerCase();
    sex.toLowerCase();

    //find all the students
    Student.find({}, function (err, all) {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'sorry some thing went wrong internally 👻' });
        } else {
            //find the student that neeeds to be updated
            //check if other people have that email apart for the student
            Student.findById({ _id }, function (err, student) {
                if (err) {
                    console.log(err);
                    return res.status(500).send({ error: 'sorry some thing went wrong internally 👻' })
                }
                //if the student isn't found 
                if (!student) {
                    res.status(404).send({ error: 'the student with this id wasn\'t found' })
                }
                else {
                    //if the student was found
                    student.email = email;
                    //this checks the number of people with this email
                    //it will give one 
                    var checkEmail = checkNumberOfEmail(student, all);
                    if (checkEmail >= 2) {
                        return res.status(500).send({ error: "There is a student with this email." })
                    } else {
                        student.name = name;
                        student.sex = sex;
                        student.otherNames = otherNames;
                        student.level = level;
                        student.save(function (err, savedObject) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send()
                            }
                            return res.status(200).send(savedObject);
                        });
                    }
                }
            });
        }
    });
});

server.delete('/api/:id', function (req, res) {
    var _id = req.params.id;
    Student.findByIdAndRemove({ _id }, function (err, deletedObject) {
        if (err) {
            console.log(err);
            return res.status(500).send({ error: 'sorry some thing went wrong internally 👻' })
        } else {
            if (!deletedObject) {
                return res.status(404).send({ error: 'the student with this id wasn\'t found' })
            } else {
                res.status(200).send({ sucess: `the student with the id ${_id} has been successfully deleted ` })
            }
        };
    });
});


server.get('*', (req, res) => {
    res.sendFile(path.join('./main/build/index.html'));
});

server.listen(PORT, function () {
    console.log(`app lauched on http://localhost:${PORT}`);
});