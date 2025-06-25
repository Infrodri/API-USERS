import AuditLogModel, { IAuditLog } from "@models/AuditLog";

export class AuditLogRepository {
  async create(data: IAuditLog): Promise<IAuditLog> {
    const auditLog = new AuditLogModel(data);
    return await auditLog.save();
  }

  async find(query: any = {}): Promise<IAuditLog[]> {
    return await AuditLogModel.find(query).sort({ timestamp: -1 }).exec();
  }

  async findById(id: string): Promise<IAuditLog | null> {
    return await AuditLogModel.findById(id).exec();
  }

  async findByUserId(userId: string, query: any = {}): Promise<IAuditLog[]> {
    return await AuditLogModel.find({ userId, ...query })
      .sort({ timestamp: -1 })
      .exec();
  }

  async findByCategory(
    category: string,
    query: any = {}
  ): Promise<IAuditLog[]> {
    return await AuditLogModel.find({ category, ...query })
      .sort({ timestamp: -1 })
      .exec();
  }

  async findByDateRange(
    startDate: Date,
    endDate: Date,
    query: any = {}
  ): Promise<IAuditLog[]> {
    return await AuditLogModel.find({
      timestamp: { $gte: startDate, $lte: endDate },
      ...query,
    })
      .sort({ timestamp: -1 })
      .exec();
  }

  async getStats(query: any = {}): Promise<{
    totalLogs: number;
    successCount: number;
    errorCount: number;
    warningCount: number;
    infoCount: number;
    uniqueUsers: number;
    categories: Record<string, number>;
    statuses: Record<string, number>;
  }> {
    const [
      totalLogs,
      successCount,
      errorCount,
      warningCount,
      infoCount,
      uniqueUsers,
      categoryStats,
      statusStats,
    ] = await Promise.all([
      AuditLogModel.countDocuments(query),
      AuditLogModel.countDocuments({ ...query, status: "success" }),
      AuditLogModel.countDocuments({ ...query, status: "error" }),
      AuditLogModel.countDocuments({ ...query, status: "warning" }),
      AuditLogModel.countDocuments({ ...query, status: "info" }),
      AuditLogModel.distinct("userId", query).then((users) => users.length),
      AuditLogModel.aggregate([
        { $match: query },
        { $group: { _id: "$category", count: { $sum: 1 } } },
      ]),
      AuditLogModel.aggregate([
        { $match: query },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
    ]);

    const categories: Record<string, number> = {};
    categoryStats.forEach((stat: any) => {
      categories[stat._id] = stat.count;
    });

    const statuses: Record<string, number> = {};
    statusStats.forEach((stat: any) => {
      statuses[stat._id] = stat.count;
    });

    return {
      totalLogs,
      successCount,
      errorCount,
      warningCount,
      infoCount,
      uniqueUsers,
      categories,
      statuses,
    };
  }

  async deleteOldLogs(daysOld: number): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await AuditLogModel.deleteMany({
      timestamp: { $lt: cutoffDate },
    }).exec();

    return result.deletedCount;
  }
}

export default new AuditLogRepository();
