/* eslint-disable react/prop-types */
import { useState } from 'react'

function ArticleItem({ article, onClickRemove }) {
	const [isOpen, setIsOpen] = useState(article.display !== 'none')

	const onClickToggle = () => setIsOpen(!isOpen)

	return (
		<li key={article.id}>
			<a
				href={`#${article.id}`}
				title="Toggle Summary"
				onClick={() => onClickToggle()}
			>
				{article.title}
			</a>
			&nbsp;
			<button
				href={`#${article.id}`}
				title="Remove"
				onClick={() => onClickRemove(article.id)}
			>
				&#10007;
			</button>
			<p
				className="summary"
				style={{ display: isOpen ? 'block' : 'none' }}
			>
				{article.summary}
			</p>
		</li>
	)
}

export default ArticleItem
