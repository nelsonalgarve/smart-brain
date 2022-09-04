const handleSignin = (req, res, db, bcrypt) => {
    
    // DESTRUCTURING!!!!
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission');
    }
    db.select('*').from('login')
        .where('email', '=', email)
        .then(data => {
           const isValid = bcrypt.compareSync(password, data[0].hash);
           console.log(isValid);
           console.log(data[0].hash, password);

           if (isValid) {
            console.log(email);
             return db.select('*').from('users')
                .where('email','=', email)
                .then(user => {
                    
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
           } else {
               res.status(400).json('wrong Credentials')
           }
        })
        .catch(err => res.status(400).json('wrong credentials 3'))
}

module.exports = {
    handleSignin: handleSignin
}