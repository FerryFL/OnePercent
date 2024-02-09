const Review = require('../models/reviewModel')
const mongoose = require('mongoose')

const getReview = async(req,res) =>{
    const review = await Review.find({}).sort({createdAt: 1})
    res.status(200).json(review)
}

const getOneReview = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Not Found'})
    }

    const review = await Review.findById(id)

    if(!review){
        return res.status(404).json({error: 'Not Found'})
    }
    res.status(200).json(review)
}

const createReview = async(req,res) =>{
    const { name, desc } = req.body

    let empty = []
    if(!name){
        empty.push('name')
    }
    if(!desc){
        empty.push('desc')
    }
    if(empty.length>0){
        return res.status(400).json({error: 'Please Input The Missing Field'})
    }

    try{
        const review = await Review.create({name,desc})
        res.status(200).json(review)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteReview = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Not Found'})
    }

    const review = await Review.findOneAndDelete({_id:id})

    if(!review){
        return res.status(404).json({error: 'Not Found'})
    }
    res.status(200).json(review)
}

const patchReview = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Not Found'})
    }

    const review = await Review.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!review){
        return res.status(404).json({error: 'Not Found'})
    }
    res.status(200).json(review)
}

module.exports = {
    getReview,
    getOneReview,
    createReview,
    deleteReview,
    patchReview
}