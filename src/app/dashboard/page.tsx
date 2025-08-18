"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type TaskList = {
    id: number
    title: string
    tasks: string[]
}

export default function DashboardPage() {
    const [taskList, setTaskList] = useState<TaskList[]>([])
    const router = useRouter()

    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth")
        if (!isAuth) {
            router.push("/login")
        }
    }, [router])

    useEffect(() => {
        const saved = localStorage.getItem("taskList")
        if (saved) {
            setTaskList(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList))
    }, [])

    const addList = () => {
        const title = prompt("What is your new task?")
        if (title) {
            setTaskList([...taskList, { id: Date.now(), title, tasks: [] }])
        }
    }

    const removeList = (id: number) => {
        if (confirm("Are you sure you want to delete this task?")) {
            setTaskList(taskList.filter((task) => task.id !== id))
        }
    }

    const editList = (id: number) => {
        const title = prompt("What is your new task?")
        if (title) {
            setTaskList(taskList.map((list) => (list.id === id ? { ...list, title } : list)))
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Ваши списки задач</h1>

            <button
                onClick={addList}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                ➕ Добавить список
            </button>

            <ul className="space-y-3">
                {taskList.map((list) => (
                    <li
                        key={list.id}
                        className="flex justify-between items-center p-3 border rounded"
                    >
                        <span>
                            <strong>{list.title}</strong> ({list.tasks.length} задач)
                        </span>
                        <div className="space-x-2">
                            <button
                                onClick={() => editList(list.id)}
                                className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500 mb-1"
                            >
                                ✏️ Редактировать
                            </button>
                            <button
                                onClick={() => removeList(list.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                🗑 Удалить
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
