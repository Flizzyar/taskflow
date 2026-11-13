'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Plus, Trash2, Check } from 'lucide-react'

type Task = {
    id: number
    title: string
    completed: boolean
}

const initialTasks: Task[] = [
    { id: 1, title: 'Planera veckans uppgifter', completed: true },
    { id: 2, title: 'Färdigställ projektet', completed: false },
    { id: 3, title: 'Läs igenom dokumentationen', completed: false }
]

export default function Home() {
    const [tasks, setTasks] = useState(initialTasks)
    const [active, setActive] = useState('To-do')
    const [newTask, setNewTask] = useState('')

    function addTask() {
        if (!newTask.trim()) return

        setTasks([
            ...tasks,
            {
                id: Date.now(),
                title: newTask.trim(),
                completed: false
            }
        ])

        setNewTask('')
    }

    function toggleTask(id: number) {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    function deleteTask(id: number) {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const visibleTasks = tasks.filter((task) => {
        if (active === 'To-do') return !task.completed
        if (active === 'Slutförda') return task.completed
        return true
    })

    const remainingTasks = tasks.filter((task) => !task.completed).length

    return (
        <div className="min-h-screen bg-[#f5f6fa] text-gray-800 md:flex md:gap-4 md:p-4">
            <Sidebar active={active} onChange={setActive} />

            <main className="min-w-0 flex-1 p-4 md:p-0">
                <div className="mx-auto flex max-w-5xl flex-col gap-4">
                    <header className="flex items-center justify-between gap-4 rounded-2xl bg-white p-6">
                        <div>
                            <p className="mb-2 text-sm text-gray-400">
                                Välkommen tillbaka!
                            </p>

                            <h1 className="text-2xl font-bold text-gray-900">
                                God morgon! 👋
                            </h1>

                            <p className="mt-2 text-sm text-gray-400">
                                Vad vill du få gjort idag?
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 font-bold text-violet-700">
                            TF
                        </div>
                    </header>

                    <section className="overflow-hidden rounded-2xl bg-white">
                        <div className="flex items-center justify-between border-b border-gray-100 p-6">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    {active === 'To-do'
                                        ? 'Dagens uppgifter'
                                        : active === 'Slutförda'
                                          ? 'Slutförda uppgifter'
                                          : 'Alla uppgifter'}
                                </h2>

                                <p className="mt-1 text-sm text-gray-400">
                                    {remainingTasks} uppgifter kvar
                                </p>
                            </div>

                            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                                {visibleTasks.length} uppgifter
                            </span>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {visibleTasks.map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center gap-4 px-6 py-5 transition hover:bg-gray-50"
                                >
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        aria-label="Ändra uppgiftsstatus"
                                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition ${
                                            task.completed
                                                ? 'border-violet-600 bg-violet-600 text-white'
                                                : 'border-gray-300 hover:border-violet-500'
                                        }`}
                                    >
                                        {task.completed && <Check size={15} />}
                                    </button>

                                    <span
                                        className={`flex-1 text-sm ${
                                            task.completed
                                                ? 'text-gray-400 line-through'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        {task.title}
                                    </span>

                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        aria-label="Ta bort uppgift"
                                        className="rounded-lg p-2 text-gray-300 transition hover:bg-red-50 hover:text-red-500"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            ))}

                            {visibleTasks.length === 0 && (
                                <p className="px-6 py-12 text-center text-sm text-gray-400">
                                    Inga uppgifter här ännu.
                                </p>
                            )}
                        </div>

                        <div className="border-t border-gray-100 p-6">
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault()
                                    addTask()
                                }}
                                className="flex flex-col gap-3 sm:flex-row"
                            >
                                <input
                                    value={newTask}
                                    onChange={(event) =>
                                        setNewTask(event.target.value)
                                    }
                                    placeholder="Vad behöver du göra?"
                                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                                />

                                <button
                                    type="submit"
                                    className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                                >
                                    <Plus size={18} />
                                    Lägg till
                                </button>
                            </form>
                        </div>
                    </section>

                    <footer className="py-2 text-center text-xs text-gray-400">
                        TaskFlow · Enklare planering varje dag.
                    </footer>
                </div>
            </main>
        </div>
    )
}
