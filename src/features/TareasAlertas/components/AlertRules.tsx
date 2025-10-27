import { useState } from 'react';
import { Settings, ToggleLeft, ToggleRight, Edit2 } from 'lucide-react';
import { AlertRule } from '../types';
import { Card, Badge } from '../../../components/ui';

interface AlertRulesProps {
  rules: AlertRule[];
  onToggleRule: (ruleId: string) => void;
}

export default function AlertRules({ rules, onToggleRule }: AlertRulesProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-50 p-2 rounded-lg">
          <Settings className="w-icon-md h-icon-md text-primary" />
        </div>
        <div>
          <h2 className="text-h2 text-text-primary">Configuración de Alertas</h2>
          <p className="text-body-small text-text-secondary">Gestiona las reglas de notificación</p>
        </div>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 bg-surface border border-border rounded-lg hover:bg-surface-2 transition-normal"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-body font-semibold text-text-primary">{rule.nombre}</h3>
                  <Badge 
                    variant={
                      rule.prioridad === 'alta' ? 'error' :
                      rule.prioridad === 'media' ? 'warning' : 'info'
                    }
                  >
                    {rule.prioridad}
                  </Badge>
                </div>
                <p className="text-body-small text-text-secondary mt-1">
                  Tipo: {rule.tipo.replace(/_/g, ' ')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleRule(rule.id)}
                  className="p-2 hover:bg-surface-2 rounded-lg transition-fast"
                >
                  {rule.activa ? (
                    <ToggleRight className="w-icon-lg h-icon-lg text-success" />
                  ) : (
                    <ToggleLeft className="w-icon-lg h-icon-lg text-text-muted" />
                  )}
                </button>
                <button className="p-2 hover:bg-surface-2 rounded-lg transition-fast">
                  <Edit2 className="w-icon-sm h-icon-sm text-text-secondary" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {rules.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            <Settings className="w-icon-2xl h-icon-2xl mx-auto mb-4 opacity-50" />
            <p className="text-body">No hay reglas de alerta configuradas</p>
          </div>
        )}
      </div>
    </Card>
  );
}

