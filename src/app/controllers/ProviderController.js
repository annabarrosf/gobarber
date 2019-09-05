import User from '../models/users';
import File from '../models/files';

class ProviderController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      atributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        { model: File, as: 'avatar', atributes: ['name', 'path', 'url'] }
      ]

      // as: 'avatar',
      // atributes: 'name','path', 'url]},
    });
    return res.json(providers);
  }
}

export default new ProviderController();
