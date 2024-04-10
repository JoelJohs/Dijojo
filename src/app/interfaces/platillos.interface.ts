export default interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  sectionId: number;
  section?: {
    id: number;
    name: string;
  };
}
