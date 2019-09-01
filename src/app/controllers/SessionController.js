import jwt from 'jsonwebtoken';
import Users from '../models/users';
import auth from '../../config/auth';

class SessionController {
  // Não permite o login se o usuário estiver errado ou a senha.
  async store(req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    //gera o token e diz  data de expiração hhh
    const { id, name } = user;
    return res.json({
      user: { id, name, email },
      token: jwt.sign({ id }, auth.secret, { expiresIn: auth.expiresIn })
    });
  }
}
export default new SessionController();
