import React, { useCallback, useRef, useState, type ReactNode } from 'react'
import {
	Animated,
	PanResponder,
	Platform,
	Pressable,
	StyleSheet,
	View,
	useWindowDimensions,
	type GestureResponderEvent,
	type PanResponderGestureState,
	type PanResponderInstance,
	type StyleProp,
	type ViewStyle,
} from 'react-native'

import { ThemedText } from '@/components/themed-text'

export const DRAGGABLE_MODAL_MIN_WIDTH = 280
export const DRAGGABLE_MODAL_MIN_HEIGHT = 180
export const DRAGGABLE_MODAL_INITIAL_HEIGHT = 220
export const DRAGGABLE_MODAL_VIEWPORT_MARGIN = 16

const MODAL_RADIUS = 8

export type DraggableModalColors = {
	background: string
	border: string
	closeDimmed: string
	foreground: string
	resizeGrip: string
	shadow: string
	tooltipBackground: string
}

export type DraggableModalDragRenderProps = {
	dragHandleStyle: StyleProp<ViewStyle>
	dragHandlers: PanResponderInstance['panHandlers']
}

export type DraggableModalProps = {
	children: ReactNode | ((props: DraggableModalDragRenderProps) => ReactNode)
	colors: DraggableModalColors
	id: string
	initialPosition: {
		x: number
		y: number
	}
	initialSize?: {
		height: number
		width: number
	}
	onActivate: (id: string) => void
	onClose: (id: string) => void
	title: string
	zIndex: number
}

const grabCursorStyle = Platform.select({
	web: { cursor: 'grab' } as unknown as ViewStyle,
})

const resizeCursorStyle = Platform.select({
	web: { cursor: 'nwse-resize' } as unknown as ViewStyle,
})

const preventSelectionStyle = Platform.select({
	web: { userSelect: 'none' } as unknown as ViewStyle,
})

const modalShadowStyle = Platform.select({
	web: {
		boxShadow: '0 24px 52px rgba(0, 0, 0, 0.62)',
	} as unknown as ViewStyle,
})

const modalShadowBlurStyle = Platform.select({
	web: {
		filter: 'blur(18px)',
	} as unknown as ViewStyle,
})

const nativeModalShadowStyle = Platform.select({
	default: {
		elevation: 18,
		shadowOffset: { width: 0, height: 18 },
		shadowOpacity: 0.34,
		shadowRadius: 28,
	} as ViewStyle,
	web: undefined,
})

export function clampToRange(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max))
}

function hasActiveTextSelection() {
	if (Platform.OS !== 'web') {
		return false
	}

	const windowWithSelection = globalThis as typeof globalThis & {
		getSelection?: () => { toString: () => string } | null
	}
	const selectionText = windowWithSelection.getSelection?.()?.toString() ?? ''

	return selectionText.length > 0
}

function clearActiveTextSelection() {
	if (Platform.OS !== 'web') {
		return
	}

	const windowWithSelection = globalThis as typeof globalThis & {
		getSelection?: () => { removeAllRanges?: () => void } | null
	}
	windowWithSelection.getSelection?.()?.removeAllRanges?.()
}

