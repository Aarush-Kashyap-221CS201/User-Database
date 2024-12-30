const pool=require('../db');

const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const numericErr = "must only contain numbers.";
const lengthErr = "must be between 1 and 50 characters.";

const validateUser = [
    body("name").trim()
        .isAlpha().withMessage(`Name ${alphaErr}`)
        .isLength({ min: 1, max: 50 }).withMessage(`Name ${lengthErr}`),
    body("age").trim()
        .isNumeric().withMessage(`Age ${numericErr}`),
];

async function getUsers(req,res){
    try {
        const result = await pool.query('SELECT * FROM students ORDER BY id ASC');
        res.render('home', { students: result.rows });
    } 
    catch (err) {
        console.error('Error executing query', err.stack);
        res.status(500).send('Error retrieving data');
    }
}

const createUser=[
    validateUser,
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('create', { errors: errors.array(),});
        }
        const name=req.body.name;
        const age=req.body.age;
        await pool.query('INSERT INTO students(name,age) VALUES ($1,$2)',[name,age]);
        res.redirect("/");
    }
]

const updateUser=[
    validateUser,
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('update', { id:req.params.id,errors: errors.array(),});
        }
        const id=req.params.id;
        const name=req.body.name;
        const age=req.body.age;
        await pool.query('UPDATE students SET name=$1,age=$2 WHERE id=$3',[name,age,id])
        res.redirect("/");
    }
]

async function deleteUser(req,res) {
    const id=req.params.id;
    await pool.query('DELETE FROM students WHERE id=$1',[id])
    res.redirect("/");
}

module.exports={getUsers,createUser,updateUser,deleteUser};