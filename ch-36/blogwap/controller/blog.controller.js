const { request, response } = require("express");
const database = require("../database/db");
const createBlog = async (request, response) => {
    if (!request.file) {
        response.status(404);
        response.json({
            type: "image-validation",
            field: "image",
            message: "Please select a file"

        });
    }

    const data = request.body;
    const fileInfo = request.file;
    data['image'] = fileInfo.destination + "/" + fileInfo.filename;
    try {
        const dataRes = await database.createData(data);
        response.status(200);
        response.json(dataRes);
    } catch (error) {
        let field = [];
        response.status(409);
        if (error.code && error.code == 11000) {
            response.json({
                type: "unique",
                field: "title",
                message: "Title field is unique"
            })
        } else {
            for (let key in error.errors) {
                field.push({
                    name: key,
                    message: error.errors[key].message,
                });
            }
            response.json({
                type: "required",
                field: field
            });

        }
    }

}

const getAllBlogs = async (request, response)=>{
    const dataRes = await database.getAll();
    if(dataRes.length != 0){
        response.status(200);
        response.json(dataRes);
    }
    else{
        response.status(400);
        response.json({
            message : "blog not found!"
        })
    }
}


const getBlogsByCategory = async (request, response)=>{
    const query = {
        category : request.params.category
    }
    const dataRes = await database.getByQuery(query);
    if(dataRes.length != 0){
        response.status(200);
        response.json(dataRes);
    }
    else{
        response.status(404);
        response.json({
            message : "blog not found!"
        })
    }
}

module.exports = {
    createBlog: createBlog,
    getAllBlogs : getAllBlogs,
    getBlogsByCategory : getBlogsByCategory
}