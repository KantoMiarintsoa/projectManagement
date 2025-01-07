import mongoose, { Schema } from "mongoose";

const invitationSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'pending', 
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project", 
    required: true, 
  },
}, {
  timestamps: true, 
});

const Invitation= mongoose.model('Invitation', invitationSchema);
export default Invitation;

