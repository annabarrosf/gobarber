import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import Yup from 'yup';
import pt from 'date-fns/locale/pt';
import Appointments from '../models/appointments';
import Users from '../models/users';
import Files from '../models/files';
import Notification from '../Schemas/Notifications';
import Mail from '../../Lib/mail';

// criando agendamento de serviços
// validção de agendamento
// listagem de agendamento de usuário

class AppointmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Falha na validação' });
    }
    const { provider_id, date } = req.body;

    const isProvider = await Users.findOne({
      where: { id: provider_id, provider: true }
    });

    if (!isProvider) {
      return res.status(401).json({
        error: 'Você só pode criar agendamento sendo Provider'
      });
    }

    // checagem para que o usuário n agende com ele mesmo.

    if (req.user_id === provider_id) {
      return res.status(401).json({
        error: 'Você não pode agendar com você mesmo!'
      });
    }

    // checagem para datas que já passaram

    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Não é permitido agendamento retroativo' });
    }

    // checagem para datas disponíveis

    const checkAvailability = await Appointments.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart
      }
    });
    if (checkAvailability) {
      return res.status(400).json({ error: 'Data não disponível' });
    }

    const appointments = await Appointments.create({
      user_id: req.userId,
      provider_id,
      date
    });

    const user = await Users.findByPk(req.userId);
    const formatDate = format(hourStart, "'dia' dd 'de' MMM, 'às' H:mm 'h'", {
      locale: pt
    });
    await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formatDate} horas`,
      user: provider_id
    });

    return res.json(appointments);
  }

  async index(req, res) {
    const { page } = req.query;

    const appointments = await Appointments.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        order: ['date'],
        attributes: ['id', 'date'],
        limit: 20,
        offset: (page - 1) * 20,

        include: [
          {
            model: Users,
            as: 'provider',
            attributes: ['id', 'name'],
            include: [
              {
                model: Files,
                as: 'avatar',
                attributes: ['id', 'url', 'path']
              }
            ]
          }
        ]
      }
    });

    return res.json(appointments);
  }

  async delete(req, res) {
    const appointment = await Appointments.findByPk(req.prams.id, {
      include: [
        {
          model: Users,
          as: 'provider',
          attributes: ['name', 'email']
        },
        {
          model: Users,
          as: 'user',
          attributes: ['name']
        }
      ]
    });

    if (appointment.user_id !== req.userId) {
      return res.status(401).json({
        error: 'Você não tem permissão para cancelar este agendamento'
      });
    }
    const dateWhitSub = subHours(appointment.date, 2);

    if (isBefore(dateWhitSub, new Date())) {
      return res.status(401).json({
        error: 'Você só pode cancelar até 2 horas antes do agendamento'
      });
    }

    appointment.canceled_at = new Date();

    await appointment.save();

    await Mail.sendMail({
      to: `{apointment.provider.name}<${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(appointment.date, "'dia' dd 'de' MMM, 'às' H:mm 'h'", {
          locale: pt
        })
      }
    });

    return res.json(appointment);
  }
}
export default new AppointmentController();
