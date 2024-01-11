const express = require('express');
const router = express.Router({ mergeParams : true});
const CampGround = require('../models/campground')
const Review = require("../models/review")
const { reviewSchema } = require("../validate")
const catchAsync = require("../util/catchAsync");
const ExpressError = require('../util/ExpressError');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body, { abortEarly : false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message).join(',');
        throw new ExpressError(errorMessage, 400)
    } else {
        next();
    }
}


// 리뷰 추가 
router.post('/',validateReview, catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await CampGround.findById(id);
    const { body, rating} = req.body;
    const review = new Review({body, rating});
    campground.reviews.push(review._id);
    await review.save();
    await campground.save();
    console.log(campground)
    console.log("reviewSuccess")
    res.send(campground);  
}))

// 리뷰 삭제 
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id,reviewId } = req.params;
    await CampGround.findByIdAndUpdate(id, { $pull : {reviews : reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.send("Delete Test")
}))


module.exports = router;