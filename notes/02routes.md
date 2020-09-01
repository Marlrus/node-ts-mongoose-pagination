# Routes and Collections

I created a new User schema and Model. I then moved to create the route to POST the user but got an error from TS that req, and res where set as any. I then realized that I was getting no TS support because of how I imported the router. You have to use import syntax: `import express from 'express';` and then `const router = express.Router({ mergeParams: true });` This now gave inferrence to my route. I created a POST route for /user/new that will create our user.

## postman

I will use postman to interact with the API and not have a front end. I had a few blunders but then realized that to get data through I had to send a Body in **x-www-form-urlenconded** which does make it through in the API.

## Typing Mongoose Schema and Model

I created an interface for the User, however I might remove to see if there is TS inferrence from the document. There is no TS inferrence, however typing is not that hard. I created a `UserInterface` that mimics the `userSchema`. Then when we turn that Schema into a Model, we create our User Model which takes a generic `<Properties, QueryHelpers>` By default we need to add `mongoose.Document` which holds all default props and methods for Documents. Then we add the interface which leads to:

```typescript
const User = mongoose.model<UserInterface & mongoose.Document>(
   'User',
   userSchema
);

export default User;
```

## Typing Route

I created the POST route for the creation of a user, however there is **no clean way to type the req object**. The cleanest alternative is to create an interface for the Request and then create a variable that holds req.body and use the interface there:

```typescript
const body: UserReqBody = req.body;
const newUser = await User.create(body);
```

Since we typed our Mongoose Document, it KNOWS what can and needs to be in the req body. This is extremely useful and I'm loving it thus far. I migrated to the use of res.json: `res.json({ message: 'User Created', newUser })`.

### Try Catch

TS doesn't allow for typing directly in the catch portion of the block. So you have to once again create a variable for it. I improved my err handling with status and a cleaner and clearer message:

```typescript
} catch (error) {
	const { name, message }: Error = error;
	res.status(400).send({ error: { name, message } });
}
```

### Utils

I imported walrus-tools and created two new Fns toLowercase, which takes strings and returns them in lowercase, and mapObj which takes a Fn and returns a Fn that takes an obj and applies the Fn to the properties in the object. I then created a utils file for the server and created `export const lowercaseProps = mapObj(toLowercase);` to use on req.body and turn all the data lowercase to keep the API and db standardized. The end route is:

```typescript
router.post('/user/new', async (req, res) => {
   try {
      const body: UserReqBody = req.body;
      const newUser = await User.create(lowercaseProps(body));
      res.json({ message: 'User Created', newUser });
   } catch (error) {
      const { name, message }: Error = error;
      res.status(400).send({ error: { name, message } });
   }
});
```
