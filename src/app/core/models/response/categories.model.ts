export class CategoryModel {
    constructor(
      public CategoryId: number,
      public Name: string,
      public IconName: string,
      public ProgramId: number,
      public Checked? : boolean
      ) { }
  }
