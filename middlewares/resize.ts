import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export class Resize {
  readonly folder: string;

  constructor(folder: string) {
    this.folder = folder;
  }

  public async save(buffer: string) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);
    await sharp(buffer)
      .resize(300, 300, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFile(filepath);
    return filename;
  }

  private static filename = () => `${uuidv4()}.jpg`;

  private filepath = (filename: string) =>
    path.resolve(`${this.folder}/${filename}`);
}
