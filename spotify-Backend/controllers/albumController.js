import {v2 as cloudinary} from "cloudinary"
import albumModel from '../models/albumModel.js'

const addAlbum = async(req,res) => {


    try {

        const name = req.body.name;
        const desc = req.body.desc;
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"});
        
        const albumAData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url,
        }

        const album = albumModel(albumAData); // store album inside the database
        await album.save();

        res.json({success: true, message: "album added successfully"})

    } catch (error) {
        res.json({success: false, message: "album not added"})
    }
}


const listAlbum = async(req,res) => {
    
    try {
        
    } catch (error) {
        
    }
}


const removeAlbum = async(req,res) => {

    try {
        
    } catch (error) {
        
    }
    
}

export {addAlbum, listAlbum, removeAlbum}