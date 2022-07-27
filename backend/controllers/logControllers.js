
const asyncHandler = require("express-async-handler");
const Log = require("../models/logModel");

//@desc         Get All Logs
//@route        GET   /api/logs/
//@access       Public

exports.getAllLogs = asyncHandler(async (req, res, next) => {

    let logs = await Log.find();

    res.status(200).json(logs);
});

//@desc         Create a log
//@route        POST    /api/logs/
//@access       Public

exports.createLog = asyncHandler(async (req, res, next) => {

    let {message, technician, attention} = req.body;

    if (!message || !technician) {
        res.status(400)
        throw new Error("Please fill enough information!")
    };

    let createdLog = await Log.create({
        message,
        technician,
        attention
    });

    res.status(201).json(createdLog);
});

//@desc        Delete a log
//@route       Delete /api/logs/:id
//@decs        Private

exports.deleteLog = asyncHandler(async (req, res, next) => {
    
    let log = await Log.findById(req.params.id);

    if (!log) {
        res.status(404)
        throw new Error("Log not found!")
    };

    let deletedLog = await Log.findByIdAndRemove(req.params.id);

    res.status(200).json(deletedLog);
});