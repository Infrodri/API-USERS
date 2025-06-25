import NotificationModel, { INotification } from "@models/Notification";

export class NotificationRepository {
  async create(data: INotification): Promise<INotification> {
    const notification = new NotificationModel(data);
    return await notification.save();
  }

  async find(query: any = {}): Promise<INotification[]> {
    return await NotificationModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<INotification | null> {
    return await NotificationModel.findById(id).exec();
  }

  async findByUserId(
    userId: string,
    query: any = {}
  ): Promise<INotification[]> {
    return await NotificationModel.find({ userId, ...query })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(
    id: string,
    data: Partial<INotification>
  ): Promise<INotification | null> {
    return await NotificationModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
  }

  async markAsRead(id: string): Promise<INotification | null> {
    return await NotificationModel.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    ).exec();
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    const result = await NotificationModel.updateMany(
      { userId, read: false },
      { read: true }
    ).exec();
    return result.modifiedCount > 0;
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await NotificationModel.countDocuments({
      userId,
      read: false,
    }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await NotificationModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }

  async deleteByUserId(userId: string): Promise<boolean> {
    const result = await NotificationModel.deleteMany({ userId }).exec();
    return result.deletedCount > 0;
  }
}

export default new NotificationRepository();
