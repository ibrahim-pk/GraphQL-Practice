const { graphql,GraphQLSchema,GraphQLObjectType,GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLEnumType
} =require('graphql');
const { users } =require('../data');

// GenderEnumType
const GenderEnumType = new GraphQLEnumType({
    name: "GenderEnumType",
    description: "Enum type for gander",
    values: {
      male: {
        value: "male",
      },
      female: {
        value: "female",
      },
    },
  });



// User Type
const UserType = new GraphQLObjectType({
    name: "User",
    description: "It represents a single user!",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      firstName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastName: {
        type: new GraphQLNonNull(GraphQLString),
      },
      gander: {
        type: GenderEnumType,
      },
      phone: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: GraphQLString,
      },
    }),
  });
  
const mySchema=new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'query',
        description:'root query',
        fields:()=>({
             users:{
                type:new GraphQLList(new GraphQLNonNull(UserType)),
                resolve() {
                    return users;
                  },
                
             },
             user:{
                type:UserType,
                args:{
                    id:{
                        type:GraphQLID
                    }
                },
                resolve(_,{id}){
                    const userInfo=users.find((res)=>res.id==id)
                    return userInfo
                }
             }
        })
    })
})


module.exports={mySchema}