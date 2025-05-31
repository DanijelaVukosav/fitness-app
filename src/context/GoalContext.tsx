import React, { createContext, type ReactNode, useCallback, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Goal } from '@/api/types/goal.ts';
import { userGoalKeys, useUserGoal } from '@/hooks/useUserSettings.ts';

// Context state interface
interface GoalContextState {
    goal: Goal | undefined;
    isLoading: boolean;

    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;

    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    // Utility functions
    invalidateGoal: () => void;
    resetGoalCache: () => void;
}

const GoalContext = createContext<GoalContextState | undefined>(undefined);

export const GoalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data: goal, isLoading } = useUserGoal();

    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const invalidateGoal = useCallback(
        () => queryClient.invalidateQueries({ queryKey: userGoalKeys.all }),
        [queryClient]
    );
    const resetGoalCache = useCallback(
        () => queryClient.resetQueries({ queryKey: userGoalKeys.all }),
        [queryClient]
    );

    // --------------------------------------------------------------- Context
    const value: GoalContextState = {
        goal,
        isLoading,

        isModalOpen,
        setIsModalOpen,

        isDeleteModalOpen,
        setIsDeleteModalOpen,

        invalidateGoal,
        resetGoalCache
    };

    return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

// Hook to use the context
export const useUserGoalContext = (): GoalContextState => {
    const context = useContext(GoalContext);

    if (context === undefined) {
        throw new Error('useGoalContext must be used within an GoalProvider');
    }

    return context;
};
