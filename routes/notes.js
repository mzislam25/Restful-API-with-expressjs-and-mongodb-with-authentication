const express = require('express');
const router = express.Router();
const other = require('../others');
const passport = require('passport');
const Note = require('../models/NoteSchema');

router.post("/", passport.authenticate('jwt', {session: false}), async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        createdBy: req.user.id
    });
    await note.save();
    note.createdAt = other.dateTimeConvert(note.createdAt);
    note.updatedAt = other.dateTimeConvert(note.updatedAt);
    res.send(note);
});

router.get('/', passport.authenticate('jwt', {session: false}), async function(req, res){
    try {
        const notes = await Note.find({createdBy: req.user.id}).sort({createdAt:-1});
        const convertedNotes = notes.map(note => {
            note.createdAt = other.dateTimeConvert(note.createdAt);
            note.updatedAt = other.dateTimeConvert(note.updatedAt);
            return note;
        });
        res.status(200).send({msg: "Get Notes", data:convertedNotes, success: true});
    } catch (err) {
        res.status(404).send({msg: "Note doesn't exist!", success: false});
    }
});

router.get("/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id, createdBy: req.user.id}).sort({createdAt:-1});
        if(note){
            note.createdAt = other.dateTimeConvert(note.createdAt);
            note.updatedAt = other.dateTimeConvert(note.updatedAt);
        }
        res.status(200).send({msg: "Get Note", data:note, success: true});
    } catch (err) {
        res.status(404).send({msg: "Note doesn't exist!", success: false});
    }
});

router.patch("/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id })
        if (req.body.title) {
            note.title = req.body.title;
        }
        if (req.body.content) {
            note.content = req.body.content;
        }
        await note.save();
        if(note){
            note.createdAt = other.dateTimeConvert(note.createdAt);
            note.updatedAt = other.dateTimeConvert(note.updatedAt);
        }
        res.status(200).send({msg: "Update Note", data:note, success: true});
    } catch (err) {
        res.status(404).send({msg: "Note doesn't exist!", success: false});
    }
});

router.delete("/:id", passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const del_item = await Note.findByIdAndDelete({_id: req.params.id});
        if(del_item){
            del_item.createdAt = other.dateTimeConvert(del_item.createdAt);
            del_item.updatedAt = other.dateTimeConvert(del_item.updatedAt);
        }
        res.status(200).send({msg: "Delete Note", data:del_item, success: true});
    } catch (err) {
        res.status(404).send({msg: "Note doesn't exist!", success: false});
    }
});

module.exports = router;