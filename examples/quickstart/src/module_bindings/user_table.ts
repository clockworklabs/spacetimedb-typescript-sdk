// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN RUST INSTEAD.

import {
    // @ts-ignore
    AlgebraicType,
    // @ts-ignore
    ProductType,
    // @ts-ignore
    ProductTypeElement,
    // @ts-ignore
    SumType,
    // @ts-ignore
    SumTypeVariant,
    // @ts-ignore
    AlgebraicValue,
    // @ts-ignore
    Identity,
    // @ts-ignore
    Address,
    // @ts-ignore
    DBConnectionBuilder,
    // @ts-ignore
    TableCache,
    // @ts-ignore
    BinaryWriter,
    // @ts-ignore
    EventContext,
    // @ts-ignore
    BinaryReader,
    // @ts-ignore
    DBConnectionImpl,
    // @ts-ignore
    DBContext,
    // @ts-ignore
    Event,
} from "@clockworklabs/spacetimedb-sdk";
import { User } from "./user_type";
import { Reducer, RemoteReducers, RemoteTables } from ".";

// Table handle for the table `User`.
//
// Obtain a handle from the [TODO] method on [`super::RemoteTables`],
// like `ctx.db.TODO()`.
//
// Users are encouraged not to explicitly reference this type,
// but to directly chain method calls,
// like `ctx.db.TODO().on_insert(...)`.
export class UserTableHandle {
    tableCache: TableCache<User>;

    constructor(tableCache: TableCache<User>) {
        this.tableCache = tableCache;
    }

    count(): number {
        return this.tableCache.count();
    }

    iter(): Iterable<User> {
        return this.tableCache.iter();
    }

    // Access to the `identity` unique index on the table `User`,
    // which allows point queries on the field of the same name
    // via the [`UserIdentityUnique::find`] method.
    //
    // Users are encouraged not to explicitly reference this type,
    // but to directly chain method calls,
    // like `ctx.db.user().identity().find(...)`.
    //
    // Get a handle on the `identity` unique index on the table `User`.
    identity = {
        /// Find the subscribed row whose `identity` column value is equal to `col_val`,
        /// if such a row is present in the client cache.
        find: (col_val: Identity): User | undefined => {
            for (let row of this.tableCache.iter()) {
                if (row.identity === col_val) {
                    return row;
                }
            }
        }
    }

    onInsert = (cb: (ctx: EventContext<RemoteTables, RemoteReducers, Reducer>, row: User) => void) => {
        return this.tableCache.onInsert(cb);
    }

    removeOnInsert = (cb: (ctx: EventContext<RemoteTables, RemoteReducers, Reducer>, row: User) => void) => {
        return this.tableCache.removeOnInsert(cb);
    }

    onDelete = (cb: (ctx: EventContext<RemoteTables, RemoteReducers, Reducer>, row: User) => void) => {
        return this.tableCache.onDelete(cb);
    }

    removeOnDelete = (cb: (ctx: EventContext<RemoteTables, RemoteReducers, Reducer>, row: User) => void) => {
        return this.tableCache.removeOnDelete(cb);
    }

   // Updates are only defined for tables with primary keys.
    onUpdate = (cb: (ctx: EventContext<RemoteTables, RemoteReducers, Reducer>, oldRow: User, newRow: User) => void) => {
         return this.tableCache.onUpdate(cb);
    }
}
