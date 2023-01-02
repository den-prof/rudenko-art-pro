const Painter = require("../modles/painter");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */


const getPainters = async (req, res) => {
    try {
        const painters = await Painter.find();

        res.status(200).json(painters);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не удалось получить список людей"
            });
    }
};



const getPainter = async (req, res) => {
    try {
        const painter = await Painter.find({ _id: req.params.id })

        res.status(200).json(painter)
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Человек не найден"
            });
    }
}





const deletePainter = async (req, res) => {
    try {
        const delPinter = await Painter.remove({ _id: req.params.id })

        res.status(200).json(delPinter)
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Человек не удален"
            });
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */



const createPainters = async (req, res) => {

    try {
        const { city, description, name } = req.body;

        const painter = await Painter.create({
            planeImage: `http://localhost:${process.env.PORT}/static/${req.file.filename}`,
            city,
            description,
            name
        });

        res.status(201).json(painter);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не удалось создать"
            });
    }
}


module.exports = {
    getPainters,
    getPainter,
    deletePainter,
    createPainters
}