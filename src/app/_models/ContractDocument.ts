export interface ContractDocument {
  id?: number;
  name: string;
  fileBase64: String; // Using Uint8Array for byte array representation
  type: String;
}