export function DraggableModal({
	children,
	colors,
	id,
	initialPosition,
	initialSize,
	onActivate,
	onClose,
	title,
	zIndex,
}: DraggableModalProps) {
	const { height: viewportHeight, width: viewportWidth } = useWindowDimensions()
	const pan = useRef(new Animated.ValueXY(initialPosition)).current
	const lastPosition = useRef(initialPosition)
	const defaultInitialSize = useRef({
		height: DRAGGABLE_MODAL_INITIAL_HEIGHT,
		width: Math.min(
			360,
			Math.max(DRAGGABLE_MODAL_MIN_WIDTH, viewportWidth * 0.86),
		),
	}).current
	const resolvedInitialSize = initialSize ?? defaultInitialSize
	const [size, setSize] = useState(resolvedInitialSize)
	const [isCloseHovered, setIsCloseHovered] = useState(false)
	const [isInteracting, setIsInteracting] = useState(false)
	const sizeRef = useRef(resolvedInitialSize)
	const resizeStartSize = useRef(resolvedInitialSize)

	const shouldStartDrag = (
		_event: GestureResponderEvent,
		gesture: PanResponderGestureState,
	) =>
		!hasActiveTextSelection() &&
		Math.abs(gesture.dx) + Math.abs(gesture.dy) > 2

	const updateSize = useCallback((nextSize: typeof resolvedInitialSize) => {
		sizeRef.current = nextSize
		setSize(nextSize)
	}, [])

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => {
				onActivate(id)
				return false
			},
			onStartShouldSetPanResponderCapture: () => false,
			onMoveShouldSetPanResponder: shouldStartDrag,
			onMoveShouldSetPanResponderCapture: shouldStartDrag,
			onPanResponderTerminationRequest: () => false,
			onPanResponderGrant: () => {
				onActivate(id)
				clearActiveTextSelection()
				setIsInteracting(true)
				pan.setOffset(lastPosition.current)
				pan.setValue({ x: 0, y: 0 })
			},
			onPanResponderMove: Animated.event(
				[null, { dx: pan.x, dy: pan.y }],
				{
					useNativeDriver: false,
				},
			),
			onPanResponderRelease: (
				_event: GestureResponderEvent,
				gesture: PanResponderGestureState,
			) => {
				lastPosition.current = {
					x: lastPosition.current.x + gesture.dx,
					y: lastPosition.current.y + gesture.dy,
				}
				pan.flattenOffset()
				setIsInteracting(false)
			},
			onPanResponderTerminate: (
				_event: GestureResponderEvent,
				gesture: PanResponderGestureState,
			) => {
				lastPosition.current = {
					x: lastPosition.current.x + gesture.dx,
					y: lastPosition.current.y + gesture.dy,
				}
				pan.flattenOffset()
				setIsInteracting(false)
			},
			onShouldBlockNativeResponder: () => true,
		}),
	).current

	const resizeResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onStartShouldSetPanResponderCapture: () => true,
			onMoveShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponderCapture: () => true,
			onPanResponderGrant: () => {
				onActivate(id)
				clearActiveTextSelection()
				setIsInteracting(true)
				resizeStartSize.current = sizeRef.current
			},
			onPanResponderMove: (
				_event: GestureResponderEvent,
				gesture: PanResponderGestureState,
			) => {
				const maxWidth = Math.max(
					DRAGGABLE_MODAL_MIN_WIDTH,
					viewportWidth -
						lastPosition.current.x -
						DRAGGABLE_MODAL_VIEWPORT_MARGIN,
				)
				const maxHeight = Math.max(
					DRAGGABLE_MODAL_MIN_HEIGHT,
					viewportHeight -
						lastPosition.current.y -
						DRAGGABLE_MODAL_VIEWPORT_MARGIN,
				)

				updateSize({
					height: clampToRange(
						resizeStartSize.current.height + gesture.dy,
						DRAGGABLE_MODAL_MIN_HEIGHT,
						maxHeight,
					),
					width: clampToRange(
						resizeStartSize.current.width + gesture.dx,
						DRAGGABLE_MODAL_MIN_WIDTH,
						maxWidth,
					),
				})
			},
			onPanResponderRelease: () => {
				setIsInteracting(false)
			},
			onPanResponderTerminate: () => {
				setIsInteracting(false)
			},
			onPanResponderTerminationRequest: () => false,
			onShouldBlockNativeResponder: () => true,
		}),
	).current

	const renderedChildren =
		typeof children === 'function'
			? children({
					dragHandleStyle: grabCursorStyle,
					dragHandlers: panResponder.panHandlers,
				})
			: children
	const nativeShadowColorStyle =
		Platform.OS === 'web' ? undefined : { shadowColor: colors.shadow }

	return (
		<Animated.View
			style={[
				styles.modal,
				modalShadowStyle,
				nativeModalShadowStyle,
				nativeShadowColorStyle,
				{
					height: size.height,
					transform: pan.getTranslateTransform(),
					width: size.width,
					zIndex,
				},
			]}
		>
			<View
				style={[
					styles.modalShadowLayer,
					modalShadowBlurStyle,
					{ borderRadius: MODAL_RADIUS },
				]}
			/>
				<View
					onStartShouldSetResponder={() => {
						onActivate(id)
						return false
					}}
					style={[
						styles.modalBody,
					{
						backgroundColor: colors.background,
						borderColor: colors.border,
					},
					isInteracting && preventSelectionStyle,
				]}
			>
				<View
					{...panResponder.panHandlers}
					style={[styles.modalHeader, grabCursorStyle]}
				>
					<View style={styles.modalDragArea}>
						<ThemedText
							selectable={false}
							type="subtitle"
							style={[
								styles.modalTitle,
								{ color: colors.foreground },
							]}
						>
							{title}
						</ThemedText>
					</View>
					<Pressable
						accessibilityRole="button"
						accessibilityLabel={`Close ${title}`}
						hitSlop={10}
						onHoverIn={() => setIsCloseHovered(true)}
						onHoverOut={() => setIsCloseHovered(false)}
						onPress={() => onClose(id)}
						style={styles.closeButton}
					>
						<ThemedText
							style={[
								styles.closeButtonText,
								{
									color: isCloseHovered
										? colors.foreground
										: colors.closeDimmed,
								},
							]}
						>
							x
						</ThemedText>
						{isCloseHovered ? (
							<View
								style={[
									styles.closeTooltip,
									{
										backgroundColor:
											colors.tooltipBackground,
									},
								]}
							>
								<ThemedText style={styles.closeTooltipText}>
									Close
								</ThemedText>
							</View>
						) : null}
					</Pressable>
				</View>

				<View style={styles.modalContent}>{renderedChildren}</View>

				<View
					{...resizeResponder.panHandlers}
					accessibilityLabel={`Resize ${title}`}
					accessibilityRole="adjustable"
					style={[styles.resizeHandle, resizeCursorStyle]}
				>
					<View style={styles.resizeHandleMark}>
						<View
							style={[
								styles.resizeHandleLine,
								styles.resizeHandleLineOuter,
								{ backgroundColor: colors.resizeGrip },
							]}
						/>
						<View
							style={[
								styles.resizeHandleLine,
								styles.resizeHandleLineMiddle,
								{ backgroundColor: colors.resizeGrip },
							]}
						/>
						<View
							style={[
								styles.resizeHandleLine,
								styles.resizeHandleLineInner,
								{ backgroundColor: colors.resizeGrip },
							]}
						/>
					</View>
				</View>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	modal: {
		borderRadius: MODAL_RADIUS,
		pointerEvents: 'box-none',
		position: 'absolute',
	},
	modalShadowLayer: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		bottom: -10,
		left: 8,
		pointerEvents: 'none',
		position: 'absolute',
		right: 8,
		top: 16,
	},
	modalBody: {
		borderRadius: MODAL_RADIUS,
		borderWidth: StyleSheet.hairlineWidth,
		flex: 1,
		overflow: 'hidden',
	},
	modalHeader: {
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		minHeight: 32,
		paddingLeft: 12,
		paddingRight: 4,
		paddingVertical: 4,
	},
	modalDragArea: {
		flex: 1,
		justifyContent: 'center',
		minHeight: 26,
	},
	modalTitle: {
		flex: 1,
		fontSize: 18,
	},
	closeButton: {
		alignItems: 'center',
		borderRadius: MODAL_RADIUS,
		height: 30,
		justifyContent: 'center',
		position: 'relative',
		transform: [{ translateY: -2 }],
		width: 30,
		zIndex: 2,
	},
	closeButtonText: {
		fontSize: 18,
		lineHeight: 20,
	},
	closeTooltip: {
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
		pointerEvents: 'none',
		position: 'absolute',
		right: 0,
		top: 32,
	},
	closeTooltipText: {
		color: '#FFFFFF',
		fontSize: 12,
		lineHeight: 14,
	},
	modalContent: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	resizeHandle: {
		bottom: 0,
		height: 30,
		position: 'absolute',
		right: 0,
		width: 30,
	},
	resizeHandleMark: {
		bottom: 2,
		height: 15,
		overflow: 'hidden',
		position: 'absolute',
		right: 2,
		width: 15,
	},
	resizeHandleLine: {
		borderRadius: 2,
		height: 1.5,
		opacity: 0.5,
		position: 'absolute',
		transform: [{ rotate: '-45deg' }],
	},
	resizeHandleLineOuter: {
		bottom: -2,
		right: -11,
		width: 27,
	},
	resizeHandleLineMiddle: {
		bottom: 2,
		right: -7,
		width: 23,
	},
	resizeHandleLineInner: {
		bottom: 6,
		right: -4,
		width: 19,
	},
})
