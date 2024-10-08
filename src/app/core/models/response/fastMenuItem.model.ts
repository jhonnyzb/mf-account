export class FastMenuItemModel {
  constructor(
    public MenuItemId: number,
    public MenuSettingsByProgramId: number,
    public Name: string,
    public Path: string,
    public Order: number,
    public Active: boolean
  ) { }
}
