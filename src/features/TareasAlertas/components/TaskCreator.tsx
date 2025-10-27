import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Task, TaskPriority } from '../types';
import { Button, Input, Card } from '../../../components/ui';

interface TaskCreatorProps {
  onCreateTask: (task: Omit<Task, 'id' | 'fecha_creacion' | 'estado'>) => void;
}

export default function TaskCreator({ onCreateTask }: TaskCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'media' as TaskPriority,
    tipo: 'general',
    fecha_vencimiento: '',
    asignado_a: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onCreateTask({
      ...formData,
      fecha_vencimiento: formData.fecha_vencimiento || undefined,
      asignado_a: formData.asignado_a || undefined,
    });

    // Reset form
    setFormData({
      titulo: '',
      descripcion: '',
      prioridad: 'media',
      tipo: 'general',
      fecha_vencimiento: '',
      asignado_a: '',
    });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-icon-md h-icon-md mr-2" />
        Nueva Tarea
      </Button>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-h3 text-text-primary">Crear Nueva Tarea</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-surface rounded-lg transition-fast"
        >
          <X className="w-icon-md h-icon-md text-text-secondary" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título *"
          type="text"
          value={formData.titulo}
          onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          required
          inputSize="md"
        />

        <div>
          <label className="block text-body-small font-medium text-text-primary mb-2">
            Descripción
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            rows={3}
            className="input-base input-md resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-body-small font-medium text-text-primary mb-2">
              Prioridad
            </label>
            <select
              value={formData.prioridad}
              onChange={(e) => setFormData({ ...formData, prioridad: e.target.value as TaskPriority })}
              className="input-base input-md"
            >
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-body-small font-medium text-text-primary mb-2">
              Fecha de Vencimiento
            </label>
            <input
              type="date"
              value={formData.fecha_vencimiento}
              onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
              className="input-base input-md"
            />
          </div>
        </div>

        <Input
          label="Asignado a (opcional)"
          type="text"
          value={formData.asignado_a}
          onChange={(e) => setFormData({ ...formData, asignado_a: e.target.value })}
          placeholder="Nombre del usuario"
          inputSize="md"
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Crear Tarea
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}

