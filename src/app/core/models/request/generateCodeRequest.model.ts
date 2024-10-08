export class GenerateCodeRequestModel {

    constructor(
      public UserName: string,
      public ProgramId: number) {
    }
  }
  export class GenerateCodeResponseModel{

    constructor(
        public UserName: string,
        public Email: string,
        public Phone: number
    ){

    }
  }