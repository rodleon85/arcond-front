export interface EntryAttachment {
  id: number;
  name?: string;
  file?: Uint8Array; // Using Uint8Array for byte array representation
}