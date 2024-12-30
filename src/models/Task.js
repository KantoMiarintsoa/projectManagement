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
        // we can use other structure
        // because it's mongodb, i will create an array of tasks in project model
        // project: { type: Schema.Types.ObjectId, ref: 'Project' }, 
        
        // you forgot the dueDate
        dueDate:{
            type: Date
        }
    }
)

const Task=mongoose.model("Task",taskSchema)
export default Task;