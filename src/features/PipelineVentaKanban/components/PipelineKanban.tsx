import { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import PhaseColumn from './PhaseColumn';
import { Lead, Phase } from '../types';

interface PipelineKanbanProps {
  phases: Phase[];
  leads: Lead[];
  onLeadMove: (leadId: string, newPhaseId: string) => void;
  onLeadClick: (lead: Lead) => void;
}

export default function PipelineKanban({ phases, leads, onLeadMove, onLeadClick }: PipelineKanbanProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const leadId = draggableId.replace('lead-', '');
    const newPhaseId = destination.droppableId.replace('phase-', '');

    onLeadMove(leadId, newPhaseId);
  };

  const getLeadsByPhase = (phaseId: string) => {
    return leads.filter(lead => lead.phaseId === phaseId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {phases.map((phase) => (
          <Droppable key={phase.id} droppableId={`phase-${phase.id}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-shrink-0"
              >
                <PhaseColumn
                  phase={phase}
                  leads={getLeadsByPhase(phase.id)}
                  onLeadClick={onLeadClick}
                  isDraggingOver={snapshot.isDraggingOver}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

