import { notionAPI } from "../../../singletones.ts";

const TEA_V1_ID = "27918fb6-6617-800f-8a5d-ea7dc359a1f9";
const TEA_V1_DATA_SOURCE_ID = "27918fb6-6617-819a-a82a-000bc4f88dae";

export class TeaV1Service {
  async getDatabase() {
    return await notionAPI.databases.retrieve({ database_id: TEA_V1_ID });
  }

  async getDataSource() {
    return await notionAPI.dataSources.retrieve({
      data_source_id: TEA_V1_DATA_SOURCE_ID,
    });
  }

  async getDataSourceQuery() {
    return await notionAPI.dataSources.query({
      data_source_id: TEA_V1_DATA_SOURCE_ID,
    });
  }

  async findByPageId(id: string) {
    return await notionAPI.pages.retrieve({ page_id: id });
  }

  // async findById(id: string) {
  //   return await notionAPI.pages.retrieve({ page_id: id });
  // }
}
