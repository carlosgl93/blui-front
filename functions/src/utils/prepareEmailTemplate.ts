import { getStorage } from 'firebase-admin/storage';
/**;
 *
 * @param  Params
 * @returns  Returns
 *
 */

export async function fetchAndCompileTemplate(templateName: string): Promise<string> {
  const bucket = getStorage().bucket();
  const file = bucket.file(templateName);
  const [templateContent] = await file.download();
  return templateContent.toString();
}
