import React from 'react'
import clsx from 'clsx'

interface ControlProps {
  items: {
    label: string
    icon: any
    onClick: () => void
    disabled?: boolean
    hidden?: boolean
  }[]
  isAwaitingInput?: boolean,
  className?: string
}

export default function Controls(props: ControlProps) {
  const { items, isAwaitingInput } = props
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <div className={clsx("pointer-events-none z-10 -mb-16 flex justify-end p-2", props.className)}>
      <div className="pointer-events-auto space-x-2 rounded-md p-1 opacity-80 shadow-md hover:opacity-100">
        {isAwaitingInput && (
          <div className="inline-flex items-center rounded-md background px-4 py-2 text-sm font-semibold leading-6 shadow foreground">
            <svg
              className="-ml-1 mr-3 h-5 w-5 animate-spin foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="foreground">Awaiting input...</span>
          </div>
        )}
        <span className="background isolate inline-flex rounded-md">
          {visibleItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              disabled={item.disabled}
              className={clsx(
                'relative inline-flex items-center border border-none border-zinc-300 background px-4 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-0',
                !item.disabled
                  ? 'opacity-90 background pointer'
                  : 'opacity-50 background hover:cursor-not-allowed',
                i === 0 && 'rounded-l-md',
                i === visibleItems.length - 1 && 'rounded-r-md'
              )}
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)', background: "var(--background)" }}
            >
              <item.icon
                className="-ml-1 mr-2 h-5 w-5 foreground"
                aria-hidden="true"
              />
              {item.label}
            </button>
          ))}
        </span>
      </div>
    </div>
  )
}