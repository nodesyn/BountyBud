'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { useErrorBoundary } from './useErrorBoundary';

interface CommandChainProps {
  commands: ChainedCommand[];
  onAddCommand: (commandId: string) => void;
  onRemoveCommand: (index: number) => void;
  onReorderCommands: (startIndex: number, endIndex: number) => void;
  onCopyChainAsScript: () => void;
}

export interface ChainedCommand {
  id: string;
  name: string;
  command: string;
  category: string;
}

const CommandChain: React.FC<CommandChainProps> = ({
  commands,
  onAddCommand,
  onRemoveCommand,
  onReorderCommands,
  onCopyChainAsScript,
}) => {
  const { ErrorBoundary } = useErrorBoundary();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    onReorderCommands(result.source.index, result.destination.index);
  };

  return (
    <ErrorBoundary>
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Command Chain</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={onCopyChainAsScript}
            disabled={commands.length === 0}
          >
            Show Script
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-400">
            Drag and drop to reorder commands. The script will execute commands in sequence from top to bottom.
          </p>
        </div>

        {commands.length === 0 ? (
          <div className="bg-gray-800 rounded p-4 text-center text-gray-400">
            <p>No commands in chain. Use "Add to Chain" from your command output.</p>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="command-chain">
              {(provided: DroppableProvided) => (
                <ul
                  className="space-y-2"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {commands.map((command, index) => (
                    <Draggable key={command.id} draggableId={command.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-800 rounded p-3 flex justify-between items-center"
                        >
                          <div>
                            <div className="font-medium">{command.name}</div>
                            <div className="text-xs text-gray-400 font-mono mt-1 truncate max-w-[250px]">
                              {command.command}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Category: {command.category}
                            </div>
                          </div>
                          <button
                            className="text-gray-400 hover:text-red-400"
                            onClick={() => onRemoveCommand(index)}
                            title="Remove from chain"
                          >
                            ×
                          </button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CommandChain; 