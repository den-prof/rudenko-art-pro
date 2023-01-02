const Category = require("../modles/categories");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не удалось получить список товаров"
            });
    }
};


/*              */



const deleteCategory = async (req, res) => {
    try {
        const delCategory = await Category.remove({ _id: req.params.id })

        res.status(200).json(delCategory)
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


const createCategory = async (req, res) => {

    try {
        const { tab } = req.body;

        const category = await Category.create({
            tab,
        });

        res.status(201).json(category);
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Не удалось создать"
            });
    }
}

module.exports = {
    getCategories,
    deleteCategory,
    createCategory
}