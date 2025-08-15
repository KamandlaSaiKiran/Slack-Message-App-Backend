import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Workspace name is required'],
            unique:true
        },
        description:{
            type:String
        },
        members:[
            {
                memberId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
                role:{
                    type:String,
                    enum:['admin','member'],
                    default:'member'
                },

            }
        ],
        joinCode:{
            type:String,
            requried:[true,'Join Code is required']
        },
        channels:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Channel'
            }
        ]

        
    }
)

const Workspace = mongoose.Model('Worspace',workspaceSchema);
export default Workspace;