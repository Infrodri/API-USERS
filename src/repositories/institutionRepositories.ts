import Institution from "../models/Institution";
import { IInstitution } from "../types/InstitutionTypes";
import { Repository, Query } from "../types/RepositoryTypes";

class InstitutionRepository implements Repository<IInstitution> {
  public async find(query?: Query): Promise<IInstitution[]> {
    return Institution.find({ ...query, isActive: true });
  }

  public async findById(id: string): Promise<IInstitution | null> {
    return Institution.findOne({ _id: id, isActive: true });
  }

  public async create(data: Partial<IInstitution>): Promise<IInstitution> {
    return Institution.create(data);
  }

  public async update(
    id: string,
    data: Partial<IInstitution>
  ): Promise<IInstitution | null> {
    return Institution.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<boolean> {
    const result = await Institution.findByIdAndUpdate(id, { isActive: false });
    return !!result;
  }
}

export default new InstitutionRepository();
