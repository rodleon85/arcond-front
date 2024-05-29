import { User } from "./User";
import { RequestEntry } from "./RequestEntry"; // Import the missing RequestEntry class

export interface SupportRequest {
  id: number;
  user?: User;
  openDate: Date;
  closeDate?: Date;
  requestEntries: RequestEntry[];
}