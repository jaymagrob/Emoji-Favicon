import React from 'react'
import axios from 'axios'
import Helmet from 'react-helmet'
import Emoji from './Emoji'

class Main extends React.Component {
  state = {
    data: [],
    favicon: '',
    title: 'Emoji Favicons: Pick an emoji'
  }

  async componentDidMount() {
      try {
        let res = await axios.get('https://emoji-api.com/categories/travel-places?access_key=5e5972b95944d2d54c5f6ed9aa6c4554ed12421a')
        this.setState({data: res.data})
      } catch (err) {
        console.log(err)
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
      <Helmet><link rel="icon" href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${this.state.favicon}</text></svg>`}></link></Helmet>
      <Helmet><title>{this.state.title}</title></Helmet>
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

      { this.state.favicon &&
      <>
        <pre>
          <xmp>{`<meta charset="UTF-8">
      <link rel="icon" href=data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${this.state.favicon}</text></svg>></link>`}</xmp>
        </pre>
        <button onClick={(e) => this.handleCopy(e)}>Copy</button>
      </>
        }
      </main>
    )
  }
}

export default Main