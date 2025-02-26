import { MedicoModel } from "@models/Medicos";
import { Query } from "types/RepositoryTypes";
import { IMedicoRepository, Medico } from "types/MedicoTypes";

export class MedicoRepository implements IMedicoRepository {
  async create(data: Medico): Promise<Medico> {
    const newMedico = new MedicoModel(data);
    return await newMedico.save();
  }

  async find(query?: Query): Promise<Medico[]> {
    return await MedicoModel.find(query || {}).exec();
  }

  async findActive(query?: Query): Promise<Medico[]> {
    return await MedicoModel.find({ ...query, estado: "Activo" }).exec();
  }

  async findOne(query: Query): Promise<Medico | null> {
    return await MedicoModel.findOne(query).exec();
  }

  async findById(id: string): Promise<Medico | null> {
    return await MedicoModel.findById(id).exec();
  }

  async update(id: string, data: Partial<Medico>): Promise<Medico | null> {
    return await MedicoModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await MedicoModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}