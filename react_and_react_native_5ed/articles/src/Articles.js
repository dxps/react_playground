import React from "react";

const id = (function* () {
    let i = 1;
    while (true) {
        yield i;
        i += 1;
    }
})();

function Articles() {

    const [articles, setArticles] = React.useState([
        {
            id: id.next(),
            title: "Article 1",
            summary: "Article 1 Summary",
            display: "none",
        },
        {
            id: id.next(),
            title: "Article 2",
            summary: "Article 2 Summary",
            display: "none",
        },
    ]);

    const [title, setTitle] = React.useState("");
    const [summary, setSummary] = React.useState("");

    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeSummary = (e) => setSummary(e.target.value);

    const onClickToggle = (id) => {
        const newArticles = articles.map((i) => {
            if (i.id === id) {
                return {
                    ...i,
                    display: i.display === "none" ? "block" : "none",
                };
            }
            return i;
        });
        setArticles(newArticles);
    };

    const onClickAdd = () => {
        setArticles([
            ...articles,
            {
                id: id.next(),
                title,
                summary,
                display: "none",
            },
        ]);
        setTitle("");
        setSummary("");
    };

    const onClickRemove = (id) => {
        const newArticles = articles.filter((i) => i.id !== id);
        setArticles(newArticles);
    };

    return (
        <section>
            <header>
                <h1>Articles</h1>
                <input placeholder="Title" value={title} onChange={onChangeTitle} />
                <input placeholder="Summary" value={summary} onChange={onChangeSummary} />
                <button onClick={onClickAdd}>Add</button>
            </header>
            <article>
                <ul>
                    {articles.map((i) => (
                        <li key={i.id.value}>
                            <a
                                href={`#${i.id}`}
                                title="Toggle Summary"
                                onClick={() => onClickToggle(i.id)}
                            >
                                {i.title}
                            </a>
                            &nbsp;
                            <button
                                href={`#${i.id}`}
                                title="Remove"
                                onClick={() => onClickRemove(i.id)}
                            >
                                &#10007;
                            </button>
                            <p style={{ display: i.display }}>{i.summary}</p>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
    );
}

export default Articles;