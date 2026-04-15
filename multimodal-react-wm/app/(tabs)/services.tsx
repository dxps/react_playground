import React, { useCallback, useRef, useState } from 'react'
import {
	Animated,
	PanResponder,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
	type GestureResponderEvent,
	type PanResponderGestureState,
	type ViewStyle,
} from 'react-native'

import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'

type Service = {
	id: string
	name: string
	description: string
}

type OpenServiceModal = {
	key: string
	service: Service
	initialPosition: {
		x: number
		y: number
	}
	zIndex: number
}

const SERVICES: Service[] = [
	{
		id: 'svc-001',
		name: 'Discovery Workshop',
		description:
			'A short engagement for mapping goals, constraints, and first delivery steps.',
	},
	{
		id: 'svc-002',
		name: 'Product Design',
		description:
			'UX flows, interface concepts, and interaction details for web and mobile apps.',
	},
	{
		id: 'svc-003',
		name: 'Frontend Build',
		description:
			'Production React interfaces with responsive layouts and accessible components.',
	},
	{
		id: 'svc-004',
		name: 'API Integration',
		description:
			'Connecting screens to services, authentication, validation, and error states.',
	},
	{
		id: 'svc-005',
		name: 'Quality Review',
		description:
			'A focused pass over behavior, edge cases, performance, and release readiness.',
	},
]

const grabCursorStyle = Platform.select({
	web: { cursor: 'grab' } as unknown as ViewStyle,
})

const resizeCursorStyle = Platform.select({
	web: { cursor: 'nwse-resize' } as unknown as ViewStyle,
})

const preventSelectionStyle = Platform.select({
	web: { userSelect: 'none' } as unknown as ViewStyle,
})

const MIN_MODAL_WIDTH = 280
const MIN_MODAL_HEIGHT = 180
const INITIAL_MODAL_HEIGHT = 220
const VIEWPORT_MARGIN = 16

function clamp(value: number, min: number, max: number) {
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

export default function ServicesScreen() {
	const colorScheme = useColorScheme() ?? 'light'
	const colors = Colors[colorScheme]
	const { height, width } = useWindowDimensions()
	const [openModals, setOpenModals] = useState<OpenServiceModal[]>([])
	const nextZIndex = useRef(1)

	const borderColor =
		colorScheme === 'dark'
			? 'rgba(255,255,255,0.14)'
			: 'rgba(17,24,28,0.12)'
	const secondaryText = colorScheme === 'dark' ? '#AEB6BC' : '#5D6870'
	const dimmedText = colorScheme === 'dark' ? '#6F777D' : '#9AA3AA'

	const bringToFront = useCallback((key: string) => {
		nextZIndex.current += 1
		setOpenModals((current) =>
			current.map((modal) =>
				modal.key === key
					? { ...modal, zIndex: nextZIndex.current }
					: modal,
			),
		)
	}, [])

	const closeModal = useCallback((key: string) => {
		setOpenModals((current) => current.filter((modal) => modal.key !== key))
	}, [])

	const openService = useCallback(
		(service: Service, event: GestureResponderEvent) => {
			nextZIndex.current += 1
			setOpenModals((current) => {
				const existing = current.find(
					(modal) => modal.service.id === service.id,
				)

				if (existing) {
					return current.map((modal) =>
						modal.key === existing.key
							? { ...modal, zIndex: nextZIndex.current }
							: modal,
					)
				}

				const modalWidth = Math.min(
					360,
					Math.max(MIN_MODAL_WIDTH, width * 0.86),
				)
				const pointerOffset = 10
				const x = clamp(
					event.nativeEvent.pageX + pointerOffset,
					VIEWPORT_MARGIN,
					width - modalWidth - VIEWPORT_MARGIN,
				)
				const y = clamp(
					event.nativeEvent.pageY + pointerOffset,
					VIEWPORT_MARGIN,
					height - INITIAL_MODAL_HEIGHT - VIEWPORT_MARGIN,
				)

				return [
					...current,
					{
						key: `${service.id}-${Date.now()}`,
						service,
						initialPosition: { x, y },
						zIndex: nextZIndex.current,
					},
				]
			})
		},
		[height, width],
	)

	return (
		<ThemedView style={styles.screen}>
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.content}>
					<View style={styles.heading}>
						<ThemedText type="title">Services</ThemedText>
						<ThemedText
							style={[styles.intro, { color: secondaryText }]}
						>
							Choose any service to keep its details open while
							you inspect another.
						</ThemedText>
					</View>

					<View style={styles.table} accessibilityRole="list">
						<View
							style={[
								styles.row,
								styles.headerRow,
								{ borderBottomColor: borderColor },
							]}
						>
							<ThemedText
								style={[styles.headerCell, styles.nameCell]}
							>
								Name
							</ThemedText>
							<ThemedText
								style={[
									styles.headerCell,
									styles.descriptionCell,
								]}
							>
								Description
							</ThemedText>
						</View>

							<ScrollView>
								{SERVICES.map((service) => (
								<Pressable
									key={service.id}
									accessibilityRole="button"
									accessibilityLabel={`Open details for ${service.name}`}
										onPress={(event) =>
											openService(service, event)
										}
									style={({ pressed }) => [
										styles.row,
										styles.serviceRow,
										{ borderBottomColor: borderColor },
										pressed && styles.pressedRow,
									]}
								>
									<ThemedText
										style={[
											styles.nameCell,
											styles.serviceName,
										]}
									>
										{service.name}
									</ThemedText>
									<ThemedText
										style={[
											styles.descriptionCell,
											{ color: secondaryText },
										]}
									>
										{service.description}
									</ThemedText>
								</Pressable>
							))}
						</ScrollView>
					</View>
				</View>

				<View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
					{openModals.map((modal) => (
						<DraggableServiceModal
							key={modal.key}
							modal={modal}
							colors={colors}
							borderColor={borderColor}
							dimmedText={dimmedText}
							secondaryText={secondaryText}
							onActivate={bringToFront}
							onClose={closeModal}
						/>
					))}
				</View>
			</SafeAreaView>
		</ThemedView>
	)
}

