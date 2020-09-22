import {createContext} from 'react'

const MediaContext = createContext({
  search: '',
  media: [],
  handleInputChange: () => { },
  handleSearchOMDB: () => { },
  handleSaveMedia: () => { },
})

export default MediaContext