import  mongoose ,{Schema} from "mongoose";
const taskSchema=new mongoose.Schema(
    {
        name:{
            type:String,
        },
        description:{
            type:String,
        },
        status:{
            type:String,
            default:"a faire"
        },
        assigned_by:
             {
                type:Schema.Types.ObjectId,
                ref:"User"
             },
        assigned_to:[
        {
            type:Schema.Types.ObjectId,
            ref:[]
        }
    ],
        created_by:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        dueDate:{
            type: Date
        },

        
    }

    
)

const Task=mongoose.model("Task",taskSchema)
export default Task;