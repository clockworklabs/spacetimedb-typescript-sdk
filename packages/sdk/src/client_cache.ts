import type { TableRuntimeTypeInfo } from './spacetime_module.ts';
import { TableCache } from './table_cache.ts';

export class ClientCache {
  /**
   * The tables in the database.
   */
  tables: Map<number, TableCache>;

  constructor() {
    this.tables = new Map();
  }

  /**
   * Returns the table with the given index.
   * @param idx The index of the table, determined by the lexicographical sorting of its name.
   * @returns The table
   */
  getTable(idx: number): TableCache {
    const table = this.tables.get(idx);

    // ! This should not happen as the table should be available but an exception is thrown just in case.
    if (!table) {
      console.error(
        'The table has not been registered for this client. Please register the table before using it. If you have registered global tables using the SpacetimeDBClient.registerTables() or `registerTable()` method, please make sure that is executed first!'
      );
      throw new Error(`Table with index ${idx} does not exist`);
    }

    return table;
  }

  getOrCreateTable<RowType>(
    tableTypeInfo: TableRuntimeTypeInfo
  ): TableCache<RowType> {
    let table: TableCache;
    if (!this.tables.has(tableTypeInfo.tableIndex)) {
      table = new TableCache<RowType>(tableTypeInfo);
      this.tables.set(tableTypeInfo.tableIndex, table);
    } else {
      table = this.tables.get(tableTypeInfo.tableIndex)!;
    }
    return table;
  }
}
