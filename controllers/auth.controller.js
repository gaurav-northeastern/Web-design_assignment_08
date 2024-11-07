const { User, Images } = require("./models/user")

const authController = {

    async registerNewUser(req, res, next) {
        try {
            const { email, password, name } = req.body

            const user = new User({
                email,
                password,
                name
            });

            await user.save()
            return res.status(201).json({
                message: "User registered",
                user
            });
        } catch (err) {
            console.log(err)

        }
    },

    async modifyUser(req, res, next) {
        try {
            const { id, name, password } = req.body
            const user = await User.findById(id)


            user.name = name;
            user.password = password;

            await user.save();
            return res.status(200).json({ message: "New details added", user });

        }
        catch (error) {
            console.log(error)


        }
    },

    async removeAnyUser(req, res, next) {
        try {
            const { email } = req.body;
            await User.deleteOne({ email });
            return res.status(200).json('Dleted!');

        } catch (error) {
            console.log(error)

        }

    },

    async displayAllUser(req, res, next) {
        try {
            const allUsers = await User.find()
            return res.status(200).json(
                {
                    message: 'List of all users',
                    users: allUsers
                }
            )


        }
        catch (error) {
            console.log(error)



        }
    },

    async uploadImages(req, res, next) {
        try {

            const file = req.file;
            const updatedUserImage = await new Images({
                images: file.path
            });
            updatedUserImage.save();

            return res.json({ message: "Done, Uploaded!", imagePath: file.path });

        } catch (error) {
            console.log(error)
        }
    }


}

module.exports = authController;