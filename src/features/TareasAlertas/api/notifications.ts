import { Alert } from '../types';

// Simulación de API de notificaciones - Reemplazar con implementación real
export const notificationsApi = {
  async sendNotification(notification: {
    userId: string;
    titulo: string;
    mensaje: string;
    prioridad: 'alta' | 'media' | 'baja';
  }): Promise<void> {
    // TODO: Implementar con sistema de notificaciones real
    console.log('Sending notification:', notification);
  },

  async scheduleNotification(notification: {
    userId: string;
    titulo: string;
    mensaje: string;
    fecha: string;
  }): Promise<void> {
    // TODO: Implementar con sistema de notificaciones programadas
    console.log('Scheduling notification:', notification);
  },

  async getUnreadNotifications(userId: string): Promise<Alert[]> {
    // TODO: Implementar con Supabase
    return [];
  },
};

