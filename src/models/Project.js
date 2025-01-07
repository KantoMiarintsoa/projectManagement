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
        invitations: [
            {
              type: Schema.Types.ObjectId,
              ref: "invitationModel",
            },
          ],
        tasks: 
        [
            {
            type: Schema.Types.ObjectId,
             ref: 'Task', 
             select:false
            }
        ], 

        members:[{
            type:Schema.Types.ObjectId,
            ref:"User",
            select:false
        }]

    }
)

const Project=mongoose.model("Project",projectSchema)
export default Project; 
