import Notification from '../Schemas/Notifications';
import UserController from './UserController';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await UserController.findOne({
      where: {
        id: req.userId,
        provider: true
      }
    });
    if (!checkIsProvider) {
      return res.status(401).json({
        error: 'Only provider cand load notifications'
      });
    }

    const notifications = await Notification.find({ use: req.userId })
      .sort({ createdAt: 'desc' })
      .limit(20);
    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findById(req.params.id);
    return res.json(notification);
  }
}

export default new NotificationController();
