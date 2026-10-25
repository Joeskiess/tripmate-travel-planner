import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function DragDropSchedule({ activities, onDeleteActivity, onReorder }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(activities);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorder(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="activities-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {activities.map((act, index) => (
              <Draggable key={act.id.toString()} draggableId={act.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="activity-item"
                    style={{
                      ...provided.draggableProps.style,
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      marginBottom: '10px',
                      padding: '12px',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <span className="activity-tag">≡ Drag</span>
                      <strong style={{ marginLeft: '8px' }}>{act.time ? `${act.time} - ` : ''}{act.title}</strong>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        📍 {act.location || 'N/A'} • Cost: ${act.cost}
                      </div>
                    </div>
                    <button className="btn-delete" onClick={() => onDeleteActivity(act.id)}>
                      Remove
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}