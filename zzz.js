import axios from "axios";
const name = null
const description = null
const category = null
const selected = null
const zz = await axios.get(`http://localhost:3001/secondaryGeneralMissions/1`)
   .then(async (res) => {
      const missionToUpdate = res.data

      missionToUpdate.name = name != null ? name : missionToUpdate.name
      missionToUpdate.description = description != null ? description : missionToUpdate.description
      missionToUpdate.category = category != null ? category : missionToUpdate.category
      missionToUpdate.selected = true

      await axios.put(`http://localhost:3001/secondaryGeneralMissions/1`, missionToUpdate)
         .then(res => res.data)

      return missionToUpdate
   })

console.log(zz)