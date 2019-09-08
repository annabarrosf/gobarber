import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseIso } from 'date-fns';
import Users from '../models/users';
import Appointments from '../models/appointments';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await Users.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'Usuário não é um Provider' });
    }
    const { date } = req.query;
    const parsedDate = parseIso(date);
    const appointments = await Appointments.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
          oder: ['date']
        }
      }
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
