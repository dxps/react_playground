import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import './popup.css'

interface DraggablePopupProps {
	isOpen: boolean // Tells whether the popup is open or not.
	onClose: () => void // Function to close the popup.
	children: ReactNode // Content to be displayed inside the popup.
}

const Popup: React.FC<DraggablePopupProps> = ({
	isOpen,
	onClose,
	children,
}) => {
	// State to determine if the popup is being dragged.
	const [isDragging, setIsDragging] = useState(false)

	// State to keep track of the popup's position.
	const [position, setPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	})

	// Ref to store the initial mouse position when dragging starts.
	const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

	// Ref to store the popup element.
	const popupRef = useRef<HTMLDivElement | null>(null)

	// Function to handle mouse movement while dragging.
	const onMouseMove = useCallback(
		(e: MouseEvent) => {
			if (!isDragging) return
			setPosition({
				x: e.clientX - startPos.current.x,
				y: e.clientY - startPos.current.y,
			})
		},
		[isDragging]
	)

	// Function to handle the end of a drag event.
	const onMouseUp = () => {
		setIsDragging(false)
	}

	// Function to handle the start of a drag event.
	const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.stopPropagation()
		setIsDragging(true)
		startPos.current = {
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		}
	}

	// Effect to add and clean up event listeners for dragging.
	useEffect(() => {
		window.addEventListener('mousemove', onMouseMove)
		window.addEventListener('mouseup', onMouseUp)
		return () => {
			window.removeEventListener('mousemove', onMouseMove)
			window.removeEventListener('mouseup', onMouseUp)
		}
	}, [onMouseMove])

	// Reset position when the popup is closed.
	useEffect(() => {
		if (!isOpen) {
			setPosition({ x: 0, y: 0 })
		}
	}, [isOpen])

	if (!isOpen) return null
	return (
		// Use this if you want the popup to close on click outside: onClick={onClose}>
		<div className="popup-overlay">
			<div
				className="popup"
				ref={popupRef}
				onClick={(e) => e.stopPropagation()} // to prevent event delegation to the overlay
				style={{
					transform: `translate(${position.x}px, ${position.y}px)`,
				}} //to move out popup
			>
				<div className="popup-header" onMouseDown={onMouseDown}>
					<button className="popup-close" onClick={onClose}>
						x
					</button>
				</div>
				<div className="popup-content">{children}</div>
			</div>
		</div>
	)
}

export default Popup
