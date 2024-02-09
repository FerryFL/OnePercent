const Progress = require('../models/progressModel')
const mongoose = require('mongoose')

//get all progress
const getProgress = async(req,res) =>{
    const user_id = req.user._id
    const progress = await Progress.find({user_id}).sort({createdAt: -1})
    res.status(200).json(progress)
}

//get progress
const getOneProgress = async(req,res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'No Such Progress'})
    }

    const progress = await Progress.findById(id)

    if(!progress){
        return res.status(404).json({error: 'No Such Progress'})
    }
    res.status(200).json(progress)

}

//create progress
const createProgress = async (req,res)=>{
    const {title, description, goal, status} = req.body
    
    let empty = []
    if(!title){
        empty.push('title')
    }
    if(!description){
        empty.push('description')
    }
    if(!goal){
        empty.push('goal')
    }
    if(empty.length>0){
        return res.status(400).json({error: 'Please Input The Missing Field'})
    }

    try{
        const user_id = req.user._id
        const progress = await Progress.create({title,description,goal,status,user_id})
        res.status(200).json(progress)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete progress
const deleteProgress = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'No Such Progress'})
    }

    const progress = await Progress.findOneAndDelete({_id: id})

    if(!progress){
        res.status(404).json({error: 'No Such Progress'})
    }
    res.status(200).json(progress)
}

//patch progress
const patchProgress = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error: 'No Such Workout'})
    }

    const {title, description, goal, status} = req.body

    let empty = []
    if(!title){
        empty.push('title')
    }
    if(!description){
        empty.push('description')
    }
    if(!goal){
        empty.push('goal')
    }
    if(!status){
        empty.push('status')
    }
    if(empty.length>0){
        return res.status(400).json({error: 'Please Input The Missing Field'})
    }

    const progress = await Progress.findOneAndUpdate({_id:id}, {
        ...req.body
    })

    if(!progress){
        return res.status(404).json({error: 'No Such Workout'})
    }
    res.status(200).json(progress)
}

module.exports = {
    getProgress,
    getOneProgress,
    createProgress,
    deleteProgress,
    patchProgress
}

