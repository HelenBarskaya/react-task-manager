import React, {useMemo} from 'react';

export const UseSortedTasks = (tasks, sort) => {
    return useMemo(() => {
        if (sort)
            return [...tasks].sort((a, b) =>
                a[sort].localeCompare(b[sort]));
        return tasks;
    }, [sort, tasks]);
};

export const UseTasks = (tasks, sort, query) => {
    const sortedTasks = UseSortedTasks(tasks,sort);
    return useMemo(() => {
        return sortedTasks.filter(task => task.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedTasks]);
}