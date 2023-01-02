const Plane = require("../modles/plane");
const asyncHandler = require('express-async-handler')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const getPlanes = async (req, res) => {
    try {
        const planes = await Plane.find();

        res.status(200).json(planes);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не удалось получить список товаров"
            });
    }
};

const getPlane = async (req, res) => {
    try {
        const plane = await Plane.find({ _id: req.params.id })

        res.status(200).json(plane)
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Товар не найден"
            });
    }
}

/*              */



const deletePlane = async (req, res) => {
    try {
        const delPlane = await Plane.remove({ _id: req.params.id })

        res.status(200).json(delPlane)
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Товар не удален"
            });
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */


const createPlane = async (req, res) => {
    const errors = {}
    if (!req.body.title) {
        errors.title = { message: "Укажите название"}
    }
    if (!req.body.name) {
        errors.name = { message: "Укажите Имя"}
    }
    if (!req.body.category) {
        errors.category = { message: "Укажите category"}
    }
    if (!req.body.materials) {
        errors.materials = { message: "Укажите материалы"}
    }
    if (!req.body.size) {
        errors.size = { message: "Укажите размеры"}
    }
    if (!req.body.price) {
        errors.price = { message: "Укажите цену"}
    }
    if (!req.body.description) {
        errors.description = { message: "Укажите описание"}
    }
    if (req.body.description && req.body.description.length > 700) {
        errors.description = { message: "Слишком длиное описание"}
    }
    if (!req.file) {
        errors.planeImage = { message: "Добавте фото"}
    }
    
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const { title, name, category, materials, size, price, description, } = req.body;

        const plane = await Plane.create({
            planeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`,
            title,
            name,
            category,
            materials,
            size,
            description,
            price
        });

        res.status(201).json(plane);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не удалось создать"
            });
    }
}

module.exports = {
    getPlanes,
    createPlane,
    deletePlane,
    //updatePlane,
    getPlane
}