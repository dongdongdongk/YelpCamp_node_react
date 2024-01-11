const express = require('express');
const router = express.Router();
const catchAsync = require("../util/catchAsync");
const ExpressError = require('../util/ExpressError');
const CampGround = require('../models/campground')
const { campgroundSchema } = require("../validate")

const validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(', ');
        throw new ExpressError(errorMessage, 400)
    } else {
        next();
    }
}


// 조회
router.get('/', catchAsync(async (req, res) => {
    const campground = await CampGround.find({});
    res.send(campground);
}));

// 상세 조회
router.get('/:id', catchAsync(async (req, res) => {
    const { id } = req.params

    const campground = await CampGround.findById(id).populate('reviews');
    if (!campground) throw new ExpressError("Invalid Campground Data", 400)
    res.send(campground);

}))


// 추가 
router.post('/new',validateCampground, catchAsync(async (req, res) => {
    // if (!req.body.newCamp) throw new ExpressError('Invalid Campground Data', 400);
    const newCamp = new CampGround(req.body);
    await newCamp.save();
    res.send("SaveSuccess")
}));

// 업데이트 
router.put('/:id',validateCampground, catchAsync(async (req, res) => {
    const { id } = req.params;
    const camp = await CampGround.findById(id);

    if (!camp) throw new ExpressError("CampFindFail", 404)
    if (!req.body.camp) throw new ExpressError('Invalid Campground Data(Update)', 400);


    camp.set(req.body);
    await camp.save();

    res.send(camp);

}))
//캠프 삭제 
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    try {
        const result = await CampGround.deleteOne({ _id: id });
        if (result.deletedCount > 0) {
            res.status(200).send("DELETE SUCCESS")
        } else {
            res.status(404).send("ID NOT FOUND");
        }
    } catch (error) {
        console.log('DELETE FAIL')
        res.send(500).send("DELETE FAIL")
    }
}))





module.exports = router;