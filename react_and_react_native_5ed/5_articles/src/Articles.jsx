import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import React from 'react'
import './Articles.css'

const id = (function* () {
	let i = 1
	while (true) {
		yield i
		i += 1
	}
})()

function Articles() {
	const [articles, setArticles] = React.useState([
		{
			id: id.next().value,
			title: 'Article 1',
			summary: 'A summary of the first article.',
			display: 'none',
		},
		{
			id: id.next().value,
			title: 'Article 2',
			summary: 'The summary of the second article.',
			display: 'none',
		},
	])

	console.debug(articles)

	const [title, setTitle] = React.useState('')
	const [summary, setSummary] = React.useState('')

	const onChangeTitle = (e) => setTitle(e.target.value)
	const onChangeSummary = (e) => setSummary(e.target.value)

	const onClickToggle = (id) => {
		const articlesUpd = articles.map((i) => {
			if (i.id === id) {
				return {
					...i,
					display: i.display === 'none' ? 'block' : 'none',
				}
			}
			return i
		})
		setArticles(articlesUpd)
	}

	const onClickAdd = () => {
		setArticles([
			...articles,
			{
				id: id.next(),
				title,
				summary,
				display: 'none',
			},
		])
		setTitle('')
		setSummary('')
	}

	const onClickRemove = (id) => {
		const newArticles = articles.filter((i) => i.id !== id)
		setArticles(newArticles)
	}

	return (
		<section>
			<h1>Articles</h1>
			<AddArticle
				title={title}
				summary={summary}
				onChangeTitle={onChangeTitle}
				onChangeSummary={onChangeSummary}
				onClickAdd={onClickAdd}
			/>
			<ArticleList
				articles={articles}
				onClickToggle={onClickToggle}
				onClickRemove={onClickRemove}
			/>
		</section>
	)
}

export default Articles
