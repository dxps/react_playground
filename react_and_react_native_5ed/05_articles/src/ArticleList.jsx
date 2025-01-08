import ArticleItem from './ArticleItem'

/* eslint-disable react/prop-types */
function ArticleList({ articles, onClickToggle, onClickRemove }) {
	return (
		<ul>
			{articles.map((i) => (
				<ArticleItem
					key={i.id}
					article={i}
					onClickToggle={onClickToggle}
					onClickRemove={onClickRemove}
				/>
			))}
		</ul>
	)
}

export default ArticleList
