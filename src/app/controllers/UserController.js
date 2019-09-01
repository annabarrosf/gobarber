import User from '../models/users';
//definir o controle de usuário para que não permita cadastrar mais de um usuario com o mesmo email.
class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'Usuário existente' });
    }
    const { id, name, email, provider } = await User.create(req.body);
    
    //retorna pro front end somente os dados que pedimos
    return res.status(201).json({ id, name, email, provider });
  }
}

export default new UserController();
