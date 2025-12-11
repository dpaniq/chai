import {
  GetDatabaseResponse,
  GetDataSourceResponse,
  GetPageResponse,
  QueryDataSourceResponse,
} from "@notionhq/client";
import { notionAPI } from "../../../singletones.ts";

const TEA_V2_ID = "28018fb6661780389786d94181b9f252";
const TEA_V2_DATA_SOURCE_ID = "28018fb6-6617-8047-86c4-000b31687bc9";

export class TeaV2Service {
  async getDatabase(): Promise<GetDatabaseResponse> {
    return await notionAPI.databases.retrieve({ database_id: TEA_V2_ID });
  }

  async getDataSource(): Promise<GetDataSourceResponse> {
    return await notionAPI.dataSources.retrieve({
      data_source_id: TEA_V2_DATA_SOURCE_ID,
    });
  }

  async getDataSourceQuery(): Promise<QueryDataSourceResponse> {
    return await notionAPI.dataSources.query({
      data_source_id: TEA_V2_DATA_SOURCE_ID,
    });
  }

  async findByPageId(id: string): Promise<GetPageResponse> {
    return await notionAPI.pages.retrieve({ page_id: id });
  }

  // async findById(id: string) {
  //   return await notionAPI.pages.retrieve({ page_id: id });
  // }
}
