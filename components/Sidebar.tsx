'use client'

import { CheckCircle2, LayoutDashboard, ListTodo, Target } from 'lucide-react'

type SidebarProps = {
    active: string
    onChange: (page: string) => void
}

export default function Sidebar({ active, onChange }: SidebarProps) {
    const links = [
        { name: 'To-do', icon: ListTodo },
        { name: 'Alla uppgifter', icon: LayoutDashboard },
        { name: 'Slutförda', icon: CheckCircle2 }
    ]

    return (
        <aside className="m-4 flex flex-col self-start rounded-2xl bg-white p-6 md:top-4 md:m-0 md:h-fit md:w-64 md:shrink-0">
            <div className="mb-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
                    <Target size={20} />
                </div>

                <h1 className="text-xl font-bold text-gray-900">
                    Task<span className="text-violet-600">Flow</span>
                </h1>
            </div>

            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
                Huvudmeny
            </p>

            <nav className="flex flex-col gap-2">
                {links.map((link) => {
                    const Icon = link.icon
                    const selected = active === link.name

                    return (
                        <button
                            key={link.name}
                            onClick={() => onChange(link.name)}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                                selected
                                    ? 'bg-violet-50 font-semibold text-violet-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`}
                        >
                            <Icon size={18} />
                            {link.name}
                        </button>
                    )
                })}
            </nav>
        </aside>
    )
}
