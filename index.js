import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
const app = express();
app.use(express.json());

app.use(cors({
   
}))


const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const Todo = mongoose.model('Todo', todoSchema)



app.post(`/todos`,async(req,res)=>{
    const body = req.body;
    const result =  await Todo.insertMany(body);
         res.json({ message: "Tasks added successfully!" , data:result });
   
})

app.get(`/todos/:id`, async (req,res)=>{
    const id = req.params.id;
    const data=await Todo.findById(id)
    res.json(data);

})


app.get('/todos', async (req, res) => {
    const data = await Todo.find()
    res.json(data)
})




app.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    await Todo.deleteOne({ _id: id })
    res.json({ "message": "Deleted Successfully" });
})


app.put('/todos/:id', async(req,res)=>{
    const id = req.params.id;
    await Todo.findByIdAndUpdate({_id: id}, req.body)
    res.json(req.body);
})


app.listen(3003, () => {
    mongoose.connect("mongodb://localhost:27017/TODO-LIST")
    .then(()=>console.log("db connected"))
    .catch(err=> console.log(err));
    console.log("server running at http://localhost:3003/")

});