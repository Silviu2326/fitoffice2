import { Alert, AlertRule } from '../types';

// Simulación de API - Reemplazar con llamadas reales a Supabase
export const alertsApi = {
  async getAlerts(): Promise<Alert[]> {
    // TODO: Implementar con Supabase
    return [];
  },

  async createAlert(alert: Omit<Alert, 'id'>): Promise<Alert> {
    // TODO: Implementar con Supabase
    const newAlert: Alert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
    };
    return newAlert;
  },

  async markAsRead(alertId: string): Promise<void> {
    // TODO: Implementar con Supabase
    console.log('Marking alert as read:', alertId);
  },

  async getAlertHistory(): Promise<Alert[]> {
    // TODO: Implementar con Supabase
    return [];
  },

  async getAlertRules(): Promise<AlertRule[]> {
    // TODO: Implementar con Supabase
    return [];
  },

  async toggleAlertRule(ruleId: string): Promise<AlertRule> {
    // TODO: Implementar con Supabase
    return { id: ruleId } as AlertRule;
  },
};

