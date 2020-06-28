export class Stack {

  items = [];

  isEmpty(): boolean {
    return this.items.length == 0;
  }

  size(): number {
    return this.items.length;
  }

  push( item: any ) {
    this.items.push( item );
  }

  pop() : any {
    return this.items.pop();
  }

}
