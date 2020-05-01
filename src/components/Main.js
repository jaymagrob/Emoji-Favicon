import React from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Emoji from './Emoji'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ErrorCard from './ErrorCard';



class Main extends React.Component {
  state = {
    data: [],
    favicon: '',
    title: 'Emoji Favicons: Pick an emoji',
    category: [],
    startData: [],
    error: 'Loading Emojis. Please wait a few seconds.',
    dropDown: 'all',
    input: '',
    show: 10
  }
  async componentDidMount() {
    try {
      let res = await axios.get(this.props.test)
      const category = Array.from(new Set(res.data.map(i => i.group)))
      this.setState({data: res.data,startData: res.data, favicon: '', category, error: false})
      console.log(res.data)
    } catch (err) {
      this.setState({error: 'Error Loading Emojis. Please come back later.'})
    }
  }


  clicktest = (data) => {
    const title = data.unicodeName.split(' ').map(i => i.charAt().toUpperCase() + i.slice(1).toLowerCase()).join(' ')
    this.setState({favicon: data.character, title})
    window.scrollTo(0, 0)
  
  }

  handleChangeDropdown = (e) => {
    const dropDown = e.target.value
    this.setState({dropDown, input: ''})
    this.filterEmojis('drop', dropDown)
  }

  handleChangeInput = (e) => {
    const input = e.target.value
    this.setState({input, dropDown: 'All'})
    this.filterEmojis('input', input)
  }

  

  filterEmojis = (type, filter) => {
    if(type === 'drop' && filter === "All") return this.setState({data: this.state.startData})
    if(type === 'input'  && !filter) return this.setState({data: this.state.startData})
    const data = this.state.startData.filter(i => {
      if(type==='drop') {
        return i.group === filter
      }
      if(type==='input') {
        const reg = new RegExp(filter,'i')
        return i.unicodeName.match(reg)
      }
    })
    this.setState({data})
  }

  render() {
    return (
      <main>
      <section>
        <h2>Filter</h2>
         <label>Category:
          <select
            value={this.state.dropDown}
            onChange={this.handleChangeDropdown}
          >
            <option value="All">All</option>
            {this.state.category.map(i => (
              <option key={i} value={i}>{i.replace(/-/g," ")}</option>
            ))}
          </select>
          </label>
          <label>Search Name:
            <input 
              value={this.state.input}
              onChange={this.handleChangeInput}
            />
          </label>
            
      </section>

      { this.state.favicon &&
      <>
      <h2>Code: Copy into head of your website</h2>
      <SyntaxHighlighter language="html" style={vs}>
        {`<meta charset="UTF-8">
<link rel="icon" href=data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${this.state.favicon}</text></svg>></link>`} 
      </SyntaxHighlighter>
      
      </>
        }

      <Helmet><link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${this.state.favicon}</text></svg>`}></link></Helmet>
      <Helmet><title>{this.state.title}</title></Helmet>
      <h2>Emojis Selector</h2>
      <ErrorCard
        errorStatus={this.state.error}
      />
      <div className="wrapper-emojis">
      {this.state.data.map(i => (
        <Emoji 
          key={i.slug}
          data = {i}
          clicktest={this.clicktest}
          state={this.state}
        />
      ))
      }
      </div>

      </main>
    )
  }
}

export default Main