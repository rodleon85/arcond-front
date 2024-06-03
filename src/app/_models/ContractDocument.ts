export interface ContractDocument {
  id?: Number;
  name: String;
  fileBase64: String; // Using Uint8Array for byte array representation
  type: String;
}