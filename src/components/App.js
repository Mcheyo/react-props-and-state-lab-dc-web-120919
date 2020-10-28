import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  // constructor() {
  //   super()

  //   this.state = {
  //     pets: [],
  //     filters: {
  //       type: 'all'
  //     }
  //   }
  // }
  state = { 
    pets: [], 
    filters: {
         type: 'all'
           }

  }

onChangeType = (event) => { 
  
  this.setState({ 
    filters : {type:event}
  })
}

onFindPetsClick = () => { 
let url = `/api/pets`
if(this.state.filters.type == 'all'){ 
  fetch(url)
  .then(res => res.json())
  .then(petArray => this.setState({ 
    pets: petArray
  }))
}
else{ 
  fetch(url + `?type=${this.state.filters.type}`)
  .then(res => res.json())
  .then(petArray => this.setState({ 
    pets: petArray
  }))
}
}

onAdoptPet = (id) => { 
 
  // let petState = [...this.state.pets]
  // let petToFind = petState.find(pet => pet.id == id)
  // petToFind.isAdopted = true 
  // this.setState({
  //   pets: petState
  // })
  let newPetArray = [...this.state.pets.map(pet => { 
    if(pet.id == id){ 
      return {...pet,isAdopted : true }
    }
    return pet 
  })]
  this.setState({ 
    pets: newPetArray
  })


}
  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} pets = {this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
