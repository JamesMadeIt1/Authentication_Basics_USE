const Salt = await bcrypt.genSalt(10);
const Hash = await bcrypt.hash(password, Salt);

user.password = Hash;
await user.save();


//login

const isMatch = await bcrypt.compare(plainPassword, user.password);
if(!isMatch) {
    throw new Error('Invalid credentials')} ;