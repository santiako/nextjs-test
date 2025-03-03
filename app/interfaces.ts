export interface Responsable {
  email: string;
  categoryId: string;
  id: string;
  typeId: string;
  position: string;
  name: string;
  phone: string;
}

export interface NavItem {
  name: string;
  href: string;
  current: boolean;
}