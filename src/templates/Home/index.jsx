import './styles.css';

import { Component, React } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/InputSearch';

class Home extends Component{
 state = {
  posts: [],
  allPosts: [],
  page:0,
  postPerPage:2,
  searchValue:''
 }

  //montando o component
  async componentDidMount() {
    await this.loadPosts();
    // const { page, postPerPage } = this.state;
    // const postAndPhotos = await loadPosts()
    // this.setState({
    //   posts: postAndPhotos.slice(page,postPerPage), 
    //   allPosts: postAndPhotos
    // })
  }

  //pode se fazer dessas duas formas
  loadPosts = async () => {
    const { page, postPerPage } = this.state;
    const postAndPhotos = await loadPosts()
    this.setState({
      posts: postAndPhotos.slice(page,postPerPage), 
      allPosts: postAndPhotos
    })
  }

  loadMorePosts = () => {
    // console.log('Load more posts chamado')
    const{
      page,
      postPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
    posts.push(...nextPosts);

    this.setState({posts,page:nextPage})
  }

  handleChange = (e) =>{
    const { value } = e.target;
    this.setState({ searchValue : value})
  }

  render(){

    const { posts, page, postPerPage, allPosts, searchValue } = this.state
    const noMorePost = page + postPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    }) 
    : 
    posts

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
            <>
              <h1>Search value: {searchValue} </h1>
            </>
          )}
          <TextInput
            handleChange = {this.handleChange}
            searchValue = {searchValue}
          />
        </div>
        
        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}

        <div className="button-container">
        {!searchValue && (
          <Button
            text='Load More Posts'
            onClick={this.loadMorePosts}
            disabled={noMorePost}
          />
        )}
        </div>
      </section>
    )
  }
}


// function App() {
//   return ();
// }

export default Home;
