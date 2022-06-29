export abstract class HashTable<Type> {
  public table: Record<string, Type[]> = {}

  abstract hash(value: Type): string

  public push(value: Type): void {
    const hash = this.hash(value)

    if (!this.table[hash]) {
      this.table[hash] = []
    }

    this.table[hash].push(value)
  }
}
