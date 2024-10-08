import { FastMenuItemModel } from "./fastMenuItem.model";


export class FastMenuListResponseModel {
  constructor(
    public GetQuickMenu: GetQuickMenuModel
  ) { }
}

export class GetQuickMenuModel {
  constructor(
    public MenuSettingsByProgramId: number,
    public ProgramId: number,
    public MenuTypeId: number,
    public MenuItems: FastMenuItemModel[]
  ) { }
}
