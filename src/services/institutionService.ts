import institutionRepositories from "../repositories/institutionRepositories";
import { IInstitution } from "../types/InstitutionTypes";
import { Query } from "../types/RepositoryTypes";

class InstitutionService {
  public async getInstitutions(query?: Query): Promise<IInstitution[]> {
    return institutionRepositories.find(query);
  }

  public async getInstitutionById(id: string): Promise<IInstitution | null> {
    const institution = await institutionRepositories.findById(id);
    if (!institution) {
      return null;
    }
    return institution;
  }

  public async createInstitution(
    data: Partial<IInstitution>
  ): Promise<IInstitution> {
    return institutionRepositories.create(data);
  }

  public async updateInstitution(
    id: string,
    data: Partial<IInstitution>
  ): Promise<IInstitution | null> {
    return institutionRepositories.update(id, data);
  }

  public async deleteInstitution(id: string): Promise<boolean> {
    return institutionRepositories.delete(id);
  }
}

export default new InstitutionService();
