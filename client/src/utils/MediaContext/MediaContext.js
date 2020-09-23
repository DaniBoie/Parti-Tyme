import {createContext} from 'react'
import axios from 'axios'

const MediaContext = createContext({
  search: '',
  media: [],
  handleInputChange: () => { },

  handleSearchOMDB: () => { },

  handleSaveMedia: () => { },

  renderBusinessCard: () => { }
})

export default MediaContext