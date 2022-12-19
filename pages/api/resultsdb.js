import {connectToDatabase} from '../../lib';

export default async (req, res) => {
  const {method, body} = req
  const {client, db} = connectToDatabase()

  const userCollection = db.collection('users');
  const historyCollection = db.collection('history')

  if (method ==='POST'){
    const {user, ...data} = body
    const dbUser = await userCollection.findOne(user)
    const save = {...data, user_id: dbUser._id}
    const resp = await historyCollection.insertOne(save)
    res.status(200).json(resp)
  }
  if (method === 'GET'){
    const results = await historyCollection.find({}).toArray()
    res.status(200).json({ message: 'Accepting post request only' })
  }
}
