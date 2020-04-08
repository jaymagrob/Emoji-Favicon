import React from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Emoji from './Emoji'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/hljs';



class Main extends React.Component {
  state = {
    data: [],
    favicon: '',
    title: 'Emoji Favicons: Pick an emoji'
  }
  async componentDidMount() {
    console.log(this.props.test)
    try {
      let res = await axios.get(this.props.test)
      this.setState({data: res.data, favicon: ''})
    } catch (err) {
      console.log(err)
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.test !== this.props.test) {
        try {
          let res = await axios.get(this.props.test)
          this.setState({data: res.data, favicon: ''})
        } catch (err) {
          console.log(err)
        }
      }
    }


  clicktest = (data) => {
    const title = data.unicodeName.split(' ').map(i => i.charAt().toUpperCase() + i.slice(1).toLowerCase()).join(' ')
    this.setState({favicon: data.character, title})
    
  }

  handleCopy(e) {
    const b = `<meta charset="UTF-8">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${this.state.favicon}</text></svg>">`
    navigator.clipboard.writeText(b)
  }


  render() {
    return (
      <main>
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