const express = require('express')
const router = express.Router()

const {
    getProgress,
    getOneProgress,
    createProgress,
    deleteProgress,
    patchProgress
} = require('../controllers/progressController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//get all progress
router.get('/',getProgress)

//get progress
router.get('/:id',getOneProgress)

//post progress
router.post('/', createProgress)

//delete progress
router.delete('/:id',deleteProgress)

//patch progress
router.patch('/:id',patchProgress)

module.exports = router