import { ApolloServer, gql } from "apollo-server"
import axios from "axios"

const typeDefs = gql`
   type MainMissions {
      id: Int!,
      name: String!,
      number: Int!,
      description: String
   }

   type SecondaryMissions {
      id: Int!,
      name: String!,
      description: String,
      category: String!,
      selected: Boolean!,
      faction: Int!
   }

   type Factions {
      id: Int!,
      name: String!,
   }

   type MainMission {
      id: Int!,
      points: Int!,
   }

   type EnemyInfo {
      id: Int!,
      secondaryMission_1: Int!,
      secondaryMission_2: Int!,
      secondaryMission_3: Int!,
      mainMission: Int!,
      faction: Int!,
      name: String,
      commandPoints: Int!,
      enemy: Boolean!
   }

   type AllyInfo {
      id: Int!,
      secondaryMission_1: Int!,
      secondaryMission_2: Int!,
      secondaryMission_3: Int!,
      mainMission: Int!,
      faction: Int!,
      name: String,
      commandPoints: Int!,
      enemy: Boolean!
   }



   type Query {
      mainMissions_getAll: [MainMissions]
      mainMissions_findByNumber(number: Int!): MainMissions

      secondaryMissions_getAll: [SecondaryMissions]

      factions_getAll: [Factions]

      enemyInfo_getAll: [EnemyInfo]

      allyInfo_getAll: [AllyInfo]
   }


   
   type Mutation {
      mainMissions_create(
         name: String!,
         number: Int!,
         description: String!
      ): MainMissions

      secondaryMissions_create(
         name: String!,
         description: String!,
         category: String!,
         selected: Boolean!,
         faction: Int!
      ): SecondaryMissions

      secondaryMissions_update(
         id: Int!,
         name: String,
         description: String,
         category: String,
         selected: Boolean,
         faction: Int
      ): SecondaryMissions

      enemyInfo_update(
         id: Int!,
         secondaryMission_1: Int,
         secondaryMission_2: Int,
         secondaryMission_3: Int,
         mainMission: Int,
         faction: Int,
         name: String,
         commandPoints: Int,
         enemy: Boolean
      ): EnemyInfo

      allyInfo_update(
         id: Int!,
         secondaryMission_1: Int,
         secondaryMission_2: Int,
         secondaryMission_3: Int,
         mainMission: Int,
         faction: Int,
         name: String,
         commandPoints: Int,
         enemy: Boolean
      ): EnemyInfo
   }

`

const resolvers = {
   Query: {
      // mainMissions
      mainMissions_getAll: async () => {
         const { data: mainMissions } = await axios.get("http://localhost:3001/mainMissions")

         return mainMissions
      },
      mainMissions_findByNumber: async (root, args) => {
         const { number } = args
         const { data: mainMissions } = await axios.get("http://localhost:3001/mainMissions")
         const mainMissionsByNumber = mainMissions.filter(mission => mission.number === number)[0]

         return mainMissionsByNumber
      },
      // secondaryMissions
      secondaryMissions_getAll: async () => {
         const { data: secondaryMissions } = await axios.get("http://localhost:3001/secondaryMissions")

         return secondaryMissions
      },
      factions_getAll: async () => {
         const { data: factions } = await axios.get("http://localhost:3001/factions")

         return factions
      },
      enemyInfo_getAll: async () => {
         const { data: enemyInfo } = await axios.get("http://localhost:3001/enemyInfo")

         return enemyInfo
      },
      allyInfo_getAll: async () => {
         const { data: allyInfo } = await axios.get("http://localhost:3001/allyInfo")

         return allyInfo
      }
   },
   Mutation: {
      mainMissions_create: async (root, args) => {
         const { name, number, description } = args
         const newMission = { id: 666, name, number, description }
         await axios.post("http://localhost:3001/mainMissions", newMission)

         return newMission
      },
      // secondaryMissions
      secondaryMissions_update: async (root, args) => {
         const { id, name, description, category, selected, faction } = args
         return await axios.get(`http://localhost:3001/secondaryMissions/${id}`)
            .then(async (res) => {
               const missionToUpdate = res.data

               missionToUpdate.name = name ? name : missionToUpdate.name
               missionToUpdate.description = description ? description : missionToUpdate.description
               missionToUpdate.category = category ? category : missionToUpdate.category
               missionToUpdate.selected = selected ? selected : missionToUpdate.selected
               missionToUpdate.faction = faction ? faction : missionToUpdate.faction

               await axios.put(`http://localhost:3001/secondaryMissions/${id}`, missionToUpdate)
                  .then(res => res.data)

               return missionToUpdate
            })
      },
      // enemyInfo
      enemyInfo_update: async (root, args) => {
         const { id, secondaryMission_1, secondaryMission_2, secondaryMission_3, mainMission, faction, name, commandPoints, enemy } = args
         return await axios.get(`http://localhost:3001/enemyInfo/${id}`)
            .then(async (res) => {
               const enemyToUpdate = res.data

               enemyToUpdate.secondaryMission_1 = secondaryMission_1 ? secondaryMission_1 : enemyToUpdate.secondaryMission_1
               enemyToUpdate.secondaryMission_2 = secondaryMission_2 ? secondaryMission_2 : enemyToUpdate.secondaryMission_2
               enemyToUpdate.secondaryMission_3 = secondaryMission_3 ? secondaryMission_3 : enemyToUpdate.secondaryMission_3
               enemyToUpdate.MainMission = mainMission ? mainMission : enemyToUpdate.mainMission
               enemyToUpdate.faction = faction ? faction : enemyToUpdate.faction
               enemyToUpdate.name = name ? name : enemyToUpdate.name
               enemyToUpdate.commandPoints = commandPoints ? commandPoints : enemyToUpdate.commandPoints

               await axios.put(`http://localhost:3001/enemyInfo/${id}`, enemyToUpdate)
                  .then(res => res.data)

               return enemyToUpdate
            })
      },
      // allyInfo
      allyInfo_update: async (root, args) => {
         const { id, secondaryMission_1, secondaryMission_2, secondaryMission_3, mainMission, faction, name, commandPoints, enemy } = args

         return await axios.get(`http://localhost:3001/allyInfo/${id}`)
            .then(async (res) => {
               const allyToUpdate = res.data

               allyToUpdate.secondaryMission_1 = secondaryMission_1 ? secondaryMission_1 : allyToUpdate.secondaryMission_1
               allyToUpdate.secondaryMission_2 = secondaryMission_2 ? secondaryMission_2 : allyToUpdate.secondaryMission_2
               allyToUpdate.secondaryMission_3 = secondaryMission_3 ? secondaryMission_3 : allyToUpdate.secondaryMission_3
               allyToUpdate.mainMission = mainMission ? mainMission : allyToUpdate.mainMission
               allyToUpdate.faction = faction ? faction : allyToUpdate.faction
               allyToUpdate.name = name ? name : allyToUpdate.name
               allyToUpdate.commandPoints = commandPoints ? commandPoints : allyToUpdate.commandPoints

               await axios.put(`http://localhost:3001/allyInfo/${id}`, allyToUpdate)
                  .then(res => res.data)

               return allyToUpdate
            })
      }
   }
}

const server = new ApolloServer({
   typeDefs,
   resolvers
})

// init server
server.listen().then(({ url }) => {
   console.log(`Server ready at ${url}`)
})

