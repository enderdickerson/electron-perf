export class Test {
  constructor(
    public url: string,
    public runs: number,
    public isAngular?: boolean,
    public wait?: number,
    public id?: string
  ) {
    this.runs = this.runs || 3;
    this.isAngular = this.isAngular !== undefined ? this.isAngular : true;
  }
}
