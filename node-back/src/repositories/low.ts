import lodash from 'lodash'
import { JSONFile, Low } from 'lowdb/lib';

type Post = {
    id: number;
    title: string;
    text:string;
  }
  
  type Data = {
    posts: Post[]
  }

class LowWithLodash<T> extends Low<T> {
    chain: lodash.ExpChain<this['data']> = lodash.chain(this).get('data')
  }
  
  const adapter = new JSONFile<Data>('db.json');
  const db = new LowWithLodash(adapter);
  await db.read();
  
  // Instead of db.data use db.chain to access lodash API
  const post = db.chain
    .get('posts')
    .find({ id: 1 })
    .value() // Important: value() must be called to execute chain