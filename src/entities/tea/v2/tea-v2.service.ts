import { notionAPI } from "../../../singletones.ts";

export class TeaV2Service {
  private readonly dbId = "27918fb6-6617-800f-8a5d-ea7dc359a1f9";
  private readonly dataSourceId = "27918fb6-6617-819a-a82a-000bc4f88dae";

  async getDatabase() {
    return await notionAPI.databases.retrieve({ database_id: this.dbId });
  }

  async getDataSource() {
    return await notionAPI.dataSources.retrieve({
      data_source_id: this.dataSourceId,
    });
  }

  async findAll() {
    return await notionAPI.dataSources.query({
      data_source_id: this.dataSourceId,
    });
  }
}
