/* eslint-disable react/prop-types */

function AddArticle({
	title,
	summary,
	onChangeTitle,
	onChangeSummary,
	onClickAdd,
}) {
	return (
		<section>
			<input placeholder="Title" value={title} onChange={onChangeTitle} />
			<input
				placeholder="Summary"
				value={summary}
				onChange={onChangeSummary}
			/>
			<button onClick={onClickAdd}>Add</button>
		</section>
	)
}

export default AddArticle
