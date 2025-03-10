import { Query } from "types/RepositoryTypes";
import { IMedicoRepository, IMedicoService, Medico } from "types/MedicoTypes";

export class MedicoService implements IMedicoService {
  private medicoRepository: IMedicoRepository;

  constructor(medicoRepository: IMedicoRepository) {
    this.medicoRepository = medicoRepository;
  }

  async createMedico(medicoData: Omit<Medico, keyof Document>): Promise<{ medico: Medico; message: string }> {
    const newMedico = await this.medicoRepository.create({
      ...medicoData,
      estado: "Activo", // Default status is Active
    });
    return { medico: newMedico, message: "Médico registrado con éxito" };
  }

  async findMedicos(query?: Query): Promise<Medico[]> {
    return this.medicoRepository.findActive(query);
  }

  async findMedicoById(id: string): Promise<Medico | null> {
    return this.medicoRepository.findById(id);
  }

  async findMedicoByCedula(cedula: string): Promise<Medico | null> {
    return this.medicoRepository.findOne({ cedula, estado: "Activo" });
  }

  async updateMedico(id: string, medico: Partial<Medico>): Promise<{ medico: Medico | null; message: string }> {
    const updatedMedico = await this.medicoRepository.update(id, medico);
    if (!updatedMedico) {
      return { medico: null, message: "Médico no encontrado" };
    }
    return { medico: updatedMedico, message: "Médico actualizado con éxito" };
  }

  async deleteMedico(id: string): Promise<{ success: boolean; message: string }> {
    const deleted = await this.medicoRepository.delete(id);
    return { success: deleted, message: deleted ? "Médico eliminado físicamente" : "Médico no encontrado" };
  }

  async softDeleteMedico(id: string): Promise<{ success: boolean; message: string }> {
    const medico = await this.medicoRepository.findById(id);
    if (!medico) {
      return { success: false, message: "Médico no encontrado" };
    }
    medico.estado = "Inactivo";
    await this.medicoRepository.update(id, medico);
    return { success: true, message: "Médico cambiado a estado Inactivo" };
  }
}