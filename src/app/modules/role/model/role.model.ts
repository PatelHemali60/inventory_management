export class Role {
  Id: number;
  Name: string;
  Description: string;

  constructor(Id: number, Name: string, Description: string) {
    this.Id = Id;
    this.Name = Name;
    this.Description = Description;
  }
}
