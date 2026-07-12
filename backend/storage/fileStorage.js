/**
 * File storage adapter for managing member portraits, signet ring crests,
 * and alchemical manuscript attachments.
 */
export class FileStorage {
  static async uploadAttachment(fileBuffer, fileName) {
    console.log(`📜 [Archive Vault] Attachment stored: ${fileName}`);
    return `/storage/attachments/${Date.now()}_${fileName}`;
  }
}
