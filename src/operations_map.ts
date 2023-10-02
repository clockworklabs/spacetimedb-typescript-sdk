export default class OperationsMap<K, V> {
  private items: { key: K; value: V }[] = [];

  private isEqual(a: K, b: K): boolean {
    if (a && typeof a === "object" && "isEqual" in a) {
      return (a as any).isEqual(b);
    }
    return a === b;
  }

  set(key: K, value: V): void {
    const existingIndex = this.items.findIndex(({ key: k }) =>
      this.isEqual(k, key)
    );
    if (existingIndex > -1) {
      this.items[existingIndex].value = value;
    } else {
      this.items.push({ key, value });
    }
  }

  get(key: K): V | undefined {
    const item = this.items.find(({ key: k }) => this.isEqual(k, key));
    return item ? item.value : undefined;
  }

  delete(key: K): boolean {
    const existingIndex = this.items.findIndex(({ key: k }) =>
      this.isEqual(k, key)
    );
    if (existingIndex > -1) {
      this.items.splice(existingIndex, 1);
      return true;
    }
    return false;
  }

  has(key: K): boolean {
    return this.items.some(({ key: k }) => this.isEqual(k, key));
  }

  values(): Array<V> {
    return this.items.map((i) => i.value);
  }
}
