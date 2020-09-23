import {createContext} from 'react'
import axios from 'axios'

const MediaContext = createContext({
  search: '',
  media: [],
  handleInputChange: () => { },

  handleSearchOMDB: () => { },

  handleSaveMedia: () => { },

  renderBusinessCard: () => {
    axios.get('/api/business')
      .then(({data}) => data.map(media => ({
        name: media.name,
        bio: media.bio,
        instagram: media.bio,
        website: media.website,
        facebook: media.facebook,
        business_type: media.business_type
      }))
      
      
      
      )
      .catch(err => console.log(err))
  }
})

export default MediaContext