import React, { useCallback, useRef, useState } from 'react'
import {
	Pressable,
	ScrollView,
	StyleSheet,
	View,
	useWindowDimensions,
	type GestureResponderEvent,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
	DRAGGABLE_MODAL_INITIAL_HEIGHT,
	DRAGGABLE_MODAL_MIN_WIDTH,
	DRAGGABLE_MODAL_VIEWPORT_MARGIN,
	DraggableModal,
	clampToRange,
	type DraggableModalColors,
} from '@/components/draggable-modal'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'

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

const SERVICES_COLORS = {
	background: '#3A3B3A',
	border: 'rgba(100, 96, 91, 0.52)',
	closeDimmed: '#A5A19C',
	dimmedText: '#C4BFB8',
	foreground: '#E8E4DE',
	modalBackground: '#555755',
	resizeGrip: '#77736E',
	rowHoverBackground: 'rgba(255, 255, 255, 0.04)',
	shadow: '#000000',
	tooltipBackground: 'rgba(20, 22, 22, 0.96)',
}

const DRAGGABLE_MODAL_COLORS: DraggableModalColors = {
	background: SERVICES_COLORS.modalBackground,
	border: SERVICES_COLORS.border,
	closeDimmed: SERVICES_COLORS.closeDimmed,
	foreground: SERVICES_COLORS.foreground,
	resizeGrip: SERVICES_COLORS.resizeGrip,
	shadow: SERVICES_COLORS.shadow,
	tooltipBackground: SERVICES_COLORS.tooltipBackground,
}

export default function ServicesScreen() {
	const { height, width } = useWindowDimensions()
	const [hoveredServiceId, setHoveredServiceId] = useState<string | null>(null)
	const [openModals, setOpenModals] = useState<OpenServiceModal[]>([])
	const nextZIndex = useRef(1)

	const borderColor = SERVICES_COLORS.border
	const secondaryText = SERVICES_COLORS.dimmedText

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
					Math.max(DRAGGABLE_MODAL_MIN_WIDTH, width * 0.86),
				)
				const pointerOffset = 10
				const x = clampToRange(
					event.nativeEvent.pageX + pointerOffset,
					DRAGGABLE_MODAL_VIEWPORT_MARGIN,
					width - modalWidth - DRAGGABLE_MODAL_VIEWPORT_MARGIN,
				)
				const y = clampToRange(
					event.nativeEvent.pageY + pointerOffset,
					DRAGGABLE_MODAL_VIEWPORT_MARGIN,
					height -
						DRAGGABLE_MODAL_INITIAL_HEIGHT -
						DRAGGABLE_MODAL_VIEWPORT_MARGIN,
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
						<ThemedText
							type="title"
							style={{ color: SERVICES_COLORS.foreground }}
						>
							Services
						</ThemedText>
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
								style={[
									styles.headerCell,
									styles.nameCell,
									{ color: secondaryText },
								]}
							>
								name
							</ThemedText>
							<ThemedText
								style={[
									styles.headerCell,
									styles.descriptionCell,
									{ color: secondaryText },
								]}
							>
								description
							</ThemedText>
						</View>

						<ScrollView>
							{SERVICES.map((service) => (
								<Pressable
									key={service.id}
									accessibilityRole="button"
									accessibilityLabel={`Open details for ${service.name}`}
									onHoverIn={() =>
										setHoveredServiceId(service.id)
									}
									onHoverOut={() =>
										setHoveredServiceId((current) =>
											current === service.id
												? null
												: current,
										)
									}
									onPress={(event) =>
										openService(service, event)
									}
									style={({ pressed }) => [
										styles.row,
										styles.serviceRow,
										{ borderBottomColor: borderColor },
										hoveredServiceId === service.id &&
											styles.hoveredRow,
										pressed && styles.pressedRow,
									]}
								>
									<ThemedText
										style={[
											styles.nameCell,
											styles.serviceName,
											{
												color: SERVICES_COLORS.foreground,
											},
										]}
									>
										{service.name}
									</ThemedText>
									<ThemedText
										style={[
											styles.descriptionCell,
											{
												color: SERVICES_COLORS.foreground,
											},
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
						<DraggableModal
							key={modal.key}
							colors={DRAGGABLE_MODAL_COLORS}
							id={modal.key}
							initialPosition={modal.initialPosition}
							onActivate={bringToFront}
							onClose={closeModal}
							title={modal.service.name}
							zIndex={modal.zIndex}
						>
							{({ dragHandleStyle, dragHandlers }) => (
								<>
									<View
										{...dragHandlers}
										style={[
											styles.modalContentDragZone,
											dragHandleStyle,
										]}
									/>
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
										<ThemedText
											selectable
											style={[
												styles.detailValue,
												{
													color: SERVICES_COLORS.foreground,
												},
											]}
										>
											{modal.service.id}
										</ThemedText>
									</View>
									<View
										{...dragHandlers}
										style={[
											styles.modalContentDragZone,
											styles.modalContentGap,
											dragHandleStyle,
										]}
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
										<ThemedText
											selectable
											style={[
												styles.detailValue,
												{
													color: SERVICES_COLORS.foreground,
												},
											]}
										>
											{modal.service.description}
										</ThemedText>
									</View>
									<View
										{...dragHandlers}
										style={[
											styles.modalContentDragZone,
											styles.modalContentBottomDragZone,
											dragHandleStyle,
										]}
									/>
								</>
							)}
						</DraggableModal>
					))}
				</View>
			</SafeAreaView>
		</ThemedView>
	)
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: SERVICES_COLORS.background,
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
		paddingVertical: 10,
	},
	hoveredRow: {
		backgroundColor: SERVICES_COLORS.rowHoverBackground,
	},
	pressedRow: {
		opacity: 0.72,
	},
	headerCell: {
		fontSize: 13,
		fontWeight: '700',
		letterSpacing: 0,
		// textTransform: 'uppercase',
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
})
