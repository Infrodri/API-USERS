import Template from "@models/Template";
import { ITemplate } from "@types/TemplateTypes";
import { Repository, Query } from "@types/RepositoryTypes";

/**
 * @class TemplateRepository
 * @description Repositorio para manejar las operaciones de base de datos de las plantillas.
 */
class TemplateRepository implements Repository<ITemplate> {
  public async find(query?: Query): Promise<ITemplate[]> {
    return Template.find(query || {}).exec();
  }

  public async findById(id: string): Promise<ITemplate | null> {
    return Template.findById(id).exec();
  }

  public async create(data: Partial<ITemplate>): Promise<ITemplate> {
    const template = new Template(data);
    return await template.save();
  }

  public async update(
    id: string,
    data: Partial<ITemplate>
  ): Promise<ITemplate | null> {
    return Template.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public async delete(id: string): Promise<boolean> {
    const deleted = await Template.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}

export default new TemplateRepository();
