import mongoose, { Schema } from "mongoose";

const projectSchema=new mongoose.Schema(
    {
        title:{
            type:String,
        },
        description:{
            type:String,
        },
        status:{
            type:String,
            default:"TODO"
        },
        dateStart:{
            type:Date
        },
        dueDate:{
            type:Date
        },
        progression:{
            type:Number
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }], 

    }
)

const Project=mongoose.model("Project",projectSchema)
export default Project; 