function DraggableServiceModal({
	modal,
	colors,
	borderColor,
	dimmedText,
	secondaryText,
	onActivate,
	onClose,
}: {
	modal: OpenServiceModal
	colors: (typeof Colors)['light']
	borderColor: string
	dimmedText: string
	secondaryText: string
	onActivate: (key: string) => void
	onClose: (key: string) => void
}) {
	const { height: viewportHeight, width: viewportWidth } = useWindowDimensions()
	const pan = useRef(new Animated.ValueXY(modal.initialPosition)).current
	const lastPosition = useRef(modal.initialPosition)
	const initialSize = useRef({
		height: INITIAL_MODAL_HEIGHT,
		width: Math.min(360, Math.max(MIN_MODAL_WIDTH, viewportWidth * 0.86)),
	}).current
	const [size, setSize] = useState(initialSize)
	const [isInteracting, setIsInteracting] = useState(false)
	const [isCloseHovered, setIsCloseHovered] = useState(false)
	const sizeRef = useRef(initialSize)
	const resizeStartSize = useRef(initialSize)
	const shouldStartDrag = (
		_event: GestureResponderEvent,
		gesture: PanResponderGestureState,
	) =>
		!hasActiveTextSelection() &&
		Math.abs(gesture.dx) + Math.abs(gesture.dy) > 2

	const updateSize = useCallback((nextSize: typeof initialSize) => {
		sizeRef.current = nextSize
		setSize(nextSize)
	}, [])

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => {
				onActivate(modal.key)
				return false
			},
			onStartShouldSetPanResponderCapture: () => false,
			onMoveShouldSetPanResponder: shouldStartDrag,
			onMoveShouldSetPanResponderCapture: shouldStartDrag,
			onPanResponderTerminationRequest: () => false,
			onPanResponderGrant: () => {
				onActivate(modal.key)
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
				onActivate(modal.key)
				clearActiveTextSelection()
				setIsInteracting(true)
				resizeStartSize.current = sizeRef.current
			},
			onPanResponderMove: (
				_event: GestureResponderEvent,
				gesture: PanResponderGestureState,
			) => {
				const maxWidth = Math.max(
					MIN_MODAL_WIDTH,
					viewportWidth - lastPosition.current.x - VIEWPORT_MARGIN,
				)
				const maxHeight = Math.max(
					MIN_MODAL_HEIGHT,
					viewportHeight - lastPosition.current.y - VIEWPORT_MARGIN,
				)

				updateSize({
					height: clamp(
						resizeStartSize.current.height + gesture.dy,
						MIN_MODAL_HEIGHT,
						maxHeight,
					),
					width: clamp(
						resizeStartSize.current.width + gesture.dx,
						MIN_MODAL_WIDTH,
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

	return (
		<Animated.View
			pointerEvents="box-none"
			style={[
				styles.modal,
				{
					backgroundColor: colors.background,
					borderColor,
					shadowColor: colors.text,
					height: size.height,
					transform: pan.getTranslateTransform(),
					width: size.width,
					zIndex: modal.zIndex,
				},
			]}
		>
			<View
				style={[
					styles.modalBody,
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
							style={styles.modalTitle}
						>
							{modal.service.name}
						</ThemedText>
					</View>
					<Pressable
						accessibilityRole="button"
						accessibilityLabel={`Close ${modal.service.name} details`}
						hitSlop={10}
						onHoverIn={() => setIsCloseHovered(true)}
						onHoverOut={() => setIsCloseHovered(false)}
						onPress={() => onClose(modal.key)}
						style={styles.closeButton}
					>
						<ThemedText
							style={[
								styles.closeButtonText,
								{
									color: isCloseHovered
										? colors.text
										: dimmedText,
								},
							]}
						>
							x
						</ThemedText>
						{isCloseHovered ? (
							<View pointerEvents="none" style={styles.closeTooltip}>
								<ThemedText style={styles.closeTooltipText}>
									Close
								</ThemedText>
							</View>
						) : null}
					</Pressable>
				</View>

				<View style={styles.modalContent}>
					<View {...panResponder.panHandlers} style={[styles.modalContentDragZone, grabCursorStyle]} />
					<View style={styles.detailGroup}>
						<ThemedText
							selectable
							style={[
								styles.detailLabel,
								{ color: secondaryText },
							]}
						>
							ID
						</ThemedText>
						<ThemedText selectable style={styles.detailValue}>
							{modal.service.id}
						</ThemedText>
					</View>
					<View
						{...panResponder.panHandlers}
						style={[styles.modalContentDragZone, styles.modalContentGap, grabCursorStyle]}
					/>
					<View style={styles.detailGroup}>
						<ThemedText
							selectable
							style={[
								styles.detailLabel,
								{ color: secondaryText },
							]}
						>
							Description
						</ThemedText>
						<ThemedText selectable style={styles.detailValue}>
							{modal.service.description}
						</ThemedText>
					</View>
					<View
						{...panResponder.panHandlers}
						style={[
							styles.modalContentDragZone,
							styles.modalContentBottomDragZone,
							grabCursorStyle,
						]}
					/>
				</View>
				<View
					{...resizeResponder.panHandlers}
					accessibilityLabel={`Resize ${modal.service.name} details`}
					accessibilityRole="adjustable"
					style={[styles.resizeHandle, resizeCursorStyle]}
				>
					<View style={styles.resizeHandleMark}>
						<View style={[styles.resizeHandleLine, styles.resizeHandleLineOuter]} />
						<View style={[styles.resizeHandleLine, styles.resizeHandleLineMiddle]} />
						<View style={[styles.resizeHandleLine, styles.resizeHandleLineInner]} />
					</View>
				</View>
			</View>
		</Animated.View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	safeArea: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 28,
	},
	heading: {
		gap: 10,
		marginBottom: 24,
	},
	intro: {
		maxWidth: 640,
	},
	table: {
		flex: 1,
	},
	row: {
		flexDirection: 'row',
		gap: 18,
	},
	headerRow: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		paddingBottom: 12,
	},
	serviceRow: {
		alignItems: 'flex-start',
		borderBottomWidth: StyleSheet.hairlineWidth,
		minHeight: 76,
		paddingVertical: 16,
	},
	pressedRow: {
		opacity: 0.72,
	},
	headerCell: {
		fontSize: 13,
		fontWeight: '700',
		letterSpacing: 0,
		textTransform: 'uppercase',
	},
	nameCell: {
		flexBasis: 170,
		flexGrow: 0,
		flexShrink: 0,
	},
	descriptionCell: {
		flex: 1,
	},
	serviceName: {
		fontWeight: '700',
	},
	modal: {
		borderRadius: 8,
		borderWidth: StyleSheet.hairlineWidth,
		elevation: 8,
		position: 'absolute',
		shadowOffset: { width: 0, height: 12 },
		shadowOpacity: 0.16,
		shadowRadius: 18,
	},
	modalBody: {
		borderRadius: 8,
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
		borderRadius: 8,
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
		backgroundColor: 'rgba(17, 24, 28, 0.94)',
		borderRadius: 4,
		paddingHorizontal: 8,
		paddingVertical: 4,
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
	modalContentDragZone: {
		minHeight: 12,
	},
	modalContentBottomDragZone: {
		flex: 1,
	},
	modalContentGap: {
		minHeight: 18,
	},
	detailGroup: {
		zIndex: 1,
	},
	detailLabel: {
		fontSize: 12,
		fontWeight: '700',
		letterSpacing: 0,
		marginBottom: 4,
		textTransform: 'uppercase',
	},
	detailValue: {
		lineHeight: 22,
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
		backgroundColor: '#89929A',
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
