import './style.css'

export const PostCard = ({cover, title, body}) =>(
    <div className="post">
        <img src={/*props.*/cover} alt={/*props*/title} />
        <div className='post-content'>
            <h1>{/*props*/title}</h1>
            <p>{/*props*/body}</p>
        </div>
    </div>
)
