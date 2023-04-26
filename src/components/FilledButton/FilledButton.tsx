import React from "react"

type FilledButtonProps = {
	children: React.ReactNode
}

const FilledButton = ({ children }: FilledButtonProps) => {
	return (
		<button
			className="p-4 bg-slate-500"
		>
			{ children }
		</button>
	)
}

export default FilledButton