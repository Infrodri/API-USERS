import templateRepositories from "@repositories/templateRepositories";
import { ITemplate } from "@types/TemplateTypes";
import { Query } from "@types/RepositoryTypes";

/**
 * @class TemplateService
 * @description Contiene la lógica de negocio para gestionar las plantillas de credenciales.
 */
class TemplateService {
  public async getAllTemplates(query?: Query): Promise<ITemplate[]> {
    return templateRepositories.find(query);
  }

  public async getTemplateById(id: string): Promise<ITemplate | null> {
    return templateRepositories.findById(id);
  }

  public async createTemplate(data: Partial<ITemplate>): Promise<ITemplate> {
    return templateRepositories.create(data);
  }

  public async updateTemplate(
    id: string,
    data: Partial<ITemplate>
  ): Promise<ITemplate | null> {
    return templateRepositories.update(id, data);
  }

  public async deleteTemplate(id: string): Promise<boolean> {
    return templateRepositories.delete(id);
  }
}

export default new TemplateService();
