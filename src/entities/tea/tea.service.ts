import { CreateTeaDto, Tea } from "./tea.schema.ts";

export class TeaService {
  private tea: Tea[] = [];

  findAll(): Tea[] {
    return this.tea;
  }

  findOne(id: string): Tea | undefined {
    return this.tea.find((t) => t.id === id);
  }

  create(dto: CreateTeaDto): Tea {
    const newTea: Tea = {
      id: crypto.randomUUID(),
      ...dto,
    };
    this.tea.push(newTea);
    return newTea;
  }

  update(id: string, dto: CreateTeaDto): Tea | undefined {
    const idx = this.tea.findIndex((t) => t.id === id);
    if (idx === -1) return undefined;
    const updated = { ...this.tea[idx], ...dto };
    this.tea[idx] = updated;
    return updated;
  }

  remove(id: string): boolean {
    const initialLen = this.tea.length;
    this.tea = this.tea.filter((t) => t.id !== id);
    return this.tea.length < initialLen;
  }
}
