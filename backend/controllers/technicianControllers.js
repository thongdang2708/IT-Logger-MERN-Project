
let asyncHandler = require("express-async-handler");
let Technician = require("../models/technicianModel");

//@desc         Get All Technicians
//@route        GET   /api/technicians/
//@access       Public

exports.getAllTech = asyncHandler(async (req, res, next) => {

    let techs = await Technician.find();

    res.status(200).json(techs);
});

//@desc         Create a technician
//@route        POST     /api/technicians
//@desc         Public

exports.createTech = asyncHandler(async (req, res, next) => {

    let {firstname, lastname} = req.body;

    if (!firstname || !lastname) {
        res.status(400)
        throw new Error("Please fill enough information!")
    }

    let createdTech = await Technician.create({
        firstname,
        lastname
    });

    res.status(201).json(createdTech);
});

//@desc         Delete a technician
//@route        Delete   /api/technicians/:id
//@desc         Private

exports.deleteTech = asyncHandler(async (req, res, next) => {

    let technician = await Technician.findById(req.params.id);

    if (!technician) {
        res.status(404)
        throw new Error("Tech not found!")
    };

    let deleteTech = await Technician.findByIdAndRemove(req.params.id);

    res.status(200).json(deleteTech);
});


