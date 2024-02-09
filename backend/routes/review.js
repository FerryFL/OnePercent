const express = require('express')
const router = express.Router()
const {
    getReview,
    getOneReview,
    createReview,
    deleteReview,
    patchReview
} = require('../controllers/reviewController')

//get all review
router.get('/',getReview)

//get one review
router.get('/:id',getOneReview)

//create review
router.post('/',createReview)

//delete review
router.delete('/:id',deleteReview)

//patch review
router.patch('/:id',patchReview)

module.exports = router