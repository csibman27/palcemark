import { Message } from "./message.js";

export const messageMongoStore = {
  async getAllMessages() {
    const messages = await Message.find().lean();
    return messages;
  },

  async getMessageById(id) {
    if (id) {
      const message = await Message.findOne({ _id: id }).lean();
      return message;
    }
    return null;
  },

  async addMessage(message) {
    const newMessage = new Message(message);
    const messageObj = await newMessage.save();
    const m = await this.getMessageById(messageObj._id);
    return m;
  },

  async deleteAll() {
    await Message.deleteMany({});
  },
};
