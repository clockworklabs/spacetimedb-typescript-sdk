// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  Address,
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  DBConnectionBuilder,
  DBConnectionImpl,
  DBContext,
  ErrorContextInterface,
  Event,
  EventContextInterface,
  Identity,
  ProductType,
  ProductTypeElement,
  ReducerEventContextInterface,
  SubscriptionBuilderImpl,
  SubscriptionEventContextInterface,
  SumType,
  SumTypeVariant,
  TableCache,
  deepEqual,
} from '@clockworklabs/spacetimedb-sdk';
import { Player } from './player_type';
import { Point as __Point } from './point_type';

import { EventContext, Reducer, RemoteReducers, RemoteTables } from '.';

/**
 * Table handle for the table `player`.
 *
 * Obtain a handle from the [`player`] property on [`RemoteTables`],
 * like `ctx.db.player`.
 *
 * Users are encouraged not to explicitly reference this type,
 * but to directly chain method calls,
 * like `ctx.db.player.on_insert(...)`.
 */
export class PlayerTableHandle {
  tableCache: TableCache<Player>;

  constructor(tableCache: TableCache<Player>) {
    this.tableCache = tableCache;
  }

  count(): number {
    return this.tableCache.count();
  }

  iter(): Iterable<Player> {
    return this.tableCache.iter();
  }
  /**
   * Access to the `owner_id` unique index on the table `player`,
   * which allows point queries on the field of the same name
   * via the [`PlayerOwnerIdUnique.find`] method.
   *
   * Users are encouraged not to explicitly reference this type,
   * but to directly chain method calls,
   * like `ctx.db.player.owner_id().find(...)`.
   *
   * Get a handle on the `owner_id` unique index on the table `player`.
   */
  owner_id = {
    // Find the subscribed row whose `owner_id` column value is equal to `col_val`,
    // if such a row is present in the client cache.
    find: (col_val: string): Player | undefined => {
      for (let row of this.tableCache.iter()) {
        if (deepEqual(row.owner_id, col_val)) {
          return row;
        }
      }
    },
  };

  onInsert = (cb: (ctx: EventContext, row: Player) => void) => {
    return this.tableCache.onInsert(cb);
  };

  removeOnInsert = (cb: (ctx: EventContext, row: Player) => void) => {
    return this.tableCache.removeOnInsert(cb);
  };

  onDelete = (cb: (ctx: EventContext, row: Player) => void) => {
    return this.tableCache.onDelete(cb);
  };

  removeOnDelete = (cb: (ctx: EventContext, row: Player) => void) => {
    return this.tableCache.removeOnDelete(cb);
  };

  // Updates are only defined for tables with primary keys.
  onUpdate = (
    cb: (ctx: EventContext, oldRow: Player, newRow: Player) => void
  ) => {
    return this.tableCache.onUpdate(cb);
  };

  removeOnUpdate = (
    cb: (ctx: EventContext, onRow: Player, newRow: Player) => void
  ) => {
    return this.tableCache.removeOnUpdate(cb);
  };
}
