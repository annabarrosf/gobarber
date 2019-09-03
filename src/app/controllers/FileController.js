import Files from '../models/files';

class FileController {
  async store(req, res) {
    const { originalName: name, fileName: path } = req.file;
    const file = await Files.create({
      name,
      path
    });
    return res.json(file);
  }
}
export default new FileController();
