import React from 'react'

interface SpinnerProps {
  size?: number
  color?: string
  thickness?: number
};

const Spinner = ({ size = 40, color = '#000', thickness = 4 }: SpinnerProps) => {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen"
    >
      <div
        role="status"
        aria-label="Loading..."
        className="flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          style={{
            width: size,
            height: size,
            animation: 'spin 0.75s linear infinite',
          }}
        >
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke={color}
            strokeWidth={thickness}
            strokeDasharray="80"
            strokeLinecap="round"
            style={{animation: 'dash 1.5s ease-in-out infinite'}}
          />
        </svg>

        <style>
          {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes dash {
            0% { stroke-dashoffset: 80; }
            50% { stroke-dashoffset: 40; transform: rotate(45deg); }
            100% { stroke-dashoffset: 80; transform: rotate(360deg); }
          }
        `}
        </style>
      </div>
    </div>
  )
}

export default Spinner
