import { createContext } from 'react'
import axios from 'axios'

const MediaContext = createContext({
  search: '',
  business: [],
  handleInputChange: () => { },

  handleCheck: () => { },

  handleSaveMedia: () => { },

  renderBusinessCard: () => { }
})

export default MediaContext