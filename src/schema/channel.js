import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requried: [true, 'Channel Name is requried']
    }
  },
  { timestamps: true }
);

const Channel = mongoose.Model('Channel', channelSchema);

export default Channel;
