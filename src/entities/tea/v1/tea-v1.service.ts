import { notionAPI } from "../../../singletones.ts";

export class TeaV1Service {
  private readonly dbId = "28018fb6661780389786d94181b9f252";
  private readonly dataSourceId = "27918fb6-6617-819a-a82a-000bc4f88dae";

  async getDatabase() {
    return await notionAPI.databases.retrieve({ database_id: this.dbId });
  }

  async getDataSource() {
    return await notionAPI.dataSources.retrieve({
      data_source_id: this.dataSourceId,
    });
  }

  async getDataSourceQuery() {
    return await notionAPI.dataSources.query({
      data_source_id: this.dataSourceId,
    });
  }
}
