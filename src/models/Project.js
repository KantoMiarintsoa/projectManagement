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
        // we only need this
        // no need to add a foreign key in Task
        // if it was sql, you're structure was right
        // this is much better
        tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' , select:false}], 

    }
)

const Project=mongoose.model("Project",projectSchema)
export default Project; 