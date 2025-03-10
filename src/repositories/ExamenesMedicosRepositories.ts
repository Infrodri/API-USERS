import { ExamenesMedicosModel } from "@models/ExamenesMedicos";
import { Query } from "types/RepositoryTypes";
import { IExamenesMedicosRepository, ExamenesMedicos } from "types/ExamenesMedicosTypes";

export class ExamenesMedicosRepository implements IExamenesMedicosRepository {
  async create(data: ExamenesMedicos): Promise<ExamenesMedicos> {
    const newExamen = new ExamenesMedicosModel(data);
    return await newExamen.save();
  }

  async find(query?: Query): Promise<ExamenesMedicos[]> {
    return await ExamenesMedicosModel.find(query || {}).populate("medico paciente").exec();
  }

  async findActive(query?: Query): Promise<ExamenesMedicos[]> {
    return await ExamenesMedicosModel.find({ ...query, estado: "Activo" }).populate("medico paciente").exec();
  }

  async findOne(query: Query): Promise<ExamenesMedicos | null> {
    return await ExamenesMedicosModel.findOne(query).populate("medico paciente").exec();
  }

  async findById(id: string): Promise<ExamenesMedicos | null> {
    return await ExamenesMedicosModel.findById(id).populate("medico paciente").exec();
  }

  async update(id: string, data: Partial<ExamenesMedicos>): Promise<ExamenesMedicos | null> {
    return await ExamenesMedicosModel.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate("medico paciente").exec();
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await ExamenesMedicosModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}