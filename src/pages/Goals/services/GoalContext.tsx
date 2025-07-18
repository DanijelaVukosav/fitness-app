import React, { createContext, type ReactNode, useCallback, useContext, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { Goal } from '@/pages/Goals/services/goal.ts';
import { userGoalKeys, useUserGoal } from '@/pages/Goals/hooks/useUserGoal.ts';

interface GoalContextState {
    goal: Goal | undefined;
    isLoading: boolean;

    isModalOpen: boolean;
    setIsModalOpen: (open: boolean) => void;

    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

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

export const useUserGoalContext = (): GoalContextState => {
    const context = useContext(GoalContext);

    if (context === undefined) {
        throw new Error('useGoalContext must be used within an GoalProvider');
    }

    return context;
};
