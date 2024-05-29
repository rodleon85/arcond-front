import { EntryAttachment } from "./EntryAttachment";

export interface RequestEntry {
  id: number;
  entryDate: Date;
  closeDate?: Date;
  entryAttachmentList: EntryAttachment[];
